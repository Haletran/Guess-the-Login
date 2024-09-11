function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    // VARIABLES
    const img = document.getElementById("img");
    const box = document.getElementById("input");
    const pass = document.getElementById("pass");
    const scoreValue = document.getElementById("scoreValue");
    const easteregg = document.getElementById("eastervalue");
    let scoreCounter = 0;
    let eastereggCounter = 0;
    let already_found = [];

    // Get a random user from the db and pass it to the box
    function updateRandomUser() {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomImg = data[randomIndex].image_url_medium;
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
    pass.addEventListener("click", () => {
      box.setAttribute("aria-invalid", "");
      box.value = "";
      console.log(currentLogin); // need to render this in the frontend
      currentLogin = updateRandomUser();
      if (scoreCounter > 0) {
        scoreCounter--;
        scoreValue.textContent = scoreCounter;
      }
    });

    // EASTER EGG check and alert
    // CHANGE THEM TO YOUR LIKING
    function check_easteregg(login) {
      if (login === "bapasqui" && !already_found.includes("bapasqui")) {
        eastereggCounter++;
        alert("Oui c'est moi !");
        already_found.push("bapasqui");
      } else if (
        login == "motherlode" &&
        !already_found.includes("motherlode")
      ) {
        eastereggCounter++;
        scoreCounter = 9999999;
        alert("INFINITE SCORING !");
        already_found.push("motherlode");
      } else if (login == "42" && !already_found.includes("42")) {
        eastereggCounter++;
        alert("42");
        already_found.push("42");
      }
      if (eastereggCounter == 3 && !already_found.includes("3")) {
        alert("You found all the easter eggs ! Congrats !");
        already_found.push("3");
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

document.getElementById("start").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("game")).forEach(
    function (element) {
      element.style.display = "block";
    },
  );
  document.getElementById("start").style.display = "none";
});
