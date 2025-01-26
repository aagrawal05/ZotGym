from flask import Flask, redirect, render_template, request, jsonify, url_for
from flask_cors import CORS
from database import add_user_to_db, database_manage, get_messages, get_user_by_id, get_email_from_id, check_user_exists, create_messages_table, drop_table, write_fake_messages, update_user, get_user_by_serial, write_message
import sqlite3
from math_calcs import matching_people

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        req_user = request.get_json()
        full_name = req_user[ 'fname' ]
        email = req_user[ 'email' ]
        pword = req_user[ 'pword' ]
        phone_number = req_user[ 'phone_number' ]
        physical_interests = req_user[ 'physical_interest' ]
        workout_time = req_user[ 'workout_time' ]
        gym_location = req_user[ 'gym_location' ]
        profile_pic = req_user[ 'profile_pic' ]
        gender = req_user[ 'gender' ]
        database_manage()
        res = add_user_to_db(email, full_name, pword, phone_number, physical_interests, workout_time, gym_location, profile_pic, gender)
        return jsonify(res)

@app.route('/messages/<from_id>/<to>', methods = ['GET', 'POST'])
def get_message(from_id, to):
    if request.method == 'POST':
        req_data = request.get_json()
        sender = from_id
        receiver = to
        message = req_data['message']
        time = req_data['time']
        print (sender, receiver, message, time)
        result = write_message(sender, receiver, message, time)
        return jsonify({ 'status': 200})
    elif request.method == 'GET':
        sender = from_id
        receiver = to
        result = get_messages(sender, receiver)
        print(result)
        all_messages = []
        if (result):
            for message in result:
                message_dict = {}
                if str(message[1]) == sender:
                    message_dict['isSender'] = True
                else:
                    message_dict['isSender'] = False
                message_dict['message'] = message[3]
                all_messages.append(message_dict)
        print(all_messages)
        return jsonify(all_messages)

@app.route('/foryou/<id>', methods = ['GET'])
def find_similar_matches(id):
    email = get_email_from_id(id)
    email_list = matching_people.create_encoded_list(email)
    return jsonify(email_list)

@app.route('/login/<email>/<pword>', methods = ['GET', 'POST'])
def login_user(email, pword):
    if request.method == 'GET':
        user = check_user_exists(email, pword)
        if user[0]:
            return jsonify(user[0])

@app.route('/users/<id>', methods = ['GET'])
def get_user_with_id_param(id):
    if request.method == 'GET':
        result = get_user_by_id(id)
        return jsonify(result)

@app.route('/edit_profile/<serial_number>', methods=['POST'])
def edit_profile(serial_number):
    print(f"Received serial_number: {serial_number}") 
    if request.method == 'POST':
        try:
            email = request.form.get('email')
            full_name = request.form.get('fname')
            pword = request.form.get('pword')
            phone_number = request.form.get('phone_number')
            physical_interests = request.form.get('physical_interest')
            workout_time = request.form.get('workout_time')
            gym_location = request.form.get('gym_location')
            profile_pic = request.form.get('profile_pic')
            gender = request.form.get('gender')

            user_data = get_user_by_serial(serial_number)

            if not pword or pword.strip() == '':
                pword = user_data['pword']

            update_user(
                serial_number, email, full_name, pword, phone_number,
                physical_interests, workout_time, gym_location, profile_pic, gender
            )
            print("Profile updated successfully.")
            return "Profile updated successfully", 200
        except Exception as e:
            print(f"Error updating user: {e}")
            return f"Error updating user: {e}", 400

    user_data = get_user_by_serial(serial_number)
    print(f"User data fetched: {user_data}") 
    if user_data:
        user_data['serial_number'] = serial_number
        return render_template('edit_profile.html', user=user_data)
    else:
        return "User not found.", 404


if __name__ == "__main__":
    app.run(port=5001, debug=True)
