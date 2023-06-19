//
//  発動前コモン ver1.01
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['BeforeCommon'] = 1.01;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Battle/BeforeCommon.js
 * @plugindesc ver1.01/スキルやアイテムの発動前に、スキルやアイテムに設定されたコモンイベントを発生させます。
 * @author Yana
 *
 * @param IndexVariableID
 * @text 発動者インデックス変数ID
 * @type variable
 * @desc 発動者のインデックスを保存する変数IDです。
 * 発動者がエネミーの場合は値に+1000されます。
 * @default 11
 *
 * @param TargetIndexVariableID
 * @text 対象インデックス変数ID
 * @type variable
 * @desc 対象のインデックスを保存する変数IDです。
 * 対象が2体以上の場合は変数の値は-1が設定されます。
 * @default 12
 *
 * @help
 * ムノクラ追記
 * ------------------------------------------------------
 * RPGツクールMZでの動作を確認。
 * 
 * ------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 *
 * スキルやアイテムのメモ欄に
 * <発動前コモン:x>
 * または、
 * <BeforeCommon:x>
 * と記述することで、スキルやアイテムが発生する前に、
 * IDがx番のコモンイベントの実行を予約します。
 *
 * また、IndexVariableID(発動者インデックス変数ID)で指定した番号の変数に、
 * 行動者のインデックスが、
 * TargetIndexVariableID(対象インデックス変数ID)で指定した番号の変数に、
 * 対象のインデックスが格納されます。
 * ただし、対象のインデックスは対象が単体の時しか格納されず、かつ、
 * エネミーの行動では、コモンを実行するタイミングで対象が決定していないため、
 * 対象には-1(特定不可)が設定されます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_/
 * 素材利用は自己責任でお願いします。
 * 
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * 対象を保存する変数の設定を追加。
 * ver1.00:
 * 公開
 */


(function () {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('BeforeCommon');
    var indexVariableId = Number(parameters['IndexVariableID']);
    var targetIndexVariableId = Number(parameters['TargetIndexVariableID']) || 0;

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isBeforeCommon = function (item) {
        if (!item) { return false }
        if (item.meta['発動前コモン']) { return true }
        if (item.meta['BeforeCommon']) { return true }
        return false;
    };

    DataManager.beforeCommonEffect = function (item) {
        var effects = [];
        if (item.meta['発動前コモン']) {
            effects = Number(item.meta['発動前コモン']);
        } else if (item.meta['BeforeCommon']) {
            effects = Number(item.meta['BeforeCommon']);
        }
        return effects;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function () {
        var action = this._subject.currentAction();
        if (this.checkBeforeCommon(action)) { return }
        __BManager_startAction.call(this);
        this._execBeforeCommon = false;
    };

    BattleManager.checkBeforeCommon = function (action) {
        if (action && !this._execBeforeCommon && DataManager.isBeforeCommon(action.item())) {
            this._execBeforeCommon = true;
            var beforeCommon = DataManager.beforeCommonEffect(action.item());
            $gameTemp.reserveCommonEvent(beforeCommon);
            var sId = this._subject.index();
            var tId = action._targetIndex;
            if (this._subject.isEnemy()) sId += 1000;
            if (this._subject.isActor() && action.isForOpponent() && tId >= 0) tId += 1000;
            if (this._subject.isEnemy() && action.isForFriend() && tId >= 0) tId += 1000;
            if (action.isForUser()) tId = sId;
            if (indexVariableId) $gameVariables._data[indexVariableId] = sId;
            if (targetIndexVariableId) $gameVariables._data[targetIndexVariableId] = tId;
            this._phase = 'turn';
            return true;
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
    Game_Battler.prototype.removeCurrentAction = function () {
        if (!BattleManager._execBeforeCommon) {
            __GBattler_removeCurrentAction.call(this);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());