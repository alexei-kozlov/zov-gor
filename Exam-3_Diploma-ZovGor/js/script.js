;(function ($) {
  $(function () {
    // To up window button
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 500) {
        $('.up-button').fadeIn();
      } else {
        $('.up-button').fadeOut();
      }
    });

    // Toggle mobile-menu
    $('.nav__btn-field').on('click', function () {
      $('.nav__btn-icon').toggleClass('nav__btn-icon--active');
      $('.nav__list').slideToggle(300).css('display', 'flex');
      $('.header').toggleClass('header--dark-bg');
    });

    // Toggle mobile-menu after choose menu-item
    /*if (window.width() < 700) {
      $('.nav__item, .nav__submenu-item, .nav__place-item').on('click', function () {
        $('.nav__list').css('display', 'none');
        $('.header').toggleClass('header');
        $('.nav__btn-icon').toggleClass('nav__btn-icon');
      });
    }*/

    // Menu & submenu PLACES work
    $('.nav__submenu--places').hide();
    $('.nav__item--places').mouseenter(function () {
      $(this).find('.nav__menu-link')
          .toggleClass('nav__menu-link--active');
      $(this)
          .find('.nav__submenu--places')
          .fadeToggle();
      $('.nav__submenu--places').show();
      $(this).mouseleave(function () {
        $('.nav__item--places .nav__menu-link')
            .removeClass('nav__menu-link--active');
        $('.nav__submenu--places').hide();
      });
    });
    // Menu & submenu TYPES work
    $('.nav__submenu--types').hide();
    $('.nav__item--types').mouseenter(function () {
      $(this).find('.nav__menu-link')
          .toggleClass('nav__menu-link--active');
      $(this)
          .find('.nav__item--types .nav__menu-link')
          .fadeToggle();
      $('.nav__submenu--types').show();
      $(this).mouseleave(function () {
        $('.nav__item--types .nav__menu-link')
            .removeClass('nav__menu-link--active');
        $('.nav__submenu--types')
            .hide();
      });
    });

    // Toggle read reviews more...
    $('.reviews__readmore').on('click', function () {
      $('.reviews__text').toggleClass('reviews__text--full');
      $(this).toggleClass('reviews__readmore--collapse');
    });

    // Toggle contacts coordinator...
    $('.route__modal-contacts').on('click', function () {
      $('.route__contacts-list').fadeToggle();
      $(this).text(($(this).text() === 'Скрыть контакты') ? 'Показать контакты' : 'Скрыть контакты');
    });
    $('.route__modal-price').on('click', function () {
      $('.route__price-list').fadeToggle();
      $(this).text(($(this).text() === 'Скрыть') ? 'Что входит?' : 'Скрыть');
    });

    // Responsive height map
    $('.route__map').css({'height': `$('.route__map').width() * .64`});

    // Header work as sticky-fixed after scroll
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 0) {
        $('.header').addClass('header--sticky');
        $('.nav').addClass('nav--sticky');
        $('.header__logo').addClass('header__logo--sticky');
      } else {
        $('.header').removeClass('header--sticky');
        $('.nav').removeClass('nav--sticky');
        $('.header__logo').removeClass('header__logo--sticky');
      }
    });

    //Move aside after resize window
    function mediaSize() {
      if (window.matchMedia('(max-width: 700px)').matches) {
        $('.nav__list').hide();
        $('.header__logo').addClass('header__logo--mobile');
      } else {
        $('.nav__list').show();
        $('.header__logo').removeClass('header__logo--mobile');
      }

      if (window.matchMedia('(max-width: 768px)').matches) {
        $('.route__main').prepend($('.route__sidebar-main'));
        $('.route__main').append($('.route__sidebar-bottom'));
        $('.route__sidebar').hide();
      } else {
        $('.route__sidebar').show();
        $('.route__sidebar').prepend($('.route__sidebar-main'));
        $('.route__sidebar').append($('.route__sidebar-bottom'));
      }
    }

    mediaSize();
    window.addEventListener('resize', mediaSize, false);

    // Validation submit form
    let regex = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    function validateField(val, fieldName) {
      let pattern = regex[fieldName];
      return pattern.test(val);
    }
    $('#form').on('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let email = $("#email"),
          data = {
            email: email.val()
          };
      if (!data.email || (data.email && !validateField(data.email, 'email'))) {
        email.prev('.contacts__error').show();
      } else {
        $.ajax({
          url: './php/backend.php',
          type: 'POST',
          data: data,
          success: function (response) {
            if (response && response.error) {
              console.log(response.error)
            } else {
              alert('Thanks you for contacting');
            }
          },
          error: function (jqXHR, textStatus) {
            console.log('ERRORS AJAX-requests: ' + textStatus);
          },
          complete: function () {
          }
        });
      }
    });
    $('#form input').on('keydown', function () {
      $(this).prev('.contacts__error').hide();
    });
  });

  // Tab-toggles
  $('.route__content-item').not(':first').hide();
  $('.route__tab-toggle').on('click', function () {
    $('.route__tab-toggle')
        .removeClass('route__tab-toggle--active')
        .eq($(this).index())
        .addClass('route__tab-toggle--active');
    $('.route__content-item')
        .hide()
        .eq($(this).index())
        .show()
  }).eq(0).addClass('route__tab-toggle--active');

  // Sort travel routes in the schedule
  $('.travels__sort-item').on('click', function () {
    $('.travels__sort-item')
        .removeClass('travels__sort-item--active')
        .eq($(this).index())
        .addClass('travels__sort-item--active');
    $('.travels__sort-icon')
        .hide()
        .eq($(this).index())
        .show()
        .toggleClass('travels__sort-icon--top-down');
  });

})(jQuery);

// Map section with custom icon
const thermalSprings = {lat: 43.38359927774014, lng: 42.36117805779969};

// const elbrus = {lat: 43.3499363, lng: 42.4278205};
// const khurzuk = {lat: 43.3499363, lng: 42.4278205};

// const marker = 'img/map-marker.png';
// let contentWindow = document.getElementById('info-window').outerHTML;
/*
function initMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 11,
        center: thermalSprings,
      }
  );
  const mapMarker = new google.maps.Marker({
    position: thermalSprings,
    map,
    icon: marker
  });
  const infoWindow = new google.maps.InfoWindow({
    content: contentWindow,
  });
  mapMarker.addListener("click", () => {
    infoWindow.open(map, mapMarker);
  });
}*/
