//=============================================================================
// TMPlugin - 因果の調律
// バージョン: 1.0.0
// 最終更新日: 2017/10/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 運の値が影響する要素をカスタマイズします。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param effectRate
 * @type number
 * @decimals 3
 * @desc ステート付与成功率の補正倍率。
 * 初期値: 0.001
 * @default 0.001
 *
 * @help
 * TMPlugin - 因果の調律 ver1.0.0
 *
 * 使い方:
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 * 
 * 
 * プラグインパラメータ補足:
 * 
 *   effectRate
 *     ステート付与を実行したバトラーと実行されたバトラーの運の差に
 *     この値をかけて、1 を足したものが成功率の補正倍率になります。
 *     運10のバトラーが運5のバトラーに対して成功率50%のステート付与を
 *     実行した場合（effectRate は 0.001 とする）、補正倍率は 1.005 で
 *     ステート付与の成功率は 50.25% になります。
 */

var Imported = Imported || {};
Imported.TMLuckFix = true;

(function() {

  var parameters = PluginManager.parameters('TMLuckFix');
  var effectRate = +(parameters['effectRate'] || 0.001);

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  Game_Action.prototype.lukEffectRate = function(target) {
    return Math.max(1.0 + (this.subject().luk - target.luk) * effectRate, 0.0);
  };

})();
