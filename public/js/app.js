/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_toggler_js__ = __webpack_require__(2);

$(document).ready(function (e) {
    $('.vsb.toggler').each(function () {
        new __WEBPACK_IMPORTED_MODULE_0__components_toggler_js__["a" /* default */]($(this));
    });
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toggler = function () {
    function Toggler(toggler) {
        _classCallCheck(this, Toggler);

        this.toggler = toggler;
        this.$toggler = $(this.toggler);
        console.debug('Toggler class', this);
        if (this.$toggler.hasClass('assigned')) return;
        this.$toggler.addClass('assigned');
        this.selector = $(this.toggler).data('target');
        this.$container = $('' + this.selector);
        if (!this.$container) console.error('data-target="' + this.selector + '" not found');
        this.draw();
        this.bind();
    }

    _createClass(Toggler, [{
        key: 'bind',
        value: function bind() {
            var _this = this;

            this.$toggler.on('click', function (e) {
                _this.redraw(_this.$toggler.hasClass('active'));
            });
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.toggler.append('<i class="fas fa-caret-down"></i>');
            this.$container.hide();
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            console.debug('redraw', this.$toggler.find('.fas'));
            if (active) {
                this.$container.slideUp();
                this.$toggler.removeClass('active');
                this.$toggler.find('.fas').removeClass('fa-caret-up').addClass('fa-caret-down');
            } else {
                this.$toggler.find('.fas').removeClass('fa-caret-down').addClass('fa-caret-up');
                this.$container.slideDown();
                this.$toggler.addClass('active');
            }
        }
    }]);

    return Toggler;
}();

/* harmony default export */ __webpack_exports__["a"] = (Toggler);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);