from pymongo import MongoClient
from settings import LOCAL_DATABASE, PORT_DATABASE

collectionPessoa = MongoClient(LOCAL_DATABASE, PORT_DATABASE).teste.Pessoa