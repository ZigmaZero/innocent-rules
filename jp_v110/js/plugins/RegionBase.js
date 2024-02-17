//=============================================================================
// RPG Maker MZ - Region Base Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Region Base Plugin
 * @author triacontane
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url
 *
 * @param regionList
 * @text Region List
 * @desc List of region data.
 * @default []
 * @type struct<Record>[]
 *
 * @param terrainTagList
 * @text Terrain Tag List
 * @desc List of terrain tag data.
 * @default []
 * @type struct<Record>[]
 *
 * @help RegionBase.js
 *
 * Offers a database of regions and terrain tags.
 * The specs generally follow RPG Maker MV Trinity.
 * The plug-in offers the following functions using regions and terrain tags as triggers.
 * -Event, player passage determination (4 dir included)
 * -Ladders, bushes, counters, damage floors
 * -Calling of common events (3 trigger types)
 * -Switches that turn ON only when a tile is entered
 * -Traits enabled only when a tile is entered
 * -Notes field
 *
 * The database can be referred to from scripts and external plug-ins with the following script.
 * Please note that when not configured, or if the index set to [0], the content will become undefined.
 *
 * $dataSystem.regions[ID];
 * $dataSystem.terrainTags[ID];
 */

/*~struct~Record:
 *
 * @param id
 * @text ID
 * @desc Target region or terrain tag ID.
 * @default 1
 * @type number
 *
 * @param name
 * @text Name
 * @desc Name for management. No special significance.
 * @default
 *
 * @param collisionForPlayer
 * @text Player Collision Determination
 * @desc Determines collision with player.
 * @default []
 * @type select[]
 * @option Impassable
 * @value collision_all
 * @option Cannot be passed from top
 * @value collision_up
 * @option Cannot be passed from right
 * @value collision_right
 * @option Cannot be passed from bottom
 * @value collision_down
 * @option Cannot be passed from left
 * @value collision_left
 *
 * @param collisionForEvent
 * @text Event Collision Determination
 * @desc Determines collision with event.
 * @default []
 * @type select[]
 * @option Impassable
 * @value collision_all
 * @option Cannot be passed from top
 * @value collision_up
 * @option Cannot be passed from right
 * @value collision_right
 * @option Cannot be passed from bottom
 * @value collision_down
 * @option Cannot be passed from left
 * @value collision_left
 *
 * @param through
 * @text Through
 * @desc Through settings. Enable to pass through impassable tiles. Collision determination takes priority.
 * @default false
 * @type boolean
 *
 * @param tileAttribute
 * @text Tile Attribute
 * @desc The tile attribute.
 * @default []
 * @type select[]
 * @option Ladder
 * @value ladder
 * @option Bush
 * @value bush
 * @option Counter
 * @value counter
 * @option Damage Floor
 * @value damage_floor
 *
 * @param commonEvent
 * @text Common Event
 * @desc Common event to be called.
 * @type struct<CommonEvent>[]
 *
 * @param switchId
 * @text SwitchID
 * @desc Switch that turns ON when tile is entered. Turns OFF when left.
 * @type switch
 *
 * @param traitsId
 * @text Traits
 * @desc Traits that are enabled only when the Player has entered the tile. Selected from Jobs for convenience.
 * @type class
 *
 * @param note
 * @text Notes
 * @desc The notes field. As with the regular database, meta information is always generated from here. Assumes usage in scripts.
 * @type multiline_string
 */

/*~struct~CommonEvent:
 *
 * @param id
 * @text ID
 * @desc Common Event ID.
 * @default 1
 * @type common_event
 *
 * @param trigger
 * @text Trigger
 * @desc Launch trigger for common events.
 * @default 0
 * @type select
 * @option Executes only once when the area is entered
 * @value 0
 * @option Executes when the player walks while in the area
 * @value 1
 * @option Executes only once when the area is left
 * @value 2
 */

/*:ja
 * @target MZ
 * @plugindesc リージョンのデータベース提供します
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url
 *
 * @param regionList
 * @text リージョンリスト
 * @desc リージョンデータのリストです。
 * @default []
 * @type struct<Record>[]
 *
 * @param terrainTagList
 * @text 地形タグリスト
 * @desc 地形タグデータのリストです。
 * @default []
 * @type struct<Record>[]
 *
 * @help RegionBase.js
 *
 * リージョンおよび地形タグのデータベースを提供します。
 * 仕様はおおよそRPGツクールMV Trinityに準じています。
 * リージョンおよび地形タグをトリガーにして以下の機能を提供します。
 * ・イベント、プレイヤーに対する通行判定(4方向含む)
 * ・梯子、茂み、カウンター、ダメージ床
 * ・コモンイベントの呼び出し(トリガー3種類)
 * ・侵入している間だけONになるスイッチ
 * ・侵入している間だけ有効になる特徴
 * ・メモ欄
 *
 * 以下のスクリプトでデータベースをスクリプトや外部プラグインから参照できます。
 * 未設定もしくは添え字が[0]の場合の中身はundefinedとなるので注意してください。
 *
 * $dataSystem.regions[ID];
 * $dataSystem.terrainTags[ID];
 */

