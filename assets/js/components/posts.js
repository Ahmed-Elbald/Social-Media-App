// Imported
import { formatCommentsCount, getCommentMarkup, getPostMarkup } from "../markup/posts.js";
import { addFillersText } from "../abstracts/helpers.js";
import { makeRequest, getRequestURL } from "../auth/requests.js";
import { getUserToken } from "../auth/authorization.js";
import { Dialogs, GlobalDialogs, createDialog, showPopup } from "./popups.js"

// Elements
const postsContainer = document.querySelector(".js-posts-container");

// Global Variables
const imgFiller = await getImgFiller();

// Classes
class Post {

  static paginate(post, nextPageLink) {

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {

            if (entry.isIntersecting) {
              addPosts(nextPageLink)
              observer.unobserve(post);
            }

          })
        },
        { threshold: .25 }
      );

    observer.observe(post);

  }

  constructor(postData, creator) {

    this.id = postData["id"];
    this.self = document.createElement("article");

    this.data = {
      body: postData["body"],
      commentsCount: postData["comments_count"],
      imgSrc: postData["image"]
    }

    this.dialogs = {
      edit: null,
      newComment: null,
      comments: null
    };

    this.init(postData, creator);
  }

  init(postData, creator) {

    // Add post properties
    this.self.className = "c-post js-post";
    this.self.innerHTML = getPostMarkup(postData);

    // Adding post image
    addPostImg(this.self, postData["image"]);

    // Make the post interactive
    this.addInteractivity()

    // Adding to page
    this.addToPage(creator);

  }

  addInteractivity() {

    // Hiding the post
    this.self.querySelector(".js-hide-post")
      .addEventListener(
        "click",
        () => this.hide()
      )

    // Deleting the post
    this.self.querySelector(".js-delete-post")
      ?.addEventListener(
        "click",
        () => this.delete()
      )

    // Editing the post
    this.self.querySelector(".js-edit-post")
      ?.addEventListener(
        "click",
        () => this.edit()
      )

    // Creating a new comment
    this.self.querySelector(".js-new-comment")
      .addEventListener(
        "click",
        () => this.createComment()
      )

    // Displaying post comments
    this.self.querySelector(".js-show-comments")
      .addEventListener(
        "click",
        () => this.showComments()
      )

  }

  addToPage(creator) {

    const postContainer = document.createElement("li");
    postContainer.append(this.self);

    // If the post is added by the user
    if (creator === "user")
      postsContainer.prepend(postContainer);

    // If it's added when the page loads
    else
      postsContainer.append(postContainer);

  }

  update() {

    // Update post text
    addFillersText(this.self,
      {
        body: this.data.body,
        commentsCount: formatCommentsCount(this.data.commentsCount)
      }
    );

    // Update post image
    addPostImg(this.self, this.data.imgSrc)

    // Set post dialogs to require update
    for (let key in this.dialogs) {

      if (this.dialogs[key]) {
        this.dialogs[key].remove();
        this.dialogs[key] = null;
      }

    }

  }

  hide() {

    createDialog(
      Dialogs["hidePost"],
      () => {
        this.self.remove();
        return true;
      });

  }

  edit() {

    // If there's already a dialog attched to the element
    if (this.dialogs.edit) {
      showPopup(this.dialogs.edit);
      return;
    }

    const postFormData = new FormData();

    const dialog = createDialog(
      Dialogs["postUpdate"],
      submitPost.bind(this, postFormData)
    );
    this.dialogs.edit = dialog;

    managePostForm.call(this, dialog, postFormData);

  }

  delete() {

    createDialog(
      Dialogs["deletePost"],
      deletePost.bind(this)
    );

  }

  createComment() {

    if (this.dialogs.newComment) {
      showPopup(this.dialogs.newComment);
      return;
    }

    this.dialogs.newComment = createDialog(
      Dialogs["commentCreation"],
      createNewComment.bind(this)
    )

  }

  showComments() {

    if (this.dialogs.comments) {
      showPopup(this.dialogs.comments);
      handleCommentsDisplay.call(this);
      return;
    }

    this.dialogs.comments =
      createDialog(Dialogs["showPostComments"]);

    handleCommentsDisplay.call(this);

  }

}

// Functions
async function getImgFiller() {
  // An image that I send to the server to get set
  // as a post image if there's no post image

  const request = await fetch("../../assets/images/post-img-filler.jpg");
  const fileAsBlob = await request.blob();

  return new File(
    [fileAsBlob],
    "image-filler.jpg",
    {
      type: fileAsBlob.type,
    }
  );

}

async function getPostsData(URL) {

  const response = await makeRequest({
    url: URL
  });

  return [
    response.data,
    response.links?.next
  ]

}

function addPostImg(post, postImgSrc) {

  const imgContainer = post.querySelector(".js-img-container");
  const img = imgContainer.querySelector("img");

  // Get the source of the image
  getPostImg(postImgSrc)
    .then(

      postImgSrc => {
        imgContainer.classList.add("js-has-img");
        img.src = postImgSrc;
      },
      _ => {
        img.removeAttribute("src");
        imgContainer.classList.remove("js-has-img")
      }

    )

}

function getPostImg(postImgSrc) {
  // A function that returns the source of the image if:
  //  1- There is actuall an image
  //  2- The image is not fake 
  //  FAKE means: it was put by me to make updating posts' images work since the API doesn't allow it

  if (typeof postImgSrc === "string") { // If there's actually an image

    const postImg = document.createElement("img");
    postImg.src = postImgSrc;

    return new Promise((resolve, reject) => {

      postImg.addEventListener("load", () => { // When the image loads:

        // If it's not a fake image
        if (postImg.naturalHeight !== 1)
          resolve(postImgSrc);
        else
          reject()

      });

    });

  }

  return Promise.reject()
}

