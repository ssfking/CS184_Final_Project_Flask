from flask import Flask, url_for, Response, request, json, render_template
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
