// Imported
import { getRequestURL, makeRequest } from "./requests.js";


export function getUserToken() {

  return "Bearer " + currentUserData["token"];

}

export function logUserIn(userData) {

  window.localStorage.setItem(
    "postItUserData",
    JSON.stringify(
      {
        ...userData["user"],
        token: userData["token"]
      }
    )
  );

  window.location.assign("./home.html");

}

export async function logout() {

  await makeRequest({
    method: "POST",
    url: getRequestURL("logout"),
    headers: {
      "authorization": getUserToken()
    },
    body: {}
  });

  localStorage.removeItem("postItUserData");
  window.location.assign("./login.html");

}
