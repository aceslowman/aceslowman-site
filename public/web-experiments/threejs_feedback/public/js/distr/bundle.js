/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./public/js/main.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/components/geometry/CapsuleGeometry.js":
/*!**********************************************************!*\
  !*** ./public/js/components/geometry/CapsuleGeometry.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
  Implemented from a technique described here:
  http://paulbourke.net/geometry/capsule/

  PID2 taken from Paul Bourke's paulslib.h
  PID2 = 1.570796326794896619231322;

  ISSUES:

    add ability to add loops in middle segment

  COOL THINGS:

    using a positive PID2 will invert the caps
*/

var CapsuleGeometry = function CapsuleGeometry() {
  var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var N = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;
  var middleSegments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var geometry = new THREE.Geometry();
  var TWOPI = Math.PI * 2;

  var PID2 = 1.570796326794896619231322;

  var normals = [];

  // top cap
  for (var i = 0; i <= N / 4; i++) {
    for (var j = 0; j <= N; j++) {
      var theta = j * TWOPI / N;
      var phi = -PID2 + Math.PI * i / (N / 2);
      var vertex = new THREE.Vector3();
      var normal = new THREE.Vector3();
      vertex.x = radius * Math.cos(phi) * Math.cos(theta);
      vertex.y = radius * Math.cos(phi) * Math.sin(theta);
      vertex.z = radius * Math.sin(phi);
      vertex.z -= height / 2;
      normal.x = vertex.x;
      normal.y = vertex.y;
      normal.z = vertex.z;
      geometry.vertices.push(vertex);
      normals.push(normal);
    }
  }

  // middle segments
  for (var _i = 0; _i < middleSegments; _i++) {
    for (var _j = 0; _j <= N; _j++) {
      var _theta = _j * TWOPI / N;
      var _phi = -PID2 + Math.PI * (N / 4) / (N / 2);
      var _vertex = new THREE.Vector3();
      var _normal = new THREE.Vector3();
      _vertex.x = radius * Math.cos(_phi) * Math.cos(_theta);
      _vertex.y = radius * Math.cos(_phi) * Math.sin(_theta);
      _vertex.z = radius * Math.sin(_phi);
      _vertex.z += -height / 2 + _i * (height / middleSegments);
      _normal.x = _vertex.x;
      _normal.y = _vertex.y;
      _normal.z = _vertex.z;
      geometry.vertices.push(_vertex);
      normals.push(_normal);
    }
  }

  // bottom cap
  for (var _i2 = N / 4; _i2 <= N / 2; _i2++) {
    for (var _j2 = 0; _j2 <= N; _j2++) {
      var _theta2 = _j2 * TWOPI / N;
      var _phi2 = -PID2 + Math.PI * _i2 / (N / 2);
      var _vertex2 = new THREE.Vector3();
      var _normal2 = new THREE.Vector3();
      _vertex2.x = radius * Math.cos(_phi2) * Math.cos(_theta2);
      _vertex2.y = radius * Math.cos(_phi2) * Math.sin(_theta2);
      _vertex2.z = radius * Math.sin(_phi2);
      _vertex2.z += height / 2;
      _normal2.x = _vertex2.x;
      _normal2.y = _vertex2.y;
      _normal2.z = _vertex2.z;
      geometry.vertices.push(_vertex2);
      normals.push(_normal2);
    }
  }

  for (var _i3 = 0; _i3 <= N / 2 + middleSegments; _i3++) {
    for (var _j3 = 0; _j3 < N; _j3++) {
      var vec = new THREE.Vector4(_i3 * (N + 1) + _j3, _i3 * (N + 1) + (_j3 + 1), (_i3 + 1) * (N + 1) + (_j3 + 1), (_i3 + 1) * (N + 1) + _j3);

      if (_i3 == N / 4) {
        var face_1 = new THREE.Face3(vec.x, vec.y, vec.z, [//ok
        normals[vec.x], normals[vec.y], normals[vec.z]]);

        var face_2 = new THREE.Face3(vec.x, vec.z, vec.w, [normals[vec.x], normals[vec.z], normals[vec.w]]);

        geometry.faces.push(face_2);
        geometry.faces.push(face_1);
      } else {
        var _face_ = new THREE.Face3(vec.x, vec.y, vec.z, [normals[vec.x], normals[vec.y], normals[vec.z]]);

        var _face_2 = new THREE.Face3(vec.x, vec.z, vec.w, [normals[vec.x], normals[vec.z], normals[vec.w]]);

        geometry.faces.push(_face_);
        geometry.faces.push(_face_2);
      }
    }
  }

  geometry.computeFaceNormals();

  return geometry;
};

exports.default = CapsuleGeometry;

/***/ }),

/***/ "./public/js/entities/Camera.js":
/*!**************************************!*\
  !*** ./public/js/entities/Camera.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardEntity2 = __webpack_require__(/*! ./StandardEntity */ "./public/js/entities/StandardEntity.js");

var _StandardEntity3 = _interopRequireDefault(_StandardEntity2);

var _OrbitControls = __webpack_require__(/*! ../utilities/OrbitControls.js */ "./public/js/utilities/OrbitControls.js");

