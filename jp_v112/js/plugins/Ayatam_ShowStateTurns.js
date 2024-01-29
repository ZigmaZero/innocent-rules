//=============================================================================
// plugin Ayatam_AbsoluteAvoidHitState.js
// ■ バトル中ステートターン数表示MVMZ 対応コアver 1.6.3
//
// (C)2022 ayatam
//=============================================================================
//  【更新内容】
//  2022/5/3 v0.07 新機能追加に伴う不具合を修正しました。
//  2022/5/2 v0.06 表示除外リストを設定している際に
//                 発生していた表示不具合を修正しました。
//  2022/5/2 v0.05 ターン数の文字サイズ/ターン数表示除外リストの機能を
//                 追加しました。
//  2022/5/1 v0.04 MZに対応しました。
//                 敵側のステートにもターン数を表示するように調整しました。
//  2022/3/18 v0.03 コードを見やすくしました。
//  2022/3/14 v0.02 ステートターン数表示対象外を含んだ際に特定条件下で
//                  発生していた不具合を修正しました。
//                  ステートターン数の位置を調整できるように
//                  機能を追加しました。
//  2022/3/9 v0.01 試作完成。
//=============================================================================

var Imported = Imported || {};
Imported.Ayatam_ShowStateTurns = true;

var Ayatam = Ayatam || {};
Ayatam.SHOWSTATETURNS = Ayatam.SHOWSTATETURNS || {};

/*:
 * @target MV MZ
 * @plugindesc バトル中ステートターン数表示MVMZ v0.07
 * バトル中のステートターン数を表示する機能を追加
 * @author Ayatam (Another Young Animations)
 * 
 * @help ■ バトル中ステートターン数表示MVMZ
 * 本プラグインは、MV Core ver 1.6.3 に対応。
 *                 MZ Core ver 1.4.3 に対応。
 *                 MZ Core ver 1.4.4 に対応。
 * 
 * 【利用規約】
 * ・改造はご自由に行ってください。
 * ・他サイト様の素材との競合によるエラーには基本、対応しません。
 * ・素材単体でのエラーには対応します。ただし、その責任は負いません。
 * ・アダルト・商業可。
 * 
 * 【素材を使用したゲーム等について】
 * ・作者名、サイト名、URLなどをread_meなどに分かりやすい形で記載してください。
 * 
 *   作者名:ayatam
 *   サイト名:Another Young Animations 公式サイト
 *   URL:https://ayatam.wixsite.com/index
 * 
 * =============================================================================
 *  【プラグイン使用方法】
 *  ・本プラグインにはプラグインコマンド/スクリプトコマンドはありません。
 * 
 * =============================================================================
 * 
 * @param GlobalSettings
 * @text 基本設定
 * @type struct<ShowStateTurnsGlobalSettings>
 * @default {"setup":"","turnsX":"0","turnsY":"0","stateFontSize":"14","stateSetup":"","ignoreStates":"[]","ignoreBuffs":"[]"}
 * @desc ステートターン数表示MVの基本設定を行います。
 */

//=============================================================================
//  【ShowStateTurnsGlobalSettings】
//=============================================================================

/*~struct~ShowStateTurnsGlobalSettings:
 * @param setup
 * @text 基本設定
 * 
 * @param stateSetup
 * @text ターン数表示除外設定
 *
 * @param turnsX
 * @text ターン数x座標
 * @parent setup
 * @type number
 * @min -99999999999999999999
 * @default 0
 * @desc ステートターン数の表示x座標を調整します。- も指定可。
 *
 * @param turnsY
 * @text ターン数y座標
 * @parent setup
 * @type number
 * @min -99999999999999999999
 * @default 0
 * @desc ステートターン数の表示y座標を調整します。- も指定可。
 *
 * @param stateFontSize
 * @text ターン数文字サイズ
 * @parent setup
 * @type number
 * @min 0
 * @default 14
 * @desc ステートターン数の文字サイズを指定してください。
 *
 * @param ignoreStates
 * @text ターン数表示除外ステートリスト
 * @parent stateSetup
 * @type state[]
 * @default []
 * @desc ステートターン数を非表示するステートを登録します。
 *
 * @param ignoreBuffs
 * @text ターン数表示除外バフデバフリスト
 * @parent stateSetup
 * @type select[]
 * @option なし
 * @value -1
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御力
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default []
 * @desc バフデバフターン数を非表示するステートを登録します。
 */

