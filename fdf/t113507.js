/**
 * Animates all "back to top" links of the forum.
 * (Works in all versions).
 *
 * @author Luiz Felipe F. <https://lffg.github.io>
 * @see https://ajuda.forumeiros.com/t113507-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf
 * @license MIT
 */

(function($) {
  'use strict';

  $(function() {
    $('a[href="#top"]').on('click', function(event) {
      event.preventDefault();

      $('html, body')
        .stop()
        .animate({ scrollTop: 0 }, 'slow');
    });
  });
})(jQuery);
