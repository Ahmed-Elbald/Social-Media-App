import{animateSubmitBtn,showPageContent}from"../abstracts/styles.js";import{createErrorMessage,errorMsgs,validateFormData}from"../auth/formValidation.js";import{makeRequest,getRequestURL}from"../auth/requests.js";import{logUserIn}from"../auth/authorization.js";import{createPopup}from"../components/popups.js";import{getLightboxMarkup}from"../markup/popups.js";showPageContent();const signupRequestBody=new FormData,signupForm=document.getElementById("signup-form"),profileImgInputContainer=document.getElementById("profile-img-input"),profileImgInput=profileImgInputContainer.querySelector("input"),profileImgRemover=profileImgInputContainer.querySelector("button"),inputHints=document.querySelectorAll(".js-input-hint");function fillInputHints(){inputHints.forEach((e=>{e.textContent=errorMsgs[e.dataset.hintKey]}))}async function handleSignup(e){if(e.preventDefault(),!validateFormData(signupForm))return;const t=new FormData(signupForm),n=t.get("password");if(n!==t.get("password-confirmation"))return void createErrorMessage("passwords don't match");animateSubmitBtn(signupForm),signupRequestBody.append("name",t.get("firstname")+" "+t.get("lastname")),signupRequestBody.append("username",t.get("username")),signupRequestBody.append("email",t.get("email")),signupRequestBody.append("password",n);const o=await makeRequest({method:"POST",url:getRequestURL("signup"),action:"signup",headers:{},body:signupRequestBody});o?logUserIn(o):animateSubmitBtn(signupForm)}function displayProfileImg(){const e=profileImgInput.files[0];signupRequestBody.append("image",e);const t=document.createElement("img");t.src=URL.createObjectURL(e),setTimeout((()=>createPopup(getLightboxMarkup(t),!0)),250),profileImgInputContainer.setAttribute("data-img-name",e.name)}function removeSelectedImg(){signupRequestBody.delete("image"),profileImgInput.value="",profileImgInputContainer.setAttribute("data-img-name","")}signupForm.addEventListener("submit",handleSignup),profileImgInput.addEventListener("change",displayProfileImg),profileImgRemover.addEventListener("click",removeSelectedImg),fillInputHints();