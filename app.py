from flask import Flask, redirect, render_template, url_for, request, jsonify, json, make_response
from flask_pymongo import PyMongo
from bson import json_util


app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'mondial'
app.config["MONGO_URI"]='mongodb://stav:1234@ds113713.mlab.com:13713/mondial'
mongo = PyMongo(app)

def score():
    users = mongo.db.users
    dor = users.find_one({'email': 'dor@veriests.com'})
    allUsers = users.find({'email': {'$ne': 'dor@veriests.com' }})
    all = [user for user in allUsers]
    for user in all:
        user['score'] = 0
        for group, teams in dor['groupsWinners'].items():
            for i in range(1,3):
                if str(i) in teams and user['groupsWinners'][group][str(i)] == teams[str(i)]:
                    user['score'] += 5
                    continue
                if str((5%(i+2))) in teams and user['groupsWinners'][group][str(i)] == teams[str(5%(i+2))]:
                    user['score'] +=2
        for column, matches in dor['winners'].items():
            if column != '1' and column != '7':
                for matchNumber, match in matches.items():
                    if user['winners'][column][matchNumber][0] == match[0] and match[0] != '?':
                        user['score'] += 5
                    if user['winners'][column][matchNumber][1] == match[1] and match[1] != '?':
                        user['score'] += 5
        if '1' in dor['top3'] and dor['top3']['1'] == user['top3']['1']:
            user['score'] += 5
        if '3' in dor['top3'] and dor['top3']['3'] == user['top3']['3']:
            user['score'] += 5
        users.save(user)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user', methods= ["POST", "GET"])
def user():
    if request.method=="POST":
        users = mongo.db.users
        email = request.get_json()['email']
        user = users.find_one({'email' : email})
        if not user:
            if len(request.get_json()) < 2:
                return redirect(url_for('index'))
            user = request.get_json()
            user['groupsWinners'] = ""
            user['winners'] = ""
            user['top3'] = ""
            user['color'] = ''
            user['score'] = 0
            user.pop('confirmPassword')
            users.insert(user)
            user = users.find_one({'email' : email})
        if len(request.get_json()) > 1:
            password = request.get_json()['password']
            if(user['password'] != password ):
                return jsonify(data='lies')
            return jsonify(data=email)
        response = make_response(json.dumps({'data': user}, default=json_util.default ))
        response.headers['content-type'] = 'application/json'
        return  response
    else:
        return redirect(url_for('index'))

@app.route('/users')
def users():
    users = mongo.db.users
    allUsers = users.find()
    data = [user for user in allUsers]
    response = make_response(json.dumps({'data': data}, default=json_util.default ))
    response.headers['content-type'] = 'application/json'
    return  response

@app.route('/groupsWinners', methods= ["POST", "GET"])
def groups():
    if request.method == "POST":
        users = mongo.db.users
        user = users.find_one({'email': request.get_json()['email']})
        user['groupsWinners']  = request.get_json()['groupsWinners']
        users.save(user)
        if user['email'] == 'dor@veriests.com':
            score()
        return jsonify(data=user['groupsWinners'])
    else:
        return redirect(url_for('index'))

@app.route('/winners', methods= {"POST", "GET"})
def winners():
    if request.method == "POST":
        values = request.get_json()
        users = mongo.db.users
        user = users.find_one({'email': values['email']})
        user['top3'] = values['top3']
        user['winners'] = values['winners']
        user['color'] = values['color']
        if user['email'] == 'dor@veriests.com':
            score()
        users.save(user)
        response = make_response(json.dumps({'data': user}, default=json_util.default))
        response.headers['content-type'] = 'application/json'
        return response

if __name__ == "__main__":
    app.run(debug=True)
