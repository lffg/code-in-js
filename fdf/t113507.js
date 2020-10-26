/**
 * Animates all "back to top" links of the forum.
 * (Works in all versions).
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * @see https://ajuda.forumeiros.com/t113507-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf
 * @license MIT
 */

(function ($) {
<<<<<<< HEAD
  'use strict';

  $(function () {
    $('a[href="#top"]').on('click', function (event) {
      event.preventDefault();

      $('html, body').stop().animate({ scrollTop: 0 }, 'slow');
=======
  "use strict";

  $(function () {
    $('a[href="#top"]').on("click", function (event) {
      event.preventDefault();

      $("html, body").stop().animate({ scrollTop: 0 }, "slow");
>>>>>>> 54d379986f0e26ccfdd83318a8300b4defa07008
    });
  });
})(jQuery);
