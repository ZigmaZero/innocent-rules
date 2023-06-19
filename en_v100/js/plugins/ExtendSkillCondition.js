
/*:
 * @plugindesc スキル使用条件拡張プラグイン
 * @target MZ
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 * @author さすらいのトム
 *
 *
 * @help ExtendSkillCondition.js
 * スキルの使用条件にスイッチや変数、ステートなど
 * 様々なものを追加します。
 * 対象のスキルのメモ欄に下記の通り記述することでお使いいただけます。
 * 
 * とてもおおざっぱな使用例：
 * <checkGameSwitch:1>             
 * スイッチIDが1の時のみ該当スキルが使用可能になります
 * 
 * <higherGameVariables:1,2>       
 * 変数1が2より高い時のみ該当スキルが使用可能になります
 * 
 * <lowerGameVariables:3,4>        
 * 変数3が4未満の時のみ該当スキルが使用可能になります
 * 
 * <checkHasItem:7>                
 * アイテムID7のアイテムを所持している時のみ該当スキルが使用可能になります
 * <checkLearnedSkill:100>         
 * アクターがスキルID100のスキルを覚えている時のみ該当スキルが使用可能になります
 * 
 * <checkStateAffected:4>          
 * アクターがステートID4にかかっている時のみ該当スキルが使用可能になります
 * 
 * <isNotStateAffected:5>          
 * アクターがステートID5にかかっていない時のみ該当スキルが使用可能になります
 * 
 * <checkHasTrait:test>            
 * メモ欄に<test>と付いた武器や防具を装備していたり、
 * あるいはステートにかかっていたりすると該当スキルが使用可能になります
 * 
 * <checkExecuteScript:JavaScript計算式>
 * JavaScript計算式がtrueの場合のみ該当スキルが使用可能になります
 * また、JavaScript計算式が不正な場合、該当スキルは使用できません。
 * 
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 */

(() => {
    'use strict';

    Game_BattlerBase.prototype.readSkillObjects = function(skill,metatag) {
        let skillid = skill.id;
        if( $dataSkills[skillid].meta[metatag]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.SkillValue = function(skill,metatag) {
        let skillid = skill.id;
        if($dataSkills[skillid].meta[metatag]) {
            return $dataSkills[skillid].meta[metatag];
        }
        return null;
    }

    Game_BattlerBase.prototype.SkillValues = function(skill,metatag) {
        let skillid = skill.id;
        if($dataSkills[skillid].meta[metatag]) {
            let values = [];
            values = $dataSkills[skillid].meta[metatag].split(',');
            return values;
        }
        return null;
    }

    Game_BattlerBase.prototype.searchTraitObject = function(obj) {
        var result = false;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta[obj]) {
                result = true;
                }
            }
        );
        return result;
    }
    
    const Game_BattlerBase_prototype_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;  
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        var result = Game_BattlerBase_prototype_meetsSkillConditions.call(this,skill);
        if (result == false) {
            return false;
        }
        if (this.readSkillObjects(skill,'checkGameSwitch')) {
            result = this.checkGameSwitch(skill);
        }
        if (this.readSkillObjects(skill,'higherGameVariables')) {
            result = this.higherGameVariables(skill);
        }
        if (this.readSkillObjects(skill,'lowerGameVariables')) {
            result = this.lowerGameVariables(skill);
        }
        if (this.readSkillObjects(skill,'checkHasItem')) {
            result = this.checkHasItem(skill);
        }
        if (this.readSkillObjects(skill,'checkLearnedSkill')) {
            result = this.checkLearnedSkill(skill);
        }
        if (this.readSkillObjects(skill,'checkActorLevel')) {
            result = this.checkActorLevel(skill);
        }
        if (this.readSkillObjects(skill,'checkStateAffected')) {
            result = this.checkStateAffected(skill);
        }
        if (this.readSkillObjects(skill,'isNotStateAffected')) {
            result = this.isNotStateAffected(skill);
        }
        if (this.readSkillObjects(skill,'checkHasTrait')) {
            result = this.checkHasTrait(skill);
        }
        if (this.readSkillObjects(skill,'checkExecuteScript')) {
            result = this.checkExecuteScript(skill);
        }
        return result;
    };

    Game_BattlerBase.prototype.checkGameSwitch = function(skill) {
        let gameSwitch = this.SkillValue(skill,'checkGameSwitch');
        if ($gameSwitches.value(gameSwitch)) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.higherGameVariables = function(skill) {
        let Variables = this.SkillValues(skill,'higherGameVariables');
        if (Variables == null || Variables.length != 2) {
            return false;
        }
        let value = $gameVariables.value(Variables[0])
        if (value > Variables[1]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.lowerGameVariables = function(skill) {
        let Variables = this.SkillValues(skill,'lowerGameVariables');
        if (Variables == null || Variables.length != 2) {
            return false;
        }
        let value = $gameVariables.value(Variables[0])
        if (value < Variables[1]) {
            return true;
        }
        return false;
    }

    Game_BattlerBase.prototype.checkHasItem = function(skill) {
        let itemID = this.SkillValue(skill,'checkHasItem');
        if (itemID == null) {
            return false;
        }
        if ($gameParty.hasItem($dataItems[Number(itemID)])) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkLearnedSkill = function(skill) {
        if (!this.isActor()) {
            return false;
        }
        let skillID = this.SkillValue(skill,'checkLearnedSkill');
        if (this.isLearnedSkill(Number(skillID))) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkActorLevel = function(skill) {
        if (!this.isActor()) {
            return false;
        }
        let Level = this.SkillValue(skill,'checkActorLevel');
        if (this._level > Number(Level)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkStateAffected = function(skill) {
        let stateID = Number(this.SkillValue(skill,'checkStateAffected'));
        if(!$dataStates[stateID]) {
            return false
        }
        if (this.isStateAffected(stateID)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.isNotStateAffected = function(skill) {
        let stateID = Number(this.SkillValue(skill,'isNotStateAffected'));
        if(!$dataStates[stateID]) {
            return false
        }
        if (!this.isStateAffected(stateID)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkHasTrait = function(skill) {
        let traits = this.SkillValue(skill,'checkHasTrait');
        if (this.searchTraitObject(traits)) {
            return true;
        } 
        return false;
    }

    Game_BattlerBase.prototype.checkExecuteScript = function(skill) {
        let cond = this.SkillValue(skill,'checkExecuteScript');
        try {
            const value = eval(cond);
            if (value) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

})();
