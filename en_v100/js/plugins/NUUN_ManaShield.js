/*:-----------------------------------------------------------------------------------
 * NUUN_ManaShield.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Mana shield
 * @author NUUN
 * @version 1.1.3
 * @orderAfter NUUN_StoppingFeature
 * 
 * @help
 * Makes MP take damage instead of HP damage.
 * When max HP is 1000 and max MP is 600
 * [HP damage amount]
 * MP will be damaged by the amount of damage taken instead of the damage received.
 * If you take 500 HP damage and it is 50%, MP will be reduced by 250 and HP will be damaged by 250.
 * If the burden rate after MP conversion is 60%, MP will be reduced by 150 and HP will be damaged by 250.
 * [Maximum HP ratio proportional]
 * The amount of damage received is taken as damage to MP in proportion to the ratio from maximum HP and maximum MP.
 * If you take 500 HP damage and it is 50%, MP will be reduced by 150 and HP will be damaged by 250.
 * If the burden rate after MP conversion is 60%, MP will be reduced by 90 and HP will be damaged by 250.
 * 
 * Notes with characteristics (actors, occupations, weapons, armor, enemy characters, states)
 * <ManaShield:[rate]>　
 * [rate]:Percentage of damage taken over
 * <ManaShield:25> 25% of HP damage is converted to MP damage.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/8/2022 Ver.1.1.3
 * Correction of text. (English only)
 * 11/12/2022 Ver.1.1.2
 * Changed the display in languages other than Japanese to English.
 * 1/29/2022  Ver.1.1.1
 * Changed to be selectable with the original function.
 * 1/29/2022  Ver.1.1.0
 * Changed the calculation method of MP damage to be calculated as a percentage from the maximum HP.
 * 8/1/2021 Ver.1.0.1
 * Fixed SEga even though no MP damage was taken.
 * Fixed an issue where HP damage was not calculated correctly when MP was insufficient.
 * Fixed an issue that also affected recovery.
 * 8/1/2021 Ver.1.0.0
 * first edition.
 * 
 * @param MPShieldMode
 * @desc Mode of MP damage that takes over.
 * @text MP damage mode
 * @type select
 * @option HP damage amount
 * @value 'HpDamage'
 * @option Max HP percentage proportional
 * @value 'MaxHpRate'
 * @default 'MaxHpRate'
 * 
 * @param MPBurdenRate
 * @text Post-conversion burden ratio of MP
 * @desc Set the burden rate after MP damage conversion. (percentage)
 * @type number
 * @default 100
 * @min 1
 * 
 * @param SE
 * @text SE settings
 * @default ---------------------------------------------------------
 * 
 * @param ManaShieldSE
 * @text SE when activated
 * @desc SE when mana shield is activated.
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text Volume
 * @desc Volume.
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @desc Pitch.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text Phase
 * @desc Phase.
 * @type number
 * @default 50
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc マナシールド
 * @author NUUN
 * @version 1.1.3
 * @orderAfter NUUN_StoppingFeature
 * 
 * @help
 * HPダメージの代わりにMPにダメージを受けさせます。
 * 最大HPが1000 最大MPが600の場合
 * 【HPダメージ量】
 * 受けたダメージの肩代わりしたダメージ分、MPにダメージを受けます。
 * 500のHPダメージを受けた時に５０％の場合はMPが250減りHPは250だけダメージを受けます。
 * MPの変換後負担率が６０％の場合はMPが150減りHPは250のダメージを受けます。
 * 【最大HP割合比例】
 * 受けたダメージの肩代わりしたダメージ分が最大HPからの割合と最大MPに比例してMPにダメージを受けます。
 * 500のHPダメージを受けた時に５０％の場合はMPが150減りHPは250だけダメージを受けます。
 * MPの変換後負担率が６０％の場合はMPが90減りHPは250のダメージを受けます。
 * 
 * 特徴を有するメモ欄（アクター、職業、武器、防具、敵キャラ、ステート）
 * <ManaShield:[rate]>　
 * [rate]:肩代わりするダメージの割合
 * <ManaShield:25> HPダメージの25％がMPダメージに変換されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/8 Ver.1.1.3
 * テキストの修正。(英語のみ)
 * 2022/11/12 Ver.1.1.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/29  Ver.1.1.1
 * 元の機能と選択できるように変更。
 * 2022/1/29  Ver.1.1.0
 * MPダメージの計算方法を最大HPからの割合で算出するように変更。
 * 2021/8/1 Ver.1.0.1
 * MPダメージを受けてないのにSEgaなる問題を修正。
 * MP不足だった時のHPダメージが正常に計算されていなかった問題を修正。
 * 回復時にも影響していた問題を修正。
 * 2021/8/1 Ver.1.0.0
 * 初版
 * 
 * @param MPShieldMode
 * @desc 肩代わりするMPダメージのモード。
 * @text MPダメージモード
 * @type select
 * @option HPダメージ量
 * @value 'HpDamage'
 * @option 最大HP割合比例
 * @value 'MaxHpRate'
 * @default 'MaxHpRate'
 * 
 * @param MPBurdenRate
 * @text MPの変換後負担率
 * @desc MPのダメージ変換後の負担率を設定します。(百分率)
 * @type number
 * @default 100
 * @min 1
 * 
 * @param SE
 * @text SE設定
 * @default ---------------------------------------------------------
 * 
 * @param ManaShieldSE
 * @text 発動時SE
 * @desc マナシールド発動時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ManaShield = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ManaShield');
  const MPShieldMode = eval(parameters['MPShieldMode'] || 'HpDamage');
  const MPBurdenRate = Number(parameters['MPBurdenRate'] || 100);
  const ManaShieldSE = String(parameters['ManaShieldSE']);
  const volume = Number(parameters['volume'] || 90);
  const pitch = Number(parameters['pitch'] || 100);
  const pan = Number(parameters['pan'] || 50);

  const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
  Game_Action.prototype.executeHpDamage = function(target, value) {
    value = this.manaShield(target, value);
    _Game_Action_executeHpDamage.call(this, target, value);
  };

  Game_Action.prototype.manaShield = function(target, value) {
    if (value > 0) {
      const rate = target.traitsManaShieldPi();
      let newValue = Math.floor(value * rate);
      if (newValue > 0) {
        const mpValue = this.getManaShieldDamage(target, newValue);
//        newValue = Math.min(newValue, target.mp);
        this.executeMpDamage(target, mpValue);
        if(mpValue > 0 && ManaShieldSE) {
          AudioManager.playSe({"name":ManaShieldSE,"volume":volume,"pitch":pitch,"pan":pan});
        }
      }
      return value - newValue;
    }
    return value;
  };

  Game_Action.prototype.getManaShieldDamage = function(target, value) {
    if (MPShieldMode === 'HpDamage') {
      return Math.floor(Math.min(value * (MPBurdenRate / 100), target.mp))
    } else if (MPShieldMode === 'MaxHpRate') {
      return Math.floor((target.mmp * (value / target.mhp)) * (MPBurdenRate / 100));
    }
  };

  Game_BattlerBase.prototype.traitsManaShieldPi = function() {
    const traits = this.traitsManaShield();
    if (traits.length > 0) {
      return traits.reduce((r, obj) => r * (Number(obj.meta.ManaShield) / 100), 1);
    }
    return 0;
  };

  Game_BattlerBase.prototype.traitsManaShield = function() {
    return this.traitObjects().filter(trait => trait.meta.ManaShield && Number(trait.meta.ManaShield) > 0);
  };
  
})();