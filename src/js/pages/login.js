// Preload
showPageContent();

// Imported
import { validateFormData } from "../auth/formValidation.js";
import { showPageContent, animateSubmitBtn } from "../abstracts/styles.js";
import { makeRequest, getRequestURL } from "../auth/requests.js";
import { logUserIn } from "../auth/authorization.js";

// Elements
const loginForm = document.getElementById("login-form");

// Event Listeners
loginForm.addEventListener("submit",
  (submitEvent) => handleLogin(submitEvent));


// Functions
async function handleLogin(submitEvent) {

  submitEvent.preventDefault();

  // Validate the form first
  if (!validateFormData(loginForm))
    return;

  // Animating while waiting for the server response
  animateSubmitBtn(loginForm);

  // Send the request after validation
  const userData = await makeRequest(
    {
      method: "POST",
      url: getRequestURL("login"),
      headers: {},
      body: new FormData(loginForm)
    }
  );

  if (userData)
    logUserIn(userData)

  animateSubmitBtn(loginForm);

}
