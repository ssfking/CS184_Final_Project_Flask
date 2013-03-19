from flask import Flask, url_for, Response, request, json, render_template, redirect, url_for
import pymongo
import os
from urlparse import urlparse
from pymongo import Connection
from pymongo.errors import InvalidId
app = Flask(__name__)

def mongo_db():
  MONGO_URL = os.environ.get('MONGOHQ_URL')
  if MONGO_URL:
    connection = Connection(MONGO_URL)
    return connection[urlparse(MONGO_URL).path[1:]]
  else:
    connection = Connection()
    return connection['MyDB']

@app.route('/')
def root():
  return render_template('home.html')

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/signup')
def signup():
  return render_template('login.html')

@app.route('/dashboard')
def dashboard():
  return render_template('dashboard.html')

@app.route('/iframeTest')
def iframeTest():
  return render_template('iframeTest.html')

@app.route('/pendingOffers')
def pendingOffers():
  return render_template('pendingOffers.html')

@app.route('/editProfile')
def editProfile():
  return render_template('editProfile.html')

@app.route('/editRateCard')
def editRateCard():
  return render_template('editRateCard.html')


@app.route('/processLogin')
def processLogin():
  if 'email' not in request.args or 'password' not in request.args:
    return redirect(url_for('login',status="Email and password are not provided."))
  email = request.args['email']
  password = request.args['password']
  db = mongo_db()
  Users = db.Users
  user  = Users.find_one({"email": email})
  if (user is None):
    return redirect(url_for('login', status="Email does not exist."))
  if (password != user['password']):
    return redirect(url_for('login', status="Passowrd is incorrect."))
  return redirect(url_for('dashboard'))

@app.route('/processSignup')
def processSignup():
  if 'email' not in request.args or 'password' not in request.args:
    return redirect(url_for('signup',status="Email and password are not provided."))
  email = request.args['email']
  password = request.args['password']
  if (len(email) < 3):
    return redirect(url_for('signup',status="Username length must be at least 3."))
  if (len(password) < 5):
    return redirect(url_for('signup',status="Password length must be at least 5."))
  db = mongo_db()
  Users = db.Users
  if (Users.find({"email": email}).count() > 0):
    return redirect(url_for('signup',status="Email has already been registered."))
  id = Users.insert(data)
  return redirect(url_for('dashboard'))

@app.route('/api/widget/userInfo/<userId>', methods= ['GET'])
def api_userInfo(userId):
  db = mongo_db()
  Users = db.Users
  print("Old number of records:"+ str(Users.count()))
  objectId = 0;
  try:
    objectId = ObjectId(userId)
  except InvalidId:
    returnObj = {'result':'failure', 'errorMessage':'Invalid userId'}
    js = json.dumps(returnObj)
    return Response(js, status=200, mimetype='application/json')
  user = Users.find_one({"_id": objectId})
  if (user is None):
    returnObj = {'result':'failure', 'errorMessage':'Username does not exist.'}
    js = json.dumps(returnObj)
    return Response(js, status=200, mimetype='application/json')  
  returnObj = {'result':'success'}
  js = json.dumps(returnObj)    
  return Response(js, status=200, mimetype='application/json')

if __name__ == '__main__':
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port, debug=True)  
