// --- DECLARATIONS --- //


// FORM DECLARATIONS
const form = document.querySelector('.form__monthadd');
const formMonth = document.getElementById('f-month');
const formWeight = document.getElementById('f-weight');
const formFigure = document.getElementById('f-figure');
const formSubmit = document.querySelector('.form__monthadd--submit');
const formClear = document.querySelector('.form__monthadd--clear');
// ADD TRAINING DECLARATIONS
const trainingType = document.getElementById('f-training-type');
const trainingDist = document.getElementById('f-training-dist');
const trainingTime = document.getElementById('f-training-time');
const trainingSubmit = document.querySelector('.f-training-submit');
const trainingList = document.querySelector('.form__monthadd--training--list');
const trainingListItem = document.querySelector('.form__monthadd--training--list--item');
// BOTTOM SECTION DECLARATIONS
const monthAddBtn = document.querySelector('.month__card--add');
const monthBtn = document.querySelectorAll('.month__card');
const monthPopup = document.querySelector('.app__monthly--popup');
const monthExitBtn = document.querySelector('.app__monthly--exit');
const monthExit = document.querySelector('.app__monthly--escape--popup');
const insideForm = document.querySelector('.app__monthly--form');
const insideStats = document.querySelector('.app__monthly--stats');
const monthList = document.querySelector('.app__monthly--items');
// SUMMARY DATE + DAYS SINCE
const currentDate = document.querySelector('#general-date');
const date = new Date();
const howManyDays = document.querySelector('#general-howmanydays');
const firstDay = new Date(date.getFullYear(), 0, 1);
const howManyPassed = Math.round((date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));

howManyDays.innerHTML = howManyPassed.toFixed(0);
currentDate.innerHTML = date.getDate() + '.' + (String(date.getMonth() + 1).padStart(2, '0')) + '.' + date.getFullYear();

const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];


// --- FUNCTIONS --- //


// FORM FUNCTIONS
function addMonth(e){
    e.preventDefault();
    //const id = new Date().getTime().toString();
    const month = formMonth.value;
    const weight = formWeight.value;
    const figure = formFigure.value;
    let trainings = getLocalStorage('training');
    addMonthToLocalStorage(month, weight, figure, trainings);
    formDefault();
    clearLocalStorage('training');
    clearTrainings();
    showTrainings();
}

function addTraining(e) {
    if (trainingType.value !== '' && trainingDist.value !== '' && trainingTime.value !== '') {
        e.preventDefault();
        const id = new Date().getTime().toString();
        const trType = trainingType.value;
        const trDist = trainingDist.value;
        const trTime = trainingTime.value;
        let trTypeName = '';
        switch (trainingType.value) {
            case '0':
                trTypeName = 'Biegowy';
                break;
            case '1':
                trTypeName = 'Ćwiczenia';
                break;
            case '2':
                trTypeName = 'Rowerowy';
                break;
            case '3':
                trTypeName = 'Inny';
                break;
        }

        // creating training item
        const element = document.createElement('div');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add('form__monthadd--training--list--item');
        element.innerHTML = `<p>${trTypeName}</p>
            <p>${trDist} km</p>
            <p>${trTime} min</p>
            <button type="button" class="f-training-delete">X</button>`;
        const deleteBtn = element.querySelector('.f-training-delete');
        deleteBtn.addEventListener('click', deleteTraining);
        trainingList.appendChild(element);

        addToLocalStorage(id, formMonth.value, trType, trDist, trTime);
        addTrainingDefault();
    } else {
        // add alert msg on the left of "X"
    }
}

function deleteTraining(e) {
    const element = e.currentTarget.parentElement;
    const id = element.dataset.id;
    trainingList.removeChild(element);
    removeFromLocalStorage(id);
    addTrainingDefault();
}

function addTrainingDefault() {
    trainingType.value = '';
    trainingDist.value = '';
    trainingTime.value = '';
}

