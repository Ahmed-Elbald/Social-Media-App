import { Dialogs, GlobalDialogs, createDialog, showPopup } from "../components/popups.js";
import {
  showPageContent,
  changeFontsize,
  getUserPreferences,
  togglePageTheme,
  setUserPreferences,
  defaultFontSize,
  fontSizeOffset
} from "../abstracts/styles.js";

showPageContent();

// Elements
const AccountDataModifiers = document.querySelectorAll(".js-account-data-modifier");
const themeToggler = document.getElementById("theme-toggler");
const themeTogglerLabel = themeToggler.parentElement.querySelector("label");
const fontsizeModifier = document.getElementById("fs-modifier");

// Event Listeners
AccountDataModifiers.forEach(
  btn => btn.addEventListener("click", modifyAccountData)
);
themeToggler.addEventListener("change", handleThemeToggling);
fontsizeModifier.addEventListener("input", handleFontChange);

// Functions
(function handleSettingsPageLoading() {

  toggleThemeModifier();
  fontsizeModifier.value = getUserPreferences()["fontSize"];

})();

function modifyAccountData() {

  let btnAction = this.getAttribute("data-action");

  if (GlobalDialogs[btnAction]) {
    showPopup(GlobalDialogs[btnAction]);
    return;
  }

  GlobalDialogs[btnAction] = createDialog(
    Dialogs[btnAction],
    function () {
      GlobalDialogs[btnAction] = null;
      return true
    }
  );

  // switch (btnAction) {
  //   case "passwordEdit": {
  //     return;
  //   }
  //   case "usernameEdit": {
  //     return;
  //   }
  //   case "emailEdit": {
  //     return;
  //   }
  // }

}

function handleThemeToggling() {

  setUserPreferences("darkTheme", !getUserPreferences()["darkTheme"]);
  togglePageTheme();
  toggleThemeModifier();

}

function handleFontChange() {

  setUserPreferences("fontSize", fontsizeModifier.value);
  changeFontsize();

}

function toggleThemeModifier() {

  const darkTheme = getUserPreferences()["darkTheme"];

  themeTogglerLabel.setAttribute(
    "data-toggle",
    darkTheme
  );

  themeToggler.checked = darkTheme

}


fontsizeModifier.setAttribute("min", String((defaultFontSize - fontSizeOffset)));
fontsizeModifier.setAttribute("max", String((defaultFontSize + fontSizeOffset)));