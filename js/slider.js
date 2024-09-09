const sliderLine = document.querySelector('.slider__line');
const sliderItems = document.querySelectorAll('.slider__slide');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
const dots = document.querySelectorAll('.slider__dot');

let dotIndex = 0;
let itemWidth;

const rollSlider = () => {
  sliderLine.style.transform = `translateX(-${dotIndex * itemWidth}px)`;
  thisSlide(dotIndex);
};

const nextSlide = () => {
  dotIndex++;

  if (dotIndex >= dots.length) {
    dotIndex = 0;
  }

  rollSlider();
};

const prevSlide = () => {
  dotIndex--;

  if (dotIndex < 0) {
    dotIndex = dots.length - 1;
  }

  rollSlider();
};

const thisSlide = index => {
  for (let dot of dots) {
    dot.classList.remove('slider__dot--active');
  }
  dots[index].classList.add('slider__dot--active');
};

const init = () => {
  itemWidth = document.querySelector('.slider__line').offsetWidth;

  sliderItems.forEach(item => {
    item.style.width = itemWidth + 'px';
  });

  rollSlider();
};

window.addEventListener('resize', init);

init();

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    dotIndex = index;
    rollSlider();
  });
});

// for (const [index, dot] of dots.entries()) {
//   dot.addEventListener('click', () => {
//     dotIndex = index;
//     rollSlider();
//   });
// }

setInterval(() => {
  nextSlide();
}, 10000);
