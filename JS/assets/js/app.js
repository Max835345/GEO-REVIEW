let coords = null;

let savedReviws = [];
const STORAGE_KEY = 'GEO_MAP';


const modal = document.getElementById('modal');
const form = document.getElementById('modal__form');
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
    });

    savedReviws = JSON.parse(localStorage.getItem(STORAGE_KEY));
    

    clusterer = new ymaps.Clusterer({

    });

    points = [];

    geoObjects = [];

    for (let i = 0; i < points.length; i++) {

    geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());

    }   

    clusterer.add(geoObjects);

    myMap.geoObjects.add(clusterer);

    addListeners();
}

function addListeners() {
    myMap.events.add("click", function(event) {
        event.preventDefault();
        coords = event.get('coords');
        console.log('Coords', coords);
        showModal(event);
    });

    form.addEventListener('click', function(event) {
       
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const geoReview = {
            coords: coords,
            reviewItem: {
                name: '',
                text: '',
            }
        }

        const reviewsList = [...savedReviws || [], geoReview]


        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsList));
        clusterer.add(new ymaps.Placemark(coords));

        //myMap.geoObjects.add(new ymaps.Placemark(coords));
        modal.style.display = 'none';
    })
}


function validateForm() {
    return true;

}

function showModal(event) {
    let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;
    let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;
    console.log('posY', posY);
    console.log('posX', posX);

    modal.style.display = 'block';
    modal.style.left = `${posX}px`;
    modal.style.top = `${posY}px`;
}