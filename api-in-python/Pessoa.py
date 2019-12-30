from flask_restful import Resource, request
from ConnectDatabase import collectionPessoa

class Pessoa(Resource):
    def get(self):
        args = request.args
        idPessoa = int(args["id"])

        response = collectionPessoa.find_one({ "id": idPessoa }, { "_id": 0 })

        if response is None:
            result = { 'status': 'error', 'pessoa': None }
        else:
            result = { 'status': 'sucess', 'pessoa': response }

        return result

    def post(self):
        data = request.json
        cpfPessoa = data["cpf_pessoa"]
        nmPessoa = data["nm_pessoa"]

        response = collectionPessoa.find({}, { "_id": 0 })
        pessoas = []

        for pessoa in response:
            pessoas.append(pessoa)

        nextId = pessoas[-1]["id"] + 1

        collectionPessoa.insert_one({ "id": nextId, "cpfPessoa": cpfPessoa, "nmPessoa": nmPessoa })

        return { 'status': 'sucess' }

    def put(self):
        data = request.json
        idPessoa = int(data["id"])

        collectionPessoa.update_one({ 'id': idPessoa }, { '$set': { 'cpfPessoa': data["cpf_pessoa"], 'nmPessoa': data["nm_pessoa"] } })

        return { 'status': 'sucess' }
    
    def delete(self):
        data = request.json
        idPessoa = int(data["id"])

        collectionPessoa.delete_one({ 'id': idPessoa })

        return { 'status': 'sucess' }