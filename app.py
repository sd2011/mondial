from flask import Flask, redirect, render_template, url_for, request, jsonify, json, make_response
from flask_pymongo import PyMongo
from bson import json_util
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["MONGO_DBNAME"] = 'mondial'
app.config["MONGO_URI"]='mongodb://stav:1234@ds113713.mlab.com:13713/mondial'
mongo = PyMongo(app)

def score():
    users = mongo.db.users
    admin = users.find_one({'email': 'admin@veriests.com'})
    allUsers = users.find({'email': {'$ne': 'admin@veriests.com' }})
    all = [user for user in allUsers]
    for user in all:
        if user['top3'] != "":
            user['score'] = 0
            for group, teams in admin['groupsWinners'].items():
                for i in range(1,3):
                    if str(i) in teams and user['groupsWinners'][group][str(i)] == teams[str(i)]:
                        user['score'] += 5
                        continue
                    if str((5%(i+2))) in teams and user['groupsWinners'][group][str(i)] == teams[str(5%(i+2))]:
                        user['score'] +=2
            if admin['winners'] != "lies":
                for column, matches in admin['winners'].items():
                    if column != '1' and column != '7':
                        for matchNumber, match in matches.items():
                            if user['winners'][column][matchNumber][0] == match[0] and match[0] != '?':
                                user['score'] += 5
                            if user['winners'][column][matchNumber][1] == match[1] and match[1] != '?':
                                user['score'] += 5
            if admin['top3'] != "":
                if '1' in admin['top3'] and admin['top3']['1'] == user['top3']['1']:
                    user['score'] += 5
                if '3' in admin['top3'] and admin['top3']['3'] == user['top3']['3']:
                    user['score'] += 5
            users.save(user)
        everybody = users.find().sort('score', -1)
        users.drop()
        users = mongo.db.users
        users.insert([everybody])

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
@cross_origin()
def catch_all(path):
    return render_template('index.html')

@app.route('/user', methods= ["POST", "GET"])
@cross_origin()
def user():
    if request.method=="POST":
        users = mongo.db.users
        data = request.get_json()
        if 'logEmail' in data:
            data['email'] = data['logEmail']
            data['password'] = data['logPassword']
            data.pop('logPassword')
            data.pop('logEmail')
        user = users.find_one({'email' : data['email']})
        if not user:
            if len(request.get_json()) < 3:
                return jsonify(data="lies")
            user = data
            user['groupsWinners'] = ""
            user['winners'] = "lies"
            user['top3'] = ""
            user['color'] = "aba"
            user['score'] = 0
            user.pop('confirmPassword')
            users.insert(user)
            user = users.find_one({'email' : data['email']})
        if len(request.get_json()) > 1:
            password = data['password']
            if(user['password'] != password ):
                return jsonify(data='lies')
            return jsonify(data=data['email'])
        response = make_response(json.dumps({'data': user}, default=json_util.default ))
        response.headers['content-type'] = 'application/json'
        return  response
    else:
        return redirect(url_for('index'))

@app.route('/users')
@cross_origin()
def users():
    users = mongo.db.users
    allUsers = users.find()
    data = [user for user in allUsers]
    response = make_response(json.dumps({'data': data}, default=json_util.default ))
    response.headers['content-type'] = 'application/json'
    return  response

@app.route('/groupsWinners', methods= ["POST", "GET"])
@cross_origin()
def groups():
    if request.method == "POST":
        users = mongo.db.users
        user = users.find_one({'email': request.get_json()['email']})
        user['groupsWinners']  = request.get_json()['groupsWinners']
        user['winners'] = "lies"
        user['color'] = "aba"
        users.save(user)
        if user['email'] == 'admin@veriests.com':
            score()
        response = make_response(json.dumps({'data':user}, default=json_util.default))
        response.headers['content-type']= "application/json"
        return response
    else:
        return redirect(url_for('index'))

@app.route('/winners', methods= {"POST", "GET"})
@cross_origin()
def winners():
    if request.method == "POST":
        values = request.get_json()
        users = mongo.db.users
        user = users.find_one({'email': values['email']})
        user['top3'] = values['top3']
        user['winners'] = values['winners']
        user['color'] = values['color']
        if user['email'] == 'admin@veriests.com':
            score()
        users.save(user)
        response = make_response(json.dumps({'data': user}, default=json_util.default))
        response.headers['content-type'] = 'application/json'
        return response

@app.route('/end', methods= {"POST", "GET"})
@cross_origin()
def end():
    print('test')
    end = mongo.db.end
    fetch = end.find_one()
    if request.method == "POST":
        fetch['end'] = request.get_json()['end']
        fetch.pop('_id')
        return jsonify(data=fetch)
    else:
        fetch.pop('_id')
        return jsonify(data=fetch)

if __name__ == "__main__":
    app.run(debug=True)
