/*---------------------------------------------------------------------------*
 * TorigoyaMZ_FrameTween.js v.2.1.0
 *---------------------------------------------------------------------------*
 * 2021/05/12 01:00 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc [Base] Tween-animation Engine (v.2.1.0)
 * @author Rutan(ru_shalm)
 * @license public domain
 * @version 2.1.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_FrameTween.js
 * @help
 * [Base] Tween-animation Engine (v.2.1.0)
 * https://torigoya-plugin.rutan.dev
 *
 * This plugin is a base-plugin for Torigoya plugins.
 */

/*:ja
 * @target MZ
 * @plugindesc [鳥小屋.txt ベースプラグイン] Tweenアニメーション (v.2.1.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 2.1.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_FrameTween.js
 * @help
 * [鳥小屋.txt ベースプラグイン] Tweenアニメーション (v.2.1.0)
 * https://torigoya-plugin.rutan.dev
 *
 * このプラグインはベースプラグインです。
 * このプラグインを導入しただけでは特に何も起きません。
 * Tweenアニメーション用の処理を追加します。
 */

(function () {
    'use strict';

    var linear = function (n) {
        return n;
    };
    var easeInSine = function (n) {
        return 1 - Math.cos((n * Math.PI) / 2);
    };
    var easeOutSine = function (n) {
        return Math.sin((n * Math.PI) / 2);
    };
    var easeInOutSine = function (n) {
        return (1 - Math.cos(n * Math.PI)) / 2;
    };
    var easeInQuad = function (n) {
        return n * n;
    };
    var easeOutQuad = function (n) {
        return n * (2 - n);
    };
    var easeInOutQuad = function (n) {
        n *= 2;
        if (n < 1) {
            return (n * n) / 2;
        } else {
            --n;
            return (1 + n * (2 - n)) / 2;
        }
    };
    var easeInCubic = function (n) {
        return Math.pow(n, 3);
    };
    var easeOutCubic = function (n) {
        --n;
        return Math.pow(n, 3) + 1;
    };
    var easeInOutCubic = function (n) {
        n *= 2;
        if (n < 1) {
            return Math.pow(n, 3) / 2;
        } else {
            n -= 2;
            return (Math.pow(n, 3) + 2) / 2;
        }
    };
    var easeInCircular = function (n) {
        return 1 - Math.sqrt(1 - n * n);
    };
    var easeOutCircular = function (n) {
        n--;
        return Math.sqrt(1 - n * n);
    };
    var easeInOutCircular = function (n) {
        n *= 2;
        if (n < 1) {
            return -(Math.sqrt(1 - n * n) - 1) / 2;
        } else {
            n -= 2;
            return (Math.sqrt(1 - n * n) + 1) / 2;
        }
    };

    var Easing = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        linear: linear,
        easeInSine: easeInSine,
        easeOutSine: easeOutSine,
        easeInOutSine: easeInOutSine,
        easeInQuad: easeInQuad,
        easeOutQuad: easeOutQuad,
        easeInOutQuad: easeInOutQuad,
        easeInCubic: easeInCubic,
        easeOutCubic: easeOutCubic,
        easeInOutCubic: easeInOutCubic,
        easeInCircular: easeInCircular,
        easeOutCircular: easeOutCircular,
        easeInOutCircular: easeInOutCircular,
    });

    var Group = /** @class */ (function () {
        function Group() {
            this._items = [];
        }
        Object.defineProperty(Group.prototype, 'length', {
            get: function () {
                return this._items.length;
            },
            enumerable: false,
            configurable: true,
        });

        Group.prototype.clear = function () {
            this._items.forEach(function (_a) {
                var tween = _a[0],
                    _ = _a[1];
                return tween.abort();
            });
            this._items.length = 0;
        };
        Group.prototype.add = function (tween) {
            var state = {
                startParams: {},
                finishParams: {},
                duration: 0,
                easingFunc: linear,
                timer: 0,
                isWaitingCallback: false,
            };

            if (!this._beginAnimation(tween, state)) return;
            this._items.push([tween, state]);
        };
        Group.prototype.remove = function (tween) {
            this._items = this._items.filter(function (_a) {
                var t = _a[0],
                    _ = _a[1];
                return t !== tween;
            });
        };
        Group.prototype.update = function () {
            var _this = this;
            var items = this._items.slice();
            this._items.length = 0;
            this._items = items
                .filter(function (_a) {
                    var tween = _a[0],
                        state = _a[1];
                    if (tween.finished) return false;
                    if (state.isWaitingCallback) return true;
                    ++state.timer;
                    if (state.timer < state.duration) {
                        var n_1 = state.easingFunc(state.timer / state.duration);
                        Object.keys(state.finishParams).forEach(function (key) {
                            tween.target[key] =
                                state.startParams[key] + (state.finishParams[key] - state.startParams[key]) * n_1;
                        });
                    } else {
                        Object.keys(state.finishParams).forEach(function (key) {
                            tween.target[key] = state.finishParams[key];
                        });
                    }
                    var result = state.timer < state.duration || _this._beginAnimation(tween, state);
                    tween.callUpdateListeners();
                    if (!result) tween.abort();
                    return result;
                })
                .concat(this._items);
        };
        Group.prototype._beginAnimation = function (tween, state) {
            var _loop_1 = function () {
                var stack = tween.stacks.shift();
                if (!stack) return { value: false };
                switch (stack.type) {
                    case 'call':
                        if (stack.func.length === 0) {
                            stack.func();
                        } else {
                            state.isWaitingCallback = true;
                            stack.func(function () {
                                return (state.isWaitingCallback = false);
                            });
                        }
                        if (state.isWaitingCallback) {
                            return { value: true };
                        } else {
                            break; // loop!
                        }
                    case 'move': {
                        var startParams_1 = {};
                        Object.keys(stack.params).forEach(function (key) {
                            startParams_1[key] = tween.target[key];
                        });
                        state.startParams = startParams_1;
                        state.finishParams = stack.params;
                        state.duration = stack.duration;
                        state.easingFunc = stack.easingFunc;
                        state.timer = 0;
                        return { value: true };
                    }
                }
            };
            while (true) {
                var state_1 = _loop_1();
                if (typeof state_1 === 'object') return state_1.value;
            }
        };
        return Group;
    })();

    var Tween = /** @class */ (function () {
        function Tween(target, initialParams) {
            this._target = target;
            this._stacks = [];
            this._group = null;
            this._onUpdateListeners = [];
            this._finished = false;
            if (initialParams) {
                Object.keys(initialParams).forEach(function (key) {
                    target[key] = initialParams[key];
                });
            }
        }
        Tween.create = function (target, initialParams) {
            return new Tween(target, initialParams);
        };
        Tween.update = function () {
            Tween._globalGroup.update();
        };
        Object.defineProperty(Tween.prototype, 'stacks', {
            get: function () {
                return this._stacks;
            },
            enumerable: false,
            configurable: true,
        });

        Object.defineProperty(Tween.prototype, 'target', {
            get: function () {
                return this._target;
            },
            enumerable: false,
            configurable: true,
        });

        Object.defineProperty(Tween.prototype, 'finished', {
            get: function () {
                return this._finished;
            },
            enumerable: false,
            configurable: true,
        });

        Tween.prototype.group = function (group) {
            this._group = group;
            return this;
        };
        Tween.prototype.addUpdateListener = function (func) {
            this._onUpdateListeners.push(func);
            return this;
        };
        Tween.prototype.removeUpdateListener = function (func) {
            this._onUpdateListeners = this._onUpdateListeners.filter(function (f) {
                return f !== func;
            });
            return this;
        };
        Tween.prototype.callUpdateListeners = function () {
            this._onUpdateListeners.forEach(function (f) {
                return f();
            });
        };
        Tween.prototype.to = function (params, duration, easingFunc) {
            this._stacks.push({
                type: 'move',
                params: params,
                duration: duration,
                easingFunc: easingFunc || linear,
            });

            return this;
        };
        Tween.prototype.wait = function (duration) {
            this._stacks.push({
                type: 'move',
                params: {},
                duration: duration,
                easingFunc: linear,
            });

            return this;
        };
        Tween.prototype.call = function (func) {
            this._stacks.push({
                type: 'call',
                func: func,
            });

            return this;
        };
        Tween.prototype.start = function () {
            if (!this._group) {
                this._group = Tween._globalGroup;
            }
            this._group.add(this);
            return this;
        };
        Tween.prototype.abort = function () {
            this._stacks.length = 0;
            this._finished = true;
            return this;
        };
        Tween._globalGroup = new Group();
        return Tween;
    })();

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_FrameTween';
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '2.1.0',
        };
    }

    Torigoya.FrameTween = {
        name: getPluginName(),
        parameter: readParameter(),
        Tween,
        Group,
        Easing,
        group: Tween._globalGroup,
        create: Tween.create,
    };

    (() => {
        const upstream_updateScene = SceneManager.updateScene;
        SceneManager.updateScene = function () {
            const isStarted = this._scene && this._scene.isStarted() && this.isGameActive();
            upstream_updateScene.apply(this);

            if (isStarted) Torigoya.FrameTween.group.update();
        };
    })();
})();