function formDefault(){
    formMonth.value = '';
    formWeight.value = '';
    formFigure.value = '';
    trainingType.disabled = true;
    trainingDist.disabled = true;
    trainingTime.disabled = true;
    addTrainingDefault();
    clearLocalStorage('training');
    trainingList.innerHTML = '';
    //form.reset(); maybe?
}

// BOTTOM SECTION FUNCTIONS
const openMonth = (background, inside, outside) => {
    background.classList.add('active');
    inside.classList.add('active');
    outside.classList.add('active');
}

const closeMonth = (background, inside, outside) => {
    background.classList.remove('active');
    inside.classList.remove('active');
    outside.classList.remove('active');
}


// --- EVENT LISTENERS --- //


// APP LISTENERS
window.addEventListener("DOMContentLoaded", showTrainings);

// FORM LISTENERS
formMonth.addEventListener('change', () => {
    trainingType.disabled = false;
    trainingDist.disabled = false;
    trainingTime.disabled = false;
});
trainingSubmit.addEventListener('click', addTraining);
formSubmit.addEventListener('click', addMonth);
formClear.addEventListener('click', formDefault);

// BOTTOM SECTION LISTENERS
monthAddBtn.addEventListener('click', () => {
    openMonth(monthPopup, insideForm, monthExit);
});

monthBtn.forEach(e => e.addEventListener('click', () => {
    openMonth(monthPopup, insideStats, monthExit);
}));

monthExitBtn.addEventListener('click', () => {
    if (insideForm.classList.contains('active')) {
        closeMonth(monthPopup, insideForm, monthExit);
        formDefault();
    } else {
        closeMonth(monthPopup, insideStats, monthExit);
    }
});

monthExit.addEventListener('click', () => {
    if (insideForm.classList.contains('active')) {
        closeMonth(monthPopup, insideForm, monthExit);
        formDefault();
    } else {
        closeMonth(monthPopup, insideStats, monthExit);
    }
});


// --- LOCAL STORAGE --- //

function addMonthToLocalStorage(month, weight, figure, trainings) {
    const submited = { month, weight, figure, trainings }
    let items = getLocalStorage(month);
    items.push(submited);
    localStorage.setItem(monthNames[month], JSON.stringify(items));
}

function addToLocalStorage(id, month, type, dist, time) {
    const training = { id, month, type, dist, time };
    let items = getLocalStorage('training');
    items.push(training);
    localStorage.setItem('training', JSON.stringify(items));
}

function getLocalStorage(e) {
    return localStorage.getItem(e)
        ? JSON.parse(localStorage.getItem(e))
        : [];
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage('training');
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem('training', JSON.stringify(items));
}

function clearLocalStorage(key) {
    localStorage.removeItem(key);
}

function clearTrainings(){
    monthList.innerHTML = `<a href="#home" class="month__card--add">
        <h2 class="month__header">Dodaj miesiąc</h2>
        </a>`
}

function showTrainings() {
    for(i=0; i < 12; i++){
        let items = getLocalStorage(monthNames[i]);
        if (items.length !== 0) {
            let distance = 0;
            let month = i;    
            console.log(items);
            for (j=0; j < items[0].trainings.length; j++) {
                distance = distance + parseInt(items[0].trainings[j].dist);
            }
            createMonthItem(month, items[0].trainings.length, distance);
        }
    }
}

function createMonthItem(month, trainings, distance) {
    const element = document.createElement('a');
    let attr = document.createAttribute('data-id');
    attr.value = month;
    element.setAttributeNode(attr);
    element.setAttribute('href', "#home");
    element.classList.add('month__card');
    element.classList.add('gradient-border');
    element.innerHTML = `<h2 class="month__header month__headerM">${monthNames[month]}</h2>
    <p>${trainings} TRENINGÓW</p>
    <p>ŁĄCZNIE ${distance} <span class="detailed--cardN">(KM)</span></p>`;

    //const deleteBtn = element.querySelector('.f-training-delete');
    //deleteBtn.addEventListener('click', deleteTraining);

    monthList.appendChild(element);
}


