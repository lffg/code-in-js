/**
 * Creates a post badge for each post.
 * (Only works in phpBB3 and ModernBB).
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * @see https://ajuda.forumeiros.com/t113383-
 * @see https://github.com/lffg/code-in-js/blob/master/fdf/t113383.js
 * @license MIT
 */

/* eslint-disable no-param-reassign */

(function ($, styles) {
  'use strict';

  const colorMap = [
    {
      color: '#ff0000',
      text: 'Admin' // <-- HTML is not allowed here.
    },
    {
      color: '#000000',
      text: 'Staff'
    }
    // Kepp adding more objects.
  ];

  /**
   * Get the YIQ value of an hex color. {@link https://github.com/lffg/yiq}
   *
   * @param  {string} colorHex
   * @return {string}
   */
  function getYiq(colorHex) {
    if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorHex)) {
      return '#fff';
    }

    if (colorHex.length === 4) {
      colorHex = colorHex.replace(/^#(.)(.)(.)/i, '#$1$1$2$2$3$3');
    }

    const r = parseInt(colorHex.substr(1, 2), 16);
    const g = parseInt(colorHex.substr(3, 2), 16);
    const b = parseInt(colorHex.substr(5, 2), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
  }

  /**
   * Creates an HTML string of the post badge for a given text.
   *
   * @param  {string} text
   * @return {string}
   */
  function createEl(text, color, yiq) {
    /**
     * Returns a <span> that acts as an pseudo-element.
     *
     * @param  {string} className
     * @return {object}
     */
    function $pseudo(className) {
      return $('<span>')
        .css({ borderColor: color })
        .addClass('lffg-post-badge__' + className);
    }

    const $text = $('<span class="lffg-post-badge__text">')
      .css({ backgroundColor: color, color: yiq })
      .text(text) // <-- Prevent self-XSS.
      .prepend($pseudo('before'))
      .append($pseudo('after'));

    return '<div class="lffg-post-badge">' + $text.prop('outerHTML') + '</div>';
  }

  $(function () {
    $('.post').each(function () {
      const $post = $(this);
      const $user = $post.find('.postprofile-name a[href] > span[style]');
      const color = $user.css('color');

      if (!color) {
        return;
      }

      $.each(
        $.map(colorMap, function (map) {
          map.color = $('<span>').css('color', map.color).css('color');

          return map;
        }),
        // Big-O --> O(N^2)
        function (index, map) {
          if (map.color !== color) {
            return;
          }

          const yiq = getYiq(color);
          $post.append(createEl(map.text, color, yiq));
        }
      );
    });

    $('<style>', { text: styles.join('') }).appendTo('head');
  });
})(jQuery, [
  '.post {',
  '  position: relative;',
  '  z-index: 10;',
  '}',
  '',
  '.lffg-post-badge {',
  '  position: absolute;',
  '  right: -5px;',
  '  top: -5px;',
  '  z-index: 1;',
  '  overflow: hidden;',
  '  width: 75px;',
  '  height: 75px;',
  '  text-align: right;',
  '}',
  '',
  '.lffg-post-badge__text {',
  '  background-color: #000;',
  '  display: block;',
  '  width: 100px;',
  '  text-align: center;',
  '  position: absolute;',
  '  top: 19px;',
  '  right: -21px;',
  '  transform: rotate(45deg);',
  '}',
  '',
  '.lffg-post-badge__before,',
  '.lffg-post-badge__after {',
  '  position: absolute;',
  '  top: 100%;',
  '  z-index: -1;',
  '  border: 3px solid #000;',
  '}',
  '',
  '.lffg-post-badge__before {',
  '  left: 0;',
  '  border-right-color: transparent !important;',
  '  border-bottom-color: transparent !important;',
  '}',
  '',
  '.lffg-post-badge__after {',
  '  right: 0;',
  '  border-left-color: transparent !important;',
  '  border-bottom-color: transparent !important;',
  '}'
]);
