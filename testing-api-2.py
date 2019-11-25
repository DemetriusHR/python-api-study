import requests

parameter = {"rel_rhy":"jingle"}
request = requests.get('https://api.datamuse.com/words',parameter)

rhyme_json = request.json()

# Mostrando somente os primeiros três retornos
for i in rhyme_json[0:3]:
 print(i['word'])