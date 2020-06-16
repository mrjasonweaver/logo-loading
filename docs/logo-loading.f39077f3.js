// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"QCba":[function(require,module,exports) {
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var fetchUserInfoURL = 'https://api.github.com/users/';
var searchUsersURL = 'https://api.github.com/search/users';
var logo = document.querySelector('#logo');
var topLeft = document.querySelector('#triangle-top-left');
var topRight = document.querySelector('#triangle-top-right');
var bottom = document.querySelector('#triangle-bottom');
var username = document.querySelector('#username');
var userForm = document.querySelector('#getUserForm');
var userContainer = document.querySelector('#github-user');
var usersContainer = document.querySelector('#github-users');
var title = document.querySelector('#title');
var perPage = '100';
var durationSlow = 1200;
var durationMedium = 800;
var durationFast = 500;
var city;

var renderGithubUser = function renderGithubUser(user) {
  return "\n    <a href=\"" + user.html_url + "\" class=\"github-user\">\n      <h2 class=\"github-user-login\">" + user.login + "</h2>\n      <img class=\"github-user-avatar\" src=" + user.avatar_url + " />\n    </a>\n  ";
};

userForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userContainer.innerHTML = '';
  usersContainer.innerHTML = '';
  title.innerHTML = 'Searching GitHub...';
  animateLogo(true);
  var userUrl = "" + fetchUserInfoURL + event.target[0].value;
  fetchUserInfo(userUrl);
});

var fetchUserInfo = function fetchUserInfo(url) {
  return __awaiter(void 0, void 0, Promise, function () {
    var response, data, searchUrl, err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 5,, 6]);

          return [4
          /*yield*/
          , fetch(url)];

        case 1:
          response = _a.sent();
          if (!(response.status === 200)) return [3
          /*break*/
          , 3];
          return [4
          /*yield*/
          , response.json()];

        case 2:
          data = _a.sent();
          city = data.location.split(',')[0];
          searchUrl = searchUsersURL + "?q=+location:" + city + "+type:user+-user:" + data.login + "&page=1&per_page=" + perPage;
          addGithubUser(data, searchUrl);
          return [3
          /*break*/
          , 4];

        case 3:
          if (response.status === 404) {
            title.innerHTML = 'GitHub user not found';
            animateLogo(false);
          } else {
            title.innerHTML = 'Unable to fetch user';
            animateLogo(false);
          }

          _a.label = 4;

        case 4:
          return [3
          /*break*/
          , 6];

        case 5:
          err_1 = _a.sent();
          title.innerHTML = err_1;
          animateLogo(false);
          return [3
          /*break*/
          , 6];

        case 6:
          return [2
          /*return*/
          ];
      }
    });
  });
};

var searchUsers = function searchUsers(url) {
  return __awaiter(void 0, void 0, Promise, function () {
    var response, data, infoObj, err_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3,, 4]);

          return [4
          /*yield*/
          , fetch(url)];

        case 1:
          response = _a.sent();
          return [4
          /*yield*/
          , response.json()];

        case 2:
          data = _a.sent();
          infoObj = {
            total: data.total_count,
            count: perPage,
            city: city
          };
          title.innerHTML = titleContent(infoObj);
          addSearchedGithubUsers(data.items);
          return [3
          /*break*/
          , 4];

        case 3:
          err_2 = _a.sent();
          title.innerHTML = err_2;
          animateLogo(false);
          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
};

var addGithubUser = function addGithubUser(user, searchUrl) {
  var githubUser = renderGithubUser(user);
  userContainer.insertAdjacentHTML('beforeend', githubUser);
  searchUsers(searchUrl);
};

var addSearchedGithubUsers = function addSearchedGithubUsers(content) {
  content.forEach(function (user) {
    var githubUser = renderGithubUser(user);
    return usersContainer.insertAdjacentHTML('beforeend', githubUser);
  });
  animateLogo(false);
};

var titleContent = function titleContent(info) {
  var total = info.total,
      count = info.count,
      city = info.city;
  return "Showing " + count + " of " + total + " GitHub users in " + city;
};

var timingOptions = function timingOptions(duration, iterations) {
  return {
    duration: duration,
    iterations: iterations
  };
};

var fillOptions = function fillOptions(args) {
  return args.map(function (item) {
    return {
      fill: "" + item
    };
  });
};

var fillAnimation = [['rgba(22,22,22,1)'], ['rgba(200, 100, 100, .7)'], ['rgba(170, 255, 150, .7)'], ['rgba(22,22,22,1)']];

var animateLogo = function animateLogo(playing) {
  var logoAnimation = logo.animate(fillOptions(fillAnimation), timingOptions(durationMedium, 5));
  return playing ? logoAnimation.play() : logoAnimation.pause();
};
},{}]},{},["QCba"], null)