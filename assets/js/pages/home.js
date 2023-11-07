// Imported
import { addPosts, managePostForm, submitPost } from "../components/posts.js";
import { getRequestURL } from "../auth/requests.js";
import { showPageContent } from "../abstracts/styles.js";
import { Dialogs, GlobalDialogs, createDialog, showPopup } from "../components/popups.js";

window.dayjs.extend(window.dayjs_plugin_relativeTime)

// Global Variables
export let newPostDialog;

// Event Listeners
document.querySelector(".js-new-post-btn")
  .addEventListener("click", () => handlePostCreation());

// Functions
(async function handleHomepageLoading() {

  await addPosts(getRequestURL("posts"));

  showPageContent();

})();

export async function handlePostCreation() {
  // A function to handle the process of creating a post

  if (GlobalDialogs.newPost) {
    showPopup(GlobalDialogs.newPost);
    return;
  }

  const postFormData = new FormData();
  const postDialog = createDialog(
    Dialogs["postCreation"],
    submitPost.bind(undefined, postFormData)
  );

  GlobalDialogs.newPost = postDialog;

  managePostForm(postDialog, postFormData)

}