from flask import Flask, redirect, render_template, request
from database import add_user_to_db, database_manage, delete_user

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('create_profile.html')

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        full_name = request.form.get('fname')
        email = request.form.get('email')
        pword = request.form.get('pword')
        phone_number = request.form.get('phone_number')
        physical_interests = request.form.get('physical_interest')
        workout_time = request.form.get('workout_time')
        gym_location = request.form.get('gym_location')
        database_manage()
        add_user_to_db(full_name, email, pword, phone_number, physical_interests, workout_time, gym_location)

    return render_template('create_profile.html')

