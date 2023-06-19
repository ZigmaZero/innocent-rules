//=============================================================================
// Plugin for RPG Maker MZ
// AddAutoToActorCommand.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Add 'Auto' command on the top or bottom of Actor Command
 * @author Sasuke KANNAZUKI
 *
 * @param commandName
 * @text Command Name
 * @desc Displaying command name that 'Auto' command.
 * @type string
 * @default Auto Select
 *
 * @param autoCommandPos
 * @text Auto Command Position
 * @desc Adding position of 'Auto' command in the window
 *  (0:Top 1:Bottom)
 * @type select
 * @option Top
 * @value 0
 * @option Bottom
 * @value 1
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 * 
 * This plugin adds 'Auto' command on the top or bottom of Actor Command.
 *
 * [Summary]
 * When player select 'Auto' command, the actor performs appropriate action.
 * - The action is the same as one when the actor has the trait 'Auto Battle'.
 * - The 'Auto' commands works only current turn. The next turn, actor command
 *  window appears again.
 *
 * [Note]
 * When the actor can more than 1 actions and once select 'Auto',
 * all actions become ones that auto battle routine decide,
 * and previous inputted actions are ignored.
 *
 * [Note Setting]
 * Write actor's note <NoAutoCommand> not to display 'Auto'
 * to the actor's command.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘のアクターコマンドの先頭か後尾に「オート」を追加します
 * @author 神無月サスケ
 *
 * @param commandName
 * @text コマンド名
 * @desc オートコマンドの表示名です。
 * @type string
 * @default おまかせ
 *
 * @param autoCommandPos
 * @text オートコマンド位置
 * @desc オートコマンドを先頭か末尾、どちらに置くか
 *  (0:先頭, 1:末尾)
 * @type select
 * @option 先頭
 * @value 0
 * @option 末尾
 * @value 1
 * @default 0
 *
 * @help このプラグインにプラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインを導入すると、戦闘時のアクターコマンドの先頭か末尾に
 * オート（自動で適切な行動を決める）が追加されるようになります。
 *
 * ■概要
 * - オートが選ばれたときに採用される行動は、そのアクターが「自動戦闘」の
 *   特徴を持っている時と同様になります。
 * - 自動で行動するのは、オートが選ばれたターンだけです。
 *   次のターンでは再びアクターコマンドが表示されます。
 *
 * ■注意
 * 複数回行動が可能なアクターの場合、先に別のコマンドを入力していても
 * オートを選択した場合、それらは無視され、全て自動戦闘のコマンドに
 * 切り替わります。
 *
 * ■メモの書式
 * アクターのメモに <NoAutoCommand> と記述すると、
 * そのアクターのコマンドにはオートが追加されなくなります。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'AddAutoToActorCommand';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const commandName = parameters['commandName'] || 'Auto Select';
  const yPosType = Number(parameters['autoCommandPos'] || 0);

  //
  // add command to actor command window
  //
  const _Scene_Battle_createActorCommandWindow =
   Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('auto', this.commandAuto.bind(this));
  };

  const doesDisplayAuto = actor => actor && !actor.actor().meta.NoAutoCommand;

  const _Window_ActorCommand_makeCommandList =
   Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {
    if (doesDisplayAuto(this._actor) && yPosType === 0) {
      this.addAutoCommand();
    }
    _Window_ActorCommand_makeCommandList.call(this);
    if (doesDisplayAuto(this._actor) && yPosType === 1) {
      this.addAutoCommand();
    }
  };

  Window_ActorCommand.prototype.addAutoCommand = function() {
    this.addCommand(commandName, 'auto');
  };

  Scene_Battle.prototype.commandAuto = function() {
    const actor = BattleManager._currentActor;
    if (actor) {
      actor.makeAutoBattleActions();
    }
    BattleManager.finishActorInput();
    this.changeInputWindow();
    BattleManager.selectNextActor();
  };

})();
