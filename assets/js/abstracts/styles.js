// Global Variables
export const defaultFontSize = 55;
export const fontSizeOffset = 15;

export function showPageContent() {

  // Show the content of the page
  document.body.setAttribute("data-content", "loaded");
}

export function animateSubmitBtn(form) {

  // Add animation to the button while using for the server response
  form.querySelector("button[type='submit']")
    .classList.toggle("js-checking")

}

export function adjustExpandalbeInput(expandableInput) {
  // A function to create an expandable input

  const expandableInputControl = expandableInput.querySelector("textarea");
  const expandableInputSpan = expandableInput.querySelector("span");

  expandableInputControl.addEventListener(
    "input",
    (inputEvent) => {
      expandableInputSpan.textContent = expandableInputControl.value;
      if (inputEvent.inputType === "insertLineBreak")
        expandableInputSpan.innerHTML += "<br>"
    }
  )

}

export function getUserPreferences() {

  return JSON.parse(localStorage.getItem("postItUserPreferences"))

}

export function setUserPreferences(key, value) {

  let userPreferences = getUserPreferences();
  userPreferences[key] = value;

  localStorage.setItem("postItUserPreferences", JSON.stringify(userPreferences))

}

export function togglePageTheme() {

  document.documentElement.setAttribute(
    "data-dark-theme",
    getUserPreferences()["darkTheme"]
  );

}

export function changeFontsize() {

  let fontSize = getUserPreferences()["fontSize"];

  let fsFactor = (fontSize / defaultFontSize).toPrecision(5);

  document.documentElement.style.setProperty("--fs-factor", fsFactor);

}