var _OrbitControls2 = _interopRequireDefault(_OrbitControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Camera Entity
*/

var Camera = function (_StandardEntity) {
  _inherits(Camera, _StandardEntity);

  function Camera() {
    _classCallCheck(this, Camera);

    return _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).apply(this, arguments));
  }

  _createClass(Camera, [{
    key: "setup",
    value: function setup() {
      this.aspect = this.manager.width / this.manager.height;
      this.useControls = true;

      this.camera = new THREE.PerspectiveCamera(75, // fov
      this.aspect, // aspect
      0.1, // near
      1000 // far
      );

      this.zoom = 7;
      // this.focalLength = this.camera.getFocalLength();
      this.focalLength = 9;

      this.camera.position.z = 2;
      this.camera.zoom = this.zoom;
      this.camera.updateProjectionMatrix();

      this.setupGUI();
      this.setupOrbit();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.orbitControls) this.orbitControls.update();
    }
  }, {
    key: "setupGUI",
    value: function setupGUI() {
      var _this2 = this;

      this.gui.camera = this.gui.addFolder('Camera');
      this.gui.camera.transform = this.gui.camera.addFolder('Transform');
      this.gui.camera.transform.position = this.gui.camera.transform.addFolder('Position');

      this.gui.camera.transform.position.add(this.camera.position, 'x').onChange(function () {
        _this2.cam.updateProjectionMatrix();
      });

      this.gui.camera.transform.position.add(this.camera.position, 'y').onChange(function () {
        _this2.cam.updateProjectionMatrix();
      });

      this.gui.camera.transform.position.add(this.camera.position, 'z').onChange(function () {
        _this2.cam.updateProjectionMatrix();
      });

      this.gui.camera.add(this, 'focalLength', 0, 150).onChange(function (value) {
        if (_this2.camera.isPerspectiveCamera) {
          _this2.camera.setFocalLength(value);
        }
        _this2.camera.updateProjectionMatrix();
      });

      this.gui.camera.add(this, 'zoom', 0, 10).onChange(function (value) {
        _this2.camera.zoom = value;
        _this2.camera.updateProjectionMatrix();
      });

      this.gui.camera.add(this, 'useControls').onChange(function (value) {
        if (_this2.orbitControls) {
          _this2.orbitControls.enabled = value;
        } else if (value) {
          _this2.setupControls();
        }
      });

      this.gui.camera.close();
    }
  }, {
    key: "setupOrbit",
    value: function setupOrbit() {
      this.orbitControls = new _OrbitControls2.default(this.camera, this.manager.renderer.domElement);
      this.orbitControls.enableDamping = true;
      this.orbitControls.dampingFactor = 0.8;
      // this.orbitControls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
      this.orbitControls.minDistance = 0.01;
      this.orbitControls.maxDistance = 10;
      // this.orbitControls.maxPolarAngle = Math.PI / 2;
      // this.orbitControls.autoRotate = true;
    }
  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
  }]);

  return Camera;
}(_StandardEntity3.default);

exports.default = Camera;

/***/ }),

/***/ "./public/js/entities/Capsule.js":
/*!***************************************!*\
  !*** ./public/js/entities/Capsule.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardEntity2 = __webpack_require__(/*! ./StandardEntity */ "./public/js/entities/StandardEntity.js");

var _StandardEntity3 = _interopRequireDefault(_StandardEntity2);

var _CapsuleGeometry = __webpack_require__(/*! ../components/geometry/CapsuleGeometry.js */ "./public/js/components/geometry/CapsuleGeometry.js");

var _CapsuleGeometry2 = _interopRequireDefault(_CapsuleGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Capsule Entity
*/

var Capsule = function (_StandardEntity) {
  _inherits(Capsule, _StandardEntity);

  function Capsule() {
    _classCallCheck(this, Capsule);

    return _possibleConstructorReturn(this, (Capsule.__proto__ || Object.getPrototypeOf(Capsule)).apply(this, arguments));
  }

  _createClass(Capsule, [{
    key: "setup",
    value: function setup() {
      this.radius = 1;
      this.height = 2;
      this.N = 16;
      this.middleSegments = 5;

      this.geometry = new _CapsuleGeometry2.default(this.radius, this.height, this.N, this.middleSegments);
      this.material = new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.DoubleSide });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Capsule;
}(_StandardEntity3.default);

exports.default = Capsule;

/***/ }),

/***/ "./public/js/entities/CapsuleGrid.js":
/*!*******************************************!*\
  !*** ./public/js/entities/CapsuleGrid.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardEntity2 = __webpack_require__(/*! ./StandardEntity */ "./public/js/entities/StandardEntity.js");

var _StandardEntity3 = _interopRequireDefault(_StandardEntity2);

var _Capsule = __webpack_require__(/*! ./Capsule */ "./public/js/entities/Capsule.js");

