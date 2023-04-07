from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/speciality/all')
def basePath():
    with open('./data/speciality.json') as json_data:
        return json_data.read()