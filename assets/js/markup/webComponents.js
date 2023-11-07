const headerNotLoggedMarkup = `
<header class="c-primary-header" data-page="landing">
    <div class="l-container">
        <div class="c-primary-header__inner">

            <!-- Site Logo -->
            <img class="c-primary-header__logo" src="./assets/images/logo.svg" alt="Site logo" />

            <!-- Link To Log In Page -->
            <slot name="link"></slot>

        </div>
    </div>
</header>
`;

const headerLoggedMarkup = `
<header class="c-primary-header">
    <div class="l-container">
        <div class="c-primary-header__inner">

            <!-- Link To The Home Page -->
            <a href="/home.html" id="homepage-link">
            <img src="./assets/images/logo.svg" alt="">
            <span class="u-sr-only">Home page</span>
            </a>

            <!-- Site Navigation -->
            <nav class="c-dropdown">

            <!-- Navigation Toggler -->
            <button class="c-dropdown__toggler js-dropdown-toggler" type="button" aria-controls="user-menu" aria-expanded="false">
                <div class="js-current-user-img"></div>
                <span class="u-sr-only">
                navigation toggler
                </span>
            </button>

            <!-- Navigation List -->
            <ul class="c-dropdown__list" id="user-menu" data-triangle="true">
                <li>
                <a href="/profile.html" class="c-dropdown__item">
                    <i class="bi bi-person-circle" aria-hidden="true"></i>
                    <span>profile</span>
                    <span class="u-sr-only"> page</span>
                </a>
                </li>
                <li>
                <a href="/settings.html" class="c-dropdown__item">
                    <i class="bi bi-gear" aria-hidden="true"></i>
                    <span>settings</span>
                    <span class="u-sr-only"> page</span>
                </a>
                </li>
                <li>
                <button type="button" class="c-dropdown__item" data-last="true" id="logout-btn">
                    <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
                    <span>logout</span>
                </button>
                </li>
            </ul>

            </nav>

        </div>
    </div>
</header>
`;

const footerMarkup = `
<footer class="c-footer" data-type="primary">
    <div class="l-container">
    <div class="c-footer__inner">

        <!-- Footer Attribution -->
        <p>
        made with
        <span class="u-sr-only">love</span>
        <i class="bi bi-suit-heart u-text-acc-400" aria-hidden="true"></i>
        by
        <span class="u-text-acc-400 u-text-capitalize u-fw-bold">ahmed el bald</span>
        </p>

        <!-- Footer Social Links -->
        <ul class="c-footer__social-links">
        <li>
            <a href="https://ahmed-elbald.github.io/Personal-Portfolio/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-briefcase-fill"></i>
            <span class="u-sr-only"> My portfolio </span>
            </a>
        </li>

        <li>
            <a href="https://web.facebook.com/abkareenooo/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-facebook"></i>
            <span class="u-sr-only"> Facebook account </span>
            </a>
        </li>

        <li>
            <a href="https://github.com/Ahmed-Elbald" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-github" aria-hidden="true"></i>
            <span class="u-sr-only"> GitHub account </span>
            </a>
        </li>
        </ul>

    </div>
    </div>
</footer>
`;

const accessibilityElementsMarkup = `
<ul>

    <!-- Skip To Main Content Link -->
    <li>
        <a class="c-accessibility-link" href="#main-content">
        skip to main content
        </a>
    </li>

    <!-- Element To Notify The User Of Updates On The Page -->
    <li>
        <p class="c-srn js-sr-notifier"></p>
    </li>

    <!-- Scroll To Top Button -->
    <li>
        <button class="c-stt-btn js-stt" type="button">
        <i class="bi bi-arrow-up" aria-hidden="true"></i>
        <span class="u-sr-only">
            Scroll to top
        </span>
        </button>
    </li>

</ul>
`

export const headerNotLoggedTemplate = document.createElement("template");
headerNotLoggedTemplate.innerHTML = headerNotLoggedMarkup;

export const headerLoggedTemplate = document.createElement("template");
headerLoggedTemplate.innerHTML = headerLoggedMarkup;

export const footerTemplate = document.createElement("template");
footerTemplate.innerHTML = footerMarkup;

export const accessibilityElementsTemplate = document.createElement("template");
accessibilityElementsTemplate.innerHTML = accessibilityElementsMarkup;