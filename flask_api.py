from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/')
def home():
    return response

@app.route('/currentdata')
def data():
    return response

@app.route('/historicaldata')
def get_flag():
    return response


app.run(host='0.0.0.0', port='5000', debug=True)