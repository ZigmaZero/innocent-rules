/*---------------------------------------------------------------------------*
 * TorigoyaMZ_NotifyMessage_AddonGetItem.js v.1.1.1
 *---------------------------------------------------------------------------*
 * 2021/07/05 22:08 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc 通知メッセージアドオン: アイテム獲得表示 (v.1.1.1)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.1
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_NotifyMessage_AddonGetItem.js
 * @base TorigoyaMZ_NotifyMessage
 * @orderAfter TorigoyaMZ_NotifyMessage
 * @help
 * 通知メッセージアドオン: アイテム獲得表示 (v.1.1.1)
 * https://torigoya-plugin.rutan.dev
 *
 * 以下のイベントコマンド実行時に自動的に通知メッセージを表示します。
 * ※増やす場合のみ表示されます
 *
 * ・所持金の増減
 * ・アイテムの増減
 * ・武器の増減
 * ・防具の増減
 *
 * ------------------------------------------------------------
 * ■ 表示したくない場合
 * ------------------------------------------------------------
 * 例えばお金の入手メッセージはいらない！という場合は、
 * お金の入手メッセージの内容を空欄にしてください。
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param baseGainSingleMessage
 * @text アイテム入手メッセージ（1つ）
 * @desc アイテムを1つ入手したときのメッセージを設定します。（\name : アイテム名）
 * @type string
 * @parent base
 * @default \c[2]\name\c[0] を手に入れた！
 *
 * @param baseGainMultiMessage
 * @text アイテム入手メッセージ（複数）
 * @desc アイテムを複数入手したときのメッセージを設定します。（\name : アイテム名  \count : 個数）
 * @type string
 * @parent base
 * @default \c[2]\name\c[0] ×\count を手に入れた！
 *
 * @param baseGainMoneyMessage
 * @text お金入手メッセージ
 * @desc お金を入手したときのメッセージを設定します。（\gold : 獲得金額）
 * @type string
 * @parent base
 * @default \gold\c[4]\G\c[0] を手に入れた！
 *
 * @param baseGainMoneyIcon
 * @text お金入手アイコン
 * @desc お金を入手したときのアイコンIDを設定します。0の場合はアイコンを表示しません。
 * @type number
 * @parent base
 * @default 0
 *
 * @param advanced
 * @text ■ 上級設定
 *
 * @param advancedSwitch
 * @text 有効スイッチ
 * @desc このスイッチがONのときのみ画面に通知するようにします。「なし」の場合は常に通知されます。
 * @type switch
 * @parent advanced
 * @default 0
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_NotifyMessage_AddonGetItem';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickNumberValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseFloat(parameter[key]);
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.1.1',
            baseGainSingleMessage: pickStringValueFromParameter(
                parameter,
                'baseGainSingleMessage',
                '\\c[2]\\name\\c[0] を手に入れた！'
            ),

            baseGainMultiMessage: pickStringValueFromParameter(
                parameter,
                'baseGainMultiMessage',
                '\\c[2]\\name\\c[0] ×\\count を手に入れた！'
            ),

            baseGainMoneyMessage: pickStringValueFromParameter(
                parameter,
                'baseGainMoneyMessage',
                '\\gold\\c[4]\\G\\c[0] を手に入れた！'
            ),

            baseGainMoneyIcon: pickNumberValueFromParameter(parameter, 'baseGainMoneyIcon', 0),
            advancedSwitch: pickIntegerValueFromParameter(parameter, 'advancedSwitch', 0),
        };
    }

    function checkExistPlugin(pluginObject, errorMessage) {
        if (typeof pluginObject !== 'undefined') return;
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    checkExistPlugin(
        Torigoya.NotifyMessage,
        '「通知メッセージアドオン: アイテム獲得表示」より上に「通知メッセージプラグイン」が導入されていません。'
    );

    Torigoya.NotifyMessage.Addons = Torigoya.NotifyMessage.Addons || {};
    Torigoya.NotifyMessage.Addons.GetItem = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        // -------------------------------------------------------------------------
        // Functions

        Torigoya.NotifyMessage.Addons.GetItem.isEnabled = function () {
            const switchId = Torigoya.NotifyMessage.Addons.GetItem.parameter.advancedSwitch;
            if (!switchId) return true;

            return $gameSwitches.value(switchId);
        };

        Torigoya.NotifyMessage.Addons.GetItem.notifyGainMoney = function (value) {
            if (!this.isEnabled()) return;

            const template = Torigoya.NotifyMessage.Addons.GetItem.parameter.baseGainMoneyMessage;
            if (!template) return;

            const notifyItem = new Torigoya.NotifyMessage.NotifyItem({
                message: template.replace(/\\gold/, value),
                icon: Torigoya.NotifyMessage.Addons.GetItem.parameter.baseGainMoneyIcon,
            });

            Torigoya.NotifyMessage.Manager.notify(notifyItem);
        };

        Torigoya.NotifyMessage.Addons.GetItem.notifyGainItem = function (item, count) {
            if (!this.isEnabled()) return;

            const template =
                count === 1
                    ? Torigoya.NotifyMessage.Addons.GetItem.parameter.baseGainSingleMessage
                    : Torigoya.NotifyMessage.Addons.GetItem.parameter.baseGainMultiMessage;
            if (!template) return;

            const notifyItem = new Torigoya.NotifyMessage.NotifyItem({
                message: template.replace(/\\count/, count).replace(/\\name/, item.name),
                icon: item.iconIndex,
            });

            Torigoya.NotifyMessage.Manager.notify(notifyItem);
        };

        // -------------------------------------------------------------------------
        // Game_Interpreter

        const upstream_Game_Interpreter_command125 = Game_Interpreter.prototype.command125;
        Game_Interpreter.prototype.command125 = function (params) {
            const value = this.operateValue(params[0], params[1], params[2]);
            if (value > 0) Torigoya.NotifyMessage.Addons.GetItem.notifyGainMoney(value);
            return upstream_Game_Interpreter_command125.apply(this, arguments);
        };

        const upstream_Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
        Game_Interpreter.prototype.command126 = function (params) {
            const value = this.operateValue(params[1], params[2], params[3]);
            if (value > 0) Torigoya.NotifyMessage.Addons.GetItem.notifyGainItem($dataItems[params[0]], value);
            return upstream_Game_Interpreter_command126.apply(this, arguments);
        };

        const upstream_Game_Interpreter_command127 = Game_Interpreter.prototype.command127;
        Game_Interpreter.prototype.command127 = function (params) {
            const value = this.operateValue(params[1], params[2], params[3]);
            if (value > 0) Torigoya.NotifyMessage.Addons.GetItem.notifyGainItem($dataWeapons[params[0]], value);
            return upstream_Game_Interpreter_command127.apply(this, arguments);
        };

        const upstream_Game_Interpreter_command128 = Game_Interpreter.prototype.command128;
        Game_Interpreter.prototype.command128 = function (params) {
            const value = this.operateValue(params[1], params[2], params[3]);
            if (value > 0) Torigoya.NotifyMessage.Addons.GetItem.notifyGainItem($dataArmors[params[0]], value);
            return upstream_Game_Interpreter_command128.apply(this, arguments);
        };
    })();
})();
