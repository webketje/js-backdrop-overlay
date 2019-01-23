(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.overlay = factory();
  }
}(typeof self !== 'undefined' ? self : this, function overlay() {
  'use strict';

  function defaults() {
    return {
      selector: '[data-overlay]',
      handle: null,
      class: 'content-overlay',
    }
  }

  function init(options) {
    var opts = defaults();

    if (typeof options === 'string')
      opts.selector = options;

    if (options)
      for (var prop in options)
        if (options.hasOwnProperty(prop))
          opts[prop] = options[prop];

    function onTriggerClick(e) {
      e.preventDefault();
      var div = document.createElement('div');
      div.classList.add(opts.class);
      div.innerHTML = e.currentTarget.innerHTML;
      if (opts.ontrigger)
        opts.ontrigger(div, e.currentTarget);
      document.body.appendChild(div);
    }

    var elements = document.querySelectorAll(opts.selector);

    if (opts.handle)
      for (var i = 0; i < elements.length; i++)
        elements[i].addEventListener('click', function (e) {
          var handles = e.currentTarget.querySelectorAll(opts.handle);
          if (Array.prototype.indexOf.call(handles, e.target) > -1)
            onTriggerClick(e);
        });
    else
      for (var j = 0; j < elements.length; j++)
        elements[j].addEventListener('click', onTriggerClick);
  }

  function call(method, args) {
    return method.apply(null, args);
  }

  function overlay() {
    var args = arguments;
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', function () {
        call(init, args);
      });
    else
      call(init, args);
  }

  overlay.image = function overlayWith(options) {
    return overlay({
      selector: options.selector || '[data-expand]',
      class: 'image-overlay',
      ontrigger: function (div) {
        div.innerHTML = '<div class="image-overlay__main">' + div.innerHTML + '<i data-action="close">&times;</i></div>'
        div.addEventListener('click', function (e) {
          if (e.target === div || e.target.dataset.action === 'close')
            div.parentNode.removeChild(div);
        });
      }
    });
  }

  return overlay;
}));