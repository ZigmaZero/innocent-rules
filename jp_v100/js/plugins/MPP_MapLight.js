//=============================================================================
// MPP_MapLight.js
//=============================================================================
// Copyright (c) 2018 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Allows you to set the brightness of the map.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 3.2.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Specification
 *  - Only one CharLight and one FrontLight can be added to each character.
 *  - Lights created on events and maps will be reset by changing the map.
 *  - The player's lights will remain even if the map is changed.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *  - For the color index (c), specify the one set in the plug-in parameter
 *    [Light Colors].
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetCharLight evId r c a  / setCharLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *      r    : radius(1 = 1 square)
 *      c    : color index(Erase with 0)
 *      a    : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - The light is displayed around the character.
 *   
 *  〇 SetPosLight x y r c a  / setPosLight
 *      x   : X coordinate
 *      y   : Y coordinate
 *      r   : radius(1 = 1 square)
 *      c   : color index(Erase with 0)
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Lights up at the specified coordinates (x, y).
 *   
 *  〇 SetFrontLight evId r c a  / setFrontLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *      c    : color index(Erase with 0)
 *      a    : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - A light is displayed in front of the character.
 *   
 *  〇 EraseCharLight lId  / eraseCharLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *   - Turns off the lights centered on the character.
 * 
 *  〇 ErasePosLight x y  / erasePosLight
 *      x   : X coordinate
 *      y   : Y coordinate
 *   - Turns off the light at the specified coordinates (x, y).
 * 
 *  〇 EraseFrontLight lId  / eraseFrontLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *   - Turns off the light that illuminates the front of the character.
 * 
 *  〇 SetMapDarkness d  / setDarkness
 *      d : Map darkness(Specify from 0-100)
 *   - Change the darkness of the map.
 * 
 * ▼ Map notes
 *  〇 <Darkness:n>
 *      n : Map darkness(Specify from 0-100)
 *   - Specifies the darkness of the map.
 *   - By writing v[n], the value of the nth variable is referenced.
 *   - However, it is only referenced when you switch maps.
 * 
 *  〇 <PosLight X,Y:r,c,a>
 *      X   : X coordinate
 *      Y   : Y coordinate
 *      r   : radius(1 = 1 square)
 *      c   : color index
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Places the light at the specified coordinates (x, y).
 * 
 * ▼ Annotation of event execution content
 *  〇 CharLight r c a
 *      r   : radius(1 = 1 square)
 *      c   : color index
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Lights are displayed around this event.
 *   - This command applies only to the first annotation of the execution.
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setCharLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @desc 1 = 1 square
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setPosLight
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg radius
 *          @desc 1 = 1 square
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setFrontLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command eraseCharLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command erasePosLight
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseFrontLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command setDarkness
 *      @desc 
 *      @arg darkness
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 * 
 * 
 *  @param Light Colors
 *      @desc 
 *      @type string[]
 *      @default ["255,255,255","192,128,64","32,32,32"]
 * 
 *  @param Front Light
 *      @desc 
 *      @type struct<FrontLight>
 *      @default {"Radius":"6","Angle":"90","Oy":"4","Turn Duration":"24"}
 * 
 *  @param Darkness Size
 *      @desc Resolution per tile
 *      @type number
 *          @min 1
 *          @max 48
 *      @default 3
 *
 */

