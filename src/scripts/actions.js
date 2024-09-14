document.getElementById("start").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("game")).forEach(
    function (element) {
      element.style.display = "block";
    },
  );
  document.getElementById("start").style.display = "none";
  document.getElementById("settings").style.display = "none";
});

document.getElementById("settings").addEventListener("click", function () {
  document.getElementById("start").style.display = "none";
  document.getElementById("settings").style.display = "none";
  Array.from(document.getElementsByClassName("settings_box")).forEach(
    function (element) {
      element.style.display = "block";
    },
  );
});

document.getElementById("save").addEventListener("click", function () {
  //delete old cookie
  localStorage.removeItem("db");
  localStorage.setItem("db", document.getElementById("db").value);
  // reload the page to get the new db
  location.reload();
  document.getElementById("start").style.display = "";
  document.getElementById("settings").style.display = "";
  Array.from(document.getElementsByClassName("settings_box")).forEach(
    function (element) {
      element.style.display = "none";
    },
  );
});

document.addEventListener("keydown", async (e) => {
  if (e.key === "ArrowLeft") {
    Array.from(document.getElementsByClassName("game")).forEach(
      function (element) {
        element.style.display = "none";
      },
    );
    document.getElementById("start").style.display = "";
    document.getElementById("settings").style.display = "";
    Array.from(document.getElementsByClassName("settings_box")).forEach(
      function (element) {
        element.style.display = "none";
      },
    );
  }
});