//=============================================================================
//
// - プラグイン本体 - ここから下は変更禁止 -
//
//=============================================================================

//=============================================================================
// プラグイン 初期化
//=============================================================================

//プラグイン名の登録
var AyatamShowStateTurnsName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

//プラグインパラメータを登録
Ayatam.SHOWSTATETURNS.Parameters = PluginManager.parameters(AyatamShowStateTurnsName);
//プラグインパラメータの文字列を配列に変換
Ayatam.SHOWSTATETURNS.Parameters = JSON.parse(JSON.stringify(Ayatam.SHOWSTATETURNS.Parameters,(key,value)=>{
    try{return JSON.parse(value);} catch (e) {}
    return value;
    }
));
//基本設定のショートカット
Ayatam.SHOWSTATETURNS.GlobalSettings = Ayatam.SHOWSTATETURNS.Parameters.GlobalSettings;

//=============================================================================
// Ayatam.SHOWSTATETURNS - 専用処理
//=============================================================================

Ayatam.SHOWSTATETURNS.sstGetAllTurns = function(target) {
    var ignoreStates = Ayatam.SHOWSTATETURNS.GlobalSettings.ignoreStates;
    var ignoreBuffs = Ayatam.SHOWSTATETURNS.GlobalSettings.ignoreBuffs;
    var states = target.sstStates();
    var buffs = target._buffs;
    var allTurns = [];
    var buffId = 0;
    if(states.length > 0) {
        states.forEach(state => {
            if(state) {
                if(ignoreStates.includes(state.id)) {
                    allTurns.push(0);
                }else{
                    if(state.autoRemovalTiming === 0) {
                        allTurns.push(0);
                    }else if(state.autoRemovalTiming === 1) {
                        if(target._stateTurns[state.id] === 0) {
                            allTurns.push(1);
                        }else{
                            allTurns.push(target._stateTurns[state.id]);
                        };
                    }else if(state.autoRemovalTiming === 2) {
                        allTurns.push(target._stateTurns[state.id]);
                    };
                };
            };
        });
        buffs.forEach(buff => {
            if(buff !== 0) {
                if(ignoreBuffs.includes(buffId)) {
                    allTurns.push(0);
                }else{
                    if(target._buffTurns[buffId] === 0) {
                        allTurns.push(1);
                    }else{
                        allTurns.push(target._buffTurns[buffId]);
                    };
                };
            };
            buffId++;
        });
    }else{
        buffs.forEach(buff => {
            if(buff !== 0) {
                if(ignoreBuffs.includes(buffId)) {
                    allTurns.push(0);
                }else{
                    if(target._buffTurns[buffId] === 0) {
                        allTurns.push(1);
                    }else{
                        allTurns.push(target._buffTurns[buffId]);
                    };
                };
            };
            buffId++;
        });
    };
    return allTurns;
};

