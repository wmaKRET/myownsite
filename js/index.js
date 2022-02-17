// --- DECLARATIONS --- //


// CONTACT FORM DECLARATIONS
const contactForm = document.querySelector('.main__item__form-box');
const alert = document.querySelector('.form-alert');
const contactName = document.querySelector('#name');
const contactEmail = document.querySelector('#email');
const contactMessage = document.querySelector('#message');

// --- FUNCTIONS --- //

// CONTACT FORM FUNCTIONS
function displayAlert(text, color) {
    alert.textContent = text;
    alert.classList.add(`form-alert-${color}`);
    setTimeout(() => {
        alert.textContent = 'kontakt';
        alert.classList.remove(`form-alert-${color}`);
    }, 1000);
}
function clearForm() {
    contactName.value = '';
    contactEmail.value = '';
    contactMessage.value = '';
}
// OTHER FUNCTIONS
function highlightMenu() {
    const pageHeight = document.querySelector('#home').clientHeight;
    const pageHeight2 = 2 * pageHeight;
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const contactMenu = document.querySelector('#contact-page');
    let scrollPos = window.scrollY;

    if ((window.innerWidth > 768) && scrollPos < pageHeight){
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return
    } else if ((window.innerWidth > 768) && scrollPos < pageHeight2)
    {
        homeMenu.classList.remove('highlight');
        aboutMenu.classList.add('highlight');
        contactMenu.classList.remove('highlight');
        return
    } else if ((window.innerWidth > 768) && scrollPos > pageHeight2)
    {
        aboutMenu.classList.remove('highlight');
        contactMenu.classList.add('highlight');
        return
    }
};


// --- EVENT LISTENERS --- //

window.addEventListener('DOMContentLoaded', highlightMenu);
window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactName.value.length < 3) {
        displayAlert('Imię jest za krótkie!', 'failture'); 
    } else if (contactMessage.value.length <3) {
        displayAlert('Wiadomość jest za krótka!', 'failture');
    } else  {
        displayAlert('Poszło!', 'success');
        clearForm();
    }
});
    
    


