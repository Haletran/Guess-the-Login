function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get wich db to fetch with the cookie

let url;
const db = localStorage.getItem("db");
console.log(db);
if (db == "PISCINE") {
  url = "../db/pool.json";
} else if (db == "ALL") {
  url = "../db/all.json";
} else if (db == "2023") {
  url = "../db/2023.json";
} else if (db == "2022") {
  url = "../db/2022.json";
} else {
  url = "../db/all.json";
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // VARIABLES
    const img = document.getElementById("img");
    const box = document.getElementById("input");
    const pass = document.getElementById("pass");
    const name = document.getElementById("name");
    const scoreValue = document.getElementById("scoreValue");
    const easteregg = document.getElementById("eastervalue");
    let scoreCounter = 0;
    let eastereggCounter = 0;
    let easter_found = [];
    let already_found = [];

    // Get a random user from the db and pass it to the box
    function updateRandomUser() {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomImg = data[randomIndex].image_url_medium;
      const oldLogin = data[randomIndex].login;
      const randomLogin = data[randomIndex].login;

      // encode the img url in base64
      fetch(randomImg)
        .then((response) => response.blob())
        .then((images) => {
          var outside = new FileReader();
          outside.onloadend = function () {
            img.src = outside.result;
          };
          outside.readAsDataURL(images);
        });
      return randomLogin;
    }

    let currentLogin = updateRandomUser();

    // PASS the current login but lose a point
    pass.addEventListener("click", async () => {
      box.setAttribute("aria-invalid", "");
      box.value = "";
      img.style.filter = "blur(5px)";
      name.style.display = "block";
      name.textContent = currentLogin;
      await sleep(350);
      currentLogin = updateRandomUser();
      await sleep(50);
      img.style.filter = "blur(0px)";
      name.style.display = "none";
      if (scoreCounter > 0) {
        scoreCounter--;
        scoreValue.textContent = scoreCounter;
      }
    });

    // EASTER EGG check and alert
    // CHANGE THEM TO YOUR LIKING
    function check_easteregg(login) {
      if (login === "bapasqui" && !easter_found.includes("bapasqui")) {
        eastereggCounter++;
        alert("Oui c'est moi !");
        easter_found.push("bapasqui");
      } else if (
        login == "motherlode" &&
        !easter_found.includes("motherlode")
      ) {
        eastereggCounter++;
        scoreCounter = 9999999;
        alert("INFINITE SCORING !");
        easter_found.push("motherlode");
      } else if (login == "42" && !easter_found.includes("42")) {
        eastereggCounter++;
        alert("42");
        easter_found.push("42");
      }
      if (eastereggCounter == 3 && !easter_found.includes("3")) {
        alert("You found all the easter eggs ! Congrats !");
        easter_found.push("3");
      }
      easteregg.textContent = eastereggCounter;
    }

    // ENTER the login and check if it's correct
    box.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        check_easteregg(e.target.value);
        if (e.target.value === currentLogin) {
          scoreCounter++;
          scoreValue.textContent = scoreCounter;
          box.setAttribute("aria-invalid", "false");
          await sleep(150);
          e.target.value = "";
          box.setAttribute("aria-invalid", "");
          already_found.push(currentLogin);
          currentLogin = updateRandomUser();
        } else {
          box.setAttribute("aria-invalid", "true");
          box.classList.add("shake");
          setTimeout(() => box.classList.remove("shake"), 300);
          box.value = "";
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error de db", error);
  });
