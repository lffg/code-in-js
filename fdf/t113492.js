/**
 * Forum background image selector.
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
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
      return $('<div class="lffg-bgimage__choice">')
        .attr('data-image', image)
        .html($('<img />', { src: image }).prop('outerHTML'))
        .prop('outerHTML');
    });

    return $(
      [
        '<div class="lffg-bgimage lffg-bgimage--hidden">',
        '  <a class="lffg-bgimage__toggler" title="Mudar a imagem de fundo">',
        '    <span><i class="fa fa-paint-brush"></i></span>',
        '  </a>',
        '  <div class="lffg-bgimage__inner">',
        '    <header class="lffg-bgimage__header">',
        '      <span>Selecionar Imagem de Fundo</span>',
        '    </header>',
        '    <div class="lffg-bgimage__picker-wrapper">',
        '      <div class="lffg-bgimage__picker">',
        '        ' + choicesList.join('\n'),
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n')
    );
  }

  function handleToggle() {
    var $target = $(this);

    $target.parents('.lffg-bgimage').toggleClass('lffg-bgimage--hidden');
  }

  function setBg() {
    if (!'localStorage' in window) {
      return false;
    }

    var image = function() {
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
      .on('click', function(event) {
        event.stopPropagation();
      })
      .on('click', '.lffg-bgimage__toggler', handleToggle)
      .on('click', '.lffg-bgimage__choice', handleChange)
      .appendTo('body');

    $(window).on('click', function() {
      if (!$('.lffg-bgimage').is('.lffg-bgimage--hidden')) {
        $('.lffg-bgimage').addClass('lffg-bgimage--hidden');
      }
    });

    $('<style>', { text: styles.join('\n') }).appendTo('head');
  });
})(jQuery, 'lffg-current-bgimage', [
  '.lffg-bgimage {',
  '  display: block;',
  '  border: solid 1px #ddd;',
  '  border-left: 0;',
  '  position: fixed;',
  '  top: 10vh;',
  '  left: 0;',
  '  background-color: #fff;',
  '  box-shadow: 4px 4px rgba(0, 0, 0, 0.39);',
  '  z-index: 9999;',
  '  transition: all ease-in-out 300ms;',
  '}',
  '',
  '.lffg-bgimage.lffg-bgimage--hidden {',
  '  transform: translateX(calc(-100% - 25px));',
  '}',
  '',
  '.lffg-bgimage__toggler {',
  '  display: flex;',
  '  justify-content: center;',
  '  align-items: center;',
  '  width: 45px;',
  '  height: 45px;',
  '  position: absolute;',
  '  border: solid 1px #ddd;',
  '  left: calc(100% + 1px + 1.5rem);',
  '  background-color: #fff;',
  '  font-size: 23px;',
  '  color: #39c !important;',
  '  box-shadow: 4px 4px rgba(0, 0, 0, 0.39);',
  '  transition: all linear 95ms;',
  '  cursor: pointer;',
  '}',
  '',
  '.lffg-bgimage__toggler::before {',
  '  content: "";',
  '  width: 15px;',
  '  height: 15px;',
  '  border: solid 1px transparent;',
  '  border-top-color: #ddd;',
  '  border-left-color: #ddd;',
  '  background-color: #fff;',
  '  transform: rotate(-45deg);',
  '  position: absolute;',
  '  left: -8px;',
  '  z-index: 2;',
  '  transition: all linear 95ms;',
  '}',
  '',
  '.lffg-bgimage__toggler:hover,',
  '.lffg-bgimage__toggler:hover::before {',
  '  color: #fff !important;',
  '  background-color: #39c;',
  '}',
  '',
  '.lffg-bgimage__toggler span {',
  '  position: relative;',
  '  z-index: 2;',
  '}',
  '',
  '.lffg-bgimage__header {',
  '  padding: 1rem;',
  '  border-bottom: solid 1px #ddd;',
  '  background-color: #39c;',
  '  color: #fff;',
  '  font-family: "Trebuchet MS", sans-serif;',
  '  font-size: 1.15rem;',
  '  text-transform: uppercase;',
  '}',
  '',
  '.lffg-bgimage__picker-wrapper {',
  '  max-height: 300px;',
  '  overflow-y: scroll;',
  '}',
  '',
  '.lffg-bgimage__picker {',
  '  display: flex;',
  '  justify-content: center;',
  '  align-items: center;',
  '  flex-direction: column;',
  '}',
  '',
  '.lffg-bgimage__choice {',
  '  display: block;',
  '  width: 120px;',
  '  height: 120px;',
  '  margin-bottom: 1rem;',
  '  border: solid 1px #ddd;',
  '  border-radius: 500px;',
  '  overflow: hidden;',
  '  cursor: pointer;',
  '  transition: all linear 100ms;',
  '}',
  '',
  '.lffg-bgimage__choice:hover {',
  '  box-shadow: 0 0 0 5px #39c;',
  '}',
  '',
  '.lffg-bgimage__choice:first-child {',
  '  margin-top: 1rem;',
  '}',
  '',
  '.lffg-bgimage__choice img {',
  '  width: 140px;',
  '  height: 140px;',
  '}'
]);
