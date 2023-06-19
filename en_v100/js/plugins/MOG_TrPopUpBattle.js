//=============================================================================
// MOG_TrPopUpBattle.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta os ícones dos tesouros após o inimigo morrer.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Drop Item Real Time
 * @desc Ganhar o item em tempo real.
 * @type boolean 
 * @default true 
 *
 * @param Animation Type
 * @desc Tipo de animação.
 * 0 - Bouncing     1 - Floating
 * @type select
 * @default 0
 * @option Bouncing
 * @value 0
 * @option Floating
 * @value 1 
 *
 * @param Fade Duration
 * @desc Tempo para fazer o item desaparecer.
 * @type number
 * @default 20
 * @min 5
 *
 * @param Scale
 * @desc Tamanho do ícone do tesouro.
 * @default 0.8
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG Treasure PopUp Battle ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/04
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta os ícones dos tesouros após o inimigo morrer.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 敵のドロップアイテムをアイコン表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_TrPopUpBattle.js
 *
 * @param Drop Item Real Time
 * @text アイテム取得をリアルタイム有効化
 * @desc アイテム取得をリアルタイム有効化
 * @type boolean 
 * @on 有効
 * @off 無効
 * @default true 
 *
 * @param Animation Type
 * @text アニメ種類
 * @desc 0:バウンド / 1:フローティング
 * @type select
 * @default 0
 * @option バウンド
 * @value 0
 * @option フローティング
 * @value 1 
 *
 * @param Fade Duration
 * @text 表示時間
 * @desc 表示時間
 * @default 20
 * @min 5
 *
 * @param Scale
 * @text アイコンサイズ拡大率
 * @desc アイコンサイズ拡大率
 * @default 0.8
 *
 * @help  
 * 翻訳:
 * https://fungamemake.com/
 *
 * =============================================================================
 * ♦♦♦ MOG Treasure PopUp Battle ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/04
 * https://mogplugins.wordpress.com
 * =============================================================================
 * 敵のドロップアイテムをアイコン表示します。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_TrPopUpBattle = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_TrPopUpBattle');
Moghunter.trPopup_animation = Number(Moghunter.parameters['Animation Type'] || 0);
Moghunter.trPopup_scale = Number(Moghunter.parameters['Scale'] || 0.8);
Moghunter.trPopup_fadeDuration = Number(Moghunter.parameters['Fade Duration'] || 20);
Moghunter.trPopup_dropRealTime = String(Moghunter.parameters['Drop Item Real Time'] || 'false');

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  Initialize
//==============================
var _mog_trPopBattle_tempInitialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_mog_trPopBattle_tempInitialize.call(this);
	this._trBatNeedPopUp = false;
	this._trBatRealTimeDrop = String(Moghunter.trPopup_dropRealTime) == 'true' ? true : false;
	this._trBatDropLock = false;
};

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  initMembers
//==============================
var _mog_trPopBattle_gEnemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function () {
	_mog_trPopBattle_gEnemy_initMembers.call(this);
	this._treasure = {};
	this._treasure.needPopup = false;
	this._treasure.checked = false;
	this._treasure.item = [];
};

//==============================
//  ♦ OVERWRITE ♦  make Drop Items
//==============================
Game_Enemy.prototype.makeDropItems = function () {
	if (this._treasure.checked) {
		return this._treasure.item;
	} else {
		const rate = this.dropItemRate();
		return this.enemy().dropItems.reduce((r, di) => {
			if (di.kind > 0 && Math.random() * di.denominator < rate) {
				return r.concat(this.itemObject(di.kind, di.dataId));
			} else {
				return r;
			}
		}, []);
	};
};

//=============================================================================
// ■■■ Battle Manager ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  gain Drop Items
//==============================
var _mog_BMangr_gainDropItems = BattleManager.gainDropItems;
BattleManager.gainDropItems = function () {
	if ($gameTemp._trBatDropLock) { return };
	_mog_BMangr_gainDropItems.call(this);
};

