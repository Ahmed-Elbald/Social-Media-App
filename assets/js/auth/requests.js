// Imported
import { createErrorMessage } from "./formValidation.js";

// Global Variables
const baseURL = "https://tarmeezacademy.com/api/v1/";
const requestsURLs = {

  login() {
    return "login";
  },
  signup() {
    return "register";
  },
  logout() {
    return "logout";
  },
  getUser([userID] = args) {
    return `users/${userID}`;
  },
  getUserPosts([userID] = args) {
    return `users/${userID}/posts`;
  },
  posts([postID] = args) {
    return `posts${postID ? "/" + postID : ""}`;
  },
  postComments([postID] = args) {
    return `posts/${postID}/comments`
  }

}

// Functions
export function getRequestURL(requestType, ...args) {

  // Get the request URL
  return baseURL + requestsURLs[requestType](args);

}

export async function makeRequest(requestData) {

  const { url, method = "GET" } = requestData;

  const request = await fetch(url, {
    method: method,
    headers: {
      "Accept": "application/json",
      ...requestData["headers"],
    },
    body: requestData["body"],
  });

  const response = await request.json();
  if (!request.ok) {
    createErrorMessage(response["message"])
    return;
  }

  return response;

}
