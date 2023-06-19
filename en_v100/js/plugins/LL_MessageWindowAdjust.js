//=============================================================================
// RPGツクールMZ - LL_MessageWindowAdjust.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メッセージウィンドウの幅を調整します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-messagewindowadjust/
 *
 * @help LL_MessageWindowAdjust.js
 *
 * メッセージ表示時に顔グラフィックが無しの時でも、
 * 顔グラフィック有りの時とメッセージ幅を統一します。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2020/10/18
 *
 * @param adjustWindowChoiceList
 * @text 選択肢の位置同期
 * @desc 選択肢の位置をメッセージ幅と合わせるかの設定です。
 * @default true
 * @type boolean
 *
 * @param adjustOnFace
 * @text メッセージ幅調整値 (顔有)
 * @desc 顔グラフィック有り時のメッセージ幅を縮少する値です。
 * 初期値: 0
 * @default 0
 * @type number
 * @min 0
 * @max 2000
 *
 * @param adjustNoFace
 * @text メッセージ幅調整値 (顔無)
 * @desc 顔グラフィック無し時のメッセージ幅を縮少する値です。
 * 初期値: 80
 * @default 80
 * @type number
 * @min 0
 * @max 2000
 */

(() => {
	"use strict";
	const pluginName = "LL_MessageWindowAdjust";

	const parameters = PluginManager.parameters(pluginName);
	const adjustWindowChoiceList = eval(parameters["adjustWindowChoiceList"] || "true");
	const adjustOnFace = Number(parameters["adjustOnFace"] || 0);
	const adjustNoFace = Number(parameters["adjustNoFace"] || 80);

	const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
	Window_Message.prototype.updatePlacement = function() {
		_Window_Message_updatePlacement.apply(this, arguments);
		// 位置と幅を調整
		let adjustValue = 0;
		if (!$gameParty.inBattle()) {
			adjustValue = $gameMessage.faceName() === "" ? adjustNoFace : adjustOnFace;
		}
		this.x = adjustValue;
		this.width = Graphics.boxWidth - (adjustValue * 2);
	};

	Window_ChoiceList.prototype.windowX = function() {
		// 位置と幅を調整
		let adjustValue = 0;
		if (!$gameParty.inBattle() && adjustWindowChoiceList) {
			adjustValue = $gameMessage.faceName() === "" ? adjustNoFace : adjustOnFace;
		}
		const positionType = $gameMessage.choicePositionType();
		if (positionType === 1) {
			return (Graphics.boxWidth - this.windowWidth()) / 2;
		} else if (positionType === 2) {
			return Graphics.boxWidth - this.windowWidth() - adjustValue;
		} else {
			return 0 + adjustValue;
		}
	};
})();
