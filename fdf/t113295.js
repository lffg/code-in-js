/**
 * Create a refresh button on the latest topics.
 *
 * @author Luiz Felipe F. <https://lffg.github.io>
 * @see https://ajuda.forumeiros.com/t113295-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf/t113295.js
 * @license MIT
 */

(function($, styles) {
  'use strict';

  var IMAGE_SOURCE = 'https://i.imgur.com/aTCsNba.png';
  var CONTENT_SELECTOR = '#comments_scroll_div';

  function refreshContent() {
    var $self = $(this);

    // Prevent multiple clicks:
    if ($self.is('.in-use')) {
      return;
    }

    $self.addClass('in-use');

    $.get(window.location.pathname, function(response) {
      $(CONTENT_SELECTOR).html($(CONTENT_SELECTOR, response).html());
      $self.removeClass('in-use');
    });
  }

  $(function() {
    var $trigger = $('<img />', {
      src: IMAGE_SOURCE || 'https://i.imgur.com/aTCsNba.png'
    })
      .addClass('lf-refresh-trigger')
      .on('click', refreshContent);

    $(CONTENT_SELECTOR)
      .parents('.module')
      .find('.h3')
      .append($trigger);

    $('head').append($('<style>', { text: styles.join('\n') }));
  });
})(jQuery, [
  '.h3 {',
  '  position: relative;',
  '}',
  '',
  '.lf-refresh-trigger {',
  '  cursor: pointer;',
  '  position: absolute;',
  '  top: 50%;',
  '  right: 10px;',
  '  transform: translateY(-50%);',
  '}',
  '',
  '.lf-refresh-trigger.in-use {',
  '  cursor: not-allowed;',
  '  opacity: .7;',
  '}'
]);
