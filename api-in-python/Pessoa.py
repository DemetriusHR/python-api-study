from flask_restful import Resource
from ConnectDatabase import collectionPessoa

class Pessoa(Resource):
    def get(self, cpf_pessoa):
        print(cpf_pessoa)

        response = collectionPessoa.find_one({ "cpfPessoa": cpf_pessoa }, { "_id": 0 })

        result = { 'status': 'sucess', 'pessoa': response }

        return result