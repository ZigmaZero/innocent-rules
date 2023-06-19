/*---------------------------------------------------------------------------*
 * TorigoyaMZ_SmoothValueGauge.js v.1.1.1
 *---------------------------------------------------------------------------*
 * 2021/07/05 22:08 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc ゲージ数値アニメーションプラグイン (v.1.1.1)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.1
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_SmoothValueGauge.js
 * @help
 * ゲージ数値アニメーションプラグイン (v.1.1.1)
 * https://torigoya-plugin.rutan.dev
 *
 * HPゲージなどの数字を一気に変更するのではなく
 * ゲージ本体と同じように徐々に変わるようにします。
 * ※それなりに重い処理なのでご注意ください
 *
 * -----------------------------
 * ■ 上級者向け設定：設定先スプライト名 について
 * 普通にゲームを作る場合にはいじる必要はありません。
 * デフォルトでは Sprite_Gauge が指定されています。
 *
 * もし、あなたがプラグインに詳しい人で、
 * Sprite_Gauge はいじらずに
 * 特定の Sprite_Gauge を継承したゲージだけを
 * 対象にしたいんだ…！という場合は
 * ここで設定先を変更することができます。
 *
 * @param advanced
 * @text ■ 上級者向け設定
 *
 * @param advancedTargetClassList
 * @text 設定先スプライト名
 * @desc 特定のスプライトにのみ適用したい場合に名称を指定してください
 * @type string[]
 * @parent advanced
 * @default ["Sprite_Gauge"]
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_SmoothValueGauge';
    }

    function pickStringValueFromParameterList(parameter, key, defaultValue = []) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parameter[key] ? JSON.parse(parameter[key]) : [];
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.1.1',
            advancedTargetClassList: pickStringValueFromParameterList(parameter, 'advancedTargetClassList', [
                'Sprite_Gauge',
            ]),
        };
    }

    /**
     * 指定名のグローバルなオブジェクトを探索する
     * @param objName
     * @returns {null|any}
     */
    function findGlobalObject(objName) {
        if (!objName) return null;
        const arr = objName.split('.');
        let scope = window;
        for (const name of arr) {
            scope = scope[name];
            if (!scope) return null;
        }
        return scope;
    }

    Torigoya.SmoothValueGauge = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        Torigoya.SmoothValueGauge.parameter.advancedTargetClassList.forEach((targetSpriteName) => {
            const targetSprite = findGlobalObject(targetSpriteName.trim());
            if (!targetSprite) {
                const error = '[\u30B2\u30FC\u30B8\u6570\u5024\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u30D7\u30E9\u30B0\u30A4\u30F3] '.concat(
                    targetSpriteName,
                    ' \u3068\u3044\u3046\u30AF\u30E9\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093'
                );
                console.error(error);
                if (Utils.isOptionValid('test')) alert(error);
                return;
            }

            const upstream_drawValue = targetSprite.prototype.drawValue;
            targetSprite.prototype.drawValue = function () {
                this._torigoyaEnemyHpBar_AddonSmoothValueFlag = true;
                upstream_drawValue.apply(this);
                this._torigoyaEnemyHpBar_AddonSmoothValueFlag = false;
            };

            const upstream_currentValue = targetSprite.prototype.currentValue;
            targetSprite.prototype.currentValue = function () {
                if (this._torigoyaEnemyHpBar_AddonSmoothValueFlag && !isNaN(this._value)) {
                    return Math.round(this._value);
                } else {
                    return upstream_currentValue.apply(this);
                }
            };
        });
    })();
})();