/*~struct~Record:
 *
 * @param id
 * @text ID
 * @desc 対象となるリージョンもしくは地形タグIDです。
 * @default 1
 * @type number
 *
 * @param name
 * @text 名前
 * @desc 管理上の名前です。特に意味はありません。
 * @default
 *
 * @param collisionForPlayer
 * @text プレイヤーとの衝突判定
 * @desc プレイヤーとの衝突判定です。
 * @default []
 * @type select[]
 * @option 通行不可
 * @value collision_all
 * @option 上方向通行不可
 * @value collision_up
 * @option 右方向通行不可
 * @value collision_right
 * @option 下方向通行不可
 * @value collision_down
 * @option 左方向通行不可
 * @value collision_left
 *
 * @param collisionForEvent
 * @text イベントとの衝突判定
 * @desc イベントとの衝突判定です。
 * @default []
 * @type select[]
 * @option 通行不可
 * @value collision_all
 * @option 上方向通行不可
 * @value collision_up
 * @option 右方向通行不可
 * @value collision_right
 * @option 下方向通行不可
 * @value collision_down
 * @option 左方向通行不可
 * @value collision_left
 *
 * @param through
 * @text すり抜け
 * @desc すり抜け設定です。有効になっていると通行不可のタイルを通過できます。衝突判定の方が優先されます。
 * @default false
 * @type boolean
 *
 * @param tileAttribute
 * @text タイル属性
 * @desc タイル属性です。
 * @default []
 * @type select[]
 * @option 梯子
 * @value ladder
 * @option 茂み
 * @value bush
 * @option カウンター
 * @value counter
 * @option ダメージ床
 * @value damage_floor
 *
 * @param commonEvent
 * @text コモンイベント
 * @desc 呼び出されるコモンイベントです。
 * @type struct<CommonEvent>[]
 *
 * @param switchId
 * @text スイッチID
 * @desc 侵入時にONになるスイッチです。離脱するとOFFになります。
 * @type switch
 *
 * @param traitsId
 * @text 特徴
 * @desc プレイヤーが侵入している場合に有効になる特徴です。便宜上、職業からの選択となります。
 * @type class
 *
 * @param note
 * @text メモ
 * @desc メモ欄です。通常のデータベースと同様に、ここからmeta情報が自動生成されます。スクリプトでの使用を想定しています。
 * @type multiline_string
 */

