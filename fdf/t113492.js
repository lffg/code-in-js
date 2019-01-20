/**
 * Forum background image selector.
 *
 * @author Luiz Felipe F. <https://lffg.github.io>
 * @see https://ajuda.forumeiros.com/t113492-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf/t113492.js
 * @license MIT
 */

(function($, STORAGE_KEY, styles) {
  'use strict';

  var imageList = [
    'https://i.imgur.com/YQ2Dqwn.png', // The first one is the default.
    'https://i.imgur.com/ueLBrgI.png',
    'https://i.imgur.com/aABT55Q.jpg',
    'https://i.imgur.com/qgAqH4e.jpg',
    'https://i.imgur.com/hgQzQJ0.png'
  ];

  /**
   * Generates a new jQuery object to select the images.
   *
   * @return {object}
   */
  function generateElement() {
    var choicesList = $.map(imageList, function(image) {
      return $('<li class="lffg-bgimage__choice">')
        .attr('data-image', image)
        .html($('<img />', { src: image }).prop('outerHTML'))
        .prop('outerHTML');
    });

    return $(
      [
        '<div class="lffg-bgimage">',
        '  <header class="lffg-bgimage__header">',
        '    <span>Selecionar Imagem de Fundo</span>',
        '  </header>',
        '  <ul class="lffg-bgimage__picker">',
        '    ' + choicesList.join('\n'),
        '  </ul>',
        '</div>'
      ].join('\n')
    );
  }

  function setBg() {
    if (!'localStorage' in window) {
      return false;
    }

    const image = function() {
      return localStorage.getItem(STORAGE_KEY);
    };

    if (!image()) {
      // Set the first one of the list as the default.
      localStorage.setItem(STORAGE_KEY, imageList[0]);
    }

    $('body').css('background-image', 'url(' + image() + ')');
    return true;
  }

  function handleChange(event) {
    var $target = $(this);
    var image = $target.attr('data-image');

    localStorage.setItem(STORAGE_KEY, image);
    setBg();
  }

  $(function() {
    // Execute once and stop the script if the API is not supported.
    if (!setBg()) {
      return console.warn(
        '[LFFG Script] Your browser does not support the localStorage API.'
      );
    }

    generateElement()
      .on('click', '.lffg-bgimage__choice', handleChange)
      .appendTo('body');

    $('<style>', { text: styles.join('\n') }).appendTo('head');
  });
})(jQuery, 'lffg-current-bgimage', []);
