//=============================================================================
// Plugin for RPG Maker MZ
// SkillTypeLib.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Make the skill type that displays under limited situation
 * @author Sasuke KANNAZUKI
 *
 * @param passiveSkills
 * @text Passive Skills
 * @desc Skill type IDs that displays on map menu, hides on battle command
 * @type number[]
 * @default []
 *
 * @param superSpecialSkills
 * @text Super Special Skills
 * @desc Skill type IDs that displays when one's TP is full on battle.
 * @type number[]
 * @default []
 *
 * @param doesDisplaySpecialOnMap
 * @parent superSpecialSkills
 * @text Display special on map?
 * @desc Does display special skills on map?
 * @type boolean
 * @default true
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin set the skill type Id display under the specified situation.
 *
 * [Summary]
 * - Passive Skill
 *  Displays on map menu, hides on battle
 * - Super Special Skill
 *  Displays the actor's TP become max.
 *  At on map, you can select display or hide by option.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 特定条件下でのみ表示されるスキルタイプを設定します。
 * @author 神無月サスケ
 *
 * @param passiveSkills
 * @text パッシブスキル
 * @desc メニュー画面では表示され、戦闘中は表示されないスキルタイプのID
 * @type number[]
 * @default []
 *
 * @param superSpecialSkills
 * @text 超必殺技
 * @desc 戦闘中はTPが満タン(100)の時だけ表示されるスキルタイプのID
 * @type number[]
 * @default []
 *
 * @param doesDisplaySpecialOnMap
 * @parent superSpecialSkills
 * @text 超必殺技マップ表示？
 * @desc 超必殺技をマップメニューで表示する？
 * @type boolean
 * @default true
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、特定条件下でのみ表示されるスキルタイプをIDで指定します。
 *
 * ■概要
 * - パッシブスキル
 *  移動中は表示されますが、戦闘では表示されません。
 *  パッシブスキル専用のカテゴリを設けたい時に便利です。
 * - 超必殺技
 *  戦闘中、TPが満タン(通常は100)の時にのみ表示されます。
 *  バトルコマンドの一番上に表示されます。
 *  移動中の表示/非表示はオプションで設定可能です。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SkillTypeLib';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const passiveStypeIds = parameters['passiveSkills'] || '[]';
  const specialStypeIds = parameters['superSpecialSkills'] || '[]';
  const specialOnMap = eval(parameters['doesDisplaySpecialOnMap'] || 'true');

  //
  // exclude passive skill and special attack skill
  //
  const _Window_ActorCommand_addCommand =
   Window_ActorCommand.prototype.addCommand;
  Window_ActorCommand.prototype.addCommand = function(name, symbol,
   enabled = true, ext = null) {
    if (symbol === 'skill') {
      if (passiveStypeIds.includes(String(ext))) {
        return;
      }
      if (specialStypeIds.includes(String(ext))) {
        return;
      }
    }
    _Window_ActorCommand_addCommand.call(this, name, symbol, enabled, ext);
  };

  //
  // display special attack skill at first when it's usable.
  //
  const _Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
      this.addSpecialAttackCommands();
    }
    _Window_ActorCommand_makeCommandList.call(this);
  };

  Window_ActorCommand.prototype.addSpecialAttackCommands = function () {
    const skillTypes = this._actor.skillTypes();
    for (let i = 1; i <= $dataSystem.skillTypes.length; i++) {
      if (specialStypeIds.includes(String(i))) {
        if (this._actor.tp >= this._actor.maxTp()) {
          const name = $dataSystem.skillTypes[i];
          console.log(specialStypeIds, i, skillTypes, name);
          _Window_ActorCommand_addCommand.call(this, name, 'skill', true, i);
        }
      }
    }
  };

  //
  // whether to display special skill on map menu
  //
  const _Window_SkillType_addCommand = Window_SkillType.prototype.addCommand;
  Window_SkillType.prototype.addCommand = function(name, symbol,
   enabled = true, ext = null) {
    if (!specialOnMap && specialStypeIds.includes(String(ext))) {
      return;
    }
    _Window_SkillType_addCommand.call(this, name, symbol, enabled, ext);
  };

})();
