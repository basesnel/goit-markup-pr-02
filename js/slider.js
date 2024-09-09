const sliderLine = document.querySelector('.slider__line');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
const dots = document.querySelectorAll('.slider__dot');
const itemWidth = sliderLine.offsetWidth;
console.log(itemWidth);
console.dir(sliderLine);

let position = 0;
let dotIndex = 0;

const nextSlide = () => {
  if (position < (dots.length - 1) * itemWidth) {
    position += itemWidth;
    dotIndex++;
  } else {
    position = 0;
    dotIndex = 0;
  }

  sliderLine.style.transform = `translateX(${-position}px)`;
  thisSlide(dotIndex);
};

const prevSlide = () => {
  if (position > 0) {
    position -= itemWidth;
    dotIndex--;
  } else {
    position = (dots.length - 1) * itemWidth;
    dotIndex = dots.length - 1;
  }

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
//     position = itemWidth * index;
//     sliderLine.style.left = -position + 'px';
//     dotIndex = index;
//     thisSlide(dotIndex);
//   });
// });

for (const [index, dot] of dots.entries()) {
  dot.addEventListener('click', () => {
    position = itemWidth * index;
    sliderLine.style.transform = `translateX(${-position}px)`;
    dotIndex = index;
    thisSlide(dotIndex);
  });
}

setInterval(() => {
  nextSlide();
}, 10000);
