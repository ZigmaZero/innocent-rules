/*
 * --------------------------------------------------
 * MNKR_TMEquipSlotExMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - 装備スロット拡張
// バージョン: 1.0.0
// 最終更新日: 2017/02/09
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMEquipSlotExMZ.js
 * @plugindesc アクター毎に部位設定を自由に変更できるようにします。
 * @author tomoaky (改変 munokura)
 *
 * @help
 * アクター毎に部位設定を自由に変更できるようにします。
 * 
 * 使い方:
 * 
 *   アクターのメモ欄に
 *    <equipSlotEx:1 2 5 5 5>
 *   のようなタグを書き込んでください。
 *   この例では武器、盾、装飾品3つという部位構成になります。
 *   タグがなければ通常の部位構成が採用されます。
 *   また、二刀流が設定されている場合、2つ目の部位が武器に置き換わります。
 *
 * 注意事項:
 * 
 *   データベースの初期装備やイベントコマンド『装備の変更』など、
 *   エディタ側はスロット拡張に対応していないため、
 *   イベント処理としてアクターの装備を変更したい場合、
 *   プラグインコマンドを使ってください。
 * 
 * 
 * プラグインコマンド:
 * 
 *   changeEquipSlotEx 1 3 10
 *   アクター1番の装備スロット 3 番(一番上を 0 番とする)に
 *   10 番の装備品を装備します。
 *   装備品が武器か防具かは指定したスロットによって自動的に判断されます。
 *
 *   forceChangeEquipSlotEx 1 3 10
 *   changeEquipSlotEx とは違い、
 *   パーティが対象となる装備品を所持している必要がありません。
 *   交換前の装備は無くなります。
 * 
 *   clearEquipmentsSlotEx 1
 *   アクター 1 番の装備を全て外します。
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * 
 * @command changeEquipSlotEx
 * @text 装備の変更
 * @desc 指定の装備を付けます。装備品を所持している必要があります。
 * 
 * @arg actorId
 * @text アクター
 * @desc アクターに指定の装備を付けます。
 * @type actor
 * @default 0
 * 
 * @arg slotId
 * @text 装備スロットID
 * @desc 装備スロットID。0から開始
 * @type number
 * @default 0
 * 
 * @arg equipId
 * @text 装備品ID
 * @desc 装備品ID。武器・防具の判定は自動判別
 * @type number
 * @default 0
 * 
 * 
 * @command forceChangeEquipSlotEx
 * @text 装備強制交換
 * @desc 指定の装備を付けます。パーティが対象となる装備品を所持している必要がありません。交換前の装備はなくなります。
 * 
 * @arg actorId
 * @text アクター
 * @desc アクターに指定の装備を付けます。
 * @type actor
 * @default 0
 * 
 * @arg slotId
 * @text 装備スロットID
 * @desc 装備スロットID。0から開始
 * @type number
 * @default 0
 * 
 * @arg equipId
 * @text 装備品ID
 * @desc 装備品ID。武器・防具の判定は自動判別
 * @type number
 * @default 0
 * 
 * 
 * @command clearEquipmentsSlotEx
 * @text 全装備解除
 * @desc 装備を全て外します。
 * 
 * @arg actorId
 * @text アクター
 * @desc アクターの装備を全て外します。
 * @type actor
 * @default 0
 */

var Imported = Imported || {};
Imported.TMEquipSlotEx = true;
var TMPlugin = TMPlugin || {};

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
  Game_Actor.prototype.equipSlots = function () {
    let equipSlotEx = this.actor().meta.equipSlotEx;
    if (equipSlotEx) {
      let slots = equipSlotEx.split(' ').map(Number);
      if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
      return slots;
    } else {
      return _Game_Actor_equipSlots.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "changeEquipSlotEx", args => {
    let arr = [args.actorId, args.slotId, args.equipId];
    let actor = $gameActors.actor(+arr[0]);
    if (actor) {
      let item = +arr[1] === 0 || (+arr[1] === 1 && actor.isDualWield()) ?
        $dataWeapons[+arr[2]] : $dataArmors[+arr[2]];
      actor.changeEquip(+arr[1], item);
    }
  });

  PluginManager.registerCommand(pluginName, "forceChangeEquipSlotEx", args => {
    let arr = [args.actorId, args.slotId, args.equipId];
    let actor = $gameActors.actor(+arr[0]);
    if (actor) {
      let item = +arr[1] === 0 || (+arr[1] === 1 && actor.isDualWield()) ?
        $dataWeapons[+arr[2]] : $dataArmors[+arr[2]];
      actor.forceChangeEquip(+arr[1], item);
    }
  });

  PluginManager.registerCommand(pluginName, "clearEquipmentsSlotEx", args => {
    let arr = [args.actorId];
    let actor = $gameActors.actor(+arr[0]);
    if (actor) actor.clearEquipments();
  });

})();