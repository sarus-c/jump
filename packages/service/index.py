import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, HTTPServer
from dotenv import dotenv_values
import requests
import scraper

config = dotenv_values(".env")


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
            resp = requests.get(config['API_SEARCH'] + '/' + p[1])

            if resp.status_code != 200 or not resp.json()['searche']:
                self.send_error(resp.status_code)
            else:
                search = resp.json()
                search = search['searche']
                url = search['url']
                x = scraper.scrap(url)
                load = requests.post(config['API_ITEMS'] + '/' + p[1], json=x)

                if load.status_code in {200, 201}:
                    self._set_headers()
                    self.wfile.write(json.dumps({'msg': 'Items added', 'received': 'ok'}).encode())
                else:
                    self.send_error(load.status_code)
        else:
            self.send_error(404)


def main():
    port = int(config['PORT'])
    host_name = config['HOST_NAME']
    server_address = ('localhost', port)
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
