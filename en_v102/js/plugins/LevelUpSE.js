
/*:
 * @plugindesc レベルアップ時にSEを再生するプラグイン
 * @target MZ
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 * @author さすらいのトム
 * 
 * @param LevelUpSE
 * @text レベルアップ時に再生するSE
 * @desc レベルアップ時に再生するSEです。
 * @default
 * @type file
 * @dir audio/se
 * @default Powerup
 *
 * @param LevelUpVolume
 * @text 再生するSEの音量
 * @desc 再生するSEの音量です。
 * @default
 * @type number
 * @default 90
 *
 * @param LevelUpPitch
 * @text 再生するSEのピッチ
 * @desc 再生するSEのピッチです。
 * @default
 * @type number
 * @default 100
 *
 * @param LevelUpPan
 * @text 再生するSEの位相
 * @desc 再生するSEの位相です。
 * @default
 * @type number
 * @default 0

 * @help LevelUpSE.js
 *
 * レベルアップ時にSEを鳴らすプラグインです。
 * 某ドラゴンでクエストなあれみたいな感じです。
 * 鳴らすSEはプラグインパラメータより設定可能です。
 * 
 * ついでに、下記のエスケープ文字が実装されます。
 * /SETVICTORYSE
 * メッセージに↑の文言を記載することでパラメータで設定したSEを鳴らすことが出来ます。
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましても
 *  当方では責任を負いかねます。
 * 
 */

(() => {
    'use strict';
    let plugin_params = PluginManager.parameters("LevelUpSE"); 
    let SE            = String(plugin_params.LevelUpSE);
    let volume        = Number(plugin_params.LevelUpVolume);
    let pitch         = Number(plugin_params.LevelUpPitch);
    let pan           = Number(plugin_params.LevelUpPan);


    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        let text = TextManager.levelUp.format(
            this._name,
            TextManager.level,
            this._level
        );
        $gameMessage.newPage();
        text = '\\SETVICTORYSE'+ text;
        $gameMessage.add(text);
        for (const skill of newSkills) {
            $gameMessage.add(TextManager.obtainSkill.format(skill.name));
        }
    };

    var Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case 'SETVICTORYSE':
                AudioManager.playSe({"name":SE,"volume":volume,"pitch":pitch,"pan":pan});
            break;
            default:
                Window_Base_processEscapeCharacter.call(this, code, textState);
            break;
        }
    };
})();
