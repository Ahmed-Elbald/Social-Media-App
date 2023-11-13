// Imported
import {
  getActionAreaMarkup,
  getDialogMarkup, getLightboxMarkup
} from "../markup/popups.js"
import { adjustExpandalbeInput } from "../abstracts/styles.js";
import { validateFormData } from "../auth/formValidation.js";


// Global Variables
let lastFocusedElement;
export const Dialogs = {

  "postCreation": {
    purpose: "prompt",
    removeAfterClose: false,
    label: "Create a new post",
    textContent: {
      heading: "new post",
      actionBtn: `<span class="u-sr-only">Submit your</span> post`,
    },

    contentMarkup: "NewPostFormMarkup",

  },

  "postUpdate": {
    purpose: "prompt",
    removeAfterClose: false,
    label: "Edit your post",
    textContent: {
      heading: "Edit post",
      actionBtn: `Edit <span class="u-sr-only">your post</span>`,
    },

    contentMarkup: "NewPostFormMarkup",

  },

  "commentCreation": {
    purpose: "prompt",
    label: "Create a new comment",
    removeAfterClose: false,
    textContent: {
      heading: "new comment",
      actionBtn: `<span class="u-sr-only">Submit your</span> comment`,
    },

    contentMarkup: "newCommentFormMarkup",

  },

  "passwordEdit": {
    purpose: "prompt",
    removeAfterClose: false,
    label: "Change your accout password",
    textContent: {
      heading: "change password",
      actionBtn: `change <span class="u-sr-only"> your password</span>`,
    },

    contentMarkup: "passwordChangeFormMarkup",

  },

  "usernameEdit": {
    purpose: "prompt",
    removeAfterClose: false,
    label: "Change your password",
    textContent: {
      heading: "change username",
      actionBtn: `change <span class="u-sr-only"> your username</span>`,
    },

    contentMarkup: "usernameChangeFormMarkup",

  },

  "emailEdit": {
    purpose: "prompt",
    removeAfterClose: false,
    label: "Change your accout email",
    textContent: {
      heading: "change email",
      actionBtn: `change <span class="u-sr-only"> your email</span>`,
    },

    contentMarkup: "emailChangeFormMarkup",

  },

  "deletePost": {
    purpose: "confirm",
    removeAfterClose: true,
    label: "Delete the post",
    actionBtnType: "accent",
    textContent: {
      heading: "Delete post",
      actionBtn: "Delete",
    },

    contentMarkup: "postDeleteFormMarkup"
  },

  "hidePost": {
    purpose: "confirm",
    removeAfterClose: true,
    label: "Hide the post",
    actionBtnType: "accent",
    textContent: {
      heading: "Hide post",
      actionBtn: "Hide",
    },

    contentMarkup: "postHideFormMarkup"
  },

  "showPostComments": {
    purpose: "present",
    label: "Post comments",
    removeAfterClose: false,
    textContent: {
      heading: "comments",
    },

    contentMarkup: "postCommentsMarkup"
  }

}
export const GlobalDialogs = {
  newPost: null,
  passwordEdit: null,
  usernameEdit: null,
  changeEmailEdit: null,
}

// Functions
export function createPopup(popupContent, remove) {

  // Creating the popup
  const popup = document.createElement("div");
  popup.className = "c-popup-frame";
  popup.tabIndex = 0;
  popup.setAttribute("data-remove", remove ?? true)
  popup.innerHTML =
    `
    <div class="c-popup__inner l-container" data-width="narrow">
      ${popupContent}
    </div>
    `;

  showPopup(popup);

  return popup;

}

export function createLightbox() {

  // Get the image to display
  const lightboxTargetedElement =
    document.querySelector(
      `[data-img-id="${this.getAttribute("data-target")}"]`
    );

  // Create a lightbox for the image
  createPopup(
    getLightboxMarkup(lightboxTargetedElement)
  );

}

export function createDialog(dialogData, actionFunc) {

  const dialog = createPopup(
    getDialogMarkup(dialogData),
    dialogData["removeAfterClose"]
  );

  // Handling accessibility
  dialog.role = "dialog"
  dialog.ariaLabel = dialogData["label"];
  dialog.setAttribute("data-requires-update", "");

  // If the form contains expandable inputs, adjust them
  dialog.querySelectorAll(".js-expandable-input")
    ?.forEach(input => adjustExpandalbeInput(input));

  handleDialogSubmit(dialog, dialogData, actionFunc)

  return dialog;

}

