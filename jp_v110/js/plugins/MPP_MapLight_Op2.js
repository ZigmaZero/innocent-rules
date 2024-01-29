//=============================================================================
// MPP_MapLight_Op2.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc The brightness of the tile changes depending on the region.
 * @author Mokusei Penguin
 * @url 
 *
 * @base MPP_MapLight
 * @orderAfter MPP_MapLight
 *
 * @help [version 1.0.1]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin parameter details
 *  〇 About light level
 *   - You can set the brightness of the tile with the region ID.
 *   - The higher the level, the brighter it becomes.
 *   
 *  〇 Region ID array specification
 *   - When setting numbers in an array, you can specify numbers from n to m
 *     by writing n-m.
 *         Example: 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Light Level 1 Regions
 * @desc 
 * @default 1,9,17,25,33,41,49,57
 *
 * @param Light Level 2 Regions
 * @desc 
 * @default 2,10,18,26,34,42,50,58
 *
 * @param Light Level 3 Regions
 * @desc 
 * @default 3,11,19,27,35,43,51,59
 *
 * @param Light Level 4 Regions
 * @desc 
 * @default 4,12,20,28,36,44,52,60
 *
 * @param Light Level 5 Regions
 * @desc 
 * @default 5,13,21,29,37,45,53,61
 *
 * @param Light Level 6 Regions
 * @desc 
 * @default 6,14,22,30,38,46,54,62
 *
 * @param Light Level 7 Regions
 * @desc 
 * @default 7,15,23,31,39,47,55,63
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc リージョンでそのタイルの明るさが変わります。
 * @author 木星ペンギン
 * @url 
 *
 * @base MPP_MapLight
 * @orderAfter MPP_MapLight
 *
 * @help [version 1.0.1]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインパラメータ 詳細
 *  〇 明るさレベルについて
 *   - リージョンIDでそのタイルの明るさを設定できます。
 *   - レベルが高いほど明るくなります。
 *   
 *  〇 リージョンIDの配列指定
 *   - 数値を配列で設定する際、n-m と表記することでnからmまでの数値を指定できます。
 *       例 : 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Light Level 1 Regions
 * @text 明るさレベル1リージョン
 * @desc 
 * @default 1,9,17,25,33,41,49,57
 *
 * @param Light Level 2 Regions
 * @text 明るさレベル2リージョン
 * @desc 
 * @default 2,10,18,26,34,42,50,58
 *
 * @param Light Level 3 Regions
 * @text 明るさレベル3リージョン
 * @desc 
 * @default 3,11,19,27,35,43,51,59
 *
 * @param Light Level 4 Regions
 * @text 明るさレベル4リージョン
 * @desc 
 * @default 4,12,20,28,36,44,52,60
 *
 * @param Light Level 5 Regions
 * @text 明るさレベル5リージョン
 * @desc 
 * @default 5,13,21,29,37,45,53,61
 *
 * @param Light Level 6 Regions
 * @text 明るさレベル6リージョン
 * @desc 
 * @default 6,14,22,30,38,46,54,62
 *
 * @param Light Level 7 Regions
 * @text 明るさレベル7リージョン
 * @desc 
 * @default 7,15,23,31,39,47,55,63
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MapLight_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            const match = /(\d+)-(\d+)/.exec(item);
            if (match) {
                const start = Number(match[1]);
                const end = Number(match[2]);
                return r.concat([...Array(end + 1).keys()].slice(start));
            } else {
                return item ? r.concat(Number(item)) : r;
            }
        }, []);
    };
    const param_LightRegions = [];
    for (let i = 1; i < 8; i++) {
        const param = parameters['Light Level %1 Regions'.format(i)];
        param_LightRegions[i] = convertToArray(param);
    }
    
    //-------------------------------------------------------------------------
    // Tilemap

    if (Utils.RPGMAKER_NAME === 'MV') {
        
        const _Tilemap__paintAllTiles = Tilemap.prototype._paintAllTiles;
        Tilemap.prototype._paintAllTiles = function(startX, startY) {
            this._darknessLayer.clearBase();
            _Tilemap__paintAllTiles.apply(this, arguments);
        };

        const _Tilemap__paintTiles = Tilemap.prototype._paintTiles;
        Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
            _Tilemap__paintTiles.apply(this, arguments);
            this._addDarknessBitmap(startX, startY, x, y);
        };

    } else {
        
        const _Tilemap__addAllSpots = Tilemap.prototype._addAllSpots;
        Tilemap.prototype._addAllSpots = function(startX, startY) {
            this._darknessLayer.clearBase();
            _Tilemap__addAllSpots.apply(this, arguments);
        };

        const _Tilemap__addSpot = Tilemap.prototype._addSpot;
        Tilemap.prototype._addSpot = function(startX, startY, x, y) {
            _Tilemap__addSpot.apply(this, arguments);
            this._addDarknessBitmap(startX, startY, x, y);
        };
        
    }

    Tilemap.prototype._addDarknessBitmap = function(startX, startY, x, y) {
        const level = this._getDarknessLevel(startX + x, startY + y);
        this._darknessLayer._addBaseBitmap(x, y, level);
    };

    Tilemap.prototype._getDarknessLevel = function(x, y) {
        const regionId = this._readMapData(x, y, 5);
        return Math.max(param_LightRegions.findIndex(regions => {
            return regions && regions.includes(regionId);
        }), 0);
    };

    Tilemap.prototype._addDarkness = function() {
        this._darknessLayer.bltBase();
    };

    const _Tilemap_createDarknessBitmap = Tilemap.prototype.createDarknessBitmap;
    Tilemap.prototype.createDarknessBitmap = function() {
        _Tilemap_createDarknessBitmap.call(this);
        const widthWithMatgin = this.width + this._margin * 2;
        const heightWithMatgin = this.height + this._margin * 2;
        const tileCols = Math.ceil(widthWithMatgin / this._tileWidth) + 1;
        const tileRows = Math.ceil(heightWithMatgin / this._tileHeight) + 1;
        this._darknessLayer.createBaseBitmap(tileCols, tileRows);
    };

    //-------------------------------------------------------------------------
    // ShaderTilemap
    
    if (Utils.RPGMAKER_NAME === 'MV') {

        const _ShaderTilemap__paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
        ShaderTilemap.prototype._paintAllTiles = function(startX, startY) {
            this._darknessLayer.clearBase();
            _ShaderTilemap__paintAllTiles.apply(this, arguments);
        };

        const _ShaderTilemap__paintTiles = ShaderTilemap.prototype._paintTiles;
        ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
            _ShaderTilemap__paintTiles.apply(this, arguments);
            this._addDarknessBitmap(startX, startY, x, y);
        };

    }

    //-------------------------------------------------------------------------
    // DarknessLayer
    
    const _DarknessLayer_destroy = DarknessLayer.prototype.destroy;
    DarknessLayer.prototype.destroy = function() {
        if (this._baseBitmap) {
            this._baseBitmap.destroy();
        }
        _DarknessLayer_destroy.call(this);
    };

    DarknessLayer.prototype.createBaseBitmap = function(width, height) {
        this._baseBitmap = new Bitmap(width, height);
    };

    DarknessLayer.prototype.clearBase = function() {
        if (this._baseBitmap) {
            this._baseBitmap.clear();
        }
    };

    DarknessLayer.prototype.bltBase = function() {
        const { width:sw, height:sh } = this._baseBitmap;
        const { width:dw, height:dh } = this.bitmap;
        this.bitmap.blt(this._baseBitmap, 0, 0, sw, sh, 0, 0, dw, dh);
    };

    DarknessLayer.prototype._addBaseBitmap = function(x, y, level) {
        const bitmap = this._baseBitmap;
        bitmap.paintOpacity = 255 * (7 - level) / 7;
        bitmap.fillRect(x, y, 1, 1, 'black');
    };

})();
