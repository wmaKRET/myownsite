// [ APP SUMMARY - DATE/DAYS SINCE ]
const currentDate = document.querySelector('#general-date');
const date = new Date();
currentDate.innerHTML = date.getDate() + '.' + (String(date.getMonth() + 1).padStart(2, '0')) + '.' + date.getFullYear();

const howManyDays = document.querySelector('#general-howmanydays');
const firstDay = new Date(date.getFullYear(), 0, 1);
const howManyPassed = Math.round((date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));
howManyDays.innerHTML = howManyPassed.toFixed(0);

// [ APP DETAILS ]
const addMonthBtn = document.querySelector('.month__card--add');
const monthBtn = document.querySelectorAll('.month__card');
const monthPopup = document.querySelector('.app__monthly--popup');
const monthExitBtn = document.querySelector('.app__monthly--exit');
const monthExit = document.querySelector('.app__monthly--escape--popup');
const insideForm = document.querySelector('.app__monthly--form');
const insideStats = document.querySelector('.app__monthly--stats');

function openMonth(background, inside, outside){
    background.classList.add('active');
    inside.classList.add('active');
    outside.classList.add('active');
}

function closeMonth(background, inside, outside){
    background.classList.remove('active');
    inside.classList.remove('active');
    outside.classList.remove('active');
}

addMonthBtn.addEventListener('click', function(){
    openMonth(monthPopup, insideForm, monthExit);
});

monthBtn.forEach(e => e.addEventListener('click', function(){
    openMonth(monthPopup, insideStats, monthExit); 
}));

monthExitBtn.addEventListener('click', function(){
    if (insideForm.classList.contains('active')) {
        closeMonth(monthPopup, insideForm, monthExit);
    } else {
        closeMonth(monthPopup, insideStats, monthExit);
    }
});

monthExit.addEventListener('click', function() {
    if (insideForm.classList.contains('active')) {
        closeMonth(monthPopup, insideForm, monthExit);
    } else {
        closeMonth(monthPopup, insideStats, monthExit);
    }
});