/*~struct~FrontLight:
 *  @param Radius
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Angle
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 180
 *      @default 90
 * 
 *  @param Oy
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 4
 * 
 *  @param Turn Duration
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 24
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc マップの明るさを設定できるようにします。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 3.2.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ 仕様
 *  - キャラクター一人に対して付加できる灯りは、キャラ灯りと前方灯りそれぞれ
 *    １つまでです。
 *  - イベントやマップ上に作成した灯りは、マップ切り替えでリセットされます。
 *  - プレイヤーの灯りはマップ移動しても維持されます。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  - 色番号(c)はプラグインパラメータ[Light Colors]で設定したものを指定してください。
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetCharLight evId r c a  / キャラ灯り設定
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *      r    : 半径(1で1マス分)
 *      c    : 色番号(0で消去)
 *      a    : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - キャラクターを中心に灯りを表示します。
 *   
 *  〇 SetPosLight x y r c a  / マップ灯り設定
 *      x   : X座標
 *      y   : Y座標
 *      r   : 半径(1で1マス分)
 *      c   : 色番号(0で消去)
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - 指定した座標(x,y)に灯り表示します。
 *   
 *  〇 SetFrontLight evId r c a  / 前方灯り設定
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *      c    : 色番号(0で消去)
 *      a    : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - キャラクターの前方に灯りを表示します。
 *   
 *  〇 EraseCharLight lId  / キャラ灯り消去
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *   - キャラクターを中心とした灯りを消去します。
 * 
 *  〇 ErasePosLight x y  / マップ灯り消去
 *      x   : X座標
 *      y   : Y座標
 *   - 指定した座標(x,y)の灯りを消去します。
 * 
 *  〇 EraseFrontLight lId  / 前方灯り消去
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *   - キャラクターの前方を照らす灯りを消去します。
 * 
 *  〇 SetMapDarkness d  / マップ暗さ設定
 *      d : マップの暗さ(0～100で指定)
 *   - マップの暗さを変更します。
 * 
 * ▼ マップのメモ
 *  〇 <Darkness:n>
 *      n : マップの暗さ(0～100で指定)
 *   - マップの暗さを指定します。
 *   - v[n] と記述することでn番の変数の値を参照します。
 *   - ただし、参照されるのはマップの切り替えを行ったときのみです。
 * 
 *  〇 <PosLight X,Y:r,c,a>
 *      X   : X座標
 *      Y   : Y座標
 *      r   : 半径(1で1マス分)
 *      c   : 色番号
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - 指定した座標(x,y)に灯りを配置します。
 * 
 * ▼ イベントの実行内容の注釈
 *  〇 灯り r c a
 *      r   : 半径(1で1マス分)
 *      c   : 色番号
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - このイベントを中心に灯りを表示します。
 *   - このコマンドは実行内容の最初の注釈のみ適用されます。
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setCharLight
 *      @text キャラ灯り設定
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @text 半径
 *          @desc 1 = 1マス
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setPosLight
 *      @text マップ灯り設定
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg radius
 *          @text 半径
 *          @desc 1 = 1マス
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setFrontLight
 *      @text 前方灯り設定
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command eraseCharLight
 *      @text キャラ灯り消去
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command erasePosLight
 *      @text マップ灯り消去
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseFrontLight
 *      @text 前方灯り消去
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command setDarkness
 *      @text マップ暗さ設定
 *      @desc 
 *      @arg darkness
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 * 
 * 
 *  @param Light Colors
 *      @text 灯りの色の配列
 *      @desc 
 *      @type string[]
 *      @default ["255,255,255","192,128,64","32,32,32"]
 * 
 *  @param Front Light
 *      @text 前方灯りパラメータ
 *      @desc 
 *      @type struct<FrontLight>
 *      @default {"Radius":"6","Angle":"90","Oy":"4","Turn Duration":"24"}
 * 
 *  @param Darkness Size
 *      @text 暗さの解像度
 *      @desc 1タイル当たりの解像度
 *      @type number
 *          @min 1
 *          @max 48
 *      @default 3
 *
 */

