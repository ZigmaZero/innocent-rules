/*
 * --------------------------------------------------
 * MNKR_TMTopFixMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - 先頭並び替え不可
// バージョン: 1.0.1
// 最終更新日: 2017/02/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTopFixMZ.js
 * @plugindesc パーティの先頭にいるアクターの並び替えを禁止します。
 * @author tomoaky (改変 munokura)
 *
 * @help
 * パーティの先頭にいるアクターの並び替えを禁止します。
 * 
 * 使い方:
 * 
 *   ゲーム開始時は先頭アクターの並び替えが禁止の状態になります。
 *   必要に応じてプラグインコマンドで解除してください。
 * 
 * 
 * プラグインコマンド:
 * 
 *   stopTopFix
 *     先頭並び替え禁止を解除します。
 * 
 *   startTopFix
 *     先頭並び替えを禁止します。
 * 
 * 
 * @command stopTopFix
 * @text 先頭並び替え解除
 * @desc 先頭並び替え禁止を解除します。
 *
 * @command startTopFix
 * @text 先頭並び替え禁止
 * @desc 先頭並び替えを禁止します。
 */

var Imported = Imported || {};
Imported.TMTopFix = true;

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    //-----------------------------------------------------------------------------
    // Game_System
    //

    Game_System.prototype.setTopFix = function (topFix) {
        this._topFix = topFix;
    };

    Game_System.prototype.isTopFix = function () {
        if (this._topFix == null) this._topFix = true;
        return this._topFix;
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "stopTopFix", args => {
        $gameSystem.setTopFix(false);
    });

    PluginManager.registerCommand(pluginName, "startTopFix", args => {
        $gameSystem.setTopFix(true);
    });

    //-----------------------------------------------------------------------------
    // Window_MenuStatus
    //

    const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
        if ($gameSystem.isTopFix() && this._formationMode && this.index() === 0) {
            return false;
        }
        return _Window_MenuStatus_isCurrentItemEnabled.call(this);
    };

})();