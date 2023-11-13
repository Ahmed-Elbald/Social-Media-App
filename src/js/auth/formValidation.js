import { sendMessageToAT } from "../abstracts/accessbility.js";

// Global Variables
const regularExpressions = {
  username: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}


export const errorMsgs = {
  emptyInput: "This field must not be empty",
  username: `Username must contain at least one letter and one number, e.g. user123`,
  password: `Password must be in the range of 6 to 16 characters.\
              It must also contain at least one letter, one number and one special character, e.g. @userpass123`,
  passwordsMatch: "Password and password confirmation don't match",
  email: `Invalid email pattern.`,
}

// Functions
export function validateFormData(form) {

  // Get all form controls
  const formControls = form.querySelectorAll("input:not(:is([type='file'], [type='checkbox'])), textarea");

  for (let formControl of formControls) {

    let formControlParent = formControl.closest(".c-input-group");
    let inputNotRequired = formControl.hasAttribute("data-not-required");
    let validationKey = formControl.dataset["validationKey"];
    let inputValue = formControl.value;

    // If the input is not required
    if (inputNotRequired)
      continue

    // If the input valud if input
    if (inputValue === "") {
      handleInvalidInput(formControl, formControlParent, "emptyInput");
      return;
    }

    // If the input valud doesn't match its regular expression
    const regExp = regularExpressions[validationKey];
    if (regExp && !regExp.test(inputValue)) {
      handleInvalidInput(formControl, formControlParent, validationKey);
      return;
    }

    // The input is valid
    formControlParent.classList.remove("js-not-valid");

  }

  // All inputs are valid
  return true;
}

function handleInvalidInput(formControl, formControlParent, validationKey) {

  // Put focus on the invalid input
  formControl.focus();

  // Get the error message
  const errorMessage = errorMsgs[validationKey];

  // Show it to sighted users
  formControlParent.style.setProperty("--errorMessage", JSON.stringify(errorMessage));
  formControlParent.classList.add("js-not-valid");

  // Show it to users with visual impairments
  setTimeout(() => {
    sendMessageToAT(
      `
      invalid \
      ${validationKey === "emptyInput" ? "Input" : validationKey}: \
      ${errorMessage}
      `,
      true
    );
  }, 100)


  // Dismiss the error message when the user clicks anywhere
  setTimeout(() => document.addEventListener("click", removeErrorMsg));
  function removeErrorMsg() {
    formControlParent.classList.remove("js-not-valid");
    document.removeEventListener("click", removeErrorMsg);
  }

}

export function createErrorMessage(errorMessage) {

  let errorMessageElement = document.querySelector(".js-error-msg");

  // If any errors were printed before
  // then there's already an element to print the current error
  if (errorMessageElement) {

    errorMessageElement.querySelector("p")
      .textContent = errorMessage

  } else { // Otherwise, we'll create a new element to show the message

    errorMessageElement = document.createElement("p");
    errorMessageElement.className = "c-error-message js-error-msg";
    errorMessageElement.innerHTML =
      `
    <button type="button">
      <i class="bi bi-x" aria-hidden="true"></i>
      <span class="u-sr-only">
        close popup message
      </span>
    </button>
    <p>
      ${errorMessage}
    </p>
    `;

    // If the closing button was clicked
    // remove the error message
    errorMessageElement.querySelector("button")
      .addEventListener("click", removeErrorMsg);

    document.body.prepend(errorMessageElement);
  }



  // Notify users with visual impairments of the message
  sendMessageToAT(
    "Sorry, " + errorMessage,
    true
  );
  // Show the message
  setTimeout(
    () => errorMessageElement.classList.add("js-show-up"),
    100
  );

  // Remove it after four seconds
  setTimeout(
    removeErrorMsg,
    4000
  );

  function removeErrorMsg() {
    errorMessageElement.classList.remove("js-show-up")
  }

}