//=============================================================================
// ■■■ Scene Map ■■■
//=============================================================================

//==============================
//  ♦ ALIAS ♦  Initialize
//==============================
var _mog_trPopup_scMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
	$gameTemp._trBatDropLock = false;
	_mog_trPopup_scMap_initialize.call(this)
};

//=============================================================================
// ■■■ Sprite Enemy ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Update Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.updateCollapse = function () {
	_mog_trPopBattle_sprEnemy_updateCollapse.call(this);
	if (this._effectDuration === 0 && !this._enemy._treasure.checked) { this.checkTreasurePopup() };
};

//==============================
// ♦ ALIAS ♦  Update Boss Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
Sprite_Enemy.prototype.updateBossCollapse = function () {
	_mog_trPopBattle_sprEnemy_updateBossCollapse.call(this);
	if (this._effectDuration === 0 && !this._enemy._treasure.checked) { this.checkTreasurePopup() };
};

//==============================
// ♦ ALIAS ♦  Update Instant Collapse
//==============================
var _mog_trPopBattle_sprEnemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
Sprite_Enemy.prototype.updateInstantCollapse = function () {
	_mog_trPopBattle_sprEnemy_updateInstantCollapse.call(this);
	if (this._effectDuration === 0 && !this._enemy._treasure.checked) { this.checkTreasurePopup() };
};

