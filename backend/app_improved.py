from flask import Flask, redirect, render_template, request, jsonify, url_for
from flask_cors import CORS
from database import (
    add_user_to_db,
    database_manage,
    get_messages,
    get_user_by_id,
    get_email_from_id,
    check_user_exists,
    create_messages_table,
    drop_table,
    write_fake_messages,
    update_user,
    get_user_by_serial
)
from math_calcs import matching_people

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        req_user = request.get_json()
        full_name = req_user.get('fname')
        email = req_user.get('email')
        pword = req_user.get('pword')
        phone_number = req_user.get('phone_number')
        physical_interests = req_user.get('physical_interest')
        workout_time = req_user.get('workout_time')
        gym_location = req_user.get('gym_location')
        profile_pic = req_user.get('profile_pic')
        gender = req_user.get('gender')

        database_manage()

        res = add_user_to_db(
            email, full_name, pword, phone_number,
            physical_interests, workout_time, gym_location
        )
        return jsonify(res)


@app.route('/messages/<from_id>/<to>', methods=['GET', 'POST'])
def get_message(from_id, to):
    if request.method == 'GET':
        result = get_messages(from_id, to).fetchall()
        all_messages = []
        for message in result:
            message_dict = {
                'isSender': message[1] == from_id,
                'message': message[3]
            }
            all_messages.append(message_dict)
        return jsonify(all_messages)


@app.route('/foryou/<id>', methods=['GET'])
def find_similar_matches(id):
    email = get_email_from_id(id)
    email_list = matching_people.create_encoded_list(email)
    return jsonify(email_list)


@app.route('/login', methods=['POST'])
def login_user():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('pword')
        user = check_user_exists(email, password)
        if user[0]:
            return jsonify({'status': 200, 'data': user})
        return jsonify({'status': 401, 'message': 'Invalid credentials'}), 401


@app.route('/users/<id>', methods=['GET'])
def get_user_with_id_param(id):
    result = get_user_by_id(id)
    if result:
        return jsonify(result)
    return jsonify({'status': 404, 'message': 'User not found'}), 404


@app.route('/edit_profile/<serial_number>', methods=['GET', 'POST'])
def edit_profile(serial_number):
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
            return jsonify({'status': 200, 'message': 'Profile updated successfully'}), 200

        except Exception as e:
            return jsonify({'status': 400, 'message': f"Error updating user: {e}"}), 400

    user_data = get_user_by_serial(serial_number)
    if user_data:
        user_data['serial_number'] = serial_number
        return render_template('edit_profile.html', user=user_data)
    return jsonify({'status': 404, 'message': 'User not found'}), 404


if __name__ == "__main__":
    app.run(port=5001, debug=True)

