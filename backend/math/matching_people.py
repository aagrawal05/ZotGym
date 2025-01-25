import sqlite3
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import heapq

file = '../database1.db'
try:
    conn = sqlite3.connect(file)
    # print("made")
    cur = conn.cursor()
    cur.execute('SELECT * FROM users')
    result = list(cur.fetchall())
except:
    print("failed")
finally:
    if conn:
        conn.close()

physical_categories = ['weightlifting', 'basketball', 'running', 'badminton', 'soccer', 'volleyball']
date_categories = ['sunday morning', 'sunday afternoon', 'sunday night', 'monday morning', 'monday afternoon', 'monday night',
                   'tuesday morning', 'tuesday afternoon', 'tuesday night', 'wednesday morning', 'wednesday afternoon', 'wednesday night',
                   'thursday morning', 'thursday afternoon', 'thursday night', 'friday morning', 'friday afternoon', 'friday night',
                   'saturday morning', 'saturday afternoon', 'saturday night']
gym_categories = ['arc', 'pippen', 'mesa']

physical_encoded = []
date_encoded = []
gym_encoded = []

def create_encoded_list(all_rows: 'database query'):
    for row in result:
        phys = row[4]
        date = row[5]
        gym = row[6]
        phys_encoded = [1 if x in phys else 0 for x in physical_categories]
        physical_encoded.append(phys_encoded)

        date_encode = [1 if x in date else 0 for x in date_categories]
        date_encoded.append(date_encode)

        gym_encode = [1 if x in gym else 0 for x in gym_categories]
        gym_encoded.append(gym_encode)

create_encoded_list(result)

phys_math = np.array(physical_encoded)
date_math = np.array(date_encoded)
gym_math = np.array(gym_encoded)


phys_similarity_matrix = cosine_similarity(phys_math)
date_similarity_matrix = cosine_similarity(date_math)
gym_sim_matrix = cosine_similarity(gym_math)
#print(phys_similarity_matrix[1])
# print()
# print()
# print(date_similarity_matrix)
# print()
# print()
# print(gym_sim_matrix)
# print()
# print()


def find_similar_phys_interests(email: 'str') -> list[str]:
    person_being_matched_index = None
    for i in range(len(result)):
        if result[i][1] == email:
            person_being_matched_index = i
    #print(person_being_matched_index)
    

    #print(phys_similarity_matrix[person_being_matched_index])
    new_list = list(i for i in range(len(phys_similarity_matrix[person_being_matched_index])))
    most_similar = heapq.nlargest(5, zip(phys_similarity_matrix[person_being_matched_index], new_list))

    similar_people_index_list = []
    for person in most_similar:
        if person[1] != person_being_matched_index and len(similar_people_index_list) < 3:
            similar_people_index_list.append(person[1])

    emails = []
    for index in similar_people_index_list:
        emails.append(result[index][1])
    
    return emails

matching_phys_interest = find_similar_phys_interests('aagrawal05@uci.edu')
print(matching_phys_interest)