//==============================
// * check Treasure Popup
//==============================
Sprite_Enemy.prototype.checkTreasurePopup = function () {
	this._enemy._treasure.item = this._enemy.makeDropItems();
	this._enemy._treasure.checked = true;
	if (this._enemy._treasure.item) {
		this._enemy._treasure.needPopup = true;
		$gameTemp._trBatNeedPopUp = true;
	};
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ update
//==============================
var _mog_trPopupBat_sprBat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function () {
	_mog_trPopupBat_sprBat_update.call(this);
	if ($gameTemp._trBatNeedPopUp) { this.treasurePopupR() };
};

//==============================
// * treasurePopupR
//==============================
Spriteset_Battle.prototype.treasurePopupR = function () {
	$gameTemp._trBatNeedPopUp = false;
	if (!this._enemiesTreasure) { this._enemiesTreasure = [] };
	for (var i = 0; i < this._enemySprites.length; i++) {
		if (this._enemySprites[i]._enemy && this._enemySprites[i]._enemy._treasure.needPopup) {
			this._enemySprites[i]._enemy._treasure.needPopup = false;
			this._enemiesTreasure[i] = new SpriteEnemyTrP(this._enemySprites[i]);
			this._enemiesTreasure[i].z = this._enemySprites[i].z ? this._enemySprites[i].z + 1 : 2;
			this._battleField.addChild(this._enemiesTreasure[i]);
		};
	};
};

//=============================================================================
// ■■■ Sprite Enemy TrP ■■■
//=============================================================================
function SpriteEnemyTrP() {
	this.initialize.apply(this, arguments);
};

SpriteEnemyTrP.prototype = Object.create(Sprite.prototype);
SpriteEnemyTrP.prototype.constructor = SpriteEnemyTrP;

//==============================
// ♦ ALIAS ♦ Initialize
//==============================
SpriteEnemyTrP.prototype.initialize = function (sprite) {
	Sprite.prototype.initialize.call(this);
	this._sprite = sprite;
	this._mode = Moghunter.trPopup_animation;
	this.visible = false;
	this._enemy = this._sprite._enemy;
	this.createIcon();
	if ($gameTemp._trBatRealTimeDrop) {
		$gameTemp._trBatDropLock = true;
		this.gainDropItemsIcons();
	};
};

//==============================
// * gainDropItems
//==============================
SpriteEnemyTrP.prototype.gainDropItemsIcons = function () {
	const items = this._enemy._treasure.item;
	for (const item of items) {
		$gameParty.gainItem(item, 1);
	}

};

//==============================
// * create Icon
//==============================
SpriteEnemyTrP.prototype.createIcon = function () {
	this._iconImg = ImageManager.loadSystem("IconSet")
	this._icons = [];
	for (var i = 0; i < this._enemy._treasure.item.length; i++) {
		var item = this._enemy._treasure.item[i];
		if (item) {
			this._icons[i] = new Sprite(this._iconImg)
			this._icons[i].item = item;
			this._icons[i].index = i;
			this._icons[i].anchor.x = 0.5;
			this._icons[i].anchor.y = 1;
			this.refreshIcons(this._icons[i]);
			this.addChild(this._icons[i]);
		};
	};
	this._icons.sort(function (a, b) { return b.intY - a.intY });
	this.children.sort(function (a, b) { return b.intY - a.intY });
	for (var i = 0; i < this._icons.length; i++) {
		this.refreshWait(this._icons[i], i, this._icons.length);
	};
};

//==============================
// * refresh Wait
//==============================
SpriteEnemyTrP.prototype.refreshWait = function (sprite, index, maxv) {
	var mv = maxv * 20;
	var mvt = mv - (20 * index)
	sprite.wait = Moghunter.trPopup_fadeDuration + mvt;
};

//==============================
// * refresh Icons
//==============================
SpriteEnemyTrP.prototype.refreshIcons = function (sprite) {
	var w = ImageManager.iconWidth;
	var h = ImageManager.iconHeight;
	var iconindex = sprite.item.iconIndex;
	var sx = iconindex % 16 * w;
	var sy = Math.floor(iconindex / 16) * h;
	var hr = Math.randomInt(h);
	sprite.setFrame(sx, sy, w, h);
	sprite.intY = ((this._sprite.height / 3) + hr) - h;
	sprite.dr = 60;
	sprite.dy = 15;
	sprite.y = -40;
	sprite.ry = sprite.y + sprite.intY;
	var randx = (Math.random() * 0.5) + (sprite.index / 8);
	var rands = Math.randomInt(2);
	sprite.sx = rands === 0 ? randx : -randx;
	sprite.scale.x = Moghunter.trPopup_scale;
	sprite.scale.y = sprite.scale.x;
};

//==============================
// * Update Bounce
//==============================
SpriteEnemyTrP.prototype.updateBounce = function (sprite) {
	sprite.dy += 0.6;
	sprite.ry += sprite.dy;
	if (sprite.ry >= 0) {
		sprite.ry = 0;
		sprite.dy *= -0.7;
	};
	sprite.y = -sprite.intY + Math.round(sprite.ry);
	if (sprite.y < -sprite.intY) { sprite.x += sprite.sx };
	if (sprite.y === -sprite.intY) { this.updateFade(sprite) };
};

//==============================
// * Update Float
//==============================
SpriteEnemyTrP.prototype.updateFloat = function (sprite) {
	sprite.wait--;
	if (sprite.wait > 0) { return };
	sprite.y -= 3
	sprite.opacity -= 8;
};

//==============================
// * Update Animation
//==============================
SpriteEnemyTrP.prototype.updateAnimation = function (sprite) {
	if (this._mode === 1) {
		this.updateFloat(sprite);
	} else {
		this.updateBounce(sprite);
	};
};

//==============================
// * Update Fade
//==============================
SpriteEnemyTrP.prototype.updateFade = function (sprite) {
	sprite.wait--;
	if (sprite.wait > 0) { return };
	sprite.opacity -= 15;
	sprite.scale.x -= 0.05
	sprite.scale.y += 0.15
};

//==============================
// * Update Sprites
//==============================
SpriteEnemyTrP.prototype.updateSprites = function (sprite) {
	this.visible = true;
	this.updateAnimation(sprite);
	if (sprite.opacity <= 0) { sprite.visible = false };
};

//==============================
// * Update
//==============================
SpriteEnemyTrP.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.x = this._sprite.x;
	this.y = this._sprite.y;
	if (this._iconImg.isReady()) {
		for (var i = 0; i < this._icons.length; i++) {
			if (this._icons[i].visible) { this.updateSprites(this._icons[i]) };
		};
	};
};