/*~struct~CommonEvent:
 *
 * @param id
 * @text ID
 * @desc コモンイベントIDです。
 * @default 1
 * @type common_event
 *
 * @param trigger
 * @text トリガー
 * @desc コモンイベントの起動トリガーです。
 * @default 0
 * @type select
 * @option エリアに侵入したときに一度だけ実行
 * @value 0
 * @option エリア内にいる間、歩く度に実行
 * @value 1
 * @option エリアから離脱したときに一度だけ実行
 * @value 2
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param  = PluginManagerEx.createParameter(script);

    const _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.apply(this, arguments);
        if ($dataSystem && $dataClasses && !$dataSystem.regions) {
            PluginManagerEx.setupRegionData(param.regionList, 'regions');
            PluginManagerEx.setupRegionData(param.terrainTagList, 'terrainTags');
        }
    };

    PluginManagerEx.setupRegionData = function(paramList, prop) {
        const dataList = [];
        $dataSystem[prop] = dataList;
        if (!Array.isArray(paramList)) {
            return;
        }
        paramList.forEach(item => {
            dataList[item.id] = item;
            const classData = $dataClasses[item.traitsId];
            if (classData) {
                item.traits = classData.traits;
            }
        });
        DataManager.extractArrayMetadata(dataList);
    };

    /**
     * Game_CharacterBase
     */
    const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        $gameMap.setPassableSubject(this);
        return _Game_CharacterBase_isMapPassable.apply(this, arguments)
    };

    Game_CharacterBase.prototype.findCollisionData = function(x, y) {
        // abstract
    };

    Game_Event.prototype.findCollisionData = function(x, y) {
        return $gameMap.findArrayDataRegionAndTerrain(x, y, 'collisionForEvent');
    };

    Game_Player.prototype.findCollisionData = function(x, y) {
        return $gameMap.findArrayDataRegionAndTerrain(x, y, 'collisionForPlayer');
    };

    /**
     * Game_Player
     */
    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        const wasMoving = this.isMoving();
        _Game_Player_update.apply(this, arguments);
        if (!this.isMoving() && wasMoving) {
            this.updateCurrentRegion();
            this.updateCurrentTerrainTags();
        }
    };

    Game_Player.prototype.updateCurrentRegion = function() {
        this._region = $gameMap.findCurrentRegion(this.x, this.y);
        this.updateCurrentRegionAndTerrain(this._region, this._prevRegion);
        this._prevRegion = this._region;
    };

    Game_Player.prototype.updateCurrentTerrainTags = function() {
        this._terrainTags = $gameMap.findCurrentTerrainTag(this.x, this.y);
        this.updateCurrentRegionAndTerrain(this._terrainTags, this._prevTerrainTags);
        this._prevTerrainTags = this._terrainTags;
    };

    Game_Player.prototype.updateCurrentRegionAndTerrain = function(current, prev) {
        this.checkRegionCommonTrigger(current || {}, prev || {});
        this.checkRegionSwitch(current || {}, prev || {});
    };

    Game_Player.prototype.checkRegionCommonTrigger = function(current, prev) {
        (current.commonEvent || []).forEach(event => {
            if (event.trigger === 0 && current.id !== prev.id) {
                $gameMap.setupDynamicCommon(event.id);
            } else if (event.trigger === 1) {
                $gameMap.setupDynamicCommon(event.id);
            }
        });
        (prev.commonEvent || []).forEach(event => {
            if (event.trigger === 2 && current.id !== prev.id) {
                $gameMap.setupDynamicCommon(event.id);
            }
        });
    };

    Game_Player.prototype.checkRegionSwitch = function(current, prev) {
        if (current.id !== prev.id) {
            if (current.switchId > 0) {
                $gameSwitches.setValue(current.switchId, true);
            }
            if (prev.switchId > 0) {
                $gameSwitches.setValue(prev.switchId, false);
            }
        }
    };

    Game_Player.prototype.appendRegionTraits = function(traitsObjects) {
        if ($gameMap.mapId() <= 0) {
            return traitsObjects;
        }
        const region = $gameMap.findCurrentRegion(this.x, this.y);
        if (region && region.traits) {
            traitsObjects.push(region);
        }
        const terrainTag = $gameMap.findCurrentTerrainTag(this.x, this.y);
        if (terrainTag && terrainTag.traits) {
            traitsObjects.push(terrainTag);
        }
        return traitsObjects;
    };

    /**
     * Game_Actor
     */
    const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        const traitsObjects = _Game_Actor_traitObjects.apply(this, arguments);
        return $gamePlayer.appendRegionTraits(traitsObjects);
    };

    /**
     * Game_Map
     */
    Game_Map.prototype.setPassableSubject = function(character) {
        this._passableSubject = character;
    };

    const _Game_Map_isPassable = Game_Map.prototype.isPassable;
    Game_Map.prototype.isPassable = function(x, y, d) {
        const passable = _Game_Map_isPassable.apply(this, arguments);
        if (this.isCollidedByRegion(x, y, d)) {
            return false;
        } else if (this.isThroughByRegion(x, y)) {
            return true;
        } else {
            return passable;
        }
    };

    Game_Map.prototype.isCollidedByRegion = function(x, y, d) {
        const collision = this._passableSubject.findCollisionData(x, y);
        if (collision.length === 0) {
            return false;
        }
        return collision.includes('collision_all') ||
            (collision.includes('collision_up') && d === 8) ||
            (collision.includes('collision_right') && d === 6) ||
            (collision.includes('collision_left') && d === 4) ||
            (collision.includes('collision_down') && d === 2);
    };

    Game_Map.prototype.isThroughByRegion = function(x, y) {
        return this.findDataRegionAndTerrain(x, y, 'through');
    };

    const _Game_Map_checkLayeredTilesFlags = Game_Map.prototype.checkLayeredTilesFlags;
    Game_Map.prototype.checkLayeredTilesFlags = function(x, y, bit) {
        const result = _Game_Map_checkLayeredTilesFlags.apply(this, arguments);
        if (result) {
            return true;
        }
        const attribute = this.findArrayDataRegionAndTerrain(x, y, 'tileAttribute');
        switch (bit) {
            case 0x20:
                return attribute.includes('ladder');
            case 0x40:
                return attribute.includes('bush');
            case 0x80:
                return attribute.includes('counter');
            case 0x100:
                return attribute.includes('damage_floor');
        }
        return false;
    };

    Game_Map.prototype.findArrayDataRegionAndTerrain = function(x, y, prop) {
        const region = this.findCurrentRegion(x, y);
        const regionValue = region ? region[prop] : [];
        const terrain = this.findCurrentTerrainTag(x, y);
        const terrainValue = terrain ? terrain[prop] : [];
        return regionValue.concat(terrainValue);
    };

    Game_Map.prototype.findDataRegionAndTerrain = function(x, y, prop) {
        const region = this.findCurrentRegion(x, y);
        if (region && region[prop]) {
            return region[prop];
        }
        const terrain = this.findCurrentTerrainTag(x, y);
        if (terrain && terrain[prop]) {
            return terrain[prop]
        }
        return null;
    };

    Game_Map.prototype.findCurrentRegion = function(x, y) {
        return $dataSystem.regions[this.regionId(x, y)];
    };

    Game_Map.prototype.findCurrentTerrainTag = function(x, y) {
        return $dataSystem.terrainTags[this.terrainTag(x, y)];
    };
})();
