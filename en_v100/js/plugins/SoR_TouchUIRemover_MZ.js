//=============================================================================
// SoR_TouchUIRemover_MZ.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.02 (2020/08/28)
//=============================================================================
/*:ja
@plugindesc ＜タッチUI除去＞ v1.02
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help RPGツクールMZで標準機能(コアスクリプト搭載)となっている
モバイル端末向けのタッチUIを削除し、ウィンドウを詰めることで
RPGツクールMVと同等のウィンドウレイアウトに変更します。
オプションの項目からもタッチUIのON/OFFを除去します。

@param IsdrawItemBG
@desc 'false'のとき、MZ標準機能の各選択項目の矩形背景を描画しません  (default:true)
@default true
@type boolean
*/
/*:
@plugindesc <Touch UI Remove> v1.02
@author Soryu
@target MZ
@url http://dragonflare.blue/dcave/index_e.php
@help This plugin removes the touch UI for mobile platforms
to alternate the window layout as RPGMaker MV.
This targets for the developer who aims to the PC.
The configuration for touch UI is also removed from the option menu.

@param IsdrawItemBG
@desc If 'false', disable to draw background rectangle for each command item (default:true)
@default true
@type boolean
*/

ConfigManager.touchUI = false;

(function() {

var Param = PluginManager.parameters('SoR_TouchUIRemover_MZ');
var IsdrawItemBG = Boolean(Param['IsdrawItemBG'] === 'true') || false;

Scene_MenuBase.prototype.mainAreaTop = function() {
    if (!this.isBottomHelpMode()) return this.helpAreaBottom();
	return 0;
}

const SoR_TRM_WO_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	SoR_TRM_WO_addGeneralOptions.call(this);
	const tmp = this._list;
	this._list = tmp.filter(n => n.symbol !== "touchUI");
}

Scene_MenuBase.prototype.mainAreaHeight = function() {
    return Graphics.boxHeight - this.helpAreaHeight();
}

//to be considered... (The original returns a constant.)
Scene_Options.prototype.maxCommands = function() {
    return 6;
}

Window_Selectable.prototype.drawAllItems = function() {
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            if(IsdrawItemBG) this.drawItemBackground(index); //bg rect
            this.drawItem(index);
        }
    }
}

const SoR_TRM_WO_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    SoR_TRM_WO_setupNewGame.call(this, ...arguments);	
	ConfigManager.touchUI = false;
};

Sprite_Button.prototype.checkBitmap = function() {}


}());
