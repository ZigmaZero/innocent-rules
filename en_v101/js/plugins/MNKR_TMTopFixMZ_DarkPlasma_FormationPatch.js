/*
 * --------------------------------------------------
 * MNKR_TMTopFixMZ_DarkPlasma_FormationPatch.js
 *   Ver.0.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTopFixMZ_DarkPlasma_FormationPatch.js
 * @plugindesc MNKR_TMTopFixMZの機能をDarkPlasma_Formationに適用するパッチ
 * @author munokura
 * @base DarkPlasma_Formation
 * @base MNKR_TMTopFixMZ
 * @orderAfter DarkPlasma_Formation
 *
 * @help
 * DarkPlasma_Formation のシーンにおいて、
 * パーティの先頭にいるアクターの並び替えを禁止します。
 *
 * 使い方:
 * DarkPlasma_Formation と MNKR_TMTopFixMZ をプラグイン管理でONにします。
 * MNKR_TMTopFixMZ_DarkPlasma_FormationPatch をプラグイン管理でONにし、
 * DarkPlasma_Formation の下側に配置してください。
 * 
 * 例
 *   DarkPlasma_Formation
 *   MNKR_TMTopFixMZ
 *   MNKR_TMTopFixMZ_DarkPlasma_FormationPatch
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    'use strict';

    const _Window_FormationSelect_isCurrentItemEnabled = Window_FormationSelect.prototype.isCurrentItemEnabled;
    Window_FormationSelect.prototype.isCurrentItemEnabled = function () {
        if ($gameSystem.isTopFix() && this.index() === 0) {
            return false;
        }
        return _Window_FormationSelect_isCurrentItemEnabled.call(this);
    };

})();
