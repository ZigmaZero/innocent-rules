/*:
@plugindesc
全回復 Ver1.0.3(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/System/Recover.js
@orderAfter dsJobChangeMZ
@target MZ
@author ポテトードラゴン

・アップデート情報
- コピーライト更新
- リファクタ

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
様々な場面で全回復できる機能を提供します。

## 使い方
以下の機能を提供します。
使いたい機能のパラメータを変更してください。

1. 全回復(戦闘開始)
2. 全回復(戦闘終了)
3. 全回復(レベルアップ)
4. 全回復(職業の変更)
5. 全回復コマンドTP回復

回復する対象は(HP・MP・TP・ステート)です。  
これらは、設定で変更することができます。  
また、スイッチで全回復するかを任意に変更することもできます。

TPは、TP持ち越しの特徴がある場合のみ回復します。  
※ TP持ち越しがない場合は、回復はしていますがリセットされます。

@param BattleStartRecover
@type boolean
@text 全回復(戦闘開始)
@desc 戦闘開始時に全回復するか
@on 回復する
@off 回復しない
@default false

    @param StartRecoverSwitch
    @parent BattleStartRecover
    @type switch
    @text 全回復(戦闘開始)有効スイッチ
    @desc このスイッチがON のときに全回復（戦闘開始）を有効にします
    0(なし)の場合は、スイッチは使用しません
    @default 0

    @param StartHpRecover
    @parent BattleStartRecover
    @type boolean
    @text HP全回復
    @desc HPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param StartMpRecover
    @parent BattleStartRecover
    @type boolean
    @text MP全回復
    @desc MPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param StartTpRecover
    @parent BattleStartRecover
    @type boolean
    @text TP全回復
    @desc TPを全回復するか
    TP持ち越しの特徴がある場合のみ有効
    @on 回復する
    @off 回復しない
    @default true

    @param StartClearStates
    @parent BattleStartRecover
    @type boolean
    @text ステート解除可否
    @desc ステートを解除するかの設定
    @on 解除する
    @off 解除しない
    @default true

@param BattleEndRecover
@type boolean
@text 全回復(戦闘終了)
@desc 戦闘終了時に全回復するか
@on 回復する
@off 回復しない
@default false

    @param EndRecoverSwitch
    @parent BattleEndRecover
    @type switch
    @text 全回復(戦闘終了)有効スイッチ
    @desc このスイッチがON のときに全回復(戦闘終了)を有効にします
    0(なし)の場合は、スイッチは使用しません
    @default 0

    @param EndHpRecover
    @parent BattleEndRecover
    @type boolean
    @text HP全回復
    @desc HPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param EndMpRecover
    @parent BattleEndRecover
    @type boolean
    @text MP全回復
    @desc MPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param EndTpRecover
    @parent BattleEndRecover
    @type boolean
    @text TP全回復
    @desc TPを全回復するか
    TP持ち越しの特徴がある場合のみ有効
    @on 回復する
    @off 回復しない
    @default true

    @param EndClearStates
    @parent BattleEndRecover
    @type boolean
    @text ステート解除可否
    @desc ステートを解除するかの設定
    @on 解除する
    @off 解除しない
    @default true

@param LevelUpRecover
@type boolean
@text 全回復(レベルアップ)
@desc レベルアップ時に全回復するか
@on 回復する
@off 回復しない
@default false

    @param LevelRecoverSwitch
    @parent LevelUpRecover
    @type switch
    @text 全回復(レベルアップ)有効スイッチ
    @desc このスイッチがON のときに全回復(レベルアップ)を有効にします
    0(なし)の場合は、スイッチは使用しません
    @default 0

    @param LevelHpRecover
    @parent LevelUpRecover
    @type boolean
    @text HP全回復
    @desc HPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param LevelMpRecover
    @parent LevelUpRecover
    @type boolean
    @text MP全回復
    @desc MPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param LevelTpRecover
    @parent LevelUpRecover
    @type boolean
    @text TP全回復
    @desc TPを全回復するか
    TP持ち越しの特徴がある場合のみ有効
    @on 回復する
    @off 回復しない
    @default true

    @param LevelClearStates
    @parent LevelUpRecover
    @type boolean
    @text ステート解除可否
    @desc ステートを解除するかの設定
    @on 解除する
    @off 解除しない
    @default true

@param ChangeClassRecover
@type boolean
@text 全回復(職業の変更)
@desc 職業の変更時に全回復するか
@on 回復する
@off 回復しない
@default false

    @param ClassRecoverSwitch
    @parent ChangeClassRecover
    @type switch
    @text 全回復(職業の変更)有効スイッチ
    @desc このスイッチがON のときに全回復(職業の変更)を有効にします
    0(なし)の場合は、スイッチは使用しません
    @default 0

    @param ClassHpRecover
    @parent ChangeClassRecover
    @type boolean
    @text HP全回復
    @desc HPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param ClassMpRecover
    @parent ChangeClassRecover
    @type boolean
    @text MP全回復
    @desc MPを全回復するか
    @on 回復する
    @off 回復しない
    @default true

    @param ClassTpRecover
    @parent ChangeClassRecover
    @type boolean
    @text TP全回復
    @desc TPを全回復するか
    TP持ち越しの特徴がある場合のみ有効
    @on 回復する
    @off 回復しない
    @default true

    @param ClassClearStates
    @parent ChangeClassRecover
    @type boolean
    @text ステート解除可否
    @desc ステートを解除するかの設定
    @on 解除する
    @off 解除しない
    @default true

@param TpRecover
@type boolean
@text 全回復コマンドTP回復
@desc イベントコマンド[全回復]で、TPも回復するか
@on 回復する
@off 回復しない
@default false

    @param TpRecoverSwitch
    @parent TpRecover
    @type switch
    @text 全回復コマンドTP回復有効スイッチ
    @desc このスイッチがON のときに全回復コマンドTP回復を有効にします
    0(なし)の場合は、スイッチは使用しません
    @default 0
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '') {
            return false;
        } else {
            return true;
        }
    }
    function Potadra_isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }
    function Potadra_checkSwitch(switch_no, bool = true) {
        if (switch_no === 0 || $gameSwitches.value(switch_no) === bool) {
            return true;
        } else {
            return false;
        }
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const BattleStartRecover = Potadra_convertBool(params.BattleStartRecover);
    const StartRecoverSwitch = Number(params.StartRecoverSwitch || 0);
    const StartHpRecover     = Potadra_convertBool(params.StartHpRecover);
    const StartMpRecover     = Potadra_convertBool(params.StartMpRecover);
    const StartTpRecover     = Potadra_convertBool(params.StartTpRecover);
    const StartClearStates   = Potadra_convertBool(params.StartClearStates);
    const BattleEndRecover   = Potadra_convertBool(params.BattleEndRecover);
    const EndRecoverSwitch   = Number(params.EndRecoverSwitch || 0);
    const EndHpRecover       = Potadra_convertBool(params.EndHpRecover);
    const EndMpRecover       = Potadra_convertBool(params.EndMpRecover);
    const EndTpRecover       = Potadra_convertBool(params.EndTpRecover);
    const EndClearStates     = Potadra_convertBool(params.EndClearStates);
    const LevelUpRecover     = Potadra_convertBool(params.LevelUpRecover);
    const LevelRecoverSwitch = Number(params.LevelRecoverSwitch || 0);
    const LevelHpRecover     = Potadra_convertBool(params.LevelHpRecover);
    const LevelMpRecover     = Potadra_convertBool(params.LevelMpRecover);
    const LevelTpRecover     = Potadra_convertBool(params.LevelTpRecover);
    const LevelClearStates   = Potadra_convertBool(params.LevelClearStates);
    const ChangeClassRecover = Potadra_convertBool(params.ChangeClassRecover);
    const ClassRecoverSwitch = Number(params.ClassRecoverSwitch || 0);
    const ClassHpRecover     = Potadra_convertBool(params.ClassHpRecover);
    const ClassMpRecover     = Potadra_convertBool(params.ClassMpRecover);
    const ClassTpRecover     = Potadra_convertBool(params.ClassTpRecover);
    const ClassClearStates   = Potadra_convertBool(params.ClassClearStates);
    const TpRecover          = Potadra_convertBool(params.TpRecover);
    const TpRecoverSwitch    = Number(params.TpRecoverSwitch || 0);

    // 他プラグイン連携(プラグインの導入有無)
    const dsJobChangeMZ = Potadra_isPlugin('dsJobChangeMZ');

    /**
     * 全回復
     */
    Game_Actor.prototype.recoverAllTp = function(clear_states = true, hp_recover = true, mp_recover = true, tp_recover = true) {
        if (clear_states) {
            this.clearStates();
        }
        if (hp_recover) {
            this._hp = this.mhp;
        }
        if (mp_recover) {
            this._mp = this.mmp;
        }
        if (tp_recover) {
            this._tp = this.maxTp();
        }
    };

    /**
     * 戦闘開始
     */
    if (BattleStartRecover) {
        if (Potadra_checkSwitch(StartRecoverSwitch)) {
            const _BattleManager_startBattle = BattleManager.startBattle;
            BattleManager.startBattle = function() {
                $gameParty.battleMembers().forEach(function(actor) {
                    actor.recoverAllTp(StartClearStates, StartHpRecover, StartMpRecover, StartTpRecover);
                }, this);
                _BattleManager_startBattle.apply(this, arguments);
            };
        }
    }

    /**
     * 戦闘終了
     *
     * @param {} result - 結果（0:勝利 1:逃走 2:敗北）
     */
    if (BattleEndRecover) {
        if (Potadra_checkSwitch(EndRecoverSwitch)) {
            const _BattleManager_endBattle = BattleManager.endBattle;
            BattleManager.endBattle = function(result) {
                $gameParty.battleMembers().forEach(function(actor) {
                    actor.recoverAllTp(EndClearStates, EndHpRecover, EndMpRecover, EndTpRecover);
                }, this);
                _BattleManager_endBattle.apply(this, arguments);
            };
        }
    }


    if (LevelUpRecover) {
        if (Potadra_checkSwitch(LevelRecoverSwitch)) {
            /**
              * 経験値の変更
              *
              * @param {number} exp - 経験値
              * @param {boolean} show - レベルアップ表示をするか
              */
            const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
            Game_Actor.prototype.changeExp = function(exp, show) {
                const lastLevel = this._level;
                _Game_Actor_changeExp.apply(this, arguments);

                // レベルアップした場合のみ回復
                if (this._level > lastLevel) {
                    this.recoverAllTp(LevelClearStates, LevelHpRecover, LevelMpRecover, LevelTpRecover);
                }
            };

            /**
             * レベルの変更
             *
             * @param {number} level - レベル
             * @param {boolean} show - レベルを表示するか
             */
            const _Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
            Game_Actor.prototype.changeLevel = function(level, show) {
                const lastLevel = this._level;

                _Game_Actor_changeLevel.apply(this, arguments);

                // レベルアップした場合のみ回復
                if (this._level > lastLevel) {
                    this.recoverAllTp(LevelClearStates, LevelHpRecover, LevelMpRecover, LevelTpRecover);
                }
            };
        }
    }

    /**
     * 職業の変更
     *
     * @param {number} classId - 職業ID
     * @param {boolean} keepExp - 経験値を引き継ぐ
     */
    if (ChangeClassRecover) {
        if (Potadra_checkSwitch(ClassRecoverSwitch)) {
            const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
            Game_Actor.prototype.changeClass = function(classId, keepExp) {
                _Game_Actor_changeClass.apply(this, arguments);
                this.recoverAllTp(ClassClearStates, ClassHpRecover, ClassMpRecover, ClassTpRecover);
            };

            if (dsJobChangeMZ) {
                const _Game_Actor_changeClassEx = Game_Actor.prototype.changeClassEx;
                Game_Actor.prototype.changeClassEx = function(classId, keepExp) {
                    _Game_Actor_changeClassEx.apply(this, arguments);
                    this.recoverAllTp(ClassClearStates, ClassHpRecover, ClassMpRecover, ClassTpRecover);
                };
            }
        }
    }

    /**
     * 全回復
     *
     * @param {} params - 
     * @returns {boolean} 回復に成功したか
     */
    if (TpRecover) {
        if (Potadra_checkSwitch(TpRecoverSwitch)) {
            Game_Interpreter.prototype.command314 = function(params) {
                this.iterateActorEx(params[0], params[1], actor => {
                    actor.recoverAllTp();
                });
                return true;
            };
        }
    }
})();
