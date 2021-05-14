import os
from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
import requests
import scraper

load_dotenv()

app = Flask(__name__)
api = Api(app)


class Task(Resource):
    def get(self, title_id):
        url = self.get_info(title_id)
        rs = 'Error'

        if url:
            try:
                data = scraper.scrap(url)
                load = requests.post(os.getenv('API_ITEMS') + '/' + title_id, json=data)
                if load.status_code in {200, 201}:
                    rs = 'Operation done!'
            except ValueError:
                rs = 'Error'

        return {'result': rs}, {'Access-Control-Allow-Origin': '*'}

    @staticmethod
    def get_info(title_id):
        try:
            resp = requests.get(os.getenv('API_SEARCH') + '/' + title_id)
            if resp.status_code != 200 or not resp.json()['searche']:
                return False
            else:
                search = resp.json()
                search = search['searche']
                return search['url']
        except ValueError:
            return False


api.add_resource(Task, '/task/<string:title_id>')


def main():
    port = int(os.getenv('SERVER_PORT'))
    url = os.getenv('SERVER_URL')

    app.run(host=url, port=port, debug=True)


if __name__ == '__main__':
    main()
