'use strict';

///////////////////////////////////////
// Modal window

function cl(...a){
  console.log(...a);
}

function sel(a) {
  return document.querySelector(a);
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
      left: s1coords.left + window.pageXOffset, 
      top:  s1coords.top + window.pageYOffset,
      behavior: 'smooth'
    }
  );


});

// document.querySelectorAll('.nav__link').forEach
// (function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     sel(id).scrollIntoView({behavior: 'smooth'});
//   });
// });

sel('.nav__links').addEventListener
(
  'click',
  function(e) {
    e.preventDefault();
    if(e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      sel(id).scrollIntoView({behavior: 'smooth'});
    }
  }
);


// const h1 = document.querySelector('h1');

// const nameF = function() {
//   alert('AddeventLiens: gaesg');

//   h1.removeEventListener('mouseenter', nameF);
// }

// h1.addEventListener('mouseenter', nameF);


// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// sel('.nav__link').addEventListener('click', function(e){
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();

//   e.stopPropagation();
// });

// sel('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// });

// sel('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// });

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = sel('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));  
  
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');


});


const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el=> {
      if(el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));


nav.addEventListener('mouseout', handleHover.bind(1));

//const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   if(window.scrollY > initialCoords.y) {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);


const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver
(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
})

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

}

const imageObserver = new IntersectionObserver
(loadImg, {
  root: null,
  threshold: 0
});

imgTargets.forEach(img => imageObserver.observe(img));


const slides = document.querySelectorAll('.slide');

const slider = document.querySelector('.slider');
const btnLeft = sel('.slider__btn--left');
const btnRight = sel('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;


// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

const goToSlide = function(slide) {
  slides.forEach(
    (s, i) => s.style.transform = 
  `translateX(${(i - slide) * 100}%)`
  );
}

const nextSlide = function() {
  curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
}

const createDots = function() {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}


const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  sel(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');

}

const prevSlide = function() {
  curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
}


goToSlide(0);
createDots();
activateDot(0);

//next slide
btnRight.addEventListener('click', nextSlide);

//prev slide
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;    
    goToSlide(slide);
    activateDot(slide);
  }
});
