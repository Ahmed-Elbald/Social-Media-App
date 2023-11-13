import { addFillersText } from "../abstracts/helpers.js";
import { showPageContent } from "../abstracts/styles.js";
import { addPosts } from "../components/posts.js";
import { getUserImg } from "../markup/posts.js";
import { getRequestURL, makeRequest } from "../auth/requests.js";

window.dayjs.extend(window.dayjs_plugin_relativeTime)

// Global Variables
const userID = new URLSearchParams(window.location.search).get("userID");
let targetedUserData;

// Functions
(async function handleHomepageLoading() {

  targetedUserData = userID ?
    await makeRequest({
      url: getRequestURL("getUser", userID),
    })
      .then(userData => userData["data"])
    : currentUserData;

  // Get the user's posts
  await addPosts(getRequestURL("getUserPosts", targetedUserData["id"]));

  // Fill in the user's info
  addFillersText(
    document.querySelector(".js-user-info"),
    {
      name: targetedUserData["name"],
      username: targetedUserData["username"]
    }
  );

  // Add user image
  document.querySelector(".js-user-info-img")
    .prepend(getUserImg(targetedUserData, "User profile image", "user-img"))

  // Show the content of the page
  showPageContent();

})();
