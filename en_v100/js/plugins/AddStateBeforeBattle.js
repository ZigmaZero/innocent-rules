//=============================================================================
// AddStateBeforeBattle.js
//=============================================================================

/*:
 * @plugindesc 戦闘開始時にステートを付与するプラグイン
 * @author さすらいのトム
 *
 * @help
 * 特徴を有するメモ欄に以下の通りメモすれば
 * 戦闘開始時にそのステートが付与されます
 *　<addStateBeforeBattle:ステートID>
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 */
(function(){
    'use strict';

    var _BattleManager_setup = BattleManager.setup;
    BattleManager.setup      = function(troopId, canEscape, canLose) {
        _BattleManager_setup.call(this, troopId, canEscape, canLose);
        this.allBattleMembers().forEach(function(member) {
            member.addStateBeforeBattle(member._actorId);
        });
    };

	//Game_BattlerBase
	Game_Battler.prototype.addStateBeforeBattle = function(id) {
		this.traitObjects().forEach(function(traitObject) {
			if(traitObject.meta['addStateBeforeBattle']){
                var stateId = Number(traitObject.meta['addStateBeforeBattle']);
                $gameActors.actor(id).addState(stateId);
			}
		});
    };
}());