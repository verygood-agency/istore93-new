
let homeSliderFull = document.querySelector('.slider-full');
if (homeSliderFull) {

  var swiper = new Swiper(".slider-full .mySwiper", {
    spaceBetween: 2,
    loop: true,
    centeredSlides: true,
    pagination: {
      el: ".slider-full .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-full .swiper-button-next",
      prevEl: ".slider-full .swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
      },
      // when window width is >= 320px
      651: {
        slidesPerView: 1.3,
      },
      // when window width is >= 480px
      769: {
        slidesPerView: 1.5,
      },
      // when window width is >= 640px
      1025: {
        slidesPerView: 3,
      }
    }
  });

}

if (document.querySelector('.main-slider') && document.querySelector('.thumbs-slider')) {
  // Создаем слайдер с миниатюрами
  const thumbsSlider = new Swiper('.thumbs-slider', {
    centeredSlides: false,
    initialSlide: 0,
    spaceBetween: 32,
    slideToClickedSlide: true,
    breakpoints: {

      320: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      650: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      870: {
        slidesPerView: 6,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });

  // Создаем основной слайдер
  const mainSlider = new Swiper('.main-slider', {
    slidesPerView: 1,
    // loop: true,
    navigation: {
      nextEl: '.main-slider .swiper-button-next',
      prevEl: '.main-slider .swiper-button-prev',
      // loop: true
    },
    thumbs: {
      swiper: thumbsSlider,
    }
  });

}





