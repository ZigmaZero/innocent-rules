// --------------------------------------------------------------------------
// 
// MapNameinSaveData.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/21 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc セーブデータ上に現在のマップ名を載せるプラグイン
 * @author kotonoha*
 * @url https://aokikotori.com/
 * @help セーブデータ上に保存時のマップ名を載せるプラグインです。
 * マップ名の表示位置、パーティキャラの表示位置は
 * それぞれパラメータから調整していただけます。
 *
 * 改変自由、商用利用可能です。
 * 作者名のクレジットや利用報告は不要です。ご自由にどうぞ！
 * 
 * @param MapName_x
 * @text マップ名の表示位置（X軸）
 * @desc マップ名を標準位置からXドットずらして表示します。
 * @default 0
 * @type number
 *
 * @param MapName_y
 * @text マップ名の表示位置（Y軸）
 * @desc マップ名を標準位置からYドットずらして表示します。
 * @default 0
 * @type number
 *
 * @param Characters_x
 * @text キャラの表示位置（X軸）
 * @desc キャラクターを標準位置からXドットずらして表示します。
 * @default 0
 * @type number
 *
 * @param Characters_y
 * @text キャラの表示位置（Y軸）
 * @desc キャラクターを標準位置からYドットずらして表示します。
 * @default 0
 * @type number
 *
 * @param Playtime_x
 * @text プレイ時間の表示位置（X軸）
 * @desc プレイ時間を標準位置からXドットずらして表示します。
 * @default 0
 * @type number
 *
 * @param Playtime_y
 * @text プレイ時間の表示位置（Y軸）
 * @desc プレイ時間を標準位置からYドットずらして表示します。
 * @default 0
 * @type number
 */

(function() {

	const pluginName = 'MapNameinSaveData';

    const parameters = PluginManager.parameters(pluginName);
    const MapName_x = Number(parameters['MapName_x'] || 0);
    const MapName_y = Number(parameters['MapName_y'] || 0);
    const Characters_x = Number(parameters['Characters_x'] || 0);
    const Characters_y = Number(parameters['Characters_y'] || 0);
    const Playtime_x = Number(parameters['Playtime_x'] || 0);
    const Playtime_y = Number(parameters['Playtime_y'] || 0);

	DataManager.makeSavefileInfo = function() {
	    const info = {};
	    info.title = $dataSystem.gameTitle;
		info.mapname    = $gameMap.displayName();
	    info.characters = $gameParty.charactersForSavefile();
	    info.faces = $gameParty.facesForSavefile();
	    info.playtime = $gameSystem.playtimeText();
	    info.timestamp = Date.now();
	    return info;
	};

	Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
	    const bottom = rect.y + rect.height;
	    if (rect.width >= 420) {
	        this.drawGameMapName(info, rect.x + 192 + MapName_x, rect.y + MapName_y, rect.width - 192);
	        this.drawPartyCharacters(info, rect.x + 220 + Characters_x, bottom + Characters_y);
	    }
	    const lineHeight = this.lineHeight();
	    const y2 = bottom - lineHeight;
	    if (y2 >= lineHeight) {
	        this.drawPlaytime(info, rect.x + 192 + Playtime_x, rect.y + Playtime_y, rect.width - 192);
	    }
	};

	Window_SavefileList.prototype.drawGameMapName = function(info, x, y, width) {
	    if (info.mapname) {
	        this.drawText(info.mapname, x, y, width);
	    }
	};

})();