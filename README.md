# ZotGym

**Inspiration** 

As students who sometimes go to the gym alone, I’ve often thought about how better it would be to have a gym buddy—someone who could motivate me and push me to challenge myself, especially when striving to break my personal records. Additionally, we’ve found it difficult to organize or join team sports like basketball, badminton, soccer, and more, due to the challenge of finding others who share the same interests and have matching schedules. These experiences motivated us to develop Zot GymMates, a solution designed to connect people with similar fitness goals and time availability, making it easier to build a supportive and active gym community in UCI.

**What it does**

Zot GymMates is a web application designed to connect peers by recommending workout partners based on matching schedules and shared sports interests. From the provided recommendations, users can select their preferred partners and easily reach out to them using the built-in messaging system within the application. 

**How we built it**

We used a combination of Flask and Python for our backend with NextJS and React for our frontend. We used a local database file and sqlite3 for our data management and querying. For the recommendation algorithm, we implemented cosine similarity after one-hot encoding vectors representing a user’s workout interests, preferred workout times, and preferred workout locations. The front end design was first prototyped on Figma and then translated into React and Tailwind CSS. The chat aspect was built on Python’s Websockets library, where a client sends a message to the server, which then emits the message to the other client to simulate real-time communication.

**Challenges we ran into **

One of the biggest challenges was figuring out how to implement the chat application. We first attempted to use SocketIO in Javascript and combine it with Flask, but ran into a ton of errors, including CORS disabling us from sending messages or properly connecting to the server. It was made much easier after switching to pure python and using the websockets library.


**Accomplishments that we’re proud of**

- Building a chat application
- Developing a responsive and user-friendly website
- Designing a simple but visually appealing front-end
- Incorporating advanced functionalities
- Considering secure authentication



**What we learned**

Throughout the three days, we learned that collaboration, teamwork, and effective communication are the most essential skills needed to achieve outstanding results. These skills allowed us to align our efforts, overcome challenges, and work efficiently toward a shared goal.


**What’s next for Zot GymMates**

In addition to matching gym buddies, we plan to extend Zot GymMates by implementing new features that match users with study mates, lunch mates, and more. These enhancements aim to foster connections across various aspects of campus life making it easier for students to find peers and build a strong sense of community. 







