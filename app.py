from flask import Flask, redirect, render_template, url_for, request, jsonify, json, make_response
from flask_pymongo import PyMongo
from bson import json_util


app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'mondial'
app.config["MONGO_URI"]='mongodb://stav:1234@ds113713.mlab.com:13713/mondial'
mongo = PyMongo(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user', methods= ["POST", "GET"])
def user():
    if request.method=="POST":
        users = mongo.db.users
        email = request.get_json()['email']
        user = users.find_one({'email' : email})
        print(email)
        if not user:
            if len(request.get_json()) < 2:
                return redirect(url_for('index'))
            user = request.get_json()
            user['groupsWinners'] = ""
            user['winners'] = ""
            user['top3'] = ""
            users.insert(user)
            user = users.find_one({'email' : email})
        if len(request.get_json()) > 1:
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
        users.save(user)
        return jsonify({data:{user['top3'], user['winners']}})

if __name__ == "__main__":
    app.run(debug=True)
