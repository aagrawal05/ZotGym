from flask import Flask, redirect, render_template, request, jsonify
from database import add_user_to_db, database_manage, create_messages_table, drop_table, write_fake_messages, get_messages, update_user, get_user_by_serial
import sqlite3

app = Flask(__name__)
# socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")

clients = {}

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
        profile_pic = request.form.get('profile_pic')
        gender = request.form.get('gender')
        database_manage()
        add_user_to_db(email, full_name, pword, phone_number, physical_interests, workout_time, gym_location, profile_pic, gender)

    return render_template('create_profile.html')

# @app.route('/messages', methods = ['GET, POST'])
# def get_message():
#     if request.method == 'GET':
#         ids = request.get_json()
#         sender = ids['from']
#         receiver = ids['to']
#         result = get_messages(sender, receiver).fetchall()
#         all_messages = []
#         for message in result:
#             message_dict = {}
#             if message[1] == sender:
#                 message_dict['isSender'] = True
#             else:
#                 message_dict['isSender'] = False
#             message_dict['message'] = message[3]
#             all_messages.append(message_dict)
#         return jsonify(all_messages)
    

# write_fake_messages()

@app.route('/edit_profile/<serial_number>', methods=['GET', 'POST'])
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