var _Capsule2 = _interopRequireDefault(_Capsule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//------------------------------------------------------------------------------
var CylinderGrid = function (_StandardEntity) {
  _inherits(CylinderGrid, _StandardEntity);

  function CylinderGrid() {
    _classCallCheck(this, CylinderGrid);

    return _possibleConstructorReturn(this, (CylinderGrid.__proto__ || Object.getPrototypeOf(CylinderGrid)).apply(this, arguments));
  }

  _createClass(CylinderGrid, [{
    key: "setup",
    value: function setup() {
      this.resolution = 14;
      this.scale = 0.4;
      this.gridspace = 0.7;
      this.wireframe = false;
      this.modulation = {
        speed: 0.1,
        depth: 0
      };

      this.group = new THREE.Group();
      this.capsules = [];

      this.generateGrid();

      this.group.scale.set(this.scale, this.scale, this.scale);

      this.scene.add(this.group);
      this.setupGUI();

      this.group.rotation.x = -(Math.PI / 4);
      this.group.rotation.y = -(Math.PI / 4);
    }
  }, {
    key: "generateGrid",
    value: function generateGrid() {
      this.capsules = [];

      for (var x = 0; x < this.resolution; x++) {
        for (var y = 0; y < this.resolution; y++) {
          var capsule = new _Capsule2.default(this.manager);
          var circum = this.scale / (this.resolution - 1);

          capsule.mesh.scale.set(circum / 2, circum / 2, circum / 2);

          capsule.mesh.position.x = (circum * x - this.scale / 2) * (1 + this.gridspace);
          capsule.mesh.position.y = (circum * y - this.scale / 2) * (1 + this.gridspace);

          capsule.mesh.rotation.z = Math.PI / 2;

          this.group.add(capsule.mesh);
          this.capsules.push(capsule);
        }
      }
    }
  }, {
    key: "setupGUI",
    value: function setupGUI() {
      var _this2 = this;

      this.gui.grid = this.gui.addFolder('Capsule Grid');

      this.gui.grid.add(this, 'scale', 0, 10).onChange(function () {
        _this2.group.scale.set(_this2.scale, _this2.scale, _this2.scale);
      });

      this.gui.grid.add(this, 'resolution', 0, 20).step(1).onChange(function () {
        for (var i = 0; i < _this2.capsules.length; i++) {
          _this2.group.remove(_this2.capsules[i].mesh);
        }
        _this2.generateGrid();
      });

      this.gui.grid.add(this, 'gridspace', 0, 5).onChange(function () {
        for (var x = 0, i = 0; x < _this2.resolution; x++) {
          for (var y = 0; y < _this2.resolution; y++, i++) {
            var circum = _this2.scale / (_this2.resolution - 1);

            _this2.capsules[i].mesh.position.x = (circum * x - _this2.scale / 2) * (1 + _this2.gridspace);
            _this2.capsules[i].mesh.position.y = (circum * y - _this2.scale / 2) * (1 + _this2.gridspace);
          }
        }
      });

      this.gui.grid.add(this.modulation, 'speed');
      this.gui.grid.add(this.modulation, 'depth');

      this.gui.grid.open();
    }
  }, {
    key: "update",
    value: function update() {
      var rot = Math.PI / 2 * Math.sin(this.clock.getElapsedTime());
      this.group.rotation.z = rot;

      for (var x = 0, i = 0; x < this.resolution; x++) {
        for (var y = 0; y < this.resolution; y++, i++) {
          this.capsules[i].mesh.position.z = Math.sin(this.clock.getElapsedTime() * this.modulation.speed + x * y) * this.modulation.depth;
        }
      }

      var z = Math.sin(this.clock.getElapsedTime() * this.modulation.speed) * this.modulation.depth;
      this.group.position.z = z;
    }
  }]);

  return CylinderGrid;
}(_StandardEntity3.default);

exports.default = CylinderGrid;

/***/ }),

/***/ "./public/js/entities/PointLight.js":
/*!******************************************!*\
  !*** ./public/js/entities/PointLight.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardEntity2 = __webpack_require__(/*! ./StandardEntity */ "./public/js/entities/StandardEntity.js");

var _StandardEntity3 = _interopRequireDefault(_StandardEntity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  PointLight Entity
*/

var PointLight = function (_StandardEntity) {
  _inherits(PointLight, _StandardEntity);

  function PointLight() {
    _classCallCheck(this, PointLight);

    return _possibleConstructorReturn(this, (PointLight.__proto__ || Object.getPrototypeOf(PointLight)).apply(this, arguments));
  }

  _createClass(PointLight, [{
    key: "setup",
    value: function setup() {
      this.intensity = 1;
      this.mesh = new THREE.PointLight(0xffffff, this.intensity);
      this.mesh.position.set(1, 1, 1);
      this.setupGUI();
      // this.setupHelpers();
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "setupGUI",
    value: function setupGUI() {
      this.gui.light = this.gui.addFolder("Light");
      this.gui.light.add(this.mesh, "intensity");
      this.gui.light.transform = this.gui.light.addFolder("Transform");
      this.gui.light.transform.add(this.mesh.position, "x");
      this.gui.light.transform.add(this.mesh.position, "y");
      this.gui.light.transform.add(this.mesh.position, "z");
    }
  }, {
    key: "setupHelpers",
    value: function setupHelpers() {
      this.lighthelper = new THREE.PointLightHelper(this.mesh, 0.1);
      this.scene.add(this.lighthelper);
    }
  }]);

  return PointLight;
}(_StandardEntity3.default);

exports.default = PointLight;

/***/ }),

/***/ "./public/js/entities/StandardEntity.js":
/*!**********************************************!*\
  !*** ./public/js/entities/StandardEntity.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Standard Entity
*/

var StandardEntity = function () {
  function StandardEntity(manager) {
    _classCallCheck(this, StandardEntity);

    this.manager = manager;
    this.clock = manager.clock;
    this.scene = manager.scene;
    this.gui = manager.gui;

    this.material = new THREE.MeshBasicMaterial();
    this.geometry = new THREE.Geometry();
    this.mesh = new THREE.Mesh();

    this.components = [];

    this.setup();
    this.addToScene();
  }

  _createClass(StandardEntity, [{
    key: "setup",
    value: function setup() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "addToScene",
    value: function addToScene() {
      this.scene.add(this.mesh);
      this.manager.addEntity(this);
    }
  }]);

  return StandardEntity;
}();

exports.default = StandardEntity;

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardManager = __webpack_require__(/*! ./system/StandardManager */ "./public/js/system/StandardManager.js");

var _StandardManager2 = _interopRequireDefault(_StandardManager);

