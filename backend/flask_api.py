from flask import Flask, jsonify, request
import time

app = Flask(__name__)
globalData = time.time()

@app.route('/')
def home():
    return jsonify(globalData)

@app.route('/currentdata', methods=['GET','POST'])
def currentdata():
    if request.method == 'POST':
        global globalData
        data = request.get_json()
        globalData = data['test']
        response = jsonify({'success':True})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    else:
        return jsonify(globalData)

@app.route('/historicaldata')
def olddata():
    response = jsonify({'success':True})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


app.run(host='0.0.0.0', port='5000', debug=True)
