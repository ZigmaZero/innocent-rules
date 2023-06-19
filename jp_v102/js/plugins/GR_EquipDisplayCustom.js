//=============================================================================
// Plugin for RPG Maker MZ
// GR_EquipDisplayCustom.js
// ----------------------------------------------------------------------------
// Released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.1.1
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 装備画面で表示項目を任意でオン/オフできるようにします
 * @author げれげれ
 * @url https://twitter.com/geregeregere
 *
 *
 * @param HP
 * @text HP表示
 * @desc HP表示
 * @default false
 * @type boolean
 * @on オン
 * @off オフ
 *
 * @param MP
 * @text MP表示
 * @desc MP表示
 * @default false
 * @type boolean
 * @on オン
 * @off オフ
 *
 * @param ATK
 * @text 攻撃力表示
 * @desc 攻撃力表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ
 *
 * @param DEF
 * @text 防御力表示
 * @desc 防御力表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ

 * @param MAT
 * @text 魔法力表示
 * @desc 魔法力表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ

 * @param MDF
 * @text 魔法防御表示
 * @desc 魔法防御表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ

 * @param AGI
 * @text 敏捷性表示
 * @desc 敏捷性表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ

 * @param LUK
 * @text 運表示
 * @desc 運表示
 * @default true
 * @type boolean
 * @on オン
 * @off オフ
 *
 * @param Adjustment
 * @text 自動調整
 * @desc 表示項目数が７個以上の場合に文字サイズや表示位置の微調整を行うか
 * @default true
 * @type boolean
 * @on オン
 * @off オフ
 * 
 * @help
 * 装備画面のステータスに表示させる項目を任意で変更できるようにします。
 * （通常は「攻撃力、防御力、魔法力、魔法防御、敏捷性、運」の６項目で
 * 　HPとMPの表示がない）
 * 基本想定としてはHPやMPが増減する装備品への対応です。
 *
 * 『使い方』
 * 各能力値についてオン/オフの設定を個別に用意しましたので、
 * プラグインパラメータから設定してください。
 * 初期値では標準機能と同様の上記６項目です。
 *
 * なお、元々は６項目しか表示しない箇所に最大で８項目をねじ込みますので、
 * 項目数によってわずかに文字を小さくしたり行間隔を詰めたりします。
 * 　→Ver1.1.0でレイアウト調整のオン/オフ機能を実装。
 * 　レイアウト調整が不要、返って邪魔になる場合は「自動調整」をオフにしてください。
 * 
 * プラグインコマンドはありません。
 * 
 * 『注意点』
 * 装備画面のレイアウトを調整する性質上、他の装備画面レイアウト変更プラグインとは
 * 競合する可能性が高いと思います。
 * 相談されれば対応を検討しますがあまり期待はしないでね。
 *
 */

'use strict';

{
  const PLUGIN_NAME = 'GR_EquipDisplayCustom';

  // プラグインパラメータ=================================================
  const PARAMETERS = PluginManager.parameters(PLUGIN_NAME);
  const PARAM_DISP = Array(8);
  let index = 0;
  let onCount = 0;
  for (let value of Object.values(PARAMETERS)) {
    PARAM_DISP[index] = value === 'true' ? true : false;
    if (PARAM_DISP[index]) onCount++;
    index++;
    if (index === 8) break;
  }
  const ADJUST_FLAG = PARAMETERS.Adjustment === 'true' ? true : false;

  // 実処理==============================================================
  Window_EquipStatus.prototype.drawAllParams = function () {
    let dispIndex = 0;
    // 標準のフォントサイズを一時保存
    const tempFontSize = this.contents.fontSize;
    // 自動調整がオンならば表示項目数に応じてフォントサイズを調整
    if (ADJUST_FLAG) {
      if (onCount === 7) {
        this.contents.fontSize -= 1;
      } else if (onCount === 8) {
        this.contents.fontSize -= 3;
      }
    }

    for (let i = 0; i < 8; i++) {
      if (PARAM_DISP[i]) {
        const x = this.itemPadding();
        const y = this.paramY(dispIndex, onCount);
        this.drawItem(x, y, i);
        dispIndex++;
      }
    }

    // フォントサイズを元に戻す
    this.contents.fontSize = tempFontSize;
  };

  // 項目数に応じてｙを微調整
  Window_EquipStatus.prototype.paramY = function (index, onCount) {
    let offsetY = 0;
    let shortenSpan = 0;
    // 自動調整がオンならば調整を実施
    if (ADJUST_FLAG) {
      if (onCount === 7) {
        offsetY = -2;
        shortenSpan = -1;
      } else if (onCount === 8) {
        offsetY = -8;
        shortenSpan = -5;
      }
    }
    const faceHeight = ImageManager.faceHeight;
    return (
      faceHeight +
      Math.floor(
        this.lineHeight() * (index + 1.5) + offsetY + shortenSpan * index
      )
    );
  };
}
