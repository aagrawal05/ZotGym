import sqlite3
 
file = "database1.db"
def database_manage(emai, full_name, pword, phone_number, physical_interst, workout_time, gym_location):
    try:
        conn = sqlite3.connect(file)
        print("Made")
        cur = conn.cursor()
        table = """ CREATE TABLE users (
                    email text PRIMARY KEY NOT NULL,
                    full_name text  NOT NULL,
                    pword text NOT NULL,
                    phone_number text NOT NULL,
	                physical_interest text[] NOT NULL,
	                workout_time text[] NOT NULL,
	                gym_location text[] NOT NULL	
                ); """
        cur.execute(table)
    except:
        print("Not")
    
    return None

def add_user_to_db(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location):
    file = 'database1.db'
    try:
        conn = sqlite3.connect(file)
        print("connection secure")
        cur = conn.cursor()
        cur.execute(""" INSERT INTO users(email, full_name, pword, phone_number, physical_interest, workout_time, gym_location)
        VALUES(?, ?, ?, ?, ?, ?, ?);""", (email, full_name, pword, phone_number, physical_interest, workout_time, gym_location))
        conn.commit()
    except sqlite3.Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

