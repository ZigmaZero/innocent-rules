/*---------------------------------------------------------------------------*
 * TorigoyaMZ_AddStateSkill.js v.1.1.3
 *---------------------------------------------------------------------------*
 * 2022/01/13 01:21 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc 使用後にステート追加スキルプラグイン (v.1.1.3)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.3
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_AddStateSkill.js
 * @help
 * 使用後にステート追加スキルプラグイン (v.1.1.3)
 * https://torigoya-plugin.rutan.dev
 *
 * スキル使用時に使用者にステートを追加/削除できるようにします。
 * 「相手に大ダメージを与えるが、自分は毒になる」のようなスキルが作れます。
 *
 * ------------------------------------------------------------
 * ■ 設定方法
 * ------------------------------------------------------------
 * スキルのメモ欄に以下のように記述してください。
 *
 * ■ 例1：使用者に10番のステートを付与する
 *
 * <AddState: 10>
 *
 * または
 *
 * <ステート追加: 10>
 *
 * ■ 例2：使用者に10番と11番のステートを付与する（「,」区切りで指定）
 *
 * <AddState: 10, 11>
 *
 * または
 *
 * <ステート追加: 10, 11>
 *
 * ■ 例3：使用者に10番のステートを削除する
 *
 * <RemoveState: 10>
 *
 * または
 *
 * <ステート削除: 10>
 *
 * ■ 例4：使用者のパーティ全員に10番のステートを付与する
 *
 * <AddStateUnit: 10>
 *
 * または
 *
 * <ステート追加全体: 10>
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_AddStateSkill';
    }

    function readParameter() {
        PluginManager.parameters(getPluginName());
        return {
            version: '1.1.3',
        };
    }

    function readStateIdsFromMeta(str) {
        if (!str) return [];
        return str
            .split(/\s*,\s*/)
            .filter(Boolean)
            .map((s) => parseInt(s, 10));
    }

    function applyPlugin() {
        const upstream_BattleManager_initMembers = BattleManager.initMembers;
        BattleManager.initMembers = function () {
            upstream_BattleManager_initMembers.apply(this);
            this._torigoyaAddStateSkill_lastAction = null;
        };

        const upstream_BattleManager_startAction = BattleManager.startAction;
        BattleManager.startAction = function () {
            upstream_BattleManager_startAction.apply(this);

            // 行動不能などで startAction を通っていない行動に対しても
            // endAction で処理してしまうのを防ぐため、
            // 確実に startAction が実行されたときの行動を保存しておく
            this._torigoyaAddStateSkill_lastAction = this._action;
        };

        const upstream_BattleManager_endAction = BattleManager.endAction;
        BattleManager.endAction = function () {
            this.torigoyaAddStateSkill_check();
            upstream_BattleManager_endAction.apply(this);
        };

        BattleManager.torigoyaAddStateSkill_check = function () {
            const action = this._torigoyaAddStateSkill_lastAction;
            if (!action) return;
            this._torigoyaAddStateSkill_lastAction = null;

            const actionSubject = action.subject();
            if (this._subject !== actionSubject) return;

            const item = this._action.item();
            if (!item) return;

            const forSubject = this.torigoyaAddStateSkill_readParameterForSubject(item);
            const forUnit = this.torigoyaAddStateSkill_readParameterForUnit(item);
            if (!forSubject && !forUnit) return;

            const friends = this._subject.isEnemy() ? $gameTroop.members() : $gameParty.battleMembers();
            const targets = new Set();

            if (forSubject) {
                const [addStates, removeStates] = forSubject;
                addStates.forEach((id) => this._subject.addState(id));
                removeStates.forEach((id) => this._subject.removeState(id));
                targets.add(this._subject);
            }

            if (forUnit) {
                const [addStates, removeStates] = forUnit;
                friends.forEach((battler) => {
                    if (battler.isDead()) return;

                    addStates.forEach((id) => battler.addState(id));
                    removeStates.forEach((id) => battler.removeState(id));
                    targets.add(battler);
                });
            }

            friends.forEach((battler) => {
                if (!targets.has(battler)) return;

                this._logWindow.displayAffectedStatus(battler);
                if (battler.isDead()) battler.performCollapse();
            });
        };

        BattleManager.torigoyaAddStateSkill_readParameterForSubject = function (item) {
            const addStates = readStateIdsFromMeta(item.meta['AddState'] || item.meta['ステート追加']);
            const removeStates = readStateIdsFromMeta(item.meta['RemoveState'] || item.meta['ステート削除']);
            if (addStates.length === 0 && removeStates.length === 0) return false;

            return [addStates, removeStates];
        };

        BattleManager.torigoyaAddStateSkill_readParameterForUnit = function (item) {
            const addStates = readStateIdsFromMeta(item.meta['AddStateUnit'] || item.meta['ステート追加全体']);
            const removeStates = readStateIdsFromMeta(item.meta['RemoveStateUnit'] || item.meta['ステート削除全体']);
            if (addStates.length === 0 && removeStates.length === 0) return false;

            return [addStates, removeStates];
        };
    }

    Torigoya.AddStateSkill = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    applyPlugin();
})();
