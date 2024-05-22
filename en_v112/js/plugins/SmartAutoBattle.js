//=============================================================================
// Plugin for RPG Maker MZ
// SmartAutoBattle.js (WIP)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Customize/Refine Actor's battle auto action
 * @author Sasuke KANNAZUKI
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 * 
 * This plugin refines actors' auto action.
 *
 * [Summary]
 * - Reduce frequency HP Recover when the target actor has enough HP,
 * and incerease frequency HP Recover when the target actor is crisis.
 * - You can customize auto actors' behavior by following note description.
 *
 * [Note Descriptions]
 * Describe following notation at actors' note.
 *
 * <NormalAutoAction:65%>
 * In this case, normal auto action is selected by 65%,
 * otherwise, action is selected from free action(describe later).
 * If the actor can use HP recover skill and any party member needs to
 * recover HP, HP recover skill will be selected
 * higher priority.
 * *Example:
 * <NormalAutoAction:50> % is omissible.
 * In the case, 50% normal auto action, 50% free action.
 * *Note：
 * When omit the description, normal auto action selected 100%,
 * free actions are never selected.
 *
 * <FreeAutoActions:[7,12]> sets the free action.
 * The parameter must be an array of skill id.
 * Each skill id in the array is selected the same odds.
 * *Example：
 * <FreeAutoActions:[11,12,13,14]>
 * *Note：
 * When omit or set invalid descripton(including empty array),
 * Normal auto action is 100% selected.
 *
 * [Post Script]
 * This plugin is developed to use at 「ルイーゼと秘密の地下室」
 * (Luise and Secret Basement Rooms) the RMMZ Japanese sample game.
 * So, be sure that this plugin may provide 'AD HOC' tactics.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘時アクターの自動戦闘をカスタム/改善
 * @author 神無月サスケ
 *
 * @help このプラグインにプラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインは、アクターの自動戦闘を改善します。
 *
 * ■概要
 * - アクター達のHPが十分な時には回復の頻度を下げ、
 *   HPが少ないアクターがいると回復の頻度が上がります。
 * - 戦闘不能の仲間がいる場合、蘇生魔法を優先して使う確率が大幅に上がります。
 * - 何度使用しても無くならないアイテムを使うことがあります。
 * - 状態異常の際、状態回復スキルを使うことがあります。
 * - 強敵が相手の時は、能力強化やステート付与を行う頻度が上がります。
 * - 後述のメモの記載により、より柔軟な行動選択を可能にします。
 *
 * ■メモの記述
 * アクターのメモに以下の書式で書いてください。
 *
 * <NormalAutoAction:65%> 65%の確率で通常の自動戦闘を行います。
 * それ以外の場合は、後述の自由行動の中から行動を選択します。
 * ただし、HP回復が必要なアクターがおり、そのアクターがHP回復スキルを
 * 持っているなら、そちらが優先されます。
 * 例:
 * <NormalAutoAction:55> %は省略可能です。
 * 45%の確率で自由行動を、残りの55%は通常の自動戦闘行動を行います。
 * 注意：
 * この記述を省略した場合、100%が通常の自動戦闘になり、
 * 下記の自由行動を設定しても、選択されません。
 *
 * <FreeAutoActions:[7,12]> 自由行動のスキルIDの配列を設定します。
 * 自由行動は、設定された中から等確率で選ばれます。
 * 例：
 * <FreeAutoActions:[11,12,13,14]>
 * 注意：
 * この記述を省略した場合や空配列を指定した時は、
 * たとえ自由行動が選ばれたとしても、通常の自動戦闘行動が選ばれます。
 *
 * ■追記
 * このプラグインは、RPGツクールMZサンプルゲーム
 * 「ルイーゼと秘密の地下室」のために開発されました。
 * このため、場当たり的に数値を調整している部分が多々あります。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SmartAutoBattle';

  //
  // Define the skill function its scope is friend regardless of dead or alive
  //
  Game_Action.prototype.isForDeadOrAlive = function() {
    return this.checkItemScope([12, 13]);
  };

  //
  // Refine default action selection
  // (Reduce frequency HP Recover when the target actor has enough HP,
  // Incerease frequency HP Recover when the target actor is crisis.)
  //
  const isCrisis = target => target.hp / target.mhp <= 0.5;
  const isAttention = t => t.hp / t.mhp <= 0.7 && !isCrisis(t);

  const _Game_Action_evaluateWithTarget =
    Game_Action.prototype.evaluateWithTarget;
  Game_Action.prototype.evaluateWithTarget = function(target) {
    let value = _Game_Action_evaluateWithTarget.call(this, target);
    value = value || 0;
    const hpRate = target.hp / target.mhp;
    if (this.isForOpponent()) {
      const damage = this.makeDamageValue(target, false);
      const damage2 = damage * (1 + Math.random());
      value = Math.max(damage2 / this.subject().mhp, value);
    } else if (this.isForDeadFriend()) {
      value = $gameParty.deadMembers().length > 0 ? value + 2 : 0;
    } else if (this.isHpRecover()) {
      if (this.isForAll()) {
        value = isCrisis(target) ? Math.max(value, (0.8 - hpRate) * 2) :
          ((1 - hpRate) ** 4) / ($gameParty.aliveMembers().length * 2);
      } else {
        value = isCrisis(target) ? value + (0.8 - hpRate) * 2 : 
          (Math.min(value, (1 - hpRate)) ** 2) / 2;
      }
    }
    // if (this.hasItemAnyValidEffects(target)) {
    //   this._supportSkill = false;
    //   let value2 = this.evaluateValidSkills(target);
    //   if (this._supportSkill) {
    //     if (target.isEnemy()) {
    //       value2 *= target.hp / target.mhp;
    //     } else {
    //       value2 *= Math.max(Math.random(), 0.7);
    //     }
    //   }
    //   value += value2;
    // }
    return value;
  };

  //
  // judge whether to use support skill or not
  //
  // Game_Action.prototype.evaluateValidSkills = function(target) {
  //   const subject = this.subject();
  //   let value = 0;
  //   for (const effect of this.item().effects) {
  //     switch (effect.code) {
  //     case Game_Action.EFFECT_ADD_STATE:
  //       if (!target.isStateAffected(effect.dataId)) {
  //         this._supportSkill = true;
  //         const rate = target.mhp / subject.mhp;
  //         if (target.isEnemy() && rate >= 2) {
  //           value += 1 / Math.max(15, rate);
  //         } else {
  //           value += 0.05;
  //         }
  //         if (isAnyActorCrisis()) {
  //           value += 0.25;
  //         }
  //       }
  //       break;
  //     case Game_Action.EFFECT_REMOVE_STATE:
  //       if (target.isStateAffected(effect.dataId)) {
  //         value += 0.6;
  //         if (subject._mayBeSubMember()) {
  //           value += 1;
  //         }
  //       } else {
  //         value -= 0.1;
  //       }
  //       continue;
  //     case Game_Action.EFFECT_ADD_BUFF:
  //       if (!target.isMaxBuffAffected(effect.dataId)) {
  //         this._supportSkill = true;
  //         value += 0.05;
  //         if (isAnyActorCrisis()) {
  //           value += 0.25;
  //         }
  //       }
  //       continue;
  //     case Game_Action.EFFECT_ADD_DEBUFF:
  //       if (!target.isMaxDebuffAffected(effect.dataId)) {
  //         this._supportSkill = true;
  //         const rate = target.mhp / subject.mhp;
  //         if (target.isEnemy() && rate >= 2) {
  //           value += 1 / Math.max(8, rate);
  //         }
  //         if (isAnyActorCrisis()) {
  //           value += 0.25;
  //         }
  //       }
  //       break;
  //     }
  //     if (this._supportSkill) {
  //       break;
  //     }
  //   }
  //   return value;
  // };

  //
  // Check the actor is sub member of not. (see SubMemberAttendBattle.js)
  //
  Game_Battler.prototype._mayBeSubMember = function () {
    return false;
  };

  Game_Actor.prototype._mayBeSubMember = function () {
    return !$gameParty.battleMembers().includes(this);
  };

  //
  // HP recovery to crisis member is the highest priority for sub member.
  // Process the skill for dead or alive when someone is dead.
  //
  const isAnyActorCrisis = () => {
    return $gameParty.aliveMembers().some(actor => isCrisis(actor));
  };

  Game_Action.prototype.shouldUseThis = function () {
    if (this.subject()._mayBeSubMember()) {
      return this.isHpRecover() && isAnyActorCrisis();
    }
    return false;
  };

  const _Game_Action_evaluate = Game_Action.prototype.evaluate;
  Game_Action.prototype.evaluate = function() {
    let value = _Game_Action_evaluate.call(this) || 0;
    if (this.shouldUseThis()) {
      return value + 4;
    }
    if (this.isHpRecover() && this.isForAll()) {
      let numToAttention = $gameParty.aliveMembers().filter(
        a => isAttention(a)).length;
      value += 0.25 * Math.max(numToAttention - 1, 0);
    }
    let numToRevive = $gameParty.deadMembers().length;
    if (this.isForDeadOrAlive() && numToRevive > 0) {
      if (this.isForOne()) {
        numToRevive = 1;
      }
      value += numToRevive * (1.5 + Math.random() * 0.5);
    }
    return value;
  };

  //
  // for efficiency, process note and find usable items at first
  //
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    processNormalAutoRate();
    processAutoFreeActions();
  };

  const processNormalAutoRate = () => {
    const rateReg = /([0-9]+)(?:\%)?/;
    let rateString;
    for (const actor of $dataActors) {
      if (!actor) {
        continue;
      }
      if (rateString = actor.meta.NormalAutoAction) {
        const rate = rateReg.exec(rateString);
        if (!rate) {
          actor.normalAutoRate = 100;
        } else {
          actor.normalAutoRate = rate[1] == null ? 100 : +rate[1];
        }
      } else {
        actor.normalAutoRate = 100;
      }
    }
  };

  const processAutoFreeActions = () => {
    for (const actor of $dataActors) {
      if (!actor) {
        continue;
      }
      if (actor.meta.FreeAutoActions) {
        const skillIds = eval(actor.meta.FreeAutoActions);
        actor.FreeAutoActions = Array.isArray(skillIds) ? skillIds : null;
      } else {
        actor.FreeAutoActions = null;
      }
    }
  };

  // const isUsableItemForBattleAI = item => {
  //   return item.name && [0, 1].includes(item.occasion) && !item.consumable;
  // };

  // const _itemsForBattleAI = () => {
  //   return $dataItems.filter(item => item && isUsableItemForBattleAI(item));
  // };

  // let itemList = null;
  // const itemsForBattleAI = () => {
  //   if (!itemList) {
  //     itemList = _itemsForBattleAI();
  //   }
  //   return itemList;
  // };

  //
  // Decide action according to the note description
  //
  Game_Actor.prototype._shouldDoNormalAutoAction = function () {
    return this.actor().normalAutoRate > Math.randomInt(100);
  };

  // const havingItemsForBattleAI = () => {
  //   return itemsForBattleAI().filter(item => $gameParty.hasItem(item));
  // };

  const _Game_Actor_makeActionList = Game_Actor.prototype.makeActionList;
  Game_Actor.prototype.makeActionList = function() {
    let list = _Game_Actor_makeActionList.call(this);
    // if (!this._mayBeSubMember()) {
    //   for (const item of havingItemsForBattleAI()) {
    //     const itemAction = new Game_Action(this);
    //     itemAction.setItem(item.id);
    //     list.push(itemAction);
    //   }
    // }
    this._normalAction = this._shouldDoNormalAutoAction();
    return list;
  };

  const _Game_Action_evaluate2 = Game_Action.prototype.evaluate;
  Game_Action.prototype.evaluate = function() {
    let value = _Game_Action_evaluate2.call(this);
    value = value || 0;
    this._autoSelected = true;
    const subject = this.subject();
    if (!subject._normalAction) {
      let skills;
      // NOTE: HP recovery skills might be higher priority than free actions
      if (subject.isActor() && (skills = subject.actor().FreeAutoActions)) {
        if (!isAnyActorCrisis()) {
          const item = this._item;
          if (item.isSkill() && skills.includes(item.itemId())) {
            value += 2 + Math.random();
          }
        }
      }
    }
    return value;
  };

  //
  // change action dynamically
  //
  const _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    const subject = this._subject;
    if (!isCurrentAutoActionValid(subject)) {
      // discard current actions and recreate new ones with considering
      // current condition.
      subject.makeAutoBattleActions();
    }
    _BattleManager_startAction.call(this);
  };

  const isCurrentAutoActionValid = subject => {
    const action = subject.currentAction();
    if (action._autoSelected && subject.isActor()) {
      action._autoSelected = false;
      const targets = action.makeTargets();
      for (const target of targets) {
        if (action.isRecover()) {
          if (action.testApply2(target)) {
            return true;
          }
        } else if (action.isDamage() || action.isDrain()){
           return !isAnyActorCrisis();
        } else {
          if (action.testApply2(target)) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };

  Game_Action.prototype.testApply2 = function(target) {
    if (this.isForDeadFriend() && $gameParty.deadMembers().length === 0) {
      return false;
    }
    return ((this.isHpRecover() && target.hp < target.mhp * 0.7) ||
      (this.isMpRecover() && target.mp < target.mmp) ||
      this.hasItemAnyValidEffects2(target)
    );
  };

  Game_Action.prototype.hasItemAnyValidEffects2 = function(target) {
    return this.item().effects.some(effect =>
      this.testItemEffect2(target, effect)
    );
  };

  Game_Action.prototype.testItemEffect2 = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_RECOVER_HP:
      return target.hp < target.mhp * 0.7;
    case Game_Action.EFFECT_RECOVER_MP:
      return target.mp < target.mmp;
    // case Game_Action.EFFECT_ADD_STATE:
    //   return !target.isStateAffected(effect.dataId);
    // case Game_Action.EFFECT_REMOVE_STATE:
    //   return target.isStateAffected(effect.dataId);
    // case Game_Action.EFFECT_ADD_BUFF:
    //   return !target.isMaxBuffAffected(effect.dataId);
    // case Game_Action.EFFECT_ADD_DEBUFF:
    //   return !target.isMaxDebuffAffected(effect.dataId);
    // case Game_Action.EFFECT_REMOVE_BUFF:
    //   return target.isBuffAffected(effect.dataId);
    // case Game_Action.EFFECT_REMOVE_DEBUFF:
    //   return target.isDebuffAffected(effect.dataId);
    default:
      return false;
    }
  };


})();
