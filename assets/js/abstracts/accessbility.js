// Elements
const ATMessageContainer = document.querySelector(".js-sr-notifier");
const scrollToTopBtn = document.querySelector(".js-stt");

// Functions
export function sendMessageToAT(message, urgent) {

  // A function to notify users using screen readers
  // of some updates

  ATMessageContainer.classList.add("js-show-up");

  if (urgent)
    ATMessageContainer.ariaLive = "assertive";
  else
    ATMessageContainer.ariaLive = "polite";

  ATMessageContainer.textContent = message;


  setTimeout(() => {
    ATMessageContainer.ariaLive = "off";
    ATMessageContainer.classList.remove("js-show-up");
    ATMessageContainer.textContent = "";
  }, 1000);

}

if (scrollToTopBtn) {

  window.addEventListener("scroll", () => {
    if (window.scrollY > 5000) {
      scrollToTopBtn.classList.add("js-show-up");
    } else {
      scrollToTopBtn.classList.remove("js-show-up");
    }
  });

  scrollToTopBtn.addEventListener(
    "click",
    () => window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  );

}