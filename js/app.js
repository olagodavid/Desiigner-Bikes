$(document).foundation()

$(document).foundation()
// Create a clone of the menu, right next to original.
$('.menu').addClass('original').clone().insertAfter('.menu').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}
jQuery(document).ready(function($) {

  // set animation timing
  var animationDelay = 2500,
      // loading bar effect
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000, // 3s is the duration of the transition on the loading bar - set in CSS
      // letters effect
      lettersDelay = 50;

  initHeadline();

  function initHeadline() {
    // insert <i> element for each letter of a changing word
    singleLetters($('.cd-headline.letters').find('b'));
    // initialise headline animation
    animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
    $words.each(function() {
      var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
      for (i in letters) {
        if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
      }
      var newLetters = letters.join('');
      word.html(newLetters);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function() {
      var headline = $(this);
      var spanWrapper = headline.find('.cd-words-wrapper'),
          newWidth = spanWrapper.width() + 5;
      spanWrapper.css('width', newWidth);
      if(headline.hasClass('loading-bar')) {
        duration = barAnimationDelay;
        spanWrapper.css('width', '');
        setTimeout(function(){ spanWrapper.addClass('is-loading') }, barWaiting);
      };
