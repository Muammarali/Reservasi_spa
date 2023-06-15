var currentPage = window.location.pathname;

var maskerButton = document.querySelector('.pindah .btn-masker');
var scrubButton = document.querySelector('.pindah .btn-scrub');

if (currentPage.includes('/spaMasker')) {
  maskerButton.classList.add('active');
} else if (currentPage.includes('/spaScrub')) {
  scrubButton.classList.add('active');
}