// Imported Modules
import "./abstracts/accessbility.js";
import { logout } from "./auth/authorization.js";
import { addFillersText, toggleDropdonw } from "./abstracts/helpers.js";
import { HeaderWhenLogged, HeaderWhenNotLogged, Footer, AccessibilityElements } from "./components/webComponents.js"
import { createLightbox } from "./components/popups.js";
import { changeFontsize, defaultFontSize, togglePageTheme } from "./abstracts/styles.js";
import { getUserImg } from "./markup/posts.js";

// Global Variables For All The Pages
window.pagePathName = window.location.pathname;
window.currentUserData = JSON.parse(
  localStorage.getItem("postItUserData")
);

// Functions
(function handlePageLoad() {

  handleRouting();
  defineCustomElements();
  applyPreferedSettings();

  document.addEventListener("click", handleDocumentClickEvent);

})();

function handleRouting() {

  if (currentUserData) { // If the user is logged in

    // If they try to navigate to the "Signup" or "Login" pages
    if (getCurrentPath() === 0)
      window.location.assign("./home.html"); // Send them to the "Home" page

    customElements.define("site-header", HeaderWhenLogged);
    handleLoginState();

  }

  else {

    if (getCurrentPath() === 1)
      window.location.assign("./login.html");

    customElements.define("site-header", HeaderWhenNotLogged);
  }

}

function getCurrentPath() {

  console.log(pagePathName)
  if (
    pagePathName === "/login.html" ||
    pagePathName === "/index.html" ||
    pagePathName === "/"
  )
    return 0;
  else
    return 1;

}

function defineCustomElements() {

  customElements.define("site-footer", Footer);
  customElements.define("accessibility-elements", AccessibilityElements);

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