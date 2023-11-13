// Imported Modules
import "./abstracts/accessbility.js";
import { logout } from "./auth/authorization.js";
import { addFillersText, toggleDropdonw } from "./abstracts/helpers.js";
import { createLightbox } from "./components/popups.js";
import { changeFontsize, defaultFontSize, togglePageTheme } from "./abstracts/styles.js";
import { getUserImg } from "./markup/posts.js";

// Global Variables For All The Pages
window.pagePathName =
  window.location.pathname.match(/(?<!^)\/.*/) ?
    window.location.pathname.match(/(?<!^)\/.*/)[0] :
    window.location.pathname;
window.currentUserData = JSON.parse(
  localStorage.getItem("postItUserData")
);

// Functions
(function handlePageLoad() {

  handleRouting();
  applyPreferedSettings();

  document.addEventListener("click", handleDocumentClickEvent);

})();

function handleRouting() {

  if (currentUserData) { // If the user is logged in

    // If they try to navigate to the "Signup" or "Login" pages
    if (getCurrentPath() === 0)
      window.location.assign("./home.html"); // Send them to the "Home" page

    handleLoginState();

  }

  else {

    if (getCurrentPath() === 1)
      window.location.assign("./login.html");

  }

}

function getCurrentPath() {

  if (
    pagePathName === "/login.html" ||
    pagePathName === "/index.html" ||
    pagePathName === "/"
  )
    return 0;
  else
    return 1;

}

function handleLoginState() {

  const nameOfUser = pagePathName === "/home.html"
    ? currentUserData["name"].
      substr(0, currentUserData["name"].indexOf(" "))
    : currentUserData["name"]

  addCurrentUserImg();
  addFillersText(
    document,
    {
      name: nameOfUser,
      username: currentUserData["username"],
      email: currentUserData["email"]
    }
  );

  document.getElementById("logout-btn")
    .addEventListener("click", logout);

}

function handleDocumentClickEvent(clickEvent) {

  const clickedElement = clickEvent.target;
  const elementClassList = clickedElement.classList;

  if (elementClassList.contains("js-dropdown-toggler"))
    toggleDropdonw.call(clickedElement);
  else if (elementClassList.contains("js-lightbox-opener"))
    createLightbox.call(clickedElement);

}

function applyPreferedSettings() {

  if (!localStorage.getItem("postItUserPreferences")) {

    localStorage.setItem(
      "postItUserPreferences",
      JSON.stringify({
        fontSize: defaultFontSize,
        darkTheme: window.matchMedia(
          "(prefers-color-scheme: dark)"
        )
          .matches,
      })
    );

  }

  togglePageTheme();
  changeFontsize();

}

function addCurrentUserImg() {

  if (currentUserData) {

    const currentUserImg = getUserImg(currentUserData, "");

    const userImgContainers = document.querySelectorAll(".js-current-user-img");
    for (let userImgContainer of userImgContainers) {
      userImgContainer.appendChild(currentUserImg.cloneNode(true));
    }

  }

}