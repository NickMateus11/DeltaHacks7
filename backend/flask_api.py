from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/')
def home():
    return "Mikha"

@app.route('/currentdata')
def currentdata():
    response = "Filler"
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/historicaldata')
def olddata():
    response = "Filler"
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


app.run(host='0.0.0.0', port='5000', debug=True)