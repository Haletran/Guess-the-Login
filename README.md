# Guess the Login

A straightforward 'Guess Who?' game where the objective is to identify the user's login based on their profile picture.<br>
This project was developed as part of the bonus of the ```Inception``` project from 42. [link to my inception](https://github.com/Haletran/42_Inception)
<p>=> Try it  <a href="https://classement-42angouleme.onrender.com/game">here</a> <=</p>

## Stack

  - Backend: Node.js with ```Express``` server
  - Frontend: Basic HTML and JavaScript
  - CSS Framework: [Pico CSS](https://picocss.com/) for a minimalist and responsive design


## Installation and Setup

To get started, clone the repository:
```bash
git clone https://github.com/Haletran/Guessthe42Login.git && cd Guessthe42Login
```

Dependencies:
- ```nodejs```
- ```npm```
- ```express```

You also need the db of all the users, I've choose to put my DB in a simple ```.json``` file. <br>
The file should be called ```db.json``` and put into the ```src``` folder.<br><br>
The formatting for the ```DB``` should be like this to make this work :

```sql
[
  {
    "image_url_medium": <profile-picture>,
    "login": <user-login>,
  },
  {
    "image_url_medium": <profile-picture>,
    "login": <user-login>,
  }
]

```


To install the dependencies and start the server:
```bash
npm install && node server.js
```

Open your web browser and navigate to ```http://localhost:3000``` to start playing.

## License 

This project is licensed under the [MIT License](LICENSE)


