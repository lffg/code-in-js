/**
 * Create a refresh button on the latest topics.
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * @see https://ajuda.forumeiros.com/t113295-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf/t113295.js
 * @license MIT
 */

(function ($, styles) {
<<<<<<< HEAD
  'use strict';

  const IMAGE_SOURCE = 'https://i.imgur.com/aTCsNba.png';
  const CONTENT_SELECTOR = '#comments_scroll_div';
=======
  "use strict";

  const IMAGE_SOURCE = "https://i.imgur.com/aTCsNba.png";
  const CONTENT_SELECTOR = "#comments_scroll_div";
>>>>>>> 54d379986f0e26ccfdd83318a8300b4defa07008

  function refreshContent() {
    const $self = $(this);

    // Prevent multiple clicks:
    if ($self.is(".in-use")) {
      return;
    }

    $self.addClass("in-use");

    $.get(window.location.pathname, function (response) {
      $(CONTENT_SELECTOR).html($(CONTENT_SELECTOR, response).html());
      $self.removeClass("in-use");
    });
  }

  $(function () {
<<<<<<< HEAD
    const $trigger = $('<img />', {
      src: IMAGE_SOURCE || 'https://i.imgur.com/aTCsNba.png'
=======
    const $trigger = $("<img />", {
      src: IMAGE_SOURCE || "https://i.imgur.com/aTCsNba.png",
>>>>>>> 54d379986f0e26ccfdd83318a8300b4defa07008
    })
      .addClass("lf-refresh-trigger")
      .on("click", refreshContent);

<<<<<<< HEAD
    $(CONTENT_SELECTOR).parents('.module').find('.h3').append($trigger);
=======
    $(CONTENT_SELECTOR).parents(".module").find(".h3").append($trigger);
>>>>>>> 54d379986f0e26ccfdd83318a8300b4defa07008

    $("head").append($("<style>", { text: styles.join("\n") }));
  });
})(jQuery, [
  ".h3 {",
  "  position: relative;",
  "}",
  "",
  ".lf-refresh-trigger {",
  "  cursor: pointer;",
  "  position: absolute;",
  "  top: 50%;",
  "  right: 10px;",
  "  transform: translateY(-50%);",
  "}",
  "",
  ".lf-refresh-trigger.in-use {",
  "  cursor: not-allowed;",
  "  opacity: .7;",
  "}",
]);
