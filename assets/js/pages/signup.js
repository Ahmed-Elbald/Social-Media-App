// Imported
import { animateSubmitBtn, showPageContent } from "../abstracts/styles.js";
import { createErrorMessage, errorMsgs, validateFormData } from "../auth/formValidation.js";
import { makeRequest, getRequestURL } from "../auth/requests.js";
import { logUserIn } from "../auth/authorization.js";
import { createPopup } from "../components/popups.js";
import { getLightboxMarkup } from "../markup/popups.js";

showPageContent();

// Global Variables
const signupRequestBody = new FormData();

// Elements
const signupForm = document.getElementById("signup-form");
const profileImgInputContainer = document.getElementById("profile-img-input");
const profileImgInput = profileImgInputContainer.querySelector("input");
const profileImgRemover = profileImgInputContainer.querySelector("button");
const inputHints = document.querySelectorAll(".js-input-hint");

// Event Listeners
signupForm.addEventListener("submit", handleSignup);
profileImgInput.addEventListener("change", displayProfileImg);
profileImgRemover.addEventListener("click", removeSelectedImg);

// Functions
(function handleSignupPageLoad() {

  fillInputHints();

})();

function fillInputHints() {

  inputHints.forEach(hint => {
    hint.textContent = errorMsgs[hint.dataset["hintKey"]];
  });

}

async function handleSignup(submitEvent) {

  submitEvent.preventDefault();

  // Validate the form first
  if (!validateFormData(signupForm))
    return;

  const formData = new FormData(signupForm);

  // Checking if passwords match
  const password = formData.get("password");
  if (password !== formData.get("password-confirmation")) {
    createErrorMessage(
      "passwords don't match"
    );
    return;
  }

  // Animating while waiting for the server response
  animateSubmitBtn(signupForm);

  // Build the request after validation
  signupRequestBody.append("name", formData.get("firstname") + " " + formData.get("lastname"));
  signupRequestBody.append("username", formData.get("username"));
  signupRequestBody.append("email", formData.get("email"));
  signupRequestBody.append("password", password);
  // Sending request
  const userData = await makeRequest({
    method: "POST",
    url: getRequestURL("signup"),
    action: "signup",
    headers: {},
    body: signupRequestBody
  });

  if (userData) // If the request succeed
    logUserIn(userData); // Log in
  else
    animateSubmitBtn(signupForm);

}

function displayProfileImg() {

  // Adding file to the request
  const imgFile = profileImgInput.files[0];
  signupRequestBody.append("image", imgFile);

  // Showing the selected image in a lightbox
  const imgElement = document.createElement("img");
  imgElement.src = URL.createObjectURL(imgFile);
  setTimeout(() => createPopup(
    getLightboxMarkup(imgElement),
    true
  ), 250)

  // Displaying image name
  profileImgInputContainer
    .setAttribute("data-img-name", imgFile.name);

}

function removeSelectedImg() {

  signupRequestBody.delete("image");
  profileImgInput.value = "";

  profileImgInputContainer
    .setAttribute("data-img-name", "");

}