//=============================================================================
// KZR_SkillPriority.js
// Version : 1.02
// -----------------------------------------------------------------------------
// [Homepage]: かざり - ホームページ名なんて飾りです。偉い人にはそれがわからんのですよ。 -
//             http://nyannyannyan.bake-neko.net/
// -----------------------------------------------------------------------------
// [Version]
// 1.02 2017/01/29 何も行動しなかったとき、エラーが出ていたのを修正
// 1.01 2017/01/27 処理をやや軽量化
// 1.00 2016/12/02 公開
//=============================================================================

/*:
 * @plugindesc スキルに優先度を設定します。優先度の高いスキルは、敏捷性/速度補正に関わらず、先に発動します。
 * @author ぶちょー
 *
 * @param Calc
 * @desc 優先度補正が重複した際の計算方法
 * 0 : 加算　1 : 最大値
 * @default 1
 *
 * @help
 * 【優先度の設定】
 * 　スキルのメモ欄に以下のように記述します。
 * 　<SkillPriority:x>
 * 　x に数値を入れてください。より高い数値が先に発動します。
 * 　優先度が同数値だった場合は、敏捷性/速度補正で後先が決定します。
 * 　また、優先度はマイナスの数値にすることも可能です。
 * 　何も記述しなかった場合は 0 になります。
 *
 * 【優先度補正】
 * 　アクター/職業/武器/防具/ステート/エネミーのメモ欄に以下のように記述することで、
 * 　特定の属性・スキルタイプの場合、優先度が加算/減算されます。
 * 　炎属性の優先度が 1 加算される装備やエネミーなどを作成できるようになります。
 *
 * 　<SPRevision:E,x,y>
 * 　x に属性ID、y に数値を入れてください。E は識別子です。
 * 　<SPRevision:E,2,1>  属性IDが 2 のスキルすべて、優先度が 1 加算されます。
 * 　<SPRevision:E,3,-1> 属性IDが 3 のスキルすべて、優先度が 1 減算されます。
 *
 * 　<SPRevision:T,x,y>
 * 　x にスキルタイプID、y に数値を入れてください。T は識別子です。
 * 　<SPRevision:T,1,2> スキルタイプIDが 1 のスキルすべて、優先度が 2 加算されます。
 */

var Imported = Imported || {};
    Imported.KZR_SkillPriority = true;

(function() {
  var parameters = PluginManager.parameters('KZR_SkillPriority');
  var SP_Calc = Number(parameters['Calc'] || 0);

//-----------------------------------------------------------------------------
// Game_Battler
//

Game_Battler.prototype.skillPriority = function() {
    var sp = 0;
    var action = this.currentAction();
    if (action !== undefined && action.isSkill()) {
        var skill = action.item();
        var r;
        var rev = 0;
        var revs = [];
        var traits = this.traitObjects();
        var elementId = skill.damage.elementId;
        if (elementId < 0) {
            var elementIds = this.attackElements();
        } else {
            var elementIds = [elementId];
        }
        var stypeId = skill.stypeId;
        for (var i = 0; i < traits.length; i++) {
            var t = traits[i];
            for (var j = 0; j < elementIds.length; j ++) {
                r = t.skillPriorityRevision['E'][elementIds[j]];
                if (r) revs.push(r);
            }
            r = t.skillPriorityRevision['T'][stypeId];
            if (r) revs.push(r);
        }
        if (SP_Calc === 0) {
            for (var i in revs) { rev += revs[i] };
        } else if (revs.length > 0) {
            rev = revs[0];
            for (var i = 1; i < revs.length; i++) {
                rev = Math.max(rev, revs[i]);
            }
        }
        sp = skill.skillPriority + rev;
    }
    return sp;
};

//-----------------------------------------------------------------------------
// BattleManager
//

var _kzr_SP_BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
    _kzr_SP_BattleManager_makeActionOrders.call(this);
    var battlers = this._actionBattlers;
    battlers.sort(function(a, b) {
        return b.skillPriority() - a.skillPriority();
    });
    this._actionBattlers = battlers;
};

//-----------------------------------------------------------------------------
// Scene_Boot
//

var _kzr_SP01_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _kzr_SP01_Scene_Boot_start.call(this);
    this.setSkillPriorities();
    this.setSkillPriorityRevisions();
};

Scene_Boot.prototype.setSkillPriorities = function() {
    for (var i = 1; i < $dataSkills.length; i++) {
        this.setSkillPriority($dataSkills[i]);
    }
};

Scene_Boot.prototype.setSkillPriority = function(skill) {
    var sp = 0;
    var note = /<(?:SkillPriority:(-)?(\d+))>/i;
    var notedata = skill.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; i++) {
        if (notedata[i].match(note)) {
            sp = RegExp.$1 ? -1 : 1;
            sp *= parseInt(RegExp.$2);
        }
    }
    skill.skillPriority = sp;
};

Scene_Boot.prototype.setSkillPriorityRevisions = function() {
    for (var i = 1; i < $dataActors.length; i++) {
        this.setSkillPriorityRevision($dataActors[i]);
    }
    for (var i = 1; i < $dataClasses.length; i++) {
        this.setSkillPriorityRevision($dataClasses[i]);
    }
    for (var i = 1; i < $dataWeapons.length; i++) {
        this.setSkillPriorityRevision($dataWeapons[i]);
    }
    for (var i = 1; i < $dataArmors.length; i++) {
        this.setSkillPriorityRevision($dataArmors[i]);
    }
    for (var i = 1; i < $dataEnemies.length; i++) {
        this.setSkillPriorityRevision($dataEnemies[i]);
    }
    for (var i = 1; i < $dataStates.length; i++) {
        this.setSkillPriorityRevision($dataStates[i]);
    }
};

Scene_Boot.prototype.setSkillPriorityRevision = function(item) {
    item.skillPriorityRevision = {};
    item.skillPriorityRevision['E'] = [];
    item.skillPriorityRevision['T'] = [];
    var note = /<(?:SPRevision:(\S+),(\d+),(-)?(\d+))>/gi;
    var notedata = item.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; i++) {
        if (notedata[i].match(note)) {
            var key   = RegExp.$1;
            var id    = parseInt(RegExp.$2);
            var param = RegExp.$3 ? -1 : 1;
            param *= parseInt(RegExp.$4);
            item.skillPriorityRevision[key][id] = param;
        }
    }
};

})();
