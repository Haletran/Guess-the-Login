// fetch the db to find img and login
// rename the link of the image so that you can access the login

// render the image
// make it correspond to the box to find the user

// SCORING SYSTEM
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    const img = document.getElementById("img");
    const box = document.getElementById("input");
    const pass = document.getElementById("pass");
    const scoreValue = document.getElementById("scoreValue");

    let scoreCounter = 0;

    function updateRandomUser() {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomImg = data[randomIndex].image_url_medium;
      const randomLogin = data[randomIndex].login;

      img.src = randomImg;
      return randomLogin;
    }

    let currentLogin = updateRandomUser();
    console.log(currentLogin);

    pass.addEventListener("click", () => {
      box.setAttribute("aria-invalid", "");
      currentLogin = updateRandomUser();
      if (scoreCounter > 0) {
        scoreCounter--;
        scoreValue.textContent = scoreCounter;
      }
    });
    box.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
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
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
