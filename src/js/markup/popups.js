export function getLightboxMarkup(targetedElement) {

    return `
    <!-- Lightbox -->
    <div class="c-lightbox">

    <!-- Close Btn -->
    <button class="c-popup-close-btn js-close-popup" type="button">
    <i class="bi bi-x" aria-hidden="true"></i>
    <span class="u-sr-only">
        Close the popup
    </span>
    </button>

    <!-- Lightbox Image -->
    ${new XMLSerializer().serializeToString(targetedElement)}
    </div>
    `

}

export function getDialogMarkup(dialogData) {

    const contentMarkup = window[dialogData["contentMarkup"]]

    return `
    <!-- Dialog -->
    <div class="c-dialog">

        <!-- Dialog Header -->
        <header class="c-dialog__header">

            <!-- Dialog Close Btn -->
            <button class="c-popup-close-btn js-close-popup" type="button">
            <i class="bi bi-x" aria-hidden="true"></i>
            <span class="u-sr-only">
                Close the popup
            </span>
            </button>

            <!-- Dialog Heading -->
            <h3>${dialogData.textContent.heading}</h3>
        </header>

        <!-- Dialog Content -->
        <article class="c-dialog__content js-dialog-content">
            ${contentMarkup ? contentMarkup : ""}
        </article>

    </div>
    `

}

export function getActionAreaMarkup(dialogData) {

    const dialogPurpose = dialogData.purpose;
    const btnsConfig = {
        actionBtnStyleType: dialogData.actionBtnType ? dialogData.actionBtnType : "primary",
    };

    let cancelBtnMarkup = "";

    switch (dialogPurpose) {
        case "present": {
            return "";
        }
        case "prompt": {
            btnsConfig.actionBtnType = "submit";
            break;
        }
        case "confirm": {
            btnsConfig.actionBtnType = "button";
            cancelBtnMarkup = `
            <!-- Dialog Close Btn -->
            <button class="c-button js-close-popup" data-btn-type="secondary" data-focus>cancel</button>
            `
            break;
        }
    }

    return `
    <!-- Dialog Action Area -->
    <footer>
        <menu class="c-dialog__action-area">

            ${cancelBtnMarkup}

            <!-- Dialog Action Btn -->
            <button class="c-button c-dialog__action-btn js-action-btn"
            type="${btnsConfig.actionBtnType}"
            data-btn-type="${btnsConfig.actionBtnStyleType}"
            >
            ${dialogData.textContent.actionBtn}
            </button>

        </menu>
    </footer>
    `;

}

window.NewPostFormMarkup = `

    <!-- New Post Form -->
    <form class="l-margin-spacer" style="--marginSpacer: var(--spacer-400)">

        <!-- New Post Body Input -->
        <div class="c-input-group">
        <div class="c-expandable-input js-expandable-input">
            <span aria-hidden="true"></span>
            <textarea class="c-input js-post-body" name="post-body"
            placeholder="Write your post" data-focus></textarea>
        </div>
        </div>

        <!-- New Post Image Input -->
        <div class="c-img-input">
            <label for="post-img" data-btn-type="dialog-opener">
            <i class=" bi bi-card-image u-text-pr-700" aria-hidden="true"></i>
            &nbsp;&nbsp;Attach an image
            </label>
            <input type="file" accept="image/png, image/jpg, image/jpeg" name="post-img" id="post-img" data-not-required>
        </div>

        <!-- New Post Image Preview -->
        <div class="c-post-img js-img-container" data-preview="true">
    
            <!-- New Post Image Remover -->
            <button class="c-post-img__remover c-img-remover js-img-remover" type="button">
            <i class="bi bi-x" aria-hidden="true"></i>
            <span class="u-sr-only">Remove the attached image</span>
            </button>
    
            <!-- New Post Image -->
            <img src="" alt="Post image" data-pseudo="true">
    
        </div>
        
    </form>

    `;

window.emailChangeFormMarkup = `
    <h4 class="c-heading-4">Upcoming Feature!!!</h4>

        <!-- Dialog Form -->
        <form class="c-edit-form">
    
        <!-- New Email Input -->
        <div class="c-input-group">
            <input class="c-input" type="email" name="new-email" id="new-email" placeholder="New email" data-validation-key="email" data-focus>
        </div>
    
        <!-- Current Passowrd Input -->
        <div class="c-input-group">
            <input class="c-input" type="password" name="account-password" id="account-password" placeholder="Your password">
        </div>

    </form>
    `;

window.passwordChangeFormMarkup = `
    <h4 class="c-heading-4">Upcoming Feature!!!</h4>

        <!-- Dialog Form -->
        <form class="c-edit-form">
    
        <!-- Old Password Input -->
        <div class="c-input-group">
            <input class="c-input" type="password" name="old-password" id="old-password" autocomplete="true" placeholder="Old password" data-focus>
        </div>
    
        <!-- New Password Input -->
        <div class="c-input-group">
            <input class="c-input" type="password" name="new-password" id="new-password" autocomplete="true" placeholder="New password" data-validation-key="password">
        </div>
    
        <!-- New Password Input -->
        <div class="c-input-group">
            <input class="c-input" type="password" name="confirm-password" id="confirm-password" autocomplete="true" placeholder="Password confirmation">
        </div>

    </form>
    `;

window.usernameChangeFormMarkup = `
    <h4 class="c-heading-4">Upcoming Feature!!!</h4>

        <!-- Dialog Form -->
        <form class="c-edit-form">
    
        <!-- New Username Input -->
        <div class="c-input-group">
            <input class="c-input" type="text" name="new-username" id="new-username" placeholder="New username" data-validation-key="username" data-focus>
        </div>
    
        <!-- Current Passowrd Input -->
        <div class="c-input-group">
            <input class="c-input" type="password" name="account-password" id="account-password" placeholder="Your password">
        </div>

    </form>
    `;

window.newCommentFormMarkup = `
    <!-- Dialog Form -->
    <form>

        <!-- New Comment Input -->
        <div class="c-input-group">
            <div class="c-expandable-input js-expandable-input">
            <span aria-hidden="true"></span>
            <textarea class="c-input" data-btn-type="dialog-opener" name="new-comment-body" id="new-comment-body"
                placeholder="Write your comment" data-focus></textarea>
            </div>
        </div>

    </form>
    `;

window.postDeleteFormMarkup = `
    <div class="confirm-msg">
    <!-- Dialog Confirmation Message -->
    <h4>Are you sure you want to delete that post?</h4>
    </div>
    `;

window.postHideFormMarkup = `
    <div class="confirm-msg">
    <!-- Dialog Confirmation Message -->
    <h4>Are you sure you want to hide that post?</h4>
    </div>
    `;

window.postCommentsMarkup = `
    <!-- Post Comments -->
    <ul class="post-comments js-post-comments"><ul>
    `;
