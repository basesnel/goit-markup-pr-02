const sliderLine = document.querySelector('.slider__line');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
const dots = document.querySelectorAll('.slider__dot');

let position = 0;
let dotIndex = 0;

const nextSlide = () => {
  if (position < (dots.length - 1) * 346) {
    position += 346;
    dotIndex++;
  } else {
    position = 0;
    dotIndex = 0;
  }

  // sliderLine.style.left = -position + 'px';
  sliderLine.style.transform = `translateX(${-position}px)`;
  thisSlide(dotIndex);
};

const prevSlide = () => {
  if (position > 0) {
    position -= 346;
    dotIndex--;
  } else {
    position = (dots.length - 1) * 346;
    dotIndex = dots.length - 1;
  }

  // sliderLine.style.left = -position + 'px';
  sliderLine.style.transform = `translateX(${-position}px)`;
  thisSlide(dotIndex);
};

const thisSlide = index => {
  for (let dot of dots) {
    dot.classList.remove('slider__dot--active');
  }
  dots[index].classList.add('slider__dot--active');
};

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// dots.forEach((dot, index) => {
//   dot.addEventListener('click', () => {
//     position = 346 * index;
//     sliderLine.style.left = -position + 'px';
//     dotIndex = index;
//     thisSlide(dotIndex);
//   });
// });

for (const [index, dot] of dots.entries()) {
  dot.addEventListener('click', () => {
    position = 346 * index;
    // sliderLine.style.left = -position + 'px';
    sliderLine.style.transform = `translateX(${-position}px)`;
    dotIndex = index;
    thisSlide(dotIndex);
  });
}

setInterval(() => {
  nextSlide();
}, 10000);
