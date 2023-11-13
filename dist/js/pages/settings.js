import{Dialogs,GlobalDialogs,createDialog,showPopup}from"../components/popups.js";import{showPageContent,changeFontsize,getUserPreferences,togglePageTheme,setUserPreferences,defaultFontSize,fontSizeOffset}from"../abstracts/styles.js";showPageContent();const AccountDataModifiers=document.querySelectorAll(".js-account-data-modifier"),themeToggler=document.getElementById("theme-toggler"),themeTogglerLabel=themeToggler.parentElement.querySelector("label"),fontsizeModifier=document.getElementById("fs-modifier");function modifyAccountData(){let e=this.getAttribute("data-action");GlobalDialogs[e]?showPopup(GlobalDialogs[e]):GlobalDialogs[e]=createDialog(Dialogs[e],(function(){return GlobalDialogs[e]=null,!0}))}function handleThemeToggling(){setUserPreferences("darkTheme",!getUserPreferences().darkTheme),togglePageTheme(),toggleThemeModifier()}function handleFontChange(){setUserPreferences("fontSize",fontsizeModifier.value),changeFontsize()}function toggleThemeModifier(){const e=getUserPreferences().darkTheme;themeTogglerLabel.setAttribute("data-toggle",e),themeToggler.checked=e}AccountDataModifiers.forEach((e=>e.addEventListener("click",modifyAccountData))),themeToggler.addEventListener("change",handleThemeToggling),fontsizeModifier.addEventListener("input",handleFontChange),toggleThemeModifier(),fontsizeModifier.value=getUserPreferences().fontSize,fontsizeModifier.setAttribute("min",String(defaultFontSize-fontSizeOffset)),fontsizeModifier.setAttribute("max",String(defaultFontSize+fontSizeOffset));