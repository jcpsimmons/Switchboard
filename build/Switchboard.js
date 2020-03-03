"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Switchboard.js by Josh Simmons
// https://github.com/jcpsimmons/switchboard
var Switchboard = /*#__PURE__*/function () {
  function Switchboard() {
    var verbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Switchboard);

    this.verbose = verbose;
    this.userData = {};

    this.consoleLog = function (data) {
      if (verbose) {
        console.log(data);
      }
    }; // Get a list of all document-level event listeners
    // Limited browser capability


    try {
      this.documentEventList = Object.keys(getEventListeners(document));
    } catch (e) {
      this.documentEventList = [];
    }
  } //   Create/fire event hooks when waiting for page elements


  _createClass(Switchboard, [{
    key: "listenEvent",
    value: function listenEvent(eventName, variableName) {
      var _this = this;

      if (variableName.search("window.") == 0 || this.documentEventList.indexOf(eventName) > -1) {
        console.error("Variable Name should be the name after window scope. Variable should not start with window.");
        return null;
      }

      var evnt = new Event(eventName);
      var anotherInterval = setInterval(function () {
        if (typeof window[variableName] !== "undefined") {
          clearInterval(anotherInterval);

          _this.consoleLog("".concat(variableName, " present, firing Event."));

          document.dispatchEvent(evnt);
        }
      }, 50);
    } //   Observe DOM changes on a target element

  }, {
    key: "monitorDomChange",
    value: function monitorDomChange() {
      var _this2 = this;

      var targetSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";
      var subtree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var targetNode = document.querySelector(targetSelector);
      var observerOptions = {
        childList: true,
        attributes: true,
        subtree: subtree
      };
      var evnt = new Event("DOMMutation");
      var observer = new MutationObserver(function () {
        document.dispatchEvent(evnt);

        _this2.consoleLog("DOM Mutation detected on ".concat(targetSelector));
      });
      observer.observe(targetNode, observerOptions);
    }
  }]);

  return Switchboard;
}();
