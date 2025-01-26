from flask import Flask, redirect, render_template, request, jsonify, url_for
from database import add_user_to_db, database_manage, get_messages, get_user_by_id, get_email_from_id, check_user_exists
import sqlite3
from math_calcs import matching_people

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
        add_user_to_db(email, full_name, pword, phone_number, physical_interests, workout_time, gym_location)
    return render_template('create_profile.html')

@app.route('/messages/<from_id>/<to>', methods = ['GET, POST'])
def get_message(from_id, to):
    if request.method == 'GET':
        sender = from_id
        receiver = to
        result = get_messages(sender, receiver).fetchall()
        all_messages = []
        for message in result:
            message_dict = {}
            if message[1] == sender:
                message_dict['isSender'] = True
            else:
                message_dict['isSender'] = False
            message_dict['message'] = message[3]
            all_messages.append(message_dict)
        return jsonify(all_messages)

@app.route('/foryou/<id>', methods = ['GET', 'POST'])
def find_similar_matches(id):
    email = get_email_from_id(id)
    email_list = matching_people.create_encoded_list(email)
    return render_template('fyp.html', emails = email_list)

@app.route('/login', methods = ['GET', 'POST'])
def login_user():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('pword')
        user = check_user_exists(email, password)
        if user[0]:
            return redirect(url_for('find_similar_matches', id = user[1]))
    return render_template('login.html')



@app.route('/users/<id>', methods = ['GET', 'POST'])
def get_user_with_id_param(id):
    if request.method == 'GET':
        result = get_user_by_id(id)
    return render_template('create_profile.html')



# try:
#     conn = sqlite3.connect()
#     cur = conn.cursor()
#     cur.execute('''INSERT INTO messages(sender_id, receiver_id, message, time)
#                 VALUES(? ? ? ? )''', (sender, recipient, message, time))
# except sqlite3.Error as e:
#     print("failed because of {e}")
# finally:
#     if conn:
#         conn.close()


    





