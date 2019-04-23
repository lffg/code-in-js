/**
 * Animates all "back to top" links of the forum.
 * (Works in all versions).
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * @see https://ajuda.forumeiros.com/t113507-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf
 * @license MIT
 */

;(function($) {
  $(function() {
    $('a[href="#top"]').on('click', function(event) {
      event.preventDefault()

      $('html, body')
        .stop()
        .animate({ scrollTop: 0 }, 'slow')
    })
  })
})(jQuery)
