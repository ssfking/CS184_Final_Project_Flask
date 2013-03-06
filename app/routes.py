from flask import Flask, url_for, Response, request, json
import pymongo
import os
from urlparse import urlparse
from pymongo import Connection
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
def api_root():
  print "in root\n"
  db = mongo_db()
    
  CoreLocations = db.CoreLocations
  location = [{"hi":"spencer", "sup":"not much"},{"hi":"spencer2", "sup":"not much2"}]
  id = CoreLocations.insert(location)
  print(location)
  print(id)
  return 'Welcome'

@app.route('/data/add', methods = ['POST'])
def api_message():
  print("inside add")
  if request.headers['Content-Type'].find('application/json') > -1:
    data = request.json
    print(data)
    db = mongo_db()
    if 'CoreLocation' in data:
      print("In CoreLocation")
      location = data['CoreLocation']
      CoreLocations = db.CoreLocations
      print("Old number of records:"+ str(CoreLocations.count()))
      print(CoreLocations.find_one())
      id = CoreLocations.insert(location)
      print (id)
      print("New number of records:"+ str(CoreLocations.count()))
    if 'CoreMotion' in data:
      print("In CoreMotion")
      motion = data['CoreMotion']
      CoreMotions = db.CoreMotions
      print("Old number of records:" + str(CoreMotions.count()))
      print(CoreMotions.find_one())
      id = CoreMotions.insert(motion)
      print(id)
      print("New number of records:" + str(CoreMotions.count()))
    resp = Response(status=200)
    return resp  	

@app.route('/user/add', methods = ['POST'])
def api_userAdd()
  if request.headers['Content-Type'].find('application/json') > -1:
    data = request.json
    print(data)
    db = mongo_db()
    if 'username' in data && 'password' in data:
      print("went through username/password test")
      username = data['username']
      password = data['password']
      if (len(username) < 3):
        returnObj = {'result':'failure', 'ErrorMessage':'Username length must be at least 3.'}
        js = json.dump(returnObj)
        return Response(js, status=200, mimetype='application/json')
      if (len(password) < 5):
        returnObj = {'result':'failure', 'ErrorMessage':'Password length must be at least 3.'}
        js = json.dump(returnObj)
        return Response(js, status=200, mimetype='application/json')
      Users = db.Users
      print("Old number of records:"+ str(Users.count()))
      print(Users.find_one())
      if (Users.find({"username": username}).count() <= 0):
        returnObj = {'result':'failure', 'ErrorMessage':'Username has already been taken.'}
        js = json.dump(returnObj)
        return Response(js, status=200, mimetype='application/json')
      id = Users.insert(data)
      print (id)
      print("New number of records:"+ str(Users.count()))
      returnObj = {'result':'success'}
      js = json.dump(returnObj)    
      resp = Response(js, status=200, mimetype='application/json')
      return resp
    resp = Response(status=200, mimetype='application/json')
    return resp

if __name__ == '__main__':
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port, debug=True)  