var _FeedbackManager = __webpack_require__(/*! ./system/FeedbackManager */ "./public/js/system/FeedbackManager.js");

var _FeedbackManager2 = _interopRequireDefault(_FeedbackManager);

var _Capture = __webpack_require__(/*! ./utilities/Capture */ "./public/js/utilities/Capture.js");

var _Capture2 = _interopRequireDefault(_Capture);

var _Debug = __webpack_require__(/*! ./utilities/Debug */ "./public/js/utilities/Debug.js");

var _Debug2 = _interopRequireDefault(_Debug);

var _CapsuleGrid = __webpack_require__(/*! ./entities/CapsuleGrid */ "./public/js/entities/CapsuleGrid.js");

var _CapsuleGrid2 = _interopRequireDefault(_CapsuleGrid);

var _Camera = __webpack_require__(/*! ./entities/Camera */ "./public/js/entities/Camera.js");

var _Camera2 = _interopRequireDefault(_Camera);

var _PointLight = __webpack_require__(/*! ./entities/PointLight */ "./public/js/entities/PointLight.js");

var _PointLight2 = _interopRequireDefault(_PointLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var manager = void 0,
    debug = void 0,
    capturer = void 0,
    camera = void 0,
    grid = void 0,
    light = void 0;

var setup = function setup() {
  manager = new _FeedbackManager2.default();

  grid = new _CapsuleGrid2.default(manager);

  light = new _PointLight2.default(manager);

  debug = new _Debug2.default(manager, {
    stats: true,
    grid: false
  });

  capturer = new _Capture2.default(manager, {
    verbose: false,
    display: true,
    framerate: 100,
    format: 'png',
    workersPath: 'js/utils/'
  });
};

var render = function render() {
  requestAnimationFrame(render);

  debug.stats.begin();
  manager.update();
  debug.stats.end();

  capturer.capture(manager.canvas);
};

var bindEventListeners = function bindEventListeners() {
  window.addEventListener('resize', manager.onWindowResize.bind(manager), false);
};

setup();
bindEventListeners();
render();

/***/ }),

/***/ "./public/js/shaders/feedback.js":
/*!***************************************!*\
  !*** ./public/js/shaders/feedback.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var vert = "\nvarying vec2 vUv;\n\nvoid main()\t{\n    vUv = uv;\n    gl_Position = vec4( position, 1.0 );\n}\n";

var frag = "\nuniform sampler2D tex0;\nuniform sampler2D tex1;\nvarying vec2 vUv;\n\nuniform float feedback;\nuniform float scale;\n\nuniform vec2 vPoint;\n\nvoid main(){\n\n    vec4 color;\n\n    vec2 uv = vUv;\n    vec2 uv2 = uv;\n\n    uv2 -= vPoint;\n    uv2 += vPoint/scale;\n    uv2 *= scale;\n\n    vec4 current = texture2D(tex1, uv);\n    vec4 fb = texture2D(tex0, uv2);\n\n    // color = mix(current,fb,feedback);\n    if(current.a == 0.0){\n      color = fb * feedback;\n    }else{\n      color = current;\n    }\n\n    gl_FragColor = color;\n}\n";

exports.vert = vert;
exports.frag = frag;

/***/ }),

/***/ "./public/js/system/FeedbackManager.js":
/*!*********************************************!*\
  !*** ./public/js/system/FeedbackManager.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _StandardManager2 = __webpack_require__(/*! ./StandardManager */ "./public/js/system/StandardManager.js");

var _StandardManager3 = _interopRequireDefault(_StandardManager2);

var _feedback = __webpack_require__(/*! ../shaders/feedback */ "./public/js/shaders/feedback.js");

