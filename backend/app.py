from flask import Flask, redirect, render_template, request, jsonify
# from database import add_user_to_db

app = Flask(__name__)
# socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")

clients = {}

# @app.route("/")
# def hello_world():
#     return render_template('create_profile.html')

# @app.route('/signup', methods = ['GET', 'POST'])
# def signup():
#     if request.method == 'POST':
#         full_name = request.form.get('fname')
#         email = request.form.get('email')
#         pword = request.form.get('pword')
#         phone_number = request.form.get('phone_number')
#         physical_interests = request.form.get('physical_interest')
#         workout_time = request.form.get('workout_time')
#         gym_location = request.form.get('gym_location')
#         add_user_to_db(full_name, email, pword, phone_number, physical_interests, workout_time, gym_location)
#     return render_template('create_profile.html')

# @app.route("/users/:id", methods=['GET'])
# def get_user():
#     pass

# @app.route("/messages/", methods=['GET'])
# def get_messages():
#     data = request.get_json()
    
#     jsonify([
#         {
#             isSender: True,
#             message: "hello!"
#         },
#         {
#             isSender: False,
#             message: "hey!"
#         },
#     ])

# TODO: remove disconnected clients on disconnect

@socketio.on('connect')
def handle_connect():
    socket_id = request.sid
    client[socket_id] = None

    sender = find_user_from_id(socket_id)
    recipient = data['to']  # Assuming the target socket_id is passed in data
    message = data['message']
    time = data['time']

#     # CREATE MESSAGE ROW IN TABLE
    
#     def find_user_from_id(value):
#         for key, val in clients.items():
#             if val == value:
#                 return key
#         return None 


#     if user_id in clients:
#         emit('receive_message', 
#             {
#                 sender: sender,
#                 message: message,
#                 time: time
#             },
#             room=clients[target])
#         print(f"Message sent to {target_socket_id}: {message}")
#     else:
#         print(f"Socket ID {target_socket_id} not found")


if __name__ == '__main__':
    socketio.run(app)
