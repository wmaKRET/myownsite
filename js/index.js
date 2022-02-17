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

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);