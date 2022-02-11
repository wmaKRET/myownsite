const hamburgerButton = document.querySelector('.navbar__hbg');
const mobileMenu = document.querySelector('.navbar__mobile--container');
const mobileMenuExit = document.querySelector('.navbar__escape--mobile');
const logoButton = document.querySelector('.navbar__logo');
const logoMenu = document.querySelector('.navbar__logo--popup');

function toggleHamburger(button, menu, menuExit) {
    button.classList.toggle('active');
    menu.classList.toggle('active');
    menuExit.classList.toggle('active');
}

function exitHamburger(button, menu, menuExit) {
    button.classList.remove('active');
    menu.classList.remove('active');
    menuExit.classList.remove('active');
}

hamburgerButton.addEventListener('click', function () {
    if (logoMenu.classList.contains('active')) {
        exitHamburger(hamburgerButton, logoMenu, mobileMenuExit);
    } else {
        toggleHamburger(hamburgerButton, mobileMenu, mobileMenuExit);
    }
});

mobileMenu.addEventListener('click', function(){
    toggleHamburger(hamburgerButton, mobileMenu, mobileMenuExit);
});

logoButton.addEventListener('click', function(){
    if (mobileMenu.classList.contains('active')) {
        exitHamburger(hamburgerButton, mobileMenu, mobileMenuExit);
        toggleHamburger(hamburgerButton, logoMenu, mobileMenuExit);
    } else {
        toggleHamburger(hamburgerButton, logoMenu, mobileMenuExit);
    }
});

logoMenu.addEventListener('click', function(){
    toggleHamburger(hamburgerButton, logoMenu, mobileMenuExit);
});

mobileMenuExit.addEventListener('click', function() {
    exitHamburger(hamburgerButton, mobileMenu, mobileMenuExit);
    exitHamburger(hamburgerButton, logoMenu, mobileMenuExit);
});