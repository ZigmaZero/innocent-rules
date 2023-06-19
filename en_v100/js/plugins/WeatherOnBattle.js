//=============================================================================
// WeatherOnBattle.js
//=============================================================================
// [Update History]
// 2016.Jun.16 Ver1.0.0 First Release
// 2019.Dec.06 Ver1.0.1 Update to run under also MZ
// 2020.Nov.19 Ver1.1.0 Enables weather change also battle scene.

/*:
 * @target MV MZ
 * @plugindesc [Ver1.1.0]display weather not only map but also battle
 * @author Sasuke KANNAZUKI
 * *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MV and MZ.
 * 
 * [Summary]
 * This plugin displays weather also on battle scene.
 *
 * [New Feature at ver. 1.1.0]
 * You can change weather even in battle.
 * Call the command "Set Weather Effect" on Battle Event.
 *
 * [License]
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MV MZ
 * @plugindesc [Ver1.1.0]戦闘中も天候アニメを表示します
 * @author 神無月サスケ
 * *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMVおよびMZに対応しています。
 * 
 * ■概要
 * 戦闘中にも天候を表示させるためのプラグインです。
 *
 * [Ver1.1.0]追加要素：
 * 戦闘中にバトルイベントで「天候の設定」を行うことが可能です。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */
(function() {

  var _Spriteset_Battle_createLowerLayer =
   Spriteset_Battle.prototype.createLowerLayer
  Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    Spriteset_Map.prototype.createWeather.call(this);
  };

  var _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    this.updateWeather();
  };

  Spriteset_Battle.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
  };

  //
  // It enables weather change also in battle.
  //
  var _Game_Interpreter_command236 = Game_Interpreter.prototype.command236;
  Game_Interpreter.prototype.command236 = function(params) {
    if ($gameParty.inBattle()) {
      $gameScreen.changeWeather(params[0], params[1], params[2]);
      if (params[3]) {
        this.wait(params[2]);
      }
    }
    return _Game_Interpreter_command236.call(this, params);
  };

})();