async function handleDialogSubmit(dialog, dialogData, actionFunc) {
  // The function is duty is to:
  //  1- Change the sutructure of the dialog based on its pupose
  //  2- Add event listeners to elements that invoke the dialog's functionality
  //  3- Add the last touches after closing the dialog

  const dialogPurpose = dialogData["purpose"]

  let dialogActionBtn;;

  if (dialogPurpose === "confirm") {

    dialog.querySelector(".js-dialog-content")
      .insertAdjacentHTML("afterend", getActionAreaMarkup(dialogData));

    dialogActionBtn = dialog.querySelector(".js-action-btn");

    dialog.querySelector(".js-action-btn")
      .addEventListener("click", async () => {

        dialogActionBtn.classList.add("js-checking");
        let processResult = await actionFunc();
        finalize(processResult)

      })

  }

  else if (dialogPurpose === "prompt") {

    const dialogForm = dialog.querySelector("form");
    dialogForm.insertAdjacentHTML("beforeend", getActionAreaMarkup(dialogData));

    dialogActionBtn = dialog.querySelector(".js-action-btn");

    dialogForm.addEventListener("submit", async (submitEvent) => {

      submitEvent.preventDefault();

      // Validate the form
      if (!validateFormData(dialogForm))
        return;

      dialogActionBtn.classList.add("js-checking");
      let processResult = await actionFunc(new FormData(dialogForm));
      finalize(processResult)

    })

  }

  function finalize(processResult) {

    if (processResult) {

      // Remove any existent error message
      document.querySelector(".js-error-msg")?.remove();
      // Close the popup
      closePopup(dialog, true);

    }
    else
      dialogActionBtn.classList.remove("js-checking");

  }

}

export function showPopup(popup) {

  // Capturing the element focused before opening the popup
  lastFocusedElement = document.activeElement;

  // Add popup to the page
  document.body.insertAdjacentElement("beforeend", popup);

  // Show popup
  popup.style.removeProperty("display");

  setTimeout(() => {

    popup.classList.add("js-show-up");

    // Popup accessibility (If it's created for the first time)
    handlePopupAccessibility(popup);

  });

}

function handlePopupAccessibility(popup) {

  // Add focus state to the appropriate button
  const popupDismissBtns = popup.querySelectorAll(".js-close-popup");
  const autofocusBtn = popup.querySelector("[data-focus]");

  // If there's an element with autofocus in the popup
  if (autofocusBtn)
    autofocusBtn.focus();
  else
    popupDismissBtns[0].focus();

  // Adding eventListeners
  popup.addEventListener("mousedown", handlePopupMousedownEvent);
  popup.addEventListener("keydown", handleKeydownEvent);
  popupDismissBtns.forEach(
    btn => btn.addEventListener("click", () => closePopup(popup))
  );

}

function handlePopupMousedownEvent(clickEvent) {

  if (!this.classList.contains("js-show-up"))
    return;

  const clickedElement = clickEvent.target;

  // If it's a right click
  if (clickEvent.which === 3 || clickEvent.button === 2) {
    return;
  }

  // If the user clicks somewhere outside the popup's main content
  const popupInner = this.querySelector(".c-popup__inner");
  if (
    !popupInner.isSameNode(clickedElement) &&
    !popupInner.contains(clickedElement)) {
    closePopup(this);
    return;
  }

}

function handleKeydownEvent(keydownEvent) {

  // If the "ESCAPE" button is clicked
  if (keydownEvent.key === "Escape" || keydownEvent.keyCode === 27) {
    closePopup(this);
    return;
  }

  // If the "TAB" button is clicked, make sure to keep the focus trapped into the popup
  else if (keydownEvent.key === "Tab" || keydownEvent.keyCode === 9) {

    const focusableElements = this.querySelectorAll("button, input, a");
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (keydownEvent.shiftKey) {

      if (activeElement.isSameNode(firstFocusableElement)) {
        keydownEvent.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
      }

    } else {

      if (activeElement.isSameNode(lastFocusableElement)) {
        keydownEvent.preventDefault();
        focusableElements[0].focus();
      }

    }
  }
}

export function closePopup(popup, forceRemove) {

  // Hide popup
  popup.classList.remove("js-show-up");
  popup.addEventListener("transitionend", handleTransitionEnd);

  // Return focus to the last focused element beofre the popup was opened
  lastFocusedElement.focus();

  function handleTransitionEnd() {

    this.style.display = "none";

    if (forceRemove || popup.getAttribute("data-remove") === "true")
      this.remove();

    this.removeEventListener("mousedown", handlePopupMousedownEvent)
    this.removeEventListener("transitionend", handleTransitionEnd);
    this.removeEventListener("keydonw", handleKeydownEvent)

  }
}
