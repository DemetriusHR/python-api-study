from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)

db = client.teste

collectionPessoa = db.Pessoa

newPessoa = { 
  "id": 2,
  "nmPessoa": "Eduardo Souza Guimarães",
  "cpfPessoa": "36487951214"
}

response = collectionPessoa.find()

pessoas = []


for pessoa in response:
  pessoas.append(pessoa)

for pessoa in pessoas:
  print(pessoa)