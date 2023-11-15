const corusel = document.getElementsByClassName('corusel')[0];
const forma = document.querySelector('form');
const imgcontainer = document.getElementsByClassName('imgcontainer')[0]; // Updated to access first item in the collection
const up = document.getElementsByClassName('up')[0];
const down = document.getElementsByClassName('down')[0];

const imgs = ['xiomi.png', 'iphonex.jpg', 'redmi.png', 'pixel.png', 'iphonese.jpg', 'iphone11.jpg', 'iphonee11.jpg', 'iphone14.jpg', 'iphone15.jpg'];

// Variable to keep track of the current selected radio input index
let currentImgIndex = 0;
// Variable to store interval ID
let intervalId; 

const fillCorusel = (imgs) => {
  for (let i = 0; i < imgs.length; i++) {
    if (i === 0) {
      forma.innerHTML += `<input type='radio' checked=true id=${imgs[i]} value=${imgs[i]} name=phone /><br>`;
    } else {
      forma.innerHTML += `<input type='radio' id=${imgs[i]} value=${imgs[i]} name=phone /><br>`;
    }
  }
}

fillCorusel(imgs);

// Get all radio inputs
const radioInputs = document.querySelectorAll('input[type="radio"]');

// Add change event listener to each radio input
const changeImgs = (radios, imgs) => {
  radios.forEach((input, i) => {
    input.addEventListener('change', () => {
      if (input.checked) {
        const selectedImg = imgs.find(img => img === input.value); // Find the selected image
        imgcontainer.style.backgroundImage = `url(./imgs/${selectedImg})`; // Set the background image of the imgcontainer
        currentImgIndex = i;
      }
    });
  });
}

// Function to scroll images
const scrollImages = (direction, imgs) => {
  currentImgIndex = (direction === 'up') ? (currentImgIndex - 1 + imgs.length) % imgs.length : (currentImgIndex + 1) % imgs.length;
  radioInputs[currentImgIndex].checked = true;
  let selectedImg = imgs[currentImgIndex];
  imgcontainer.style.backgroundImage = `url(./imgs/${selectedImg})`;
};

// Add event listeners for scrolling
up.addEventListener('click', () => {
  scrollImages('up', imgs);
});

down.addEventListener('click', () => {
  scrollImages('down', imgs);
});

// Function to change images automatically
const automaticImageChange = (radios, imgs) => {
  intervalId = setInterval(() => {
    currentImgIndex = (currentImgIndex + 1) % imgs.length;
    radios[currentImgIndex].checked = true;
    const selectedImg = imgs[currentImgIndex];
    imgcontainer.style.backgroundImage = `url(./imgs/${selectedImg})`;
  }, 5000);
};

// Call functions to set up behavior
changeImgs(radioInputs, imgs);
automaticImageChange(radioInputs, imgs);
