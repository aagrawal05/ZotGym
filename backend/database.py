import sqlite3
import re

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
	                gym_location TEXT NOT NULL	
                ); """
        cur.execute(table)
        conn.commit()
        print("Table created")
    except sqlite3.Error as e:
        print(f"Error creating table: {e}")
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

def add_user_to_db(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location):
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
        phone_number = format_phone_number(phone_number)
        cur.execute(""" INSERT INTO users(serial_number, email, full_name, pword, phone_number, physical_interest, workout_time, gym_location)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);""", (serial_number,
                                          email, 
                                          full_name, 
                                          pword, 
                                          phone_number, 
                                          physical_interst_str, 
                                          workout_time_str, 
                                          gym_location_str))
        conn.commit()
        print("User added successfully")
    except sqlite3.Error as e:
        print(f"Database error: {e}")
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
#         cur.execute("UPDATE users SET serial_number = ? WHERE serial_number = ?", (7, 8))
#         conn.commit()
#     except sqlite3.Error as e:
#         print(f"update error: {e}")
    
