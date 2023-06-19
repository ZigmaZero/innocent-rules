//=============================================================================
// Plugin for RPG Maker MZ
// SimpleMsgSideViewMZ.js
//=============================================================================
// [Update History]
// This is the MZ version of SimpleMsgSideView the RMMV official plugin.

/*:
 * @target MZ
 * @plugindesc At sideview battle, only display item/skill names.
 * @author Sasuke KANNAZUKI
 *
 * @param displayAttack
 * @text Display Normal Attack?
 * @desc Whether to display normal attack.
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param displayIcon
 * @text Display Icon?
 * @desc Whether to display icon with skill/item name.
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 *
 * By introducing this plugin, at battle, display item/skill names alone,
 * not display battle logs.
 *
 * [Note]
 * - This plugin works also front view battle, but at the case,
 *  damage to ally is not displayed.
 * - By not displaying the log and only displaying the skill name,
 *  the speed of battle will increase slightly. 
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc サイドビューバトルでスキル/アイテムの名前のみ表示します。
 * @author 神無月サスケ
 *
 * @param displayAttack
 * @text 通常攻撃も表示
 * @desc 通常攻撃も表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @param displayIcon
 * @text アイコン表示
 * @desc スキルやアイテムのアイコンも表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default true
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインを導入すると、戦闘の際、バトルログが表示されず、
 * 使用したスキルやアイテムの名前のみが表示されるようになります。
 *
 * ■注意
 * - フロントビューでの使用も可能ですが、味方のダメージが表示されません。
 * - ログを表示せず、技名のみを表示するため、戦闘のテンポが若干高速になります。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SimpleMsgSideViewMZ';

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  let displayAttack = String(parameters['displayAttack'] || 'false');
  displayAttack = eval(displayAttack);
  let displayIcon = String(parameters['displayIcon'] || 'true');
  displayIcon = eval(displayIcon);

  //
  // main routine
  //

  // !!!overwrite!!!
  Window_BattleLog.prototype.addText = function(text) {
    this.refresh();
    this.wait();
    // not display battle log
  };

  Window_BattleLog.prototype.addItemNameText = function(item) {
    this._lines.push(item.name);
    this._actionIconIndex = displayIcon ? item.iconIndex : 0;
    this.refresh();
    this.wait();
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (displayAttack ||
       !(DataManager.isSkill(item) && item.id === subject.attackSkillId())
    ) {
      this.push('addItemNameText', item);
    } else {
      this.push('wait');
    }
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.drawLineText = function(index) {
    const text = this._lines[index];
    const rect = this.lineRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIconIndex) {
      const x = (rect.width - this.textWidth(text)) / 2 - 4;
      this.drawIcon(this._actionIconIndex, x, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
  };

})();
