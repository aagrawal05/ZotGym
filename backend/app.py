
from flask import Flask, redirect, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('create_profile.html')

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template('create_profile.html')