
const users = [
    {
        name: 'Asmaa AlBaik',
        age: 25,
        location: 'Istanbul',
        images: ['images/3.jpg']
    },
    {
        name: 'Hussam AlBaik',
        age: 31,
        location: 'UAE',
        images: ['images/2.jpg']
    },
    {
        name: 'Ahmed AlBaik',
        age: 30,
        location: 'UAE',
        images: ['images/4.jpg']
    },
    {
        name: 'Ibrahim AlBaik',
        age: 28,
        location: 'UK',
        images: ['images/1.jpg']
    },
    {
        name: 'Nisreen AlBaik',
        age: 29,
        location: 'Istanbul',
        images: ['images/2.jpg']
    },
    {
        name: 'Huda AlBaik',
        age: 33,
        location: 'Gaza',
        images: ['images/5.jpg']
    },
];
let slide = document.getElementById('slide');
let slideItems = slide.getElementsByClassName('slide-item');
// let arrowLeft = slide.getElementsByClassName('prev')[0];
// let arrowRight = slide.getElementsByClassName('next')[0];
let closeIcon = slide.getElementsByClassName('fa-heart')[0];
let loveIcon = slide.getElementsByClassName('fa-times')[0];

let slideIndex = 1;

function renderUser() {
    for (i = 0; i < users.length; i++) {
        // create li element foreach user object
        let slideItemNode = document.createElement("li");
        slideItemNode.className = 'slide-item';
        // create div for user info and append p and span inside 
        let slideCapture = document.createElement('div');
        slideCapture.className = 'slide-capture';

        let usernameElement = document.createElement('p');
        let usernameText = document.createTextNode(users[i].name);
        usernameElement.appendChild(usernameText);

        let userAgeElement = document.createElement('span');
        let userAgeText = document.createTextNode(users[i].age);
        userAgeElement.appendChild(userAgeText);
        slideCapture.appendChild(usernameElement);
        slideCapture.appendChild(userAgeElement);
        slideItemNode.appendChild(slideCapture);

        let userImageNode = document.createElement("img");
        userImageNode.className = 'slide-image';
        let src = document.createAttribute("src");
        src.value = users[i].images[0];
        userImageNode.setAttributeNode(src);
        slideItemNode.appendChild(userImageNode);

        slide.appendChild(slideItemNode);
        slideItemNode.style.display = "none";
    }
}

// this function to create the li elemnt and it's content like the image and user name,age
renderUser();

// this function to show one slide at the slider
showSlides(slideIndex);

function showSlides(direction,n) {
    if (n > slideItems.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slideItems.length }
    for (i = 0; i < slideItems.length; i++) {
        slideItems[i].style.display = "none";
        slideItems[i].classList.remove('slideRight');
        slideItems[i].classList.remove('slideLeft');
    }
    if (direction == 'right') {
        slideItems[slideIndex - 1].className = 'slide-item slideRight';
    } else {
        slideItems[slideIndex - 1].className = 'slide-item slideLeft';
    }
    slideItems[slideIndex - 1].style.display = "block"
}

// this function trigger the showSlides FUNCTION to make it go to the next or prev slide, depends on the sllideIndex
function slideToTheNext(direction,n) {
    showSlides(direction,slideIndex += n);
}

// this event to go to prev slide
closeIcon.addEventListener('click', () => {
    slideToTheNext('left',-1);
})


// this event to go to the next slide
loveIcon.addEventListener('click', () => {
    slideToTheNext('right',1);
})

