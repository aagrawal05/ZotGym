import sqlite3
import re
from datetime import datetime
import time

file = "database.db"
def database_manage():
    try:
        conn = sqlite3.connect(file)
        print("Database connected")
        cur = conn.cursor()
        table = """ CREATE TABLE IF NOT EXISTS users (
                    serial_number INTEGER PRIMARY KEY,
                    email TEXT NOT NULL,
                    full_name TEXT  NOT NULL,
                    pword TEXT NOT NULL,
                    phone_number TEXT NOT NULL,
	                physical_interest TEXT NOT NULL,
	                workout_time TEXT NOT NULL,
	                gym_location TEXT NOT NULL,
                    profile_pic TEXT,
                    gender TEXT
                ); """
        cur.execute(table)
        conn.commit()
        print("Table created")
    except sqlite3.Error as e:
        print(f"Error creating table: {e}")
    finally:
        if conn:
            conn.close()

def handle_connect():
    conn = sqlite3.connect(file)
    cur = conn.cursor()
    return cur

def drop_table():
    cur = handle_connect()
    cur.execute('DROP TABLE messages')

def create_messages_table():
    try:
        conn = sqlite3.connect(file)
        cur = conn.cursor()
        cur.execute("""CREATE TABLE messages(
                    message_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    sender_id INTEGER NOT NULL,
                    receiver_id INTEGER NOT NULL,
                    message_text TEXT NOT NULL,
                    time INTEGER NOT NULL,
                    FOREIGN KEY(sender_id) REFERENCES users(serial_number),
                    FOREIGN KEY(receiver_id) REFERENCES users(serial_number)
                    );
                    """)
        conn.commit()
    except sqlite3.Error as e:
        print(f'Failed creating table, error {e}')
    finally:
        if conn:
            conn.close()
        

def format_phone_number(phone_number):
    formatted_phone_number = re.sub(r'\D', '', phone_number)
    return formatted_phone_number

def get_next_serial_number():
    try:
        conn = sqlite3.connect(file)
        cur = conn.cursor()

        cur.execute("SELECT MAX(serial_number) FROM users")
        result = cur.fetchone()[0]
    
        next_serial_number = 1 if result is None else result + 1
        return next_serial_number
    except sqlite3.Error as e:
        print(f"Error fetching serial number: {e}")
        return None
    finally:
        if conn:
            conn.close()

def add_user_to_db(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location, profile_pic, gender):
    try:
        conn = sqlite3.connect(file)
        print("connection secure")
        cur = conn.cursor()

        serial_number = get_next_serial_number()
        if serial_number is None:
            print("Error: Could not retrieve the next serial number.")
            return
        
        physical_interst_str = ','.join(physical_interest).lower() if isinstance(physical_interest, list) else physical_interest.lower()
        workout_time_str = ','.join(workout_time).lower() if isinstance(workout_time, list) else workout_time.lower()
        gym_location_str = ','.join(gym_location).lower() if isinstance(gym_location, list) else gym_location.lower()
        gender = gender.lower()
        phone_number = format_phone_number(phone_number)
        cur.execute(""" INSERT INTO users(serial_number, email, full_name, pword, phone_number, physical_interest, workout_time, gym_location, profile_pic, gender)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);""", (serial_number,
                                          email, 
                                          full_name, 
                                          pword, 
                                          phone_number, 
                                          physical_interst_str, 
                                          workout_time_str, 
                                          gym_location_str,
                                          profile_pic,
                                          gender))
        conn.commit()
        print("User added successfully")
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            conn.close()

def write_fake_messages():
    conn = sqlite3.connect(file)
    cur = conn.cursor()
    cur_time = round(time.time() * 1000)
    cur.execute('''INSERT INTO messages(sender_id, receiver_id, message_text, time) 
                VALUES(3, 4, 'what is up', ?)''', (cur_time,))  
    conn.commit() 





def get_messages(sender_id: int, receiver_id: int):
    try:
        conn = sqlite3.connect(file)
        cur = conn.cursor()
        cur.execute("""SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) LIMIT 10
                    ORDER BY message_id DESC""", (sender_id, receiver_id, receiver_id, sender_id))
        conn.commit()
    except:
        print('failed')
    finally:
        if conn:
            conn.close()



# def delete_user(serial_number):
#     """
#     Delete a user from the database based on their serial_number.
#     """
#     try:
#         conn = sqlite3.connect(file)
#         cur = conn.cursor()
        
#         # Execute the DELETE query
#         cur.execute("DELETE FROM users WHERE serial_number = ?", (serial_number,))
#         conn.commit()  # Commit changes to the database
        
#         if cur.rowcount > 0:
#             print(f"User with serial_number {serial_number} deleted successfully.")
#         else:
#             print(f"No user found with serial_number {serial_number}.")
#     except sqlite3.Error as e:
#         print(f"Database error: {e}")
#     finally:
#         if conn:
#             conn.close()

# def update_user():
#     try:
#         conn = sqlite3.connect(file)
#         cur = conn.cursor()
#         cur.execute("UPDATE users SET gender = ? WHERE serial_number = ?", ('prefer not to say', 20))
#         conn.commit()
#     except sqlite3.Error as e:
#         print(f"update error: {e}")
    

# def add_profile_pic_column():
#     """
#     Add a new column 'profile_pic' to the users table that can be NULL.
#     """
#     try:
#         conn = sqlite3.connect(file)
#         cur = conn.cursor()

#         # Add the new column
#         cur.execute("ALTER TABLE users ADD COLUMN profile_pic TEXT;")
#         conn.commit()
#         print("Column 'profile_pic' added successfully.")
#     except sqlite3.Error as e:
#         print(f"Database error: {e}")
#     finally:
#         if conn:
#             conn.close()


# def add_gender_column():
#     """
#     Add a new column 'gender' to the users table that can be NULL.
#     """
#     try:
#         conn = sqlite3.connect(file)
#         cur = conn.cursor()

#         # Add the new column
#         cur.execute("ALTER TABLE users ADD COLUMN gender TEXT;")
#         conn.commit()
#         print("Column 'gender' added successfully.")
#     except sqlite3.Error as e:
#         print(f"Database error: {e}")
#     finally:
#         if conn:
#             conn.close()

