//=============================================================================
// MPP_DuplicateName.js
//=============================================================================
// Copyright (c) 2018 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc You can set duplicate names or names that cannot be used in [Name Input Processing].
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 3.0.0]
 * his plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command details
 *  〇 MV / MZ
 *  
 *  〇 ChangeDuplicateAccess boolean  / changeDuplicateAccess
 *       boolean : true or false
 *   - Enables / disables the function of this plug-in.
 *   - Duplicate names, unusable names, and unusable words are all invalid.
 *   - This function is designed for password entry.
 *   - The initial value is valid.
 *   - This setting is not included in the save data.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command changeDuplicateAccess
 *      @desc 
 *      @arg boolean
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 *  @param Duplicate Type
 *      @desc 
 *      @type select
 *          @option none
 *          @option created actors
 *          @option all actors
 *      @default all actors
 *
 *  @param Duplicate Message
 *      @desc 
 *      @default The name is already in use.
 *      @parent Duplicate Type
 *
 *  @param Error Names
 *      @desc 
 *      @type string[]
 *      @default []
 *
 *  @param Error Message
 *      @desc 
 *      @default The name cannot be used.
 *      @parent Error Names
 *
 *  @param Prohibited Words
 *      @desc 
 *      @type string[]
 *      @default []
 * 
 *  @param Prohibited Message
 *      @desc 
 *      @default Contains words that cannot be used.
 *      @parent Prohibited Words
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc [名前入力の処理]にて名前の重複や使用できない名前を設定できます。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 3.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド詳細
 *  〇 MV / MZ
 *  
 *  〇 ChangeDuplicateAccess boolean  / 重複禁止の変更
 *       boolean : true(有効) or false(無効)
 *   - 本プラグインの機能の有効/無効を変更します。
 *   - 名前の重複、使用できない名前、使用できないワードの全てが無効となります。
 *   - パスワードの入力等を想定した機能です。
 *   - 初期値は有効です。
 *   - この設定はセーブデータに含まれません。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command changeDuplicateAccess
 *      @text 重複禁止の変更
 *      @desc 
 *      @arg boolean
 *          @text 許可/禁止
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 *  @param Duplicate Type
 *      @text 重複対象
 *      @desc 
 *      @type select
 *          @option 禁止しない
 *          @value none
 *          @option 作成済みのアクター
 *          @value created actors
 *          @option 全アクター
 *          @value all actors
 *      @default all actors
 *
 *  @param Duplicate Message
 *      @text メッセージ[重複する名前]
 *      @desc 
 *      @default その名前は既に使われています。
 *      @parent Duplicate Type
 *
 *  @param Error Names
 *      @text 使用できない名前
 *      @desc 
 *      @type string[]
 *      @default []
 *
 *  @param Error Message
 *      @text メッセージ[使用できない名前]
 *      @desc 
 *      @default その名前は使用できません。
 *      @parent Error Names
 *
 *  @param Prohibited Words
 *      @text 禁止ワード
 *      @desc 
 *      @type string[]
 *      @default []
 * 
 *  @param Prohibited Message
 *      @text メッセージ[禁止ワード]
 *      @desc 
 *      @default 使用できないワードが含まれています。
 *      @parent Prohibited Words
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_DuplicateName';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_DuplicateType = Number(parameters['Duplicate Type'] || 0);
    const param_DuplicateMessage = parameters['Duplicate Message'] || '';
    const param_errorNames = JSON.parse(parameters['Error Names'] || '[]');
    const param_errorMessage = parameters['Error Message'] || '';
    const param_prohibitedWords = JSON.parse(parameters['Prohibited Words'] || '[]');
    const param_prohibitedMessage = parameters['Prohibited Message'] || '';
    
    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };

    //-------------------------------------------------------------------------
    // Game_Temp

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._duplicateEnabled = true;
    };

    Game_Temp.prototype.isDuplicateEnabled = function() {
        return this._duplicateEnabled;
    };

    Game_Temp.prototype.disableDuplicate = function() {
        this._duplicateEnabled = false;
    };

    Game_Temp.prototype.enableDuplicate = function() {
        this._duplicateEnabled = true;
    };

    //-------------------------------------------------------------------------
    // Game_Actors

    Game_Actors.prototype.containsName = function(actorId, name) {
        if (param_DuplicateType !== 'none') {
            const isAllActors = param_DuplicateType === 'all actors';
            return $dataActors.some((actor, i) => {
                if (actor && i !== actorId) {
                    const gameActor = this._data[i];
                    if (gameActor) {
                        return gameActor.name() === name;
                    } else if (isAllActors) {
                        return actor.name === name;
                    }
                }
                return false;
            });
        }
        return false;
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        ChangeDuplicateAccess: { name:'changeDuplicateAccess', keys:['boolean'] }
    };
    Object.assign(_mzCommands, {
        '重複禁止の変更': _mzCommands.ChangeDuplicateAccess
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

    PluginManager.registerCommand(pluginName, 'changeDuplicateAccess', args => {
        if (args.boolean === 'true') {
            $gameTemp.enableDuplicate();
        } else {
            $gameTemp.disableDuplicate();
        }
    });

    //-------------------------------------------------------------------------
    // Window_NameInput

    const _Window_NameInput_onNameOk = Window_NameInput.prototype.onNameOk;
    Window_NameInput.prototype.onNameOk = function() {
        const newName = this._editWindow.name();
        if (newName && $gameTemp.isDuplicateEnabled()) {
            const actorId = this._editWindow._actor.actorId();
            const handlerName = this.getMessageHandlerName(actorId, newName);
            if (handlerName) {
                SoundManager.playBuzzer();
                this.callHandler(handlerName);
                return;
            }
        }
        _Window_NameInput_onNameOk.apply(this, arguments);
    };

    Window_NameInput.prototype.getMessageHandlerName = function(actorId, newName) {
        if ($gameActors.containsName(actorId, newName)) {
            return 'message1';
        } else if (this.isErrorName(newName)) {
            return 'message2';
        } else if (this.includesProhibitedWord(newName)) {
            return 'message3';
        }
        return null;
    };

    Window_NameInput.prototype.isErrorName = function(name) {
        return param_errorNames.includes(name);
    };

    Window_NameInput.prototype.includesProhibitedWord = function(name) {
        return param_prohibitedWords.some(word => name.includes(word));
    };

    //-------------------------------------------------------------------------
    // Scene_Name

    const _Scene_Name_create = Scene_Name.prototype.create;
    Scene_Name.prototype.create = function() {
        _Scene_Name_create.apply(this, arguments);
        this.createRejectWindow();
        this._rejectCount = 0;
    };

    const _Scene_Name_createInputWindow = Scene_Name.prototype.createInputWindow;
    Scene_Name.prototype.createInputWindow = function() {
        _Scene_Name_createInputWindow.apply(this, arguments);
        this._inputWindow.setHandler('message1', this.onInputMessage.bind(this, 0));
        this._inputWindow.setHandler('message2', this.onInputMessage.bind(this, 1));
        this._inputWindow.setHandler('message3', this.onInputMessage.bind(this, 2));
    };

    Scene_Name.prototype.createRejectWindow = function() {
        if (Utils.RPGMAKER_NAME === 'MV') {
            this._rejectWindow = new Window_Base(0, 0, 0, 0);
        } else {
            this._rejectWindow = new Window_Base(new Rectangle());
        }
        this._rejectWindow.openness = 0;
        this.addWindow(this._rejectWindow);
    };

    const _Scene_Name_update = __base(Scene_Name.prototype, 'update');
    Scene_Name.prototype.update = function() {
        _Scene_Name_update.apply(this, arguments);
        this.updateReject();
    };

    Scene_Name.prototype.updateReject = function() {
        if (this._rejectCount > 0) {
            this._rejectCount--;
            if (this._rejectCount === 0) {
                this._rejectWindow.close();
            }
        }
    };

    Scene_Name.prototype.onInputMessage = function(messageType) {
        const message = this.getMessage(messageType);
        if (message) {
            const window = this._rejectWindow;
            const rect = this.rejectWindowRect();
            window.move(rect.x, rect.y, rect.width, rect.height);
            window.createContents();
            window.drawText(message, 12, 0, window.contentsWidth() - 24, 'center');
            window.open();
            this._rejectCount = 100;
        }
    };

    Scene_Name.prototype.getMessage = function(messageType) {
        if (messageType === 0) return param_DuplicateMessage;
        if (messageType === 1) return param_errorMessage;
        if (messageType === 2) return param_prohibitedMessage;
        return '';
    };

    Scene_Name.prototype.rejectWindowRect = function() {
        const ww = Graphics.boxWidth;
        const wh = Window_Base.prototype.fittingHeight(1);
        const wx = 0;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };
    
})();
