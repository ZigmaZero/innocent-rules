/*:-----------------------------------------------------------------------------------
 * NUUN_BattlerOverlayBase.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトラーオーバーレイベース
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * モンスター、サイドビューアクター上に画像を表示させるベースプラグイン。
 * モンスター、アクターのスプライトの子にスプライトを追加してしまうとゲージ、ステートアイコン等にまで影響を及ば差ないようにします。
 * （バトラーグラフィック表示拡張プラグインでバトラーの色調を変化させるとバトラーとともにゲージ、ステートアイコンの変色を防ぐ目的等）
 * 
 * 木星ペンギン氏の疑似３Dバトル、蒼竜氏のSVアクター適用エネミーと併用する場合、このプラグインをこれらのプラグインより
 * 下に配置する必要があります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/10 Ver.1.0.0
 * 初版
 * 
 * 
 * @param ConflictScale
 * @desc 敵画像の上設定時の拡大率の考慮
 * @text 拡大率の考慮
 * @type select
 * @option 元のサイズ基準
 * @value 'Default'
 * @option 画像のサイズ基準
 * @value 'Img'
 * @default 'Img'
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlerOverlayBase = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattlerOverlayBase');
const ConflictScale = eval(parameters['ConflictScale']) || 'Img';

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createBattlerOverlayBase();
};

Spriteset_Battle.prototype.createBattlerOverlayBase = function() {
    this._battlerOverlaySprite = [];
    for (const sprite of this._enemySprites) {
        this.setBattlerOverlaySprite(sprite, 'enemy');
    }
    for (const sprite of this._actorSprites) {
        this.setBattlerOverlaySprite(sprite, 'actor');
    }
};

Spriteset_Battle.prototype.setBattlerOverlaySprite = function(sprite, mode) {
    if (!sprite.battlerOverlay) {
        const baseSprite = new Sprite_BattlerOverlay();
        this._battleField.addChild(baseSprite);
        baseSprite.setup(sprite, mode);
        sprite.battlerOverlay = baseSprite;
        this._battlerOverlaySprite.push(baseSprite);
    }
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  this.updateButlerOverlay();
};

Spriteset_Battle.prototype.updateButlerOverlay = function() {
    if ($gameTemp.refreshOverlay) {
        for (const sprite of this._enemySprites) {
            if (!sprite.battlerOverlay) {
                this.setBattlerOverlaySprite(sprite);
            }
        }
        $gameTemp.refreshOverlay = false;
    }  
    this.updateButlerOverlaySprite();
};

Spriteset_Battle.prototype.updateButlerOverlaySprite = function() {
    for (const sprite of this._battlerOverlaySprite) {
        let spriteData = null;
        if (sprite.battlerMode === 'actor') {
            spriteData = this._actorSprites.some(actor => actor.spriteId === sprite._battlerSpriteId);
        } else {
            spriteData = this._enemySprites.some(enemy => enemy.spriteId === sprite._battlerSpriteId);
        }
        if (!spriteData) {
            this._battleField.removeChild(sprite);
        } else {
            sprite.updatePosition();
        }
    }
};


function Sprite_BattlerOverlay() {
    this.initialize(...arguments);
}
  
Sprite_BattlerOverlay.prototype = Object.create(Sprite.prototype);
Sprite_BattlerOverlay.prototype.constructor = Sprite_BattlerOverlay;
  
Sprite_BattlerOverlay.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._battlerSprite = null;
    this._battlerSpriteId = -1;
    this.battlerSpriteScale_x = 1.0;
    this.battlerSpriteScale_y = 1.0;
};

Sprite_BattlerOverlay.prototype.setup = function(sprite, mode) {
    this._battlerSprite = sprite;
    this._battlerSpriteId = sprite.spriteId;
    this.battlerMode = mode;
};

Sprite_BattlerOverlay.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};

Sprite_BattlerOverlay.prototype.update = function() {
    Sprite.prototype.update.call(this); 
    //this.updatePosition();
};

Sprite_BattlerOverlay.prototype.updatePosition = function() {
    this.x = this._battlerSprite.x;
    this.y = this._battlerSprite.y;
    this.battlerSpriteScale_x = this._battlerSprite.scale.x;
    this.battlerSpriteScale_y = this._battlerSprite.scale.y;
};


const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.call(this);
    if (!this.battlerOverlay) {
        $gameTemp.refreshOverlay = true;
    }
};


Sprite_Enemy.prototype.butlerOverlayOpacity = function() {
    if (this._effectType !== "blink") {
        this.battlerOverlay.setOpacity(this.opacity);
    }
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    if (this.battlerOverlay) {
        this.butlerOverlayOpacity();
    } else {
        $gameTemp.refreshOverlay = true;
    }
};

Sprite_Enemy.prototype.getButlerOverlayHeight = function() {
    if (this._SVBattlername) {//SoR_EnemySVSprite_MZ
      return Math.floor((this._mainSprite.bitmap.height / 6) * 0.9);
    } else if (this._svBattlerSprite) {//Visu
      return Math.floor(this.height * 0.9);
    } else {
      return Math.floor(((this.bitmap.height) * 0.9));
    }
};
  
Sprite_Enemy.prototype.getButlerOverlayConflict = function() {
    if (ConflictScale === 'Img') {
      return this.battlerOverlay.battlerSpriteScale_y;
    } else {
      return 1.0;
    }
};

})();