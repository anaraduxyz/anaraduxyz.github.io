// ── Tab navigation: show one section at a time ──
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a[data-section]');
const allSectionLinks = document.querySelectorAll('a[data-section]');

function showSection(id) {
  sections.forEach(function(s) {
    s.style.display = s.id === id ? 'block' : 'none';
  });
  navLinks.forEach(function(a) {
    a.classList.toggle('active', a.dataset.section === id);
  });
}

allSectionLinks.forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    var id = this.dataset.section;
    history.pushState(null, '', '#' + id);
    showSection(id);
  });
});

// Handle back/forward browser navigation
window.addEventListener('popstate', function() {
  var id = location.hash.replace('#', '') || 'about';
  showSection(id);
});

// Show section based on URL hash, or default to 'about'
var initial = location.hash.replace('#', '') || 'about';
showSection(initial);

// ── Carousel ──
(function() {
  var slides = document.querySelectorAll('.carousel .slide');
  var dotsContainer = document.querySelector('.carousel-dots');
  var current = 0;
  var n = slides.length;

  if (!n) return;

  slides.forEach(function(_, i) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goTo(i); });
    dotsContainer.appendChild(dot);
  });

  function setClasses() {
    slides.forEach(function(s) { s.classList.remove('active', 'prev', 'next'); });
    slides[current].classList.add('active');
    slides[(current - 1 + n) % n].classList.add('prev');
    slides[(current + 1) % n].classList.add('next');

    var dots = document.querySelectorAll('.carousel-dots .dot');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
  }

  function goTo(idx) {
    current = (idx + n) % n;
    setClasses();
  }

  setClasses();

  document.querySelector('.carousel-btn.prev').addEventListener('click', function() { goTo(current - 1); });
  document.querySelector('.carousel-btn.next').addEventListener('click', function() { goTo(current + 1); });

  document.addEventListener('keydown', function(e) {
    if (document.getElementById('fieldwork').style.display === 'none') return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
})();

// ── Abstract toggle ──
document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('toggle-abstract')) return;
  e.preventDefault();
  var target = document.getElementById(e.target.dataset.target);
  if (!target) return;
  var isOpen = target.style.display === 'block';
  target.style.display = isOpen ? 'none' : 'block';
  e.target.textContent = isOpen ? '[Abstract]' : '[Hide abstract]';

});