Ayatam.SHOWSTATETURNS.sstDrawStateTurns = function(self,target,index,ajustX = 0,ajustY = 0,width = 144) {
    if(!$gameParty.inBattle()) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        var iconWidth =  Window_Base._iconWidth;
        var iconHeight =  Window_Base._iconHeight;
    }else if(Utils.RPGMAKER_NAME === "MZ") {
        var iconWidth =  ImageManager.iconWidth;
        var iconHeight =  ImageManager.iconHeight;
    };
    if(self._StateTurn === undefined) {
        self._StateTurn = new Sprite(new Bitmap(Graphics.width,Graphics.height));
        self.addChild(self._StateTurn);
    };
    self._StateTurn.bitmap.fontSize = Ayatam.SHOWSTATETURNS.GlobalSettings.stateFontSize;
    var allTurns = this.sstGetAllTurns(target);
    var turns = allTurns[index];
    if(turns > 0) {
        if(Utils.RPGMAKER_NAME === "MV") {
            if(turns === 1) self._StateTurn.bitmap.textColor = '#ff2020';
            if(turns > 1) self._StateTurn.bitmap.textColor = '#00e060';
        }else if(Utils.RPGMAKER_NAME === "MZ") {
            if(turns === 1) self._StateTurn.bitmap.textColor = ColorManager.textColor(18);
            if(turns > 1) self._StateTurn.bitmap.textColor = ColorManager.textColor(29);
        };
        var turnWidth = Math.floor(self._StateTurn.bitmap.measureTextWidth(turns));
        var turnHeight = 26;
        var userX = Ayatam.SHOWSTATETURNS.GlobalSettings.turnsX;
        var userY = Ayatam.SHOWSTATETURNS.GlobalSettings.turnsY;
        var turnX = (ajustX + userX) + ((iconWidth/2) - turnWidth);
        var turnY = (ajustY + userY) - turnHeight;
        self._StateTurn.bitmap.clear();
        self._StateTurn.bitmap.drawText(turns,0,0,width,iconHeight,"left");
        self._StateTurn.move(turnX,turnY);
        if(Utils.RPGMAKER_NAME === "MZ") self._StateTurn.show();
    }else{
        self._StateTurn.bitmap.clear();
    };
};

//=============================================================================
// Window_Base - バトル中ステートターン数表示MVMZ用のセットアップ
//=============================================================================

var _ShowStateTurns_Window_Base_prototype_drawActorIcons = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    _ShowStateTurns_Window_Base_prototype_drawActorIcons.call(this,actor,x,y,width);
    if(Utils.RPGMAKER_NAME === "MV") this.sstDrawStateTurns(actor,x,y,width);
};

Window_Base.prototype.sstDrawStateTurns = function(actor,x,y,width) {
    if(!$gameParty.inBattle()) return;
    width = width || 144;
    var iconWidth =  Window_Base._iconWidth;
    var iconHeight =  Window_Base._iconHeight;
    var icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
    var allTurns = Ayatam.SHOWSTATETURNS.sstGetAllTurns(actor);
    this.contents.fontSize = Ayatam.SHOWSTATETURNS.GlobalSettings.stateFontSize;
    for (var i = 0; i < icons.length; i++) {
        var turns = allTurns[i];
        if(turns > 0) {
            if(turns === 1) this.changeTextColor(this.textColor(18));
            if(turns > 1) this.changeTextColor(this.textColor(29));
            var turnWidth = this.textWidth(turns);
            var turnHeight = 24;
            var userX = Ayatam.SHOWSTATETURNS.GlobalSettings.turnsX;
            var userY = Ayatam.SHOWSTATETURNS.GlobalSettings.turnsY;
            var turnX = (x + userX) + (iconWidth * i) + ((iconWidth - turnWidth) - 2);
            var turnY = (y + userY) - (iconHeight - turnHeight);
            this.drawText(turns,turnX,turnY,width);
            this.resetTextColor();
        };
    }
    this.contents.fontSize = this.standardFontSize();
};

//=============================================================================
// Game_BattlerBase - バトル中ステートターン数表示MVMZ用のセットアップ
//=============================================================================

Game_BattlerBase.prototype.sstStates = function() {
    return this.states().reduce(function(data,state) {
        if(state.iconIndex > 0) {
            data.push(state);
        };
        return data;
    },[]);
};

//=============================================================================
// Sprite_StateIcon - バトル中ステートターン数表示MVMZ用のセットアップ
//=============================================================================

var _ShowStateTurns_Sprite_StateIcon_prototype_updateFrame = Sprite_StateIcon.prototype.updateFrame;
Sprite_StateIcon.prototype.updateFrame = function() {
    _ShowStateTurns_Sprite_StateIcon_prototype_updateFrame.call(this);
    if(this._battler !== null) {
        Ayatam.SHOWSTATETURNS.sstDrawStateTurns(this,this._battler,this._animationIndex);    
    };
};

//=============================================================================
// プラグイン終了 - End of file
//=============================================================================