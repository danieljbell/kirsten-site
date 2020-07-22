(function () {

  init();

  function init() {

    if (window.location.pathname === '/') {
      setUpWaypoints();
    }

    this.pageHeader = document.querySelector('header');
    this.menuToggle = document.querySelector('#menuToggle');

    document.addEventListener('scroll', slimHeader);
    document.addEventListener('click', toggleSiteMenu);

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