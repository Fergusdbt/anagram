from flask import Flask, jsonify, render_template

import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# Load dictionary from the JSON file
with open('static/dictionary.json', 'r') as file:
    dictionary = json.load(file)

# Check if a word exists in the dictionary
@app.route("/validate/<word>")
def validate(word):
    if word in dictionary:
        return jsonify({"valid": True})
    else:
        return jsonify({"valid": False})


