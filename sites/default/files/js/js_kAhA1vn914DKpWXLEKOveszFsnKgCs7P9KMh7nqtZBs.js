/**
 * @file
 * JavaScript behaviors for jQuery Text Counter integration.
 */

(function ($, Drupal) {

  'use strict';

  // @see https://github.com/ractoon/jQuery-Text-Counter#options
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.counter = Drupal.webform.counter || {};
  Drupal.webform.counter.options = Drupal.webform.counter.options || {};

  /**
   * Initialize text field and textarea word and character counter.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformCounter = {
    attach: function (context) {
      if (!$.fn.textcounter) {
        return;
      }

      $(context).find('.js-webform-counter').once('webform-counter').each(function () {
        var options = {
          type: $(this).data('counter-type'),
          max: $(this).data('counter-maximum'),
          min: $(this).data('counter-minimum') || 0,
          counterText: $(this).data('counter-minimum-message'),
          countDownText: $(this).data('counter-maximum-message'),
          inputErrorClass: 'webform-counter-warning',
          counterErrorClass: 'webform-counter-warning',
          countSpaces: true,
          twoCharCarriageReturn: true,
          stopInputAtMaximum: false,
          // Don't display min/max message since server-side validation will
          // display these messages.
          minimumErrorText: '',
          maximumErrorText: ''
        };

        options.countDown = (options.max) ? true : false;
        if (!options.counterText) {
          options.counterText = (options.type === 'word') ? Drupal.t('%d word(s) entered') : Drupal.t('%d character(s) entered');
        }
        if (!options.countDownText) {
          options.countDownText = (options.type === 'word') ? Drupal.t('%d word(s) remaining') : Drupal.t('%d character(s) remaining');
        }

        options = $.extend(options, Drupal.webform.counter.options);

        $(this).textcounter(options);
      });

    }
  };

})(jQuery, Drupal);
;
/**
 * @file
 * JavaScript behaviors for select menu.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Disable select menu options using JavaScript.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformSelectOptionsDisabled = {
    attach: function (context) {
      $('select[data-webform-select-options-disabled]', context).once('webform-select-options-disabled').each(function () {
        var $select = $(this);
        var disabled = $select.attr('data-webform-select-options-disabled').split(/\s*,\s*/);
        $select.find('option').filter(function isDisabled() {
          return ($.inArray(this.value, disabled) !== -1);
        }).attr('disabled', 'disabled');
      });
    }
  };

})(jQuery, Drupal);
;
