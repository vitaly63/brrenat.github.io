$(document).ready(function(){
var x;
   Zepto(".main").onePageScroll({

      sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
      easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
                                       // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
      animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
      animationDelay: 300,
      pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
      updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
      beforeMove: function(index) {
         console.log("before index " + index);
         x = index;
         currentElement = $(document).find("[data-index='" + (index - 1) + "']").find('.wrap');
         nextElement = $(document).find("[data-index='" + index + "']").find('.wrap');
         currentElement.animate({scale: 0.9}, 300, 'ease-out');
         nextElement.animate({scale: 0.9}, 0, 'ease-out');

         if ( event.deltaY < 0 ) {
            fisrtAct = $(".onepage-pagination").find("[data-index='" + (index + 1) + "']");
            fisrtTop = fisrtAct.offset().top;
            secondAct = $(".onepage-pagination").find(".active");
            secondTop = secondAct.offset().top;

            $(".active-pagination").queueAnim([
               [ { 'translateY': (fisrtTop - 10) + 'px', 'scale': '0.5' }, 1000, 'ease-out' ],
               [ { 'translateY': (secondTop + 10) + 'px', 'scale': '0.5' }, 1000, 'ease-out' ],
               [ { 'translateY': secondTop + 'px', 'scale': '1' }, 1000, 'ease-out' ]
            ]);
         } else {
            fisrtAct = $(".onepage-pagination").find("[data-index='" + (index - 1) + "']");
            fisrtTop = fisrtAct.offset().top;
            secondAct = $(".onepage-pagination").find(".active");
            secondTop = secondAct.offset().top;
         
            $(".active-pagination").queueAnim([
              [ { 'translateY': (fisrtTop + 10) + 'px', 'scale': '0.5' }, 1000, 'ease-out' ],
              [ { 'translateY': (secondTop - 10) + 'px', 'scale': '0.5' }, 1000, 'ease-out' ],
              [ { 'translateY': secondTop + 'px', 'scale': '1' }, 1000, 'ease-out' ]
            ]);
         };
         // $(".active-pagination").animate("animationPagination", {duration:800, easing: 'ease-out'});
         
      },                               // This option accepts a callback function. The function will be called before the page moves.
      afterMove: function(index) {
      	currentElement.animate({scale: 1}, 00, 'ease-out');
      	nextElement.animate({scale: 1}, 300, 'ease-out');
         console.log("after index " + index);
         console.log("x index " + x);
      },                               // This option accepts a callback function. The function will be called after the page moves.
      loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
      keyboard: true,                  // You can activate the keyboard controls
      responsiveFallback: false        // You can fallback to normal page scroll by defining the width of the browser in which
                                       // you want the responsive fallback to be triggered. For example, set this to 600 and whenever 
                                       // the browser's width is less than 600, the fallback will kick in.
   });
});

$.fn.queueAnim = function (steps, callback) {
  var $selector = this;

  function iterator(step) {
    step.push(iterate);
    $selector.animate.apply($selector, step); 
  }

  function iterate() {
    if (!steps.length) return callback && callback();
    
    var step = steps.shift();
    iterator(step);
  }

  iterate();
}