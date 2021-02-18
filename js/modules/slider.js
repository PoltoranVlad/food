function slider(){
    
    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    currentSlide = document.getElementById('current'),
    totalSlide = document.getElementById('total'),
    prevSlide = document.querySelector('.offer__slider-prev'),
    nextSlide = document.querySelector('.offer__slider-next'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderField = document.querySelector('.offer_slider-inner'),
    width = window.getComputedStyle(sliderWrapper).width;


let sliderIndex = 1;
let offset = 0;
const removeDigits = /\D/g;

function writeCurrentSlide() {
    if (slides.length < 10) {
        currentSlide.textContent = `0${sliderIndex}`;
    } else {
        currentSlide.textContent = sliderIndex;
    }
}

function navigateMark() {
    dots.forEach(dot => dot.classList.remove('slider-active'));
    dots[sliderIndex - 1].classList.add('slider-active');
}

if (slides.length < 10) {
    totalSlide.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${sliderIndex}`;
} else {
    totalSlide.textContent = slides.length;
    currentSlide.textContent = sliderIndex;
}

sliderField.style.width = 100 * slides.length + '%';
sliderField.style.display = 'flex';
sliderField.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});
slider.style.position = 'relative';

const indicators = document.createElement('ol');
indicators.classList.add('carousel-indicators');
slider.append(indicators);

const dots = [];

for (let i = 0; i < slides.length; i++) {

    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
        dot.classList.add('slider-active');
    }

    indicators.append(dot);
    dots.push(dot);
}

dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        sliderIndex = slideTo;

        offset = +width.replace(removeDigits, '') * (slideTo - 1);
        sliderField.style.transform = `translateX(-${offset}px)`;

        navigateMark();
        writeCurrentSlide();
    });
});

nextSlide.addEventListener('click', () => {
    if (offset == +width.replace(removeDigits, '') * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.replace(removeDigits, '');
    }
    sliderField.style.transform = `translateX(-${offset}px)`;

    if (sliderIndex == slides.length) {
        sliderIndex = 1;
    } else {
        sliderIndex++;
    }

    writeCurrentSlide();
    navigateMark();
});

prevSlide.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.replace(removeDigits, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(removeDigits, '');
    }
    sliderField.style.transform = `translateX(-${offset}px)`;

    if (sliderIndex == 1) {
        sliderIndex = slides.length;
    } else {
        sliderIndex--;
    }

    writeCurrentSlide();
    navigateMark();
});
}
export default slider;