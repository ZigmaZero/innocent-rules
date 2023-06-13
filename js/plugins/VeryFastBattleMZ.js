//=============================================================================
// Plugin for RPG Maker MZ
// VeryFastBattleMZ.js
//=============================================================================
// This plugin the MZ version of VeryFastBattle the RMMV plugin.
// 2016.Aug.09 Ver1.0.0 First Release of VeryFastBattle.js
// 2020.Nov.19 Ver1.0.0 First Release of VeryFastBattleMZ.js
//

/*:
 * @target MZ
 * @plugindesc battle exceeds very fast when specified keys down
 * @author Sasuke KANNAZUKI, Shitsudo Kei
 * 
 * @param Invalidate Switch
 * text Very Fast Lock swicth
 * @desc Very Fast is not work when the switch is ON
 * @type switch
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 * 
 * This pluguin enables battle very fast while specified key down.
 *
 * When 'pageup' key(=PageUp or Q) or 'control' key (=Ctrl or Alt) is down
 * at battle turn, it exceeds very fast.
 *
 * When you use touch device,long press for mouse and touch panel.
 *
 * Copyright:
 * This plugin's specification is based on、星潟's RGSS3 material.
 * Artificial Providence http://artificialprovidence.web.fc2.com/
 * Thanks to 星潟.
 *
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc 特定のキーが押された時、超高速に戦闘シーンが進みます
 * @author 神無月サスケ、湿度ケイ
 *
 * @param Invalidate Switch
 * @text 高速戦闘無効スイッチID
 * @desc 指定のスイッチがONになった時、高速戦闘は機能しません。
 * @type switch
 * @default 0
 * 
 * @help このプラグインには、プラグインコマンドはありません
 * このプラグインは、RPGツクールMZに対応しています。
 * 
 * このプラグインは、戦闘中に特定のキーを押している間、非常に高速にします。
 *
 * 'pageup' キー か 'control' キーが押されている間、超高速になります。
 * - 'pageup' とは、キーボードの PgUp か Q, またはパッドの Lボタンです。
 * - 'control' とは、キーボードの Ctrl か Alt です。
 *
 * タッチパネルやマウスでは、長押しすることで効果が現れます。
 *
 * ■謝辞
 * このプラグインの仕様は、星潟様の RGSS3 素材を参考にしました。
 * Artificial Providence http://artificialprovidence.web.fc2.com/
 * 星潟様に謝意を示します。
 *
 * また、MZ対応のために、湿度ケイ様の変更部分を取り入れました。
 * 湿度ケイさんに感謝します。
 *
 * ■注意
 * 湿度ケイさんのプラグインは、特定のキーを『押していない』状態で高速ですが
 * このプラグインは従来通り『押している』ときに動作が進みます。
 *
 * ■ライセンス
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'VeryFastBattleMZ';
  //
  // Process parameters
  //
  //
  const parameters = PluginManager.parameters(pluginName);
  const invalidateSwitchID = Number(parameters['Invalidate Switch'] || 0);

  // Check Very Fast
  //
  Game_System.prototype.isVeryFastForward = function() {
    if ($gameSwitches.value(invalidateSwitchID)) {
      return false;
    }
    return Input.isPressed('pageup') || Input.isPressed('control') ||
     TouchInput.isLongPressed();
  };

  //
  // Added by Shitsudo Kei in order to fit RMMZ battle sequence.
  //
  // !!!overwrite!!
  Game_Battler.prototype.tpbRelativeSpeed = function() {
    if ($gameSystem.isVeryFastForward() && this._waitMode === 'effect') {
      return this.tpbSpeed() * 3;
    } else {
      return this.tpbSpeed();
    }
  };

  // !!!overwrite!!
  Game_Battler.prototype.tpbSpeed = function() {
    return Math.sqrt(this.agi);
  };

  //
  // skip all waits
  //
  const _Window_BattleLog_updateWaitCount =
   Window_BattleLog.prototype.updateWaitCount;
  Window_BattleLog.prototype.updateWaitCount = function() {
    if (this._waitCount > 0 && $gameSystem.isVeryFastForward()) {
      this._waitCount = 1;
    }
    return _Window_BattleLog_updateWaitCount.call(this);
  };

  const _Window_BattleLog_updateWaitMode =
   Window_BattleLog.prototype.updateWaitMode;
  Window_BattleLog.prototype.updateWaitMode = function() {
    if ($gameSystem.isVeryFastForward() && this._waitMode === 'effect') {
      this._waitMode = '';
      return false;
    }
    return _Window_BattleLog_updateWaitMode.call(this);
  };

  const _Sprite_Battler_updateMove = Sprite_Battler.prototype.updateMove;
  Sprite_Battler.prototype.updateMove = function() {
    if (this._movementDuration > 0 && $gameSystem.isVeryFastForward()) {
      this._movementDuration = 1;
    }
    return _Sprite_Battler_updateMove.call(this);
  };

  const _Spriteset_Battle_isBusy = Spriteset_Battle.prototype.isBusy;
  Spriteset_Battle.prototype.isBusy = function() {
    if ($gameSystem.isVeryFastForward()) { 
      return false;
    } else {
      return _Spriteset_Battle_isBusy.call(this);
    }
  };
})();