var feedback = _interopRequireWildcard(_feedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeedbackManager = function (_StandardManager) {
  _inherits(FeedbackManager, _StandardManager);

  function FeedbackManager(options) {
    _classCallCheck(this, FeedbackManager);

    // override background and set renderer clear color for feedback
    var _this = _possibleConstructorReturn(this, (FeedbackManager.__proto__ || Object.getPrototypeOf(FeedbackManager)).call(this, options));

    _this.scene.background = null;
    _this.renderer.setClearColor(0x000000, 0);

    /*
      Setup an orthographic camera for rendering-to-texture
    */
    var setupCamera = function setupCamera() {
      _this.orthoCamera = new THREE.OrthographicCamera(_this.width / -2, _this.width / 2, _this.height / 2, _this.height / -2, 1, 1000);

      _this.orthoCamera.position.z = 1;
    };

    /*
      Setup all appropriate targets for each stage
    */
    var setupTargets = function setupTargets() {
      _this.mainTarget = new THREE.WebGLRenderTarget(_this.width, _this.height, {
        format: THREE.RGBAFormat
      });
      _this.interTarget = new THREE.WebGLRenderTarget(_this.width, _this.height, {
        format: THREE.RGBAFormat
      });
      _this.outputTarget = new THREE.WebGLRenderTarget(_this.width, _this.height, {
        format: THREE.RGBAFormat
      });

      setupFeedbackScene();
      setupOutputScene();
    };

    /*
      The feedback scene is to allow us to render-to-texture.
    */
    var setupFeedbackScene = function setupFeedbackScene() {
      _this.feedbackScene = new THREE.Scene();

      _this.feedbackUniforms = {
        tex0: { value: _this.interTarget.texture },
        tex1: { value: _this.mainTarget.texture },
        feedback: { value: 1.0 },
        scale: { value: 0.961 },
        vPoint: { value: [0.5, 0.5] }
      };

      _this.gui.feedback = _this.gui.addFolder('Feedback Shader');

      _this.gui.feedback.add(_this.feedbackUniforms.feedback, 'value', 0, 1).name('Amount');
      _this.gui.feedback.add(_this.feedbackUniforms.scale, 'value', 0.961).name('Scale').step(0.001);
      _this.gui.feedback.open();

      var geometry = new THREE.PlaneBufferGeometry(2., 2.);
      var material = new THREE.ShaderMaterial({
        uniforms: _this.feedbackUniforms,
        vertexShader: feedback.vert,
        fragmentShader: feedback.frag,
        transparent: true
      });

      var quad = new THREE.Mesh(geometry, material);
      _this.feedbackScene.add(quad);
    };

    /*
      The output scene is the final view, upon which we render all
      prior output upon a simple plane buffer object.
    */
    var setupOutputScene = function setupOutputScene() {
      _this.outputScene = new THREE.Scene();
      _this.outputScene.background = new THREE.Color(0x000000);

      var geometry = new THREE.PlaneBufferGeometry(_this.width, _this.height);
      var material = new THREE.MeshBasicMaterial({
        map: _this.outputTarget.texture,
        transparent: true
      });

      _this.outputQuad = new THREE.Mesh(geometry, material);
      _this.outputScene.add(_this.outputQuad);
    };

    setupCamera();
    setupTargets();
    return _this;
  }

  _createClass(FeedbackManager, [{
    key: "update",
    value: function update() {
      this.updateEntities();

      this.camera.update();

      //render the main scene to the main target
      this.renderer.render(this.scene, this.camera.getCamera(), this.mainTarget);
      //render the feedback to the output target
      this.renderer.render(this.feedbackScene, this.orthoCamera, this.outputTarget);

      //target pingpong
      var tempTarget = this.interTarget;
      this.interTarget = this.outputTarget;
      this.outputTarget = tempTarget;

      this.feedbackUniforms.tex0.value = this.interTarget.texture;
      this.outputQuad.material.map = this.outputTarget.texture;

      this.renderer.render(this.outputScene, this.orthoCamera);
    }
  }]);

  return FeedbackManager;
}(_StandardManager3.default);

exports.default = FeedbackManager;

/***/ }),

/***/ "./public/js/system/StandardManager.js":
/*!*********************************************!*\
  !*** ./public/js/system/StandardManager.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _Camera = __webpack_require__(/*! ../entities/Camera */ "./public/js/entities/Camera.js");

var _Camera2 = _interopRequireDefault(_Camera);

var _EventBus = __webpack_require__(/*! ../utilities/EventBus */ "./public/js/utilities/EventBus.js");

var _EventBus2 = _interopRequireDefault(_EventBus);

var _dat = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");

var _dat2 = _interopRequireDefault(_dat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  The StandardTemplate is responsible for maintaining some core elements of
  Three.

  These include:

  gui
  eventbus
  clock
  scene
  camera
    default camera is used, unless separate camera is passed using setCamera()
  renderer
  entities
*/

var asStandardManager = function () {
  function asStandardManager() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$scene = _ref.scene,
        scene = _ref$scene === undefined ? {
      background: 0x999999
    } : _ref$scene,
        _ref$renderer = _ref.renderer,
        renderer = _ref$renderer === undefined ? {
      antialias: true,
      alpha: true
    } : _ref$renderer;

    _classCallCheck(this, asStandardManager);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.entities = [];

    this.gui = new _dat2.default.GUI();
    this.eventBus = new _EventBus2.default();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(scene.background);
    this.renderer = new THREE.WebGLRenderer(renderer);
    this.renderer.setSize(this.width, this.height);
    this.camera = new _Camera2.default(this);

    document.body.appendChild(this.renderer.domElement);
  }

  _createClass(asStandardManager, [{
    key: "setCamera",
    value: function setCamera(camera) {
      this.camera = camera;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: "updateEntities",
    value: function updateEntities() {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].update();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.updateEntities();
      this.renderer.render(this.scene, this.camera.getCamera());
    }
  }, {
    key: "addEntity",
    value: function addEntity(entity) {
      this.entities.push(entity);
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.camera.getCamera().aspect = this.width / this.height;
      this.camera.getCamera().updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
    }
  }, {
    key: "canvas",
    get: function get() {
      return this.renderer.domElement;
    }
  }]);

  return asStandardManager;
}();

exports.default = asStandardManager;

/***/ }),

/***/ "./public/js/utilities/Capture.js":
/*!****************************************!*\
  !*** ./public/js/utilities/Capture.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ccapture = __webpack_require__(/*! ccapture.js */ "./node_modules/ccapture.js/src/CCapture.js");

var _ccapture2 = _interopRequireDefault(_ccapture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Capture = function () {
  function Capture(template, options) {
    _classCallCheck(this, Capture);

    this.capturer = new _ccapture2.default(options);
    this.gui = template.gui.addFolder("Capture");
    this.setup();
  }

  _createClass(Capture, [{
    key: "capture",
    value: function capture(canvas) {
      this.capturer.capture(canvas);
    }
  }, {
    key: "setup",
    value: function setup() {
      this.gui.add(this.capturer, "start");
      this.gui.add(this.capturer, "stop");
      this.gui.add(this.capturer, "save");
    }
  }]);

  return Capture;
}();

exports.default = Capture;

/***/ }),

/***/ "./public/js/utilities/Debug.js":
/*!**************************************!*\
  !*** ./public/js/utilities/Debug.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _statsJs = __webpack_require__(/*! stats-js */ "./node_modules/stats-js/build/stats.min.js");

