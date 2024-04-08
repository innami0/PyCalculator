from flask import Flask,request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

prepare = 0
state = "none"
result = 0

@app.route('/int',methods = ["POST"])
def index():
    global prepare
    data = request.get_json()

    exm(data['Num'])
    pre(data["Kig"],data["Num"])
    kigs(data['Kig'])  

    return str(result)

def kigs(k):
    global state
    if k == "+":
        state = "+"
    elif k == "-":
        state = "-"
    elif k == "÷":
        state = "÷"
    elif k == "×":
        state = "×"
    elif k == "=":
        state = "none"

def exm(n):
    global result
    if state == "+":
        result = prepare + n
    elif state == "-":
        result = prepare - n
    elif state == "÷":
        result = prepare / n
    elif state == "×":
        result = prepare * n

def pre(k,n):
    global result
    global prepare
    if k == "=":
        if state == "+":
            result =  prepare + n
        elif state == "-":
            result =  prepare - n
        elif state == "÷":
            result =  prepare / n
        elif state == "×":
            result =  prepare * n
        prepare = 0
    else:
        prepare = n

if __name__ == '__main__':
    app.run()