/*~struct~FrontLight:ja
 *  @param Radius
 *      @text 距離
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *   @param Angle
 *      @text 角度
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 180
 *      @default 90
 * 
 *  @param Oy
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 4
 * 
 *  @param Turn Duration
 *      @text 回転時間
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 24
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MapLight';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_LightColors = JSON.parse(parameters['Light Colors']);
    const param_FrontLight = JSON.parse(parameters['Front Light'], paramReplace);
    const param_DarknessSize = Number(parameters['Darkness Size'] || 3);
    
    // Dealing with other plugins
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    
    //-----------------------------------------------------------------------------
    // Bitmap
    
    if (Utils.RPGMAKER_NAME === 'MV') {
        
        Bitmap.prototype.destroy = function() {
            if (this._baseTexture) {
                this._baseTexture.destroy();
                this.__baseTexture = null;
            }
            this._destroyCanvas();
        };
        
        Bitmap.prototype._destroyCanvas = function() {
            if (this._canvas) {
                this._canvas.width = 0;
                this._canvas.height = 0;
                this.__canvas = null;
            }
        };
        
    }

    Bitmap.prototype.mppBlur = function(level) {
        const { canvas, context, width:w, height:h } = this;
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        for (let i = 0; i < level; i++) {
            tempContext.clearRect(0, 0, w + 2, h + 2);
            tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
            tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
            tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
            tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
            tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
            tempContext.drawImage(canvas, 0, 0, 1, 1, 0, 0, 1, 1);
            tempContext.drawImage(canvas, w - 1, 0, 1, 1, w + 1, 0, 1, 1);
            tempContext.drawImage(canvas, 0, h - 1, 1, 1, 0, h + 1, 1, 1);
            tempContext.drawImage(canvas, w - 1, h - 1, 1, 1, w + 1, h + 1, 1, 1);
            context.save();
            context.clearRect(0, 0, w, h);
            context.globalCompositeOperation = 'lighter';
            context.globalAlpha = 1 / 9;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
                }
            }
            context.restore();
        }
        this._baseTexture.update();
    };

    //-------------------------------------------------------------------------
    // Tilemap

    const _Tilemap_destroy = Tilemap.prototype.destroy;
    Tilemap.prototype.destroy = function() {
        this._darknessLayer.destroy();
        _Tilemap_destroy.apply(this, arguments);
    };

    const _Tilemap__createLayers = Tilemap.prototype._createLayers;
    Tilemap.prototype._createLayers = function() {
        _Tilemap__createLayers.apply(this, arguments);
        this._createDarknessLayer();
    };

    Tilemap.prototype._createDarknessLayer = function() {
        this._darknessLayer = new DarknessLayer();
        this._darknessLayer.z = 9;
        this.addChild(this._darknessLayer);
    };

    const _Tilemap_updateTransform = Tilemap.prototype.updateTransform;
    Tilemap.prototype.updateTransform = function() {
        const ox = Math.ceil(this.origin.x);
        const oy = Math.ceil(this.origin.y);
        const startX = Math.floor((ox - this._margin) / this._tileWidth);
        const startY = Math.floor((oy - this._margin) / this._tileHeight);
        const mx = startX * this._tileWidth - ox;
        const my = startY * this._tileHeight - oy;
        this._moveDarkness(mx, my);
        _Tilemap_updateTransform.apply(this, arguments);
        if (this._darknessLayer.bitmap && this._darknessLayer.opacity > 0) {
            this._addDarknessLayer(startX, startY);
        }
    };

    Tilemap.prototype._moveDarkness = function(x, y) {
        this._darknessLayer.x = x;
        this._darknessLayer.y = y;
        this._darknessLayer.opacity = $gameMap.darknessOpacity();
    };

    Tilemap.prototype._addDarknessLayer = function(startX, startY) {
        const layer = this._darknessLayer;
        layer.clear();
        this._addDarkness();
        const sx = startX - this.origin.x / this._tileWidth;
        const sy = startY - this.origin.y / this._tileHeight;
        for (const light of $gameMap.allMapLights()) {
            layer._addMapLidht(light, sx, sy);
        }
    };

    Tilemap.prototype.createDarknessBitmap = function() {
        const size = param_DarknessSize;
        const widthWithMatgin = this.width + this._margin * 2;
        const heightWithMatgin = this.height + this._margin * 2;
        const tileCols = Math.ceil(widthWithMatgin / this._tileWidth) + 1;
        const tileRows = Math.ceil(heightWithMatgin / this._tileHeight) + 1;
        const bitmap = new Bitmap(tileCols * size, tileRows * size);
        bitmap.smooth = true;
        this._darknessLayer.bitmap = bitmap;
        this._darknessLayer.scale.x = this._tileWidth / size;
        this._darknessLayer.scale.y = this._tileHeight / size;
    };

    Tilemap.prototype._addDarkness = function() {
        this._darknessLayer.fillAll('black');
    };

    //-------------------------------------------------------------------------
    // ShaderTilemap
    
    if (Utils.RPGMAKER_NAME === 'MV') {

        const _ShaderTilemap_updateTransform = ShaderTilemap.prototype.updateTransform;
        ShaderTilemap.prototype.updateTransform = function() {
            const ox = this.roundPixels ? Math.floor(this.origin.x) : this.origin.x;
            const oy = this.roundPixels ? Math.floor(this.origin.y) : this.origin.y;
            const startX = Math.floor((ox - this._margin) / this._tileWidth);
            const startY = Math.floor((oy - this._margin) / this._tileHeight);
            this._moveDarkness(startX * this._tileWidth - ox, startY * this._tileHeight - oy);
            _ShaderTilemap_updateTransform.apply(this, arguments);
            if (this._darknessLayer.opacity > 0) {
                this._addDarknessLayer(startX, startY);
            }
        };

        const _ShaderTilemap__createLayers = ShaderTilemap.prototype._createLayers;
        ShaderTilemap.prototype._createLayers = function() {
            _ShaderTilemap__createLayers.apply(this, arguments);
            this._createDarknessLayer();
        };

    }

    //-----------------------------------------------------------------------------
    // DarknessLayer
    
    function DarknessLayer() {
        this.initialize(...arguments);
    }
    
    if (_importedPlugin('MPP_MapLight_Op2')) {
        window.DarknessLayer = DarknessLayer;
    }

    DarknessLayer.prototype = Object.create(Sprite.prototype);
    DarknessLayer.prototype.constructor = DarknessLayer;

    DarknessLayer.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._frontBitmaps = {};
        this.blendMode = 2;
    };

    DarknessLayer.prototype.destroy = function() {
        for (const bitmap of Object.values(this._frontBitmaps)) {
            bitmap.destroy();
        }
        if (this.bitmap) {
            this.bitmap.destroy();
        }
        Sprite.prototype.destroy.call(this);
    };

    DarknessLayer.prototype.clear = function() {
        this.bitmap.clear();
    };

    DarknessLayer.prototype.fillAll = function(color) {
        this.bitmap.fillAll(color);
    };

    DarknessLayer.prototype._addMapLidht = function(mapLight, sx, sy) {
        if (mapLight.isValid()) {
            const dx = mapLight.scrolledX() - sx + 0.5;
            const dy = mapLight.scrolledY() - sy + 0.4;
            const alpha = mapLight.opacity / 255;
            const rgb = mapLight.rgb();
            if (mapLight.isFront()) {
                this._addFrontLidht(dx, dy, rgb, mapLight.angle, alpha);
            } else {
                this._addNormalMapLidht(dx, dy, rgb, mapLight.radius, alpha);
            }
        }
    };

    DarknessLayer.prototype._addFrontLidht = function(x, y, rgb, angle, alpha) {
        const frontBitmap = this._createFrontBitmap(rgb);
        const size = param_DarknessSize;
        const bitmap = this.bitmap;
        const context = bitmap.context;
        const { width:sw, height:sh } = frontBitmap;
        const dx = -sw / 2 * size / 4;
        const dy = -param_FrontLight.Oy * size / 4;
        const dw = sw * size / 4;
        const dh = sh * size / 4;
        
        // MVで size = 4, angle = 0 の場合、他の値の小数点以下が無視されるため、その対処
        if (size === 4 && Utils.RPGMAKER_NAME === 'MV') angle = angle || 0.1;
        
        context.save();
        context.translate(x * size, y * size);
        context.rotate(angle * Math.PI / 180);
        context.globalAlpha = alpha;
        bitmap.blt(frontBitmap, 0, 0, sw, sh, dx, dy, dw, dh);
        context.restore();
    };

    DarknessLayer.prototype._createFrontBitmap = function(rgb) {
        const dict = this._frontBitmaps;
        if (!dict[rgb]) {
            const { Radius: radius = 6, Angle: angle = 90 } = param_FrontLight;
            const r = radius * 4;
            const bitmap = new Bitmap(r * 2 + 4, r + 4);
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(r + 2, 2);
            const startAngle = (90 - angle / 2) / 180 * Math.PI;
            const endAngle = (90 + angle / 2) / 180 * Math.PI;
            context.arc(r + 2, 2, r, startAngle, endAngle);
            context.closePath();
            const grad = context.createRadialGradient(r + 2, 2, 0, r + 2, 2, r);
            grad.addColorStop(0, `rgba(${rgb},1)`);
            grad.addColorStop(1, `rgba(${rgb},0)`);
            context.fillStyle = grad;
            context.fill();
            context.restore();
            bitmap.mppBlur(2);
            dict[rgb] = bitmap;
        }
        return dict[rgb];
    };

    DarknessLayer.prototype._addNormalMapLidht = function(x, y, rgb, r, alpha) {
        const size = param_DarknessSize;
        const dx = x * size;
        const dy = y * size;
        const dr = r * size;
        const bitmap = this.bitmap;
        const context = bitmap.context;
        const grad = context.createRadialGradient(dx, dy, 0, dx, dy, dr);
        grad.addColorStop(0, `rgba(${rgb},1)`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        context.globalAlpha = alpha;
        bitmap.drawCircle(dx, dy, dr, grad);
        context.globalAlpha = 1;
    };

    //-----------------------------------------------------------------------------
    // Game_MapLight

    function Game_MapLight() {
        this.initialize.apply(this, arguments);
    }

    window.Game_MapLight = Game_MapLight;

    Object.defineProperties(Game_MapLight.prototype, {
        colorIndex: {
            get() { return this._colorIndex; },
            configurable: true
        },
        radius: {
            get() { return this._radius; },
            configurable: true
        },
        opacity: {
            get() { return this._opacity; },
            configurable: true
        },
        angle: {
            get() { return this._angle; },
            configurable: true
        }
    });

    Game_MapLight.prototype.initialize = function() {
        this._eventId = 0;
        this._x = 0;
        this._y = 0;
        this._colorIndex = 0;
        this._radius = 0;
        this._targetRadius = 0;
        this._isFront = false;
        this._opacity = 0;
        this._targetOpacity = 0;
        this._amplitude = 0;
        this._moveDuration = 0;
        this._angle = 0;
        this._subjectDirection = 0;
        this._angleDuration = 0;
    };

    Game_MapLight.prototype.subject = function() {
        if (this._eventId < 0) {
            return $gamePlayer;
        } else if (this._eventId > 0) {
            return $gameMap.event(this._eventId);
        }
        return null;
    };

    Game_MapLight.prototype.rgb = function() {
        return this._colorIndex > 0
            ? param_LightColors[this._colorIndex - 1]
            : null;
    };

    Game_MapLight.prototype.isFront = function() {
        return this._isFront;
    };

    Game_MapLight.prototype.isValid = function() {
        return (
            (this._radius > 0 || this._isFront) &&
            this._opacity > 0 &&
            this.rgb()
        );
    };

    Game_MapLight.prototype.setCharLight = function(
        eventId, radius, colorIndex, amplitude
    ) {
        this._isFront = false;
        this._eventId = eventId;
        this._targetRadius = radius;
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        this._subjectDirection = 0;
        this._angleDuration = 0;
    };

    Game_MapLight.prototype.setPosLight = function(
        x, y, radius, colorIndex, amplitude
    ) {
        this._isFront = false;
        this._x = x;
        this._y = y;
        this._targetRadius = radius;
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        this._eventId = 0;
        this._subjectDirection = 0;
        this._angleDuration = 0;
    };

    Game_MapLight.prototype.setFrontLight = function(
        eventId, colorIndex, amplitude
    ) {
        this._isFront = true;
        this._eventId = eventId;
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        const subject = this.subject();
        this._angle = this.directionAngle(subject);
        this._subjectDirection = subject ? subject.direction() : 0;
        this._angleDuration = 0;
        this._radius = 0;
    };

    Game_MapLight.prototype.skip = function() {
        this._radius = this._targetRadius;
        this._opacity = this._targetOpacity;
        this.setupAmplitude();
    };

    Game_MapLight.prototype.setupAmplitude = function() {
        if (this._targetOpacity > 0 && this._amplitude > 0) {
            this._targetOpacity = 255 - Math.randomInt(255 * this._amplitude / 100);
            this._moveDuration = 8;
        } else {
            this._moveDuration = 0;
        }
    };

    Game_MapLight.prototype.update = function() {
        this.updateMove();
        this.updateAngle();
    };

    Game_MapLight.prototype.updateMove = function() {
        if (this._moveDuration > 0) {
            const d = this._moveDuration;
            this._radius = (this._radius * (d - 1) + this._targetRadius) / d;
            this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
            this._moveDuration--;
            if (this._moveDuration === 0) this.setupAmplitude();
        }
    };

    Game_MapLight.prototype.updateAngle = function() {
        if (this._isFront) {
            const subject = this.subject();
            if (subject) {
                if (this._subjectDirection !== subject.direction()) {
                    this._subjectDirection = subject.direction();
                    this.startAngle(subject);
                }
                if (this._angleDuration > 0) {
                    const d = this._angleDuration;
                    const target = this.targetAngle(subject);
                    const max = d * (d + 1) / 2;
                    this._angle += (target - this._angle) * d / max;
                    this._angle = (this._angle + 360) % 360;
                    this._angleDuration--;
                }
            }
        }
    };

    Game_MapLight.prototype.startAngle = function(subject) {
        this._angleDuration = param_FrontLight['Turn Duration'] || 0;
        if (this._angleDuration === 0) {
            this._angle = this.directionAngle(subject);
        }
    };

    Game_MapLight.prototype.targetAngle = function(subject) {
        let result = this.directionAngle(subject);
        const sa = this._angle - result;
        if (Math.abs(sa) > Math.abs(sa - 360)) result += 360;
        if (Math.abs(sa) > Math.abs(sa + 360)) result -= 360;
        return result;
    };

    Game_MapLight.prototype.directionAngle = function(subject) {
        if (subject) {
            switch (subject.direction()) {
                case 2: return 0;
                case 4: return 90;
                case 6: return 270;
                case 8: return 180;
            }
        }
        return 0;
    };

    Game_MapLight.prototype.scrolledX = function() {
        const subject = this.subject();
        return subject ? subject.scrolledX() : $gameMap.adjustX(this._x);
    };

    Game_MapLight.prototype.scrolledY = function() {
        const subject = this.subject();
        return subject ? subject.scrolledY() : $gameMap.adjustY(this._y);
    };

    //-------------------------------------------------------------------------
    // Game_Map

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        this._mapLights = {};
        _Game_Map_setup.apply(this, arguments);
        this._darkness = 0;
        for (const [name, param] of Object.entries($dataMap.meta)) {
            const match = /^PosLight\s+(\d+)\s*,\s*(\d+)\s*$/.exec(name);
            if (match) {
                const x = Number(match[1]);
                const y = Number(match[2]);
                const data = param.split(',').map(Number);
                this.setPosLight(x, y, ...data);
            } else if (name === 'Darkness') {
                this._darkness = PluginManager.mppValue(param).clamp(0, 100);
            }
        }
        for (const light of Object.values(this._mapLights)) {
            light.skip();
        }
    };

    Game_Map.prototype.darknessOpacity = function() {
        return 255 * this._darkness / 100;
    };

    Game_Map.prototype.setDarkness = function(opacity) {
        this._darkness = opacity.clamp(0, 100);
    };

    Game_Map.prototype.allMapLights = function() {
        return [
            ...Object.values(this._mapLights),
            ...$gamePlayer.allMapLights()
        ]
    };

    Game_Map.prototype.getMapLight = function(key) {
        const dict = this._mapLights;
        if (!dict[key]) dict[key] = new Game_MapLight();
        return dict[key];
    };

    Game_Map.prototype.setCharLight = function(eventId, r = 0, c = 0, a = 0) {
        this.getMapLight(`char${eventId}`).setCharLight(eventId, r, c, a);
    };

    Game_Map.prototype.setPosLight = function(x, y, r = 0, c = 0, a = 0) {
        this.getMapLight(`pos${x},${y}`).setPosLight(x, y, r, c, a);
    };

    Game_Map.prototype.setFrontLight = function(eventId, c = 0, a = 0) {
        this.getMapLight(`front${eventId}`).setFrontLight(eventId, c, a);
    };

    Game_Map.prototype.eraseCharLight = function(eventId) {
        this.eraseLight(`char${eventId}`);
    };

    Game_Map.prototype.erasePosLight = function(x, y) {
        this.eraseLight(`pos${x},${y}`);
    };

    Game_Map.prototype.eraseFrontLight = function(eventId) {
        this.eraseLight(`front${eventId}`);
    };

    Game_Map.prototype.eraseLight = function(key) {
        delete this._mapLights[key];
    };

    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.apply(this, arguments);
        for (const light of this.allMapLights()) {
            light.update();
        }
    };

    //-------------------------------------------------------------------------
    // Game_Event

    const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function() {
        _Game_Event_clearPageSettings.apply(this, arguments);
        this.clearCharLight();
        this.clearFrontLight();
    };
    
    Game_Event.prototype.clearCharLight = function() {
        $gameMap.eraseCharLight(this.eventId());
    };
    
    Game_Event.prototype.clearFrontLight = function() {
        $gameMap.eraseFrontLight(this.eventId());
    };
    
    Game_Event.prototype.startCharLight = function(r = 0, c = 0, a = 0) {
        $gameMap.setCharLight(this.eventId(), r, c, a);
    };
    
    Game_Event.prototype.startFrontLight = function(c = 0, a = 0) {
        $gameMap.eraseCharLight(this.eventId(), c, a);
    };
    
    const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_Event_setupPageSettings.apply(this, arguments);
        if (!this.setupCharLight()) {
            this.clearCharLight();
        }
        if (!this.setupFrontLight()) {
            this.clearFrontLight();
        }
    };

    Game_Event.prototype.setupCharLight = function() {
        const commandNames = ['CharLight', '灯り'];
        for (const comment of this.generatorCommentCommand(commandNames)) {
            const [_, ...args] = comment.split(' ');
            this.startCharLight(...args.map(Number));
            return true;
        }
        return false;
    };

    Game_Event.prototype.setupFrontLight = function() {
        const commandNames = ['FrontLight', '前方灯り'];
        for (const comment of this.generatorCommentCommand(commandNames)) {
            const [_, ...args] = comment.split(' ');
            this.startFrontLight(...args.map(Number));
            return true;
        }
        return false;
    };

    Game_Event.prototype.generatorCommentCommand = function*(commandNames) {
        for (const evCom of this.list()) {
            switch (evCom.code) {
                case 108:
                case 408:
                    const comment = evCom.parameters[0];
                    if (commandNames.some(name => comment.startsWith(name))) {
                        yield comment;
                    }
                    break;
                default:
                    return;
            }
        }
    };

    //-------------------------------------------------------------------------
    // Game_Player

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.apply(this, arguments);
        this._charLight = null;
        this._frontLight = null;
    };
    
    Game_Player.prototype.allMapLights = function() {
        const result = [];
        if (this._charLight) result.push(this._charLight);
        if (this._frontLight) result.push(this._frontLight);
        return result;
    };
    
    Game_Player.prototype.clearCharLight = function() {
        this._charLight = null;
    };
    
    Game_Player.prototype.clearFrontLight = function() {
        this._frontLight = null;
    };
    
    Game_Player.prototype.startCharLight = function(r = 0, c = 0, a = 0) {
        if (!this._charLight) {
            this._charLight = new Game_MapLight();
        }
        this._charLight.setCharLight(-1, r, c, a);
    };
    
    Game_Player.prototype.startFrontLight = function(c = 0, a = 0) {
        if (!this._frontLight) {
            this._frontLight = new Game_MapLight();
        }
        this._frontLight.setFrontLight(-1, c, a);
    };
    
    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetCharLight: {
            name:'setCharLight',
            keys:['character', 'radius', 'colorIndex', 'amplitude']
        },
        SetPosLight: {
            name:'setPosLight',
            keys:['x', 'y', 'radius', 'colorIndex', 'amplitude']
        },
        SetFrontLight: {
            name:'setFrontLight',
            keys:['character', 'colorIndex', 'amplitude']
        },
        EraseCharLight: { name:'eraseCharLight', keys:['character'] },
        ErasePosLight: { name:'erasePosLight', keys:['x', 'y'] },
        EraseFrontLight: { name:'eraseFrontLight', keys:['character'] },
        SetMapDarkness: { name:'setDarkness', keys:['darkness'] }
    };
    Object.assign(_mzCommands, {
        'キャラ灯り設定': _mzCommands.SetCharLight,
        'マップ灯り設定': _mzCommands.SetPosLight,
        '前方灯り設定': _mzCommands.SetFrontLight,
        'キャラ灯り消去': _mzCommands.EraseCharLight,
        'マップ灯り消去': _mzCommands.ErasePosLight,
        '前方灯り消去': _mzCommands.EraseFrontLight,
        'マップ暗さ設定': _mzCommands.SetMapDarkness
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(...mzCommand.keys.map((k,i) => ({[k]:args[i]})));
            PluginManager.callCommand(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager._commands = PluginManager._commands || {};
    
    if (!PluginManager.registerCommand) {
        PluginManager.registerCommand = function(pluginName, commandName, func) {
            const key = pluginName + ":" + commandName;
            this._commands[key] = func;
        };
    }

    if (!PluginManager.callCommand) {
        PluginManager.callCommand = function(self, pluginName, commandName, args) {
            const key = pluginName + ":" + commandName;
            const func = this._commands[key];
            if (typeof func === "function") {
                func.bind(self)(args);
            }
        };
    }
    
    PluginManager.registerCommand(pluginName, 'setCharLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        const r = PluginManager.mppValue(args.radius);
        const c = PluginManager.mppValue(args.colorIndex);
        const a = PluginManager.mppValue(args.amplitude || '0');
        if (character) {
            character.startCharLight(r, c, a);
        }
    });

    PluginManager.registerCommand(pluginName, 'setPosLight', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        const r = PluginManager.mppValue(args.radius);
        const c = PluginManager.mppValue(args.colorIndex);
        const a = PluginManager.mppValue(args.amplitude || '0');
        $gameMap.setPosLight(x, y, r, c, a);
    });

    PluginManager.registerCommand(pluginName, 'setFrontLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        const c = PluginManager.mppValue(args.colorIndex);
        const a = PluginManager.mppValue(args.amplitude || '0');
        if (character) {
            character.startFrontLight(c, a);
        }
    });

    PluginManager.registerCommand(pluginName, 'eraseCharLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        if (character) {
            character.clearCharLight();
        }
    });

    PluginManager.registerCommand(pluginName, 'erasePosLight', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        $gameMap.erasePosLight(x, y);
    });

    PluginManager.registerCommand(pluginName, 'eraseFrontLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        if (character) {
            character.clearFrontLight();
        }
    });

    PluginManager.registerCommand(pluginName, 'setDarkness', args => {
        const darkness = PluginManager.mppValue(args.darkness);
        $gameMap.setDarkness(darkness);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-------------------------------------------------------------------------
    // Spriteset_Map

    const _Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_createTilemap.apply(this, arguments);
        this._tilemap.createDarknessBitmap();
    };

})();
