// Global Variables
const postMenuOptions = [
  {
    text: "hide",
    requireAuth: false,
    iconClass: "bi bi-eye-slash"
  },
  {
    text: "edit",
    requireAuth: true,
    iconClass: "bi bi-pencil"
  },
  {
    text: "delete",
    requireAuth: true,
    iconClass: "bi bi-trash3"
  },
]

export function getPostMarkup(postData) {

  const postAuthorData = postData["author"];

  return `
    <!-- Post Heading -->
    <h2 class="u-sr-only">This is a post by ${postAuthorData["name"]}</h2>
    ${getPostHeader(postData, postAuthorData)}
  
    <!-- Post Body -->
    ${getPostBody(postData)}
  
    <!-- Post Img Container -->
    <div class="c-post__img c-post-img js-img-container">
    ${getPostImgMarkup(postData)}
    </div>
  
    <!-- Post Info. -->
    ${getPostInfo(postData)}
  
    <!-- Post Button For Making A Comment -->
    <button class="c-post__new-comment-btn js-new-comment c-button" data-btn-type="input-like"
      type="button">
      Write a comment
    </button>
    `;
}

function getPostHeader(postData, postAuthorData) {
  return `
    <!-- Post Header -->
    <header class="c-post__header">
  
      <!-- Post Author Image -->
      ${new XMLSerializer().serializeToString(
    getUserImg(
      postAuthorData,
      `${postAuthorData["name"]}'s profile image`,
      ""
    )
  )}
      <!-- Post Details -->
      ${getPostDetails(postData, postAuthorData)}
      <!-- Post Dropdown Menu -->
      ${getPostMenu(postData, postAuthorData)}
    </header>
    `;
}

export function getUserImg(userData, imgAltText, imgID) {

  const userImgSrc = userData["profile_image"];
  const userImg = document.createElement("div");
  userImg.className = "c-user-img";

  if (typeof userImgSrc === "string") { // If the user has a profile image
    userImg.innerHTML = `
    <img src="${userImgSrc}" alt="${imgAltText}" data-img-id="${imgID}">
    `
  } else { // Otherwise, display an alternative image
    userImg.innerHTML = `
    <img src="./assets/images/user-image-alt.webp" alt="${imgAltText}" data-img-id="${imgID}">
    `
  }

  return userImg;

}

function getPostDetails(postData, postAuthorData) {
  return `
    <div class="c-post__details">
      <address class="c-post__author-name">
        <a href="./profile.html?userID=${postAuthorData["id"]}">
          ${postAuthorData["name"]}
          <span class="u-sr-only">'s profile</span>
        </a>
      </address>
      <p class="c-post__publish-date">
        <span class="u-sr-only">The post was created </span>${postData["created_at"]}
      </p>
    </div>
    `;
}

function getPostMenu(postData, postAuthorData) {

  const postID = postData["id"];
  let menuItems = postMenuOptions;

  if (postAuthorData["username"] !== currentUserData["username"])
    menuItems = postMenuOptions.filter(item => !item["requireAuth"]);

  let postMenuOptionsMarkup = menuItems.reduce((previous, current) => {
    return previous + `
      <li>
        <button class="c-post__menu-item c-dropdown__item js-${current["text"]}-post" type="button"
          aria-haspopup="dialog">
          <i class="${current["iconClass"]}" aria-hidden="true"></i>
          <span>${current["text"]}</span><span class="u-sr-only"> post</span>
        </button>
      </li>
      `
  }, "");

  return `
    <div class="c-post__menu c-dropdown">
      <button class="c-dropdown__toggler js-dropdown-toggler" type="button" aria-controls="post-dropdown-${postID}" aria-expanded="false">
        <i class="bi bi-three-dots" aria-hidden="true"></i>
        <span class="u-sr-only">
          post dropdown menu toggler
        </span>
      </button>
      <ul class="c-dropdown__list" id="post-dropdown-${postID}">
        ${postMenuOptionsMarkup}
      </ul>
    </div>
    `;
}

function getPostBody(postData) {
  return `<p class="c-post__body" data-fill="body">${postData["body"]}</p>`;
}

export function getPostImgMarkup(postData) {
  const postID = postData["id"];

  return `
      <!-- Post Img -->
      <img data-img-id="${postID}" alt="${postData["author"]["name"]}'s post image"/>

      <!-- Post Img Opener -->
      <div class="c-overlay" data-hidden="true">
        <button class="c-overlay__btn js-lightbox-opener u-fs-900 u-text-neu-700" type="button"
          data-target="${postID}">
          <i class="bi bi-eye" aria-hidden="true"></i>
          <span class="u-sr-only">
            Show the post image in a lightbox
          </span>
        </button>
      </div>
      `;
}

function getPostInfo(postData) {
  return `
    <div class="c-post__info">
  
      <!-- Post Comments Count -->
      ${getPostComments(postData["comments_count"])}
  
      <!-- Post Tags -->
      ${getPostTags(postData["tags"])}
    </div>
    `;
}

function getPostComments(commentsCount) {
  return `
    <button class="c-post__comments-btn js-show-comments"
      type="button"" data-fill="commentsCount">
      ${formatCommentsCount(commentsCount)}
    </button>
    `;
}

export function formatCommentsCount(postCommentsCount) {
  const screenReaderPrefix = `<span class="u-sr-only">This post has </span>`;

  switch (postCommentsCount) {
    case 0: {
      return `no comments <span class="u-sr-only">for this post</span>`;
    }
    case 1: {
      return `${screenReaderPrefix} 1 comment <span class="u-sr-only">, click to display it</span>`;
    }
  }

  return `${screenReaderPrefix} ${postCommentsCount} comments <span class="u-sr-only">, click to display them</span>`;
}

function getPostTags(postTags) {

  let postTagsMarkup = postTags.reduce((previous, current) => {
    return previous + `<span class="c-post__tag">${current["name"]}</span>`;
  }, "")

  if (postTagsMarkup === "")
    return ""
  else
    return `
    <div class="c-post__tags l-flex-cluster" style="--clusterSpacer: var(--spacer-100)">
      ${postTagsMarkup}
    </div>
    `;
}

export function getCommentMarkup(comment) {

  // Formatting comment publishing date
  const formattedDate = dayjs(comment["createdAt"]).fromNow();
  const author = comment["author"]

  return `
  <li>
    <article class="comment">
        <h4 class="u-sr-only">A comment by ${author["name"]}</h4>
        <!-- Comment Header -->
        <header class="comment__header">
        <!-- Comment Author Image -->
        <div class="comment__author-img">
            ${new XMLSerializer().serializeToString(
    getUserImg(author, `${author["name"]}'s profile image`)
  )
    }
        </div>
        <div>
            <!-- Comment Author Account -->
            <address>
            <a href="./profile.html?userID=${author["id"]}" class="comment__author-name">
                ${author["name"]}
            </a>
            </address>
            <!-- Comment Publish Date -->
            <p class="comment__publish-date">
            <time class="u-sr-only" timedate="${comment["created_at"]}">${formattedDate}</time>
            <span aria-hidden="true">${formattedDate}</span>
            </p>
        </div>
        </header>
        <!-- Comment Body -->
        <p class="comment__body">${comment.body}</p>
        </article>
    </li>
      `

}
