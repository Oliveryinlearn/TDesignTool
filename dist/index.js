'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var TDesignTool = /*#__PURE__*/function () {
  function TDesignTool(config) {
    _classCallCheck(this, TDesignTool);

    this._start(config);
  }

  _createClass(TDesignTool, [{
    key: "_start",
    value: function _start(config) {
      window.addEventListener("keydown", this._handleKeyDown.bind(this));
      window.addEventListener("keyup", this._handleKeyUp.bind(this));
      window.addEventListener("mousemove", this._handleMousemove.bind(this));
      window.onblur = this._handleKeyUp.bind(this);
    }
  }, {
    key: "_handleKeyDown",
    value: function _handleKeyDown(event) {
      console.log(event.key.toLocaleLowerCase());
    }
  }, {
    key: "_handleKeyUp",
    value: function _handleKeyUp() {}
  }, {
    key: "_handleMousemove",
    value: function _handleMousemove() {}
  }], [{
    key: "init",
    value: function init(config) {
      if (!TDesignTool._initEnv()) throw new Error("环境异常");
      if (!TDesignTool._TDesignTool) TDesignTool._TDesignTool = new TDesignTool(config);
      return TDesignTool._TDesignTool;
    }
  }, {
    key: "_initEnv",
    value: function _initEnv() {
      if (typeof window === "undefined" || typeof document.body === "undefined") return false;
      return true;
    }
  }]);

  return TDesignTool;
}();

_defineProperty(TDesignTool, "_TDesignTool", void 0);

TDesignTool.init();
