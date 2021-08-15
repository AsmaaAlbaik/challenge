
const users = [
    {
        name: 'Asmaa AlBaik',
        age: 25,
        location: 'Istanbul',
        images: ['images/3.jpg'],
        about: {
            graduation: 'Computer Engineer',
            location: '10 miles away'
        }
    },
    {
        name: 'Hussam AlBaik',
        age: 31,
        location: 'UAE',
        images: ['images/2.jpg'],
        about: {
            graduation: 'Civil Engineer',
            location: '1000 miles away'
        }
    },
    {
        name: 'Ahmed AlBaik',
        age: 30,
        location: 'UAE',
        images: ['images/4.jpg'],
        about: {
            graduation: 'Arch. Engineer',
            location: '1000 miles away'
        }
    },
    {
        name: 'Ibrahim AlBaik',
        age: 28,
        location: 'UK',
        images: ['images/1.jpg'],
        about: {
            graduation: 'Mechechanic Engineer',
            location: '5000 miles away'
        }
    },
    {
        name: 'Nisreen AlBaik',
        age: 29,
        location: 'Istanbul',
        images: ['images/2.jpg'],
        about: {
            graduation: 'IT',
            location: '10 miles away'
        }
    },
    {
        name: 'Huda AlBaik',
        age: 33,
        location: 'Gaza',
        images: ['images/5.jpg'],
        about: {
            graduation: 'Math',
            location: '600 miles away'
        }
    },
];
let slide = document.getElementById('slide');
let slideItems = slide.getElementsByClassName('slide-item');
// let slideContainer = document.getElementsByClassName('slide-container')[0];

// let arrowLeft = slide.getElementsByClassName('prev')[0];
// let arrowRight = slide.getElementsByClassName('next')[0];
let closeIcon = slide.getElementsByClassName('fa-heart')[0];
let loveIcon = slide.getElementsByClassName('fa-times')[0];

let slideIndex = 1;
let deltaX = 0;
let deltaY = 0;
let angle = 0;


function directionReset() {
    deltaX = 0;
    deltaY = 0;
    angle = 0;
}
// create new element and append nodetext on it;
function createMyElement(element, className = "", content = "") {
    let myElement = document.createElement(element);
    myElement.className = className;
    let nodeText = document.createTextNode(content);
    myElement.appendChild(nodeText);
    return myElement;
}

// create an attribute
function createMyAttribute(element, attr, value) {
    let myAttr = document.createAttribute(attr);
    myAttr.value = value;
    element.setAttributeNode(myAttr);
}

function renderUser() {
    for (i = 0; i < users.length; i++) {
        // create li element foreach user object
        let slideItemNode = document.createElement("li");
        slideItemNode.className = 'slide-item';
        // create div for user info and append p and span inside 
        let slideCapture = document.createElement('div');
        slideCapture.className = 'slide-capture fade';


        let usernameElement = document.createElement('p');
        let usernameText = document.createTextNode(users[i].name);
        usernameElement.appendChild(usernameText);

        let userAgeElement = document.createElement('span');
        let userAgeText = document.createTextNode(users[i].age);
        userAgeElement.appendChild(userAgeText);

        usernameElement.appendChild(userAgeElement);
        slideCapture.appendChild(usernameElement);

        let aboutListElement = document.createElement('ul');
        let aboutItemElement;
        for (const key in users[i].about) {
            aboutItemElement = document.createElement('li');
            aboutItemElement.innerHTML = `<i class="fas ${key == 'graduation' ? 'fa-graduation-cap' : 'fa-map-marker-alt'}">
            </i>  ${users[i].about[key]}`;
            // aboutItemElement.appendChild(aboutText);
            aboutListElement.appendChild(aboutItemElement);
        }


        slideCapture.appendChild(aboutListElement);
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

function showSlides(n) {
    if (n > slideItems.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slideItems.length }
    for (i = 0; i < slideItems.length; i++) {
        slideItems[i].style.display = "none";
        slideItems[i].classList.remove('active');
        slideItems[i].style.transform = 'none';
    }
    directionReset();
    slideItems[slideIndex - 1].className = 'slide-item active';
    slideItems[slideIndex - 1].style.display = "block"
}

// this function trigger the showSlides FUNCTION to make it go to the next or prev slide, depends on the sllideIndex
function slideToTheNext(n) {
    showSlides(slideIndex += n);
}

// this event to go to prev slide
loveIcon.addEventListener('click', () => {
    slideToTheNext(-1);
})


// this event to go to the next slide
closeIcon.addEventListener('click', () => {
    slideToTheNext(1);
})


// create a simple instance
// by default, it only adds horizontal recognizers
let mc = new Hammer(slide);
mc.set({ enable: true });
// listen to events...
mc.on("swipe", function (e) {
    deltaX = deltaX + e.deltaX;
    deltaY = deltaY + e.deltaY;
    angle = e.angle;
    let direction = e.offsetDirection;
    let translate = `translate(${deltaX}px, ${deltaY}px)`;
    console.log(e)
    if (direction === 4 || direction === 2) {
        let myActiveSlide;
        for (let slide of slideItems) {
            if (slide.classList.contains('active')) {
                // console.log('my active slide ',slide)
                myActiveSlide = slide;
                break;
            }
        }
        myActiveSlide.style.transition = 'transform 300ms ease-out'
        myActiveSlide.style.transform = `${translate} rotate(${angle < 0 ? '15deg' : '-15deg'})`;

        if ((Math.abs(deltaX) + 150) >= window.innerWidth || (Math.abs(deltaY) + 150) >= window.innerHeight) {
            if (deltaX < 0) {
                slideToTheNext(-1);
            } else {
                slideToTheNext(1);
            }
        }
        // if (e.isFinal) {
        //     directionReset();
        // }
    }
});