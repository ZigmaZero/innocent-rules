/*
 * --------------------------------------------------
 * MNKR_OnceAnimation.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OnceAnimation.js
 * @plugindesc 戦闘中のスキルのアニメーション再生を連続回数に関わらず1回にします。
 * @author munokura
 *
 * @help
 * 戦闘中のスキルのアニメーション再生を連続回数に関わらず1回にします。
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * 謝辞
 *   当プラグインはDarkPlasma氏の指導で作成されました。
 *   ご助言（というか解答そのもの）をいただき、感謝いたします。
 */

(() => {
  "use strict";

  const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
  Window_BattleLog.prototype.showAnimation = function (subject, targets, animationId) {
    _Window_BattleLog_showAnimation.call(
      this,
      subject,
      Array.from(new Set(targets)),
      animationId
    );
  };

})();