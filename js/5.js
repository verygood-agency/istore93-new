(function ($) {
  "use strict";
  Drupal.behaviors.simple_recaptcha_buttons = {
    attach: function (context, drupalSettings) {
      function recaptchaButtons(formIds) {
        for(let formId in formIds) {
          const $form = $('form[data-recaptcha-id="' + formId + '"]');
          // Count submit buttons inside of form
          // if there's only 1 submit we're good to go.
          let count = $form.find('input[type="submit"]').length;
          if(count === 1) {
            $form.find('[type="submit"]').addClass('simple-recaptcha-submit');
            continue;
          }

          // Lookup for FAPI primary button ( '#button_type' => 'primary' )
          // @see https://www.drupal.org/node/1848288
          const $primary = $form.find('.button--primary');
          if($primary.length > 0) {
            $form.find('.button--primary').addClass('simple-recaptcha-submit');
            continue;
          }

          // Fallback - last available submit element.
          $form.find('[type="submit"]').last().addClass('simple-recaptcha-submit');

        }
      }
      if (typeof drupalSettings.simple_recaptcha !== 'undefined') {
        recaptchaButtons(drupalSettings.simple_recaptcha.form_ids);
      }

      if (typeof drupalSettings.simple_recaptcha_v3 !== 'undefined') {
        recaptchaButtons(drupalSettings.simple_recaptcha_v3.forms);
      }

    }
  }
})(jQuery);
;
(function ($) {
  "use strict";
  Drupal.behaviors.simple_recaptcha_v3 = {
    attach: function (context, drupalSettings) {
      // Grab form IDs from settings and loop through them.
       for( let formId in drupalSettings.simple_recaptcha_v3.forms) {
        const $form = $('form[data-recaptcha-id="' + formId + '"]');
          let formSettings = drupalSettings.simple_recaptcha_v3.forms[formId];
          $form.once("simple-recaptcha").each(function () {
          $form.find('input[name="simple_recaptcha_score"]').val(formSettings.score);

          // Disable submit buttons on form.
          const $submit = $form.find('.simple-recaptcha-submit');
          $submit.attr("data-disabled", "true");
          $submit.attr('data-html-form-id', $form.attr("id"));
          const $captcha = $(this).closest("form").find(".recaptcha-wrapper");
          const captchas = [];

          // AJAX forms - add submit handler to form.beforeSend.
          // Update Drupal.Ajax.prototype.beforeSend only once.
          if (typeof Drupal.Ajax !== 'undefined' && typeof Drupal.Ajax.prototype.beforeSubmitSimpleRecaptchaOriginal === 'undefined') {
            Drupal.Ajax.prototype.beforeSubmitSimpleRecaptchaOriginal = Drupal.Ajax.prototype.beforeSubmit;
            Drupal.Ajax.prototype.beforeSubmit = function (form_values, element_settings, options) {
              let currentFormIsRecaptcha = form_values.find(function (form_id) {
                return form_id.value === formId;
              });
              if (typeof currentFormIsRecaptcha !== 'undefined') {
                let $element = $(this.element);
                let isFormActions = $element
                    .closest('.form-actions').length;
                let token = $form.find('input[name="simple_recaptcha_token"]').val();
                if (isFormActions && (typeof token === 'undefined' || token === '')) {
                  this.ajaxing = false;
                  return false;
                }
              }
              return this.beforeSubmitSimpleRecaptchaOriginal(this, arguments);
            }
          }

          $submit.on("click", function (e) {
            if ($(this).attr("data-disabled") === "true") {
              // Get HTML IDs for further processing.
              const formHtmlId = $form.attr("id");

              // Find captcha wrapper.
              const $captcha = $(this).prev(".recaptcha-v3-wrapper");

              if ( typeof captchas[formHtmlId] === 'undefined' ) {
                e.preventDefault();
                $captcha.hide();
                grecaptcha.ready(function () {
                  captchas[formHtmlId] = grecaptcha.execute(drupalSettings.simple_recaptcha_v3.sitekey, {action: formSettings.action}).then(function (token) {
                    const $currentSubmit = $('[data-html-form-id="' + formHtmlId + '"]');
                    $form.find('input[name="simple_recaptcha_token"]').val(token);
                    $form.find('input[name="simple_recaptcha_message"]').val(formSettings.error_message);
                    $currentSubmit.removeAttr("data-disabled");
                    // Click goes for regular forms, mousedown for AJAX forms.
                    $currentSubmit.click();
                    $currentSubmit.mousedown();
                  });
                });
              }
              e.preventDefault();
            }
          });
        });
      }
    }
  };
})(jQuery);
;
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(A){var a,e=navigator.userAgent,R=/iphone/i.test(e),S=/chrome/i.test(e),T=/android/i.test(e);A.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},A.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden")&&this.get(0)===document.activeElement)return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,p){var n,v,b,k,y,x,j;if(!t&&0<this.length){var e=A(this[0]).data(A.mask.dataName);return e?e():void 0}return p=A.extend({autoclear:A.mask.autoclear,placeholder:A.mask.placeholder,completed:null},p),n=A.mask.definitions,v=[],b=x=t.length,k=null,t=String(t),A.each(t.split(""),function(e,t){"?"==t?(x--,b=e):n[t]?(v.push(new RegExp(n[t])),null===k&&(k=v.length-1),e<b&&(y=v.length-1)):v.push(null)}),this.trigger("unmask").each(function(){var o=A(this),c=A.map(t.split(""),function(e,t){if("?"!=e)return n[e]?u(t):e}),l=c.join(""),i=o.val();function r(){if(p.completed){for(var e=k;e<=y;e++)if(v[e]&&c[e]===u(e))return;p.completed.call(o)}}function u(e){return e<p.placeholder.length?p.placeholder.charAt(e):p.placeholder.charAt(0)}function s(e){for(;++e<x&&!v[e];);return e}function f(e,t){var n,a;if(!(e<0)){for(n=e,a=s(t);n<x;n++)if(v[n]){if(!(a<x&&v[n].test(c[a])))break;c[n]=c[a],c[a]=u(a),a=s(a)}m(),o.caret(Math.max(k,e))}}function h(e){d(),o.val()!=i&&o.change()}function g(e,t){for(var n=e;n<t&&n<x;n++)v[n]&&(c[n]=u(n))}function m(){o.val(c.join(""))}function d(e){for(var t,n=o.val(),a=-1,i=0,r=0;i<x;i++)if(v[i]){for(c[i]=u(i);r++<n.length;)if(t=n.charAt(r-1),v[i].test(t)){c[i]=t,a=i;break}if(r>n.length){g(i+1,x);break}}else c[i]===n.charAt(r)&&r++,i<b&&(a=i);return e?m():a+1<b?p.autoclear||c.join("")===l?(o.val()&&o.val(""),g(0,x)):m():(m(),o.val(o.val().substring(0,a+1))),b?i:k}o.data(A.mask.dataName,function(){return A.map(c,function(e,t){return v[t]&&e!=u(t)?e:null}).join("")}),o.one("unmask",function(){o.off(".mask").removeData(A.mask.dataName)}).on("focus.mask",function(){var e;o.prop("readonly")||(clearTimeout(a),i=o.val(),e=d(),a=setTimeout(function(){o.get(0)===document.activeElement&&(m(),e==t.replace("?","").length?o.caret(0,e):o.caret(e))},10))}).on("blur.mask",h).on("keydown.mask",function(e){var t,n,a;o.prop("readonly")||(t=e.which||e.keyCode,j=o.val(),8===t||46===t||R&&127===t?(n=(a=o.caret()).begin,(a=a.end)-n==0&&(n=46!==t?function(e){for(;0<=--e&&!v[e];);return e}(n):a=s(n-1),a=46===t?s(a):a),g(n,a),f(n,a-1),e.preventDefault()):13===t?h.call(this,e):27===t&&(o.val(i),o.caret(0,d()),e.preventDefault()))}).on("keypress.mask",function(e){var t,n,a,i;o.prop("readonly")||(i=e.which||e.keyCode,t=o.caret(),e.ctrlKey||e.altKey||e.metaKey||i<32||i&&13!==i&&(t.end-t.begin!=0&&(g(t.begin,t.end),f(t.begin,t.end-1)),(n=s(t.begin-1))<x&&(i=String.fromCharCode(i),v[n].test(i)&&(function(e){for(var t,n,a=e,i=u(e);a<x;a++)if(v[a]){if(t=s(a),n=c[a],c[a]=i,!(t<x&&v[t].test(n)))break;i=n}}(n),c[n]=i,m(),a=s(n),T?setTimeout(function(){A.proxy(A.fn.caret,o,a)()},0):o.caret(a),t.begin<=y&&r())),e.preventDefault()))}).on("input.mask paste.mask",function(){o.prop("readonly")||setTimeout(function(){var e=d(!0);o.caret(e),r()},0)}),S&&T&&o.off("input.mask").on("input.mask",function(e){var t=o.val(),n=o.caret();if(j&&j.length&&j.length>t.length){for(d(!0);0<n.begin&&!v[n.begin-1];)n.begin--;if(0===n.begin)for(;n.begin<k&&!v[n.begin];)n.begin++;o.caret(n.begin,n.begin)}else{d(!0);t=t.charAt(n.begin);n.begin<x&&(v[n.begin]||n.begin++,v[n.begin].test(t)&&n.begin++),o.caret(n.begin,n.begin)}r()}),d()})}})});;
!function(e){Drupal.behaviors.maskedinputTel={attach:function(t,a){e('[type="tel"]').mask("+7 (999) 999-99-99")}}}(jQuery);;
