from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS globally for all routes
CORS(app)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()  # Get the JSON data from the request
    fname = data.get('fname')
    email = data.get('email')
    password = data.get('password')
    
    # Simulate user creation and return a response
    return jsonify({
        'message': 'User created successfully',
        'user': {
            'fname': fname,
            'email': email,
            'password': password
        }
    })

if __name__ == "__main__":
    app.run(debug=True)

