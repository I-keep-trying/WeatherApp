var Background = (function() {
  'use strict';
  // placeholder for cached DOM elements
  var DOM = {};
  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$background = $('#background');
  }

  // coordinate async assembly of image element and rendering
  function loadImage() {
    var baseUrl = 'https://source.unsplash.com/';
    var feature = 'daily',
        cat    = 'water';
    buildElement(baseUrl +feature + '?' + cat)
      .then(render);
  }

  // assemble the image element
  function buildElement(source) {
    var deferred = $.Deferred(function (task) {
      var image = new Image();
      image.onload = function () {
        task.resolve(image);
      };
      image.onerror = function () {
        task.reject();
      };
      image.src = source;
    });
    return deferred.promise();
  }
  
  // render DOM
  function render(image) { 
    DOM.$background
      .append(image)
      .css('opacity', 1);
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    loadImage();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());