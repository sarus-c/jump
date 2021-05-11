import os
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from dotenv import load_dotenv
import requests
import scraper

load_dotenv()


class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers",
                         "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        self.send_header('Content-type', 'application/json; charset=utf-8')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    def do_GET(self):
        p = self.path.split('/')
        p = list(filter(str.strip, p))
        p_length = len(p)

        if p_length == 2 and p[0] == 'task':
            resp = requests.get(os.getenv('API_SEARCH') + '/' + p[1])

            if resp.status_code != 200 or not resp.json()['searche']:
                self.send_error(resp.status_code)
            else:
                search = resp.json()
                search = search['searche']
                url = search['url']
                x = scraper.scrap(url)
                load = requests.post(os.getenv('API_ITEMS') + '/' + p[1], json=x)

                if load.status_code in {200, 201}:
                    self._set_headers()
                    self.wfile.write(json.dumps({'msg': 'Items added', 'received': 'ok'}).encode())
                else:
                    self.send_error(load.status_code)
        else:
            self.send_error(404)


def main():
    port = int(os.getenv('SERVER_PORT'))
    host_name = os.getenv('HOST_NAME')
    url = os.getenv('SERVER_URL')
    server_address = (url, port)
    server = HTTPServer(server_address, RequestHandler)

    print("Server started http://%s:%s" % (host_name, port))

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

    server.server_close()
    print("Server stopped.")


if __name__ == '__main__':
    main()
