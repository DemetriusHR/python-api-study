import requests

request = requests.get('http://api.open-notify.org')
print(request.status_code)

request2 = requests.get('http://api.open-notify.org/fake-endpoint')
print(request2.status_code)

people = requests.get('http://api.open-notify.org/astros.json')
print(people.text)

# Transforma o retorno dos dados em JSON
people_json  = people.json()
print(people_json)

# Mostra o número de Pessoas no espaço
print("Number of people in space:",people_json['number'])

# Mostra os nomes das pessoas que estão no espaço
for p in people_json['people']:
    print(p['name'])