var _statsJs2 = _interopRequireDefault(_statsJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var asDebug = function () {
  function asDebug(template, options) {
    _classCallCheck(this, asDebug);

    this.template = template;
    this.options = options;

    this.showStats = this.options.stats ? true : false;
    this.showGrid = this.options.grid ? true : false;

    if (this.showStats) this.assembleStats();
    if (this.showGrid) this.assembleGrid();

    this.gui = this.template.gui;
    this.setupGUI();
  }

  _createClass(asDebug, [{
    key: "setupGUI",
    value: function setupGUI() {
      var _this = this;

      this.gui.debug = this.gui.addFolder("Debug");
      this.gui.debug.add(this, "showStats").onChange(function (value) {
        value ? _this.assembleStats() : _this.stats.domElement.style.display = 'hidden';
      });

      this.gui.debug.add(this, "showGrid").onChange(function (value) {
        value ? _this.assembleGrid() : _this.template.scene.remove(_this.grid.helper);
      });
    }
  }, {
    key: "assembleStats",
    value: function assembleStats() {
      this.stats = new _statsJs2.default();
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.left = '0px';
      this.stats.domElement.style.bottom = '0px';
      this.stats.domElement.style.display = 'visible';
      document.body.appendChild(this.stats.domElement);
    }
  }, {
    key: "assembleGrid",
    value: function assembleGrid() {
      this.grid = new Object();
      this.grid.size = this.options.grid.size || 10;
      this.grid.divisions = this.options.grid.divisions || 10;

      this.grid.helper = new THREE.GridHelper(this.grid.size, this.grid.divisions);
      this.template.scene.add(this.grid.helper);
    }
  }]);

  return asDebug;
}();

exports.default = asDebug;

/***/ }),

/***/ "./public/js/utilities/EventBus.js":
/*!*****************************************!*\
  !*** ./public/js/utilities/EventBus.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 Based on an implementation described here:
 https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969
*/

function EventCallbacksPair(eventType, callback) {
  this.eventType = eventType;
  this.callbacks = [callback];
}

var asEventBus = function () {
  function asEventBus() {
    _classCallCheck(this, asEventBus);

    this.eventCallbacksPairs = [];
  }

  _createClass(asEventBus, [{
    key: "subscribe",
    value: function subscribe(eventType, callback) {
      this.eventCallbacksPair = this.findEventCallbacksPair(eventType);

      if (this.eventCallbacksPair) {
        // if the event exists
        this.eventCallbacksPair.callbacks.push(callback);
      } else {
        // otherwise, push it into the array
        this.eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
      }
    }
  }, {
    key: "publish",
    value: function publish(eventType, argument1, argument2) {
      this.eventCallbacksPair = this.findEventCallbacksPair(eventType);

      if (!this.eventCallbacksPair) {
        console.error("no subscribers for event " + eventType);
        return;
      }

      this.eventCallbacksPair.callbacks.forEach(function (callback) {
        return callback(argument1, argument2);
      });
    }
  }, {
    key: "findEventCallbacksPair",
    value: function findEventCallbacksPair(eventType) {
      return this.eventCallbacksPairs.find(function (eventObject) {
        return eventObject.eventType === eventType;
      });
    }
  }]);

  return asEventBus;
}();

exports.default = asEventBus;

/***/ }),

