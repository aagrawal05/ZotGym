CREATE TABLE users (
    user_id id PRIMARY KEY
	email text,
	full_name text,
	pword text,
	phone_number text,
	physical_interest text[],
	workout_time text[],
	gym_location text[]	
)
