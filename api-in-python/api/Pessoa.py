from flask_restful import Resource, request
from ConnectDatabase import collectionPessoa

class Pessoa(Resource):
    def get(self):
        args = request.args
        idPessoa = int(args["id"])

        response = collectionPessoa.find_one({"id": idPessoa}, {"_id": 0})

        if response is None:
            result = {"status": "error", "pessoa": None,
                      "message": "Não existe essa pessoa cadastrada!"}
        else:
            result = {"status": "sucess", "pessoa": response}

        return result

    def post(self):
        data = request.json
        cpfPessoa = data["cpf_pessoa"]
        nmPessoa = data["nm_pessoa"]

        verify_response = collectionPessoa.find_one(
            {"cpfPessoa": cpfPessoa}, {"_id": 0})

        if verify_response:
            return {"status": "error", "message": "Esse CPF já está cadastrado!"}

        response = collectionPessoa.find({}, {"_id": 0})
        pessoas = []

        for pessoa in response:
            pessoas.append(pessoa)

        nextId = pessoas[-1]["id"] + 1

        collectionPessoa.insert_one(
            {"id": nextId, "cpfPessoa": cpfPessoa, "nmPessoa": nmPessoa})

        return {"status": "sucess"}

    def put(self):
        data = request.json
        idPessoa = int(data["id"])
        cpfPessoa = data["cpf_pessoa"]
        nmPessoa = data["nm_pessoa"]

        verify_response = collectionPessoa.find_one(
            {"id": idPessoa}, {"_id": 0})

        if verify_response is None:
            return {"status": "error", "message": "Não existe essa pessoa cadastrada!"}
        else:
            collectionPessoa.update_one(
                {"id": idPessoa}, {"$set": {"cpfPessoa": cpfPessoa, "nmPessoa": nmPessoa}})

            return {"status": "sucess"}

    def delete(self):
        data = request.json
        idPessoa = int(data["id"])

        verify_response = collectionPessoa.find_one(
            {"id": idPessoa}, {"_id": 0})

        if verify_response is None:
            return {"status": "error", "message": "Não existe essa pessoa cadastrada!"}
        else:
            collectionPessoa.delete_one({"id": idPessoa})

            return {"status": "sucess"}
