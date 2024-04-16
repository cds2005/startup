function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    localStorage.setItem("username", nameEl.value);
    localStorage.setItem("password",passEl.value)
    window.location.href = "game.html";
}
   