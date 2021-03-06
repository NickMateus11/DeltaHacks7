from flask import Flask, jsonify, request
import time
import dataParser as dp

app = Flask(__name__)

@app.route('/')
def home():
    return "Nothing to see here ... keep moving"

@app.route('/currentdata', methods=['GET','POST'])
def currentdata():
    if request.method == 'POST':
        data = request.get_json()
        dp.save_data(data)        
        response = jsonify({'success':True})
    else:
        response = jsonify(dp.get_data()[-1])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/historicaldata')
def historicaldata():
    response = jsonify(dp.get_data())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


app.run(host='0.0.0.0', port='5000', debug=True)
