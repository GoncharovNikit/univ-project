from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/calculate_score', methods=['POST'])
def calculateScore():
    # defining user-entered points and speciality
    data = request.get_json()
    firstValue = float(data['ukrValue'])
    secondValue = float(data['mathValue'])
    thirdValue = float(data['thirdValue'])
    thirdSubject = data['thirdSubject']
    selectedSpeciality = data['speciality']

    # defining the subjects of speciality
    with open('speciality.json') as f:
        specialities = json.load(f)
        for speciality in specialities:
            if speciality['code'] == selectedSpeciality:
                mainSubjects = speciality['mainSubjects']
                secondarySubject = speciality['secondarySubjects']
                break

    # calculating competitive score
    totalScore = 0
    for subject in mainSubjects:
        if subject['title'] == 'Українська мова':
            totalScore += firstValue * subject['coef']
        elif subject['title'] == 'Математика':
            totalScore += secondValue * subject['coef']

    for subject in secondarySubject:
        if subject['title'] == thirdSubject:
            totalScore += thirdValue * subject['coef']
    
    return jsonify({'totalScore': totalScore})
