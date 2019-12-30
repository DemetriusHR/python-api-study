from flask_restful import Resource
from ConnectDatabase import collectionPessoa

class Pessoas(Resource):
    def get(self):
        response = collectionPessoa.find({}, { "_id": 0 })
        result = {}

        if response is None:
           result = { 'status': 'error', 'pessoas': None }
        else:
            pessoas = []

            for pessoa in response:
                pessoas.append(pessoa)

            result = { 'status': 'sucess', 'pessoas': pessoas }

        return result