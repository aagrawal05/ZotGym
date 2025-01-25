import sqlite3
 
file = "database1.db"
def database_manage(emai, full_name, pword, phone_number, physical_interst, workout_time, gym_location):
    try:
        conn = sqlite3.connect(file)
        print("Database connected")
        cur = conn.cursor()
        table = """ CREATE TABLE IF NOT EXISTS users (
                    email TEXT PRIMARY KEY NOT NULL,
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

def add_user_to_db(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location):
    try:
        conn = sqlite3.connect(file)
        print("connection secure")
        cur = conn.cursor()
        physical_interst_str = ','.join(physical_interest) if isinstance(physical_interest, list) else physical_interest
        workout_time_str = ','.join(workout_time) if isinstance(workout_time, list) else workout_time
        gym_location_str = ','.join(gym_location) if isinstance(gym_location, list) else gym_location
        cur.execute(""" INSERT INTO users(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location)
        VALUES(?, ?, ?, ?, ?, ?, ?);""", (email, 
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

