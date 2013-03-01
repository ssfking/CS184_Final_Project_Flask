from flask import Flask, url_for, Response, request
import pymongo
import os
from pymongo import Connection
app = Flask(__name__)

def mongo_db():
    if os.environ.get('MONGOHQ_URL'):
        connection = Connection(os.environ['MONGOHQ_URL'])
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

if __name__ == '__main__':
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port, debug=True)  
