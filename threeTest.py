from flask import Flask
from flask_restful import Resource, Api
from pymongo import MongoClient

app = Flask(__name__)
api = Api(app)

class Pessoas(Resource):
    def get(self):
        collectionPessoa = MongoClient('localhost', 27017).teste.Pessoa
        response = collectionPessoa.find()

        pessoas = []

        for pessoa in response:
            pessoas.append(pessoa)

        return pessoas

api.add_resource(Pessoas, '/pessoas')

if __name__ == '__main__':
    app.run()
