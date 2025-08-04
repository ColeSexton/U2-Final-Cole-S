# U2-Final-Cole-S

# Cole's Creative Services
This React web application was built to promote creativity and music. I'm a musician and audio engineer, and my goal is to help others enjoy music, whether by listening to it or creating it. This app provides a few ways to do both.

The main feature is a form where users can request a custom song. It prints back their answers in real time, lets them submit, edit, and delete the form, and confirms their personal information. All of the data is saved in a MySQL database so I can use it to write songs.

To help spark creativity, there’s also a Generator component that gives users general creative advice based on a selected category. For those who want to experiment with making sounds, there’s a Synth component made up of two playable synthesizers. Users can play with oscillators, sound waves, and signal processing to create unique sounds.

Finally, I’ve included links throughout the site to music by me and my friends, if you're looking to discover something new.



## Technologies Used:
- React
- JavaScript
- CSS
- HTML
- Java (Spring Boot)
- MySQL



## Running the App Locally
This project isn’t deployed publicly yet, but you can run it on your machine.

### What You’ll Need

- Visual Studio Code (for the React frontend)
- IntelliJ Community Edition (for the Spring Boot backend)
- MySQL (for the database)
- Node.js and npm (to run the frontend and install Vite)

### Setup
1. Fork and Clone this Repository 
2. Backend Setup
   - Open the U2-Final-Backend folder in IntelliJ.
   - In MySQL, create a schema named: unit2_final

   - Open application.properties in the backend folder and update the database username and password with your local MySQL credentials.
   - Run the main Java class (U2FinalApplication.java) to start the backend server.
   
4. Frontend Setup
   - Open the U2-Final-Frontend folder in Visual Studio Code.
   - Install the dependencies: npm install
   - If you don’t already have Vite installed globally, install it: npm install vite@latest
   - then: npm run dev
   - Open http://localhost:5173 in your browser



Wireframe: https://wireframe.cc/pro/edit/906393

ER Diagram: https://drive.google.com/drive/u/0/folders/1nYWzB7bJWcYm86FFgS9_NNLu6zDjbG4q



## Future Plans:
There are a number of features I’d like to build next:

- A blog section to post updates and ideas
- A stage plot designer for live music setups
- More downloadable or in-browser instruments
- A way to record audio from the synths and bounce it into a .wav file

I’ve already started laying the groundwork for synth recording, and that will likely be the next feature I finish. The goal is to let users save what they create and store it in the database along with their form submission.


Thanks for checking out my project! 
