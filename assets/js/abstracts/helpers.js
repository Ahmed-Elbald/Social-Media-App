// Some "Helpers" that I use frequently

export function toggleDropdonw() {

  const togglerBtn = this;
  const dropdownOpened = togglerBtn.getAttribute("aria-expanded");
  const dropdown = document.getElementById(togglerBtn.getAttribute("aria-controls"));

  if (dropdownOpened == "true")
    hideDropdown();
  else
    showDropdown();

  function showDropdown() {

    dropdown.classList.add("js-show-up");
    togglerBtn.setAttribute("aria-expanded", true);

    setTimeout(() => {
      document.addEventListener("click", handleClickEvent);
      document.addEventListener("keydown", handleKeydownEvent);
    });
  }

  function handleClickEvent(clickEvent) {
    const clickedElement = clickEvent.target;

    if (
      !clickEvent.target.isSameNode(dropdown) &&
      !dropdown.contains(clickedElement)
    )
      hideDropdown();

  }

  function handleKeydownEvent(keydownEvent) {

    if (keydownEvent.key === "Escape" || keydownEvent.keyCode === 27)
      hideDropdown();

  }

  function hideDropdown() {

    dropdown.classList.remove("js-show-up");
    togglerBtn.setAttribute("aria-expanded", false);

    document.removeEventListener("click", handleClickEvent);
    document.removeEventListener("keyup", handleKeydownEvent);

  }

}


export function addFillersText(parent, contentData) {

  const fillers = parent.querySelectorAll("[data-fill]")

  fillers.forEach(filler => {
    filler.innerHTML = contentData[filler.getAttribute("data-fill")]
  });

};
