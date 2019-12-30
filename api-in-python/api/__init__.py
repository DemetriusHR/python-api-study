from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from Pessoa import Pessoa
from Pessoas import Pessoas

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api.add_resource(Pessoas, '/pessoas')
api.add_resource(Pessoa, '/pessoa')

if __name__ == '__main__':
    app.run()