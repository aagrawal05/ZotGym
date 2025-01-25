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

def main():
    database_manage("jaeminy", "James", "abc", "123", "lifting", "Monday Evening", "ARC")

if __name__ == "__main__":
    main()