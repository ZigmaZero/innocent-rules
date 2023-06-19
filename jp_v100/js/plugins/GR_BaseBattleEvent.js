//=============================================================================
// Plugin for RPG Maker MZ
// GR_BaseBattleEvent.js
// ----------------------------------------------------------------------------
// Released under the MIT License.
// https://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 敵グループ0001に設定されたバトルイベントを
 *             全グループで実行される共通処理とします。
 * @author げれげれ
 * @url https://twitter.com/geregeregere
 *
 * 
 * @help
 * 敵グループ0001に設定されたバトルイベントを全ての敵グループで
 * 実行する共通処理にします。
 * 
 * プラグインコマンド、プラグインパラメータはありません。
 * 
 */

(() => {
    'use strict';

    //pagesに敵グループ0001のバトルイベントを持たせるように修正
    Game_Troop.prototype.setupBattleEvent = function() {
        if (!this._interpreter.isRunning()) {
            if (this._interpreter.setupReservedCommonEvent()) {
                return;
            }
            const pages = $dataTroops[1].pages.concat(this.troop().pages);  //先に共通処理から
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                if (this.meetsConditions(page) && !this._eventFlags[i]) {
                    this._interpreter.setup(page.list);
                    if (page.span <= 1) {
                        this._eventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    };

    //ターン経過時のフラグ戻しでも同様にpagesを変更
    Game_Troop.prototype.increaseTurn = function() {
        const pages = $dataTroops[1].pages.concat(this.troop().pages);
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (page.span === 1) {
                this._eventFlags[i] = false;
            }
        }
        this._turnCount++;
    };

})();