/***/ "./public/js/utilities/OrbitControls.js":
/*!**********************************************!*\
  !*** ./public/js/utilities/OrbitControls.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe

exports.default = THREE.OrbitControls = function (object, domElement) {

	this.object = object;

	this.domElement = domElement !== undefined ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = -Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.panSpeed = 1.0;
	this.panningMode = THREE.ScreenSpacePanning; // alternate THREE.HorizontalPanning
	this.keyPanSpeed = 7.0; // pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;
	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;
	};

	this.saveState = function () {

		scope.target0.copy(scope.target);
		scope.position0.copy(scope.object.position);
		scope.zoom0 = scope.object.zoom;
	};

	this.reset = function () {

		scope.target.copy(scope.target0);
		scope.object.position.copy(scope.position0);
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent(changeEvent);

		scope.update();

		state = STATE.NONE;
	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy(position).sub(scope.target);

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion(quat);

			// angle from z-axis around y-axis
			spherical.setFromVector3(offset);

			if (scope.autoRotate && state === STATE.NONE) {

				rotateLeft(getAutoRotationAngle());
			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

			// restrict phi to be between desired limits
			spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

			spherical.makeSafe();

			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

			// move target to panned location
			scope.target.add(panOffset);

			offset.setFromSpherical(spherical);

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion(quatInverse);

			position.copy(scope.target).add(offset);

			scope.object.lookAt(scope.target);

			if (scope.enableDamping === true) {

				sphericalDelta.theta *= 1 - scope.dampingFactor;
				sphericalDelta.phi *= 1 - scope.dampingFactor;

				panOffset.multiplyScalar(1 - scope.dampingFactor);
			} else {

				sphericalDelta.set(0, 0, 0);

				panOffset.set(0, 0, 0);
			}

			scale = 1;

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

				scope.dispatchEvent(changeEvent);

				lastPosition.copy(scope.object.position);
				lastQuaternion.copy(scope.object.quaternion);
				zoomChanged = false;

				return true;
			}

			return false;
		};
	}();

	this.dispose = function () {

		scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
		scope.domElement.removeEventListener('mousedown', onMouseDown, false);
		scope.domElement.removeEventListener('wheel', onMouseWheel, false);

		scope.domElement.removeEventListener('touchstart', onTouchStart, false);
		scope.domElement.removeEventListener('touchend', onTouchEnd, false);
		scope.domElement.removeEventListener('touchmove', onTouchMove, false);

		document.removeEventListener('mousemove', onMouseMove, false);
		document.removeEventListener('mouseup', onMouseUp, false);

		window.removeEventListener('keydown', onKeyDown, false);

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	}

	function getZoomScale() {

		return Math.pow(0.95, scope.zoomSpeed);
	}

	function rotateLeft(angle) {

		sphericalDelta.theta -= angle;
	}

	function rotateUp(angle) {

		sphericalDelta.phi -= angle;
	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft(distance, objectMatrix) {

			v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
			v.multiplyScalar(-distance);

			panOffset.add(v);
		};
	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp(distance, objectMatrix) {

			switch (scope.panningMode) {

				case THREE.ScreenSpacePanning:

					v.setFromMatrixColumn(objectMatrix, 1);
					break;

				case THREE.HorizontalPanning:

					v.setFromMatrixColumn(objectMatrix, 0);
					v.crossVectors(scope.object.up, v);
					break;

			}

			v.multiplyScalar(distance);

			panOffset.add(v);
		};
	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan(deltaX, deltaY) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if (scope.object.isPerspectiveCamera) {

				// perspective
				var position = scope.object.position;
				offset.copy(position).sub(scope.target);
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);

				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
				panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
			} else if (scope.object.isOrthographicCamera) {

				// orthographic
				panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
				panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
			} else {

				// camera neither orthographic nor perspective
				console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
				scope.enablePan = false;
			}
		};
	}();

	function dollyIn(dollyScale) {

		if (scope.object.isPerspectiveCamera) {

			scale /= dollyScale;
		} else if (scope.object.isOrthographicCamera) {

			scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
			scope.object.updateProjectionMatrix();
			zoomChanged = true;
		} else {

			console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
			scope.enableZoom = false;
		}
	}

	function dollyOut(dollyScale) {

		if (scope.object.isPerspectiveCamera) {

			scale *= dollyScale;
		} else if (scope.object.isOrthographicCamera) {

			scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
			scope.object.updateProjectionMatrix();
			zoomChanged = true;
		} else {

			console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
			scope.enableZoom = false;
		}
	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate(event) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set(event.clientX, event.clientY);
	}

	function handleMouseDownDolly(event) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set(event.clientX, event.clientY);
	}

	function handleMouseDownPan(event) {

		//console.log( 'handleMouseDownPan' );

		panStart.set(event.clientX, event.clientY);
	}

	function handleMouseMoveRotate(event) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set(event.clientX, event.clientY);

		rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);;

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth);

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);

		rotateStart.copy(rotateEnd);

		scope.update();
	}

	function handleMouseMoveDolly(event) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set(event.clientX, event.clientY);

		dollyDelta.subVectors(dollyEnd, dollyStart);

		if (dollyDelta.y > 0) {

			dollyIn(getZoomScale());
		} else if (dollyDelta.y < 0) {

			dollyOut(getZoomScale());
		}

		dollyStart.copy(dollyEnd);

		scope.update();
	}

	function handleMouseMovePan(event) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set(event.clientX, event.clientY);

		panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);

		pan(panDelta.x, panDelta.y);

		panStart.copy(panEnd);

		scope.update();
	}

	function handleMouseUp(event) {

		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel(event) {

		// console.log( 'handleMouseWheel' );

		if (event.deltaY < 0) {

			dollyOut(getZoomScale());
		} else if (event.deltaY > 0) {

			dollyIn(getZoomScale());
		}

		scope.update();
	}

	function handleKeyDown(event) {

		//console.log( 'handleKeyDown' );

		switch (event.keyCode) {

			case scope.keys.UP:
				pan(0, scope.keyPanSpeed);
				scope.update();
				break;

			case scope.keys.BOTTOM:
				pan(0, -scope.keyPanSpeed);
				scope.update();
				break;

			case scope.keys.LEFT:
				pan(scope.keyPanSpeed, 0);
				scope.update();
				break;

			case scope.keys.RIGHT:
				pan(-scope.keyPanSpeed, 0);
				scope.update();
				break;

		}
	}

	function handleTouchStartRotate(event) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
	}

	function handleTouchStartDolly(event) {

		//console.log( 'handleTouchStartDolly' );

		var dx = event.touches[0].pageX - event.touches[1].pageX;
		var dy = event.touches[0].pageY - event.touches[1].pageY;

		var distance = Math.sqrt(dx * dx + dy * dy);

		dollyStart.set(0, distance);
	}

	function handleTouchStartPan(event) {

		//console.log( 'handleTouchStartPan' );

		panStart.set(event.touches[0].pageX, event.touches[0].pageY);
	}

	function handleTouchMoveRotate(event) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);

		rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth);

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);

		rotateStart.copy(rotateEnd);

		scope.update();
	}

	function handleTouchMoveDolly(event) {

		//console.log( 'handleTouchMoveDolly' );

		var dx = event.touches[0].pageX - event.touches[1].pageX;
		var dy = event.touches[0].pageY - event.touches[1].pageY;

		var distance = Math.sqrt(dx * dx + dy * dy);

		dollyEnd.set(0, distance);

		dollyDelta.subVectors(dollyEnd, dollyStart);

		if (dollyDelta.y > 0) {

			dollyOut(getZoomScale());
		} else if (dollyDelta.y < 0) {

			dollyIn(getZoomScale());
		}

		dollyStart.copy(dollyEnd);

		scope.update();
	}

	function handleTouchMovePan(event) {

		//console.log( 'handleTouchMovePan' );

		panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

		panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);

		pan(panDelta.x, panDelta.y);

		panStart.copy(panEnd);

		scope.update();
	}

	function handleTouchEnd(event) {}

	//console.log( 'handleTouchEnd' );

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown(event) {

		if (scope.enabled === false) return;

		event.preventDefault();

		switch (event.button) {

			case scope.mouseButtons.ORBIT:

				if (scope.enableRotate === false) return;

				handleMouseDownRotate(event);

				state = STATE.ROTATE;

				break;

			case scope.mouseButtons.ZOOM:

				if (scope.enableZoom === false) return;

				handleMouseDownDolly(event);

				state = STATE.DOLLY;

				break;

			case scope.mouseButtons.PAN:

				if (scope.enablePan === false) return;

				handleMouseDownPan(event);

				state = STATE.PAN;

				break;

		}

		if (state !== STATE.NONE) {

			document.addEventListener('mousemove', onMouseMove, false);
			document.addEventListener('mouseup', onMouseUp, false);

			scope.dispatchEvent(startEvent);
		}
	}

	function onMouseMove(event) {

		if (scope.enabled === false) return;

		event.preventDefault();

		switch (state) {

			case STATE.ROTATE:

				if (scope.enableRotate === false) return;

				handleMouseMoveRotate(event);

				break;

			case STATE.DOLLY:

				if (scope.enableZoom === false) return;

				handleMouseMoveDolly(event);

				break;

			case STATE.PAN:

				if (scope.enablePan === false) return;

				handleMouseMovePan(event);

				break;

		}
	}

	function onMouseUp(event) {

		if (scope.enabled === false) return;

		handleMouseUp(event);

		document.removeEventListener('mousemove', onMouseMove, false);
		document.removeEventListener('mouseup', onMouseUp, false);

		scope.dispatchEvent(endEvent);

		state = STATE.NONE;
	}

	function onMouseWheel(event) {

		if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;

		event.preventDefault();
		event.stopPropagation();

		scope.dispatchEvent(startEvent);

		handleMouseWheel(event);

		scope.dispatchEvent(endEvent);
	}

	function onKeyDown(event) {

		if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

		handleKeyDown(event);
	}

	function onTouchStart(event) {

		if (scope.enabled === false) return;

		switch (event.touches.length) {

			case 1:
				// one-fingered touch: rotate

				if (scope.enableRotate === false) return;

				handleTouchStartRotate(event);

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:
				// two-fingered touch: dolly

				if (scope.enableZoom === false) return;

				handleTouchStartDolly(event);

				state = STATE.TOUCH_DOLLY;

				break;

			case 3:
				// three-fingered touch: pan

				if (scope.enablePan === false) return;

				handleTouchStartPan(event);

				state = STATE.TOUCH_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if (state !== STATE.NONE) {

			scope.dispatchEvent(startEvent);
		}
	}

	function onTouchMove(event) {

		if (scope.enabled === false) return;

		event.preventDefault();
		event.stopPropagation();

		switch (event.touches.length) {

			case 1:
				// one-fingered touch: rotate

				if (scope.enableRotate === false) return;
				if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

				handleTouchMoveRotate(event);

				break;

			case 2:
				// two-fingered touch: dolly

				if (scope.enableZoom === false) return;
				if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

				handleTouchMoveDolly(event);

				break;

			case 3:
				// three-fingered touch: pan

				if (scope.enablePan === false) return;
				if (state !== STATE.TOUCH_PAN) return; // is this needed?...

				handleTouchMovePan(event);

				break;

			default:

				state = STATE.NONE;

		}
	}

	function onTouchEnd(event) {

		if (scope.enabled === false) return;

		handleTouchEnd(event);

		scope.dispatchEvent(endEvent);

		state = STATE.NONE;
	}

	function onContextMenu(event) {

		if (scope.enabled === false) return;

		event.preventDefault();
	}

	//

	scope.domElement.addEventListener('contextmenu', onContextMenu, false);

	scope.domElement.addEventListener('mousedown', onMouseDown, false);
	scope.domElement.addEventListener('wheel', onMouseWheel, false);

	scope.domElement.addEventListener('touchstart', onTouchStart, false);
	scope.domElement.addEventListener('touchend', onTouchEnd, false);
	scope.domElement.addEventListener('touchmove', onTouchMove, false);

	window.addEventListener('keydown', onKeyDown, false);

	// force an update at start

	this.update();
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties(THREE.OrbitControls.prototype, {

	center: {

		get: function get() {

			console.warn('THREE.OrbitControls: .center has been renamed to .target');
			return this.target;
		}

	},

	// backward compatibility

	noZoom: {

		get: function get() {

			console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
			return !this.enableZoom;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
			this.enableZoom = !value;
		}

	},

	noRotate: {

		get: function get() {

			console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
			return !this.enableRotate;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
			this.enableRotate = !value;
		}

	},

	noPan: {

		get: function get() {

			console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
			return !this.enablePan;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
			this.enablePan = !value;
		}

	},

	noKeys: {

		get: function get() {

			console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
			return !this.enableKeys;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
			this.enableKeys = !value;
		}

	},

	staticMoving: {

		get: function get() {

			console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
			return !this.enableDamping;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
			this.enableDamping = !value;
		}

	},

	dynamicDampingFactor: {

		get: function get() {

			console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
			return this.dampingFactor;
		},

		set: function set(value) {

			console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
			this.dampingFactor = value;
		}

	}

});

THREE.ScreenSpacePanning = 0;
THREE.HorizontalPanning = 1;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map