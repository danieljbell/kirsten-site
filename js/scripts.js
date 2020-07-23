(function () {

  init();

  function init() {

    if (window.location.pathname === '/' || window.location.pathname === '/work/') {
      setUpWaypoints();
    }

    this.pageHeader = document.querySelector('header');
    this.menuToggle = document.querySelector('#menuToggle');
    this.contactForm = document.querySelector('form[name="contact"]');

    document.addEventListener('scroll', slimHeader);
    document.addEventListener('click', toggleSiteMenu);

    if (this.contactForm) {
      contactForm.addEventListener('submit', submitContactForm);
    }

  }

  function slimHeader() {
    if (window.scrollY > 1 && !pageHeader.classList.contains('slim')) {
      pageHeader.classList.add('slim');
    }

    if (window.scrollY < 1) {
      pageHeader.classList.remove('slim');
    }
  }

  function toggleSiteMenu(e) {
    var elem = e.target.closest('.hamburger');
    if (!elem) { return; }
    elem.classList.toggle('is-active');
    document.body.classList.toggle('menu--is-open');
  }

})();


function setUpWaypoints() {
  const points = document.querySelectorAll('.work--item');
  points.forEach(function (point) {
    new Waypoint({
      element: point,
      handler: function (direction) {
        if (direction === 'down') {
          point.classList.add('animate')
        }
      },
      offset: '75%'
    });

    new Waypoint({
      element: point,
      handler: function (direction) {
        if (direction === 'up') {
          point.classList.remove('animate')
        }
      },
      offset: '100%'
    })
  });
}

function submitContactForm(e) {
  e.preventDefault();
  // console.log();
  atomic(e.target.action, {
    method: 'POST',
    data: serialize(e.target),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then(function (response) {
      console.log(response.data); // xhr.responseText
      console.log(response.xhr);  // full response
    })
    .catch(function (error) {
      console.log(error.status); // xhr.status
      console.log(error.statusText); // xhr.statusText
    });
}



/* 
====================
POLYFILL FOR CLOSEST
==================== 
*/
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
      do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) { };
      } while ((i < 0) && (el = el.parentElement));
      return el;
    };
}

/*
===============
SERIALIZE FORM
===============
*/
var serialize = function (form) {

  // Setup our serialized data
  var serialized = [];

  // Loop through each field in the form
  for (var i = 0; i < form.elements.length; i++) {

    var field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
      }
    }

    // Convert field data to a query string
    else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
    }
  }

  return serialized.join('&');

};