async function deletePost() {

  await makeRequest({
    method: "DELETE",
    url: getRequestURL("posts", this.id),
    headers: {
      "authorization": getUserToken()
    },
    body: {}
  });

  this.self.remove();

  for (let dialog in this.dialogs) {
    this.dialogs[dialog]?.remove();
  }

  return true;

}

async function createNewComment(formData) {

  // Send comment data to the server
  await makeRequest({
    method: "POST",
    url: getRequestURL("postComments", this.id),
    headers: {
      "Content-Type": "application/json",
      "authorization": getUserToken()
    },
    body: JSON.stringify({
      body: formData.get("new-comment-body")
    })

  });

  // Update the post
  this.data.commentsCount++;
  this.update();

  return true;

}

async function handleCommentsDisplay() {

  const commentsDialog = this.dialogs.comments;

  // If the dialog was opened before and requires no update
  if (!commentsDialog.hasAttribute("data-requires-update"))
    return;

  commentsDialog.removeAttribute("data-requires-update");

  // Get post comments
  let postComments = await makeRequest({
    url: getRequestURL("postComments", this.id),
    headers: {
      authorization: getUserToken(),
    },
    action: "getPostComments"
  })
    .then(response => response["data"].reverse());

  // Reformat the "postComments" variable so it has the data of the comment's author
  postComments = await Promise.all(
    postComments.map(async comment => {

      return {
        id: comment["id"],
        body: comment["body"],
        craetedAt: comment["created_at"],
        author:
          await makeRequest({ url: getRequestURL("getUser", comment["author_id"]) })
            .then(response => response.data)
      }

    })
  );

  // Get the contaienr of the comments
  const commnetsContainer = commentsDialog.querySelector(
    ".js-post-comments"
  );

  if (postComments.length === 0)  // If there's no comments
    commnetsContainer.innerHTML = "<p>there is no comments for this post</p>";
  else // Display the comments
    commnetsContainer.innerHTML = postComments.
      map(comment => getCommentMarkup(comment)).join("")

  commnetsContainer.classList.add("js-content-loaded");

}

export async function addPosts(URL) {

  // Get posts data from the server
  let [postsData, nextPageLink] = await getPostsData(URL);

  if (pagePathName === "/profile.html")
    postsData = postsData.reverse();

  // If we are in the home page, randomize posts order
  else if (pagePathName === "/home.html")
    postsData = postsData.sort(() => Math.random() - 0.5);

  // Add posts to the page
  postsData.forEach((postData, postIndex) => {

    // Create a new post
    const post = new Post(postData);

    // If it's the last post, load more posts when we reach it
    if (nextPageLink && postsData.length - 1 === postIndex)
      Post.paginate(post.self, nextPageLink)

  });

}

export function managePostForm(postDialog, postFormData) {

  const postImgContainer = postDialog.querySelector(".js-img-container");
  const postImg = postImgContainer.querySelector("img");
  const postImgRemover = postImgContainer.querySelector(".js-img-remover");
  const postBodyInput = postDialog.querySelector(".js-post-body");
  const postImgInput = postDialog.querySelector("#post-img");

  // If the form is for updating (not creating) a post
  if (this && postDialog.hasAttribute("data-requires-update"))
    initializeForm.call(this)

  postDialog.removeAttribute("data-requires-update")

  // If the remove button was clicked, remove the image
  postImgRemover.addEventListener("click", removeDisplayedImg);

  // When the user types in the body field
  postBodyInput.addEventListener("input", function () {
    postFormData.set("body", this.value);
  });

  // When the user inputs an image
  postImgInput.addEventListener("input", function () {

    const imgFile = this.files[0]
    postFormData.set("image", imgFile);

    showSelectedImg(
      URL.createObjectURL(imgFile)
    );

  });


  async function initializeForm() {

    const postData = this.data;
    const postOldText = postData["body"];

    // Add the old post body to the formData as well as the body input,
    postFormData.append("body", postOldText)
    postBodyInput.value = postOldText;
    postBodyInput.previousElementSibling.innerHTML = postOldText;

    // If the old post has an image, display it.
    getPostImg(postData["imgSrc"])
      .then(

        postImgSrc => showSelectedImg(postImgSrc),
        _ => postImgContainer.classList.remove("js-has-img")

      );

  }

  function showSelectedImg(imgSrc) {
    postImg.src = imgSrc;
    postImgContainer.classList.add("js-has-img");
  }

  function removeDisplayedImg() {
    postFormData.set("image", imgFiller);
    postImgContainer.classList.remove("js-has-img");
  }

}

export async function submitPost(postFormData) {

  let postID = this?.id;

  if (postID) // If the post is being updated
    postFormData.append("_method", "PUT");

  // Send post data to the server
  const postData = await makeRequest({
    method: "POST",
    action: "newPost",
    url: getRequestURL("posts", postID),
    headers: {
      "Authorization": getUserToken(),
    },
    body: postFormData
  })
    .then(data => data["data"]);

  if (postID) {
    this.data.body = postData["body"];
    this.data.commentsCount = postData["comments_count"];
    this.data.imgSrc = postData["image"]
    this.update();
  }
  else {
    new Post(postData, "user");
    GlobalDialogs.newPost = null;
  }

  return true;

}