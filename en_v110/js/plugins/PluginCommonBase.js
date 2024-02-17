//=============================================================================
// RPG Maker MZ - Plugin Analysis Common Base
//=============================================================================
// Version
// 1.0.2 2021/05/15 プラグインコマンドにもsuffixで型変換しない仕様を適用
// 1.0.1 2021/04/15 プラグイン名称取得で全角文字を考慮
//                  配列の要素のパラメータの制御文字が正常に取得できない問題を修正
// 1.0.0 2020/08/20 初版
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Plugin Analysis Common Base
 * @author triacontane
 *
 * @help PluginCommonBase.js
 *
 * This plugin is a base plugin that is meant to be referenced from other plugins.
 * This plugin allows you to use the following control characters in a variety of situations.
 *
 * Usable Control Characters
 * \v[n]  : nis converted to the value of the nth variable.
 * \s[n]  : nis converted to the value (true, false) of the nth switch.
 * \ss[n] : nis converted to the value (true, false) of the nth self switch.
 * n -> A, B, C, D
 *
 * The situations where control characters can be used are as follows.
 * -Text display
 * -Notes field (*)
 * -Plugin command (*)
 * -Plugin parameter (*)
 * -Explanation fields for skills, etc.
 * *Only for plugins that take PluginCommonBase.js as a base.
 *
 * Below is an explanation for developers.
 *
 * Introducing this plugin as a base allows conversion of parameter types and control characters,
 * when analyzing parameters or fetching plugin commands/note fields, to be automated.
 * Standardizing control character allows conversion processing, and consistent
 * control character conversion specs to be implemented in all subordinate plugins.
 *
 * -Plugin Parameter Type Analysis
 * Automatically analyzes type and converts plugin parameters.
 * Also automatically converts control characters when the parameter is fetched.
 * Calls the following methods to fetch return values.
 *  Always specifies "document.currentScript" in the argument.
 *
 * PluginManagerEx.createParameter(document.currentScript);
 *
 * However, if the end of the parameter name (regardless of case)
 * is one of the following values, the value will be returned as-is without control character or type conversion.
 * text
 * name
 * note
 * desc
 * script
 *
 * -Plugin Command Parameter Type Analysis
 * Automatically analyzes type and converts plugin command parameters.
 * Also automatically converts control characters when the parameter is fetched.
 * Uses the following in place of PluginManager.registerCommand.
 * Always specifies "document.currentScript" in the argument.
 *
 * PluginManagerEx.registerCommand(document.currentScript, "command", args => {
 * });
 *
 * -Notes Field Analysis
 * Retrieves notes field information from specified objects.
 * Automatically converts control characters.
 * Multiple names can be specified.
 *
 * PluginManagerEx.findMetaValue(obj, tagName1, tagName2...);
 *
 * -Dynamic Common Event Execution
 * Executions dynamic common events.
 * Dynamic common events are stacked parallel processed common events.
 * Use to execute as many common events with the same ID in parallel as you want.
 * It can register as many common events as you want and automatically discards those that have been executed.
 *
 * $gameMap.setupDynamicCommon(commonEventId);
 *
 */

/*:ja
* @target MZ
* @plugindesc パラメータ解析を提供する共通基盤です
* @author トリアコンタン
* @url \dlc\BasicResources\plugins\official
*
* @help PluginCommonBase.js
*
* 本プラグインは他のプラグインから参照されることを前提としたベースプラグインです。
* 本プラグインを導入すると様々な場面で以下の制御文字が使えるようになります。
*
* 利用可能な制御文字
* \v[n]  : n番目の変数の値に変換されます。
* \s[n]  : n番目のスイッチの値(true, false)に変換されます。
* \ss[n] : セルフスイッチの値(true, false)に変換されます。
* n -> A, B, C, D
*
* 制御文字を利用可能な場面は以下の通りです。
* ・文章の表示
* ・メモ欄(※)
* ・プラグインコマンド(※)
* ・プラグインパラメータ(※)
* ・スキルなどの説明欄
* ※ PluginCommonBase.jsをベースとして取り込んだプラグインのみ
*
* 以下は開発者向けの解説です。
*
* このプラグインをベースとして取り込むことで、パラメータの解析や
* プラグインコマンド、メモ欄の取得時にパラメータ型および制御文字の変換を自動化します。
* 制御文字の変換処理を共通化することで配下の全てのプラグインで一貫した
* 制御文字の変換仕様を実現します。
*
* ・プラグインパラメータの型解析
* プラグインパラメータを自動で型解析し変換します。
* また、パラメータ取得時に制御文字の変換を自動で行います。
* 以下のメソッドを呼んで戻り値を取得します。
* 引数には必ず「document.currentScript」を指定します。
*
* PluginManagerEx.createParameter(document.currentScript);
*
* ただし、パラメータ名の末尾が(大文字小文字問わず)以下の値の場合
* 制御文字や型の変換は行われず、そのままの値を返します。
* text
* name
* note
* desc
* script
*
* ・プラグインコマンドパラメータの型解析
* プラグインコマンドパラメータを自動で型解析し変換します。
* また、パラメータ取得時に制御文字の変換を自動で行います。
* PluginManager.registerCommandの代わりに以下を使用します。
* 引数には必ず「document.currentScript」を指定します。
*
* PluginManagerEx.registerCommand(document.currentScript, "command", args => {
* });
*
* ・メモ欄の解析
* 指定したオブジェクトからメモ欄情報を取得します。
* 制御文字の変換を自動で行います。
* 名称は複数指定することも可能です。
*
* PluginManagerEx.findMetaValue(obj, tagName1, tagName2...);
*
* ・動的コモンイベントの実行
* 動的コモンイベントを実行できます。
* 動的コモンイベントとは、スタック型の並列処理コモンイベントです。
* 同一IDのコモンイベントも好きなだけ並列実行できます。
* 実行が終わったものから自働で破棄されます。
*
* $gameMap.setupDynamicCommon(commonEventId);
*/

(() => {
    'use strict';

    /**
     * PluginParam
     */
    class PluginParam {

        constructor(parameter, needParse = true) {
            if (needParse) {
                parameter = JSON.parse(JSON.stringify(parameter, this._paramReplacer));
            }
            this.setup(parameter);
        }

        setup(parameter) {
            this._parameter = parameter;
            for(let paramName in parameter) {
                if (!parameter.hasOwnProperty(paramName)) {
                    continue;
                }
                const subParam = parameter[paramName];
                if (this._isStructArray(subParam)) {
                    subParam.forEach((subParamItem, index) => {
                        subParam[index] = new PluginParam(subParamItem, false);
                    });
                } else if (this._isStruct(subParam)) {
                    parameter[paramName] = new PluginParam(subParam, false);
                }
                this._createAccessor(paramName);
            }
        }

        _createAccessor(paramName) {
            Object.defineProperty(this, paramName, {
                get() {
                    return this._convert(this._param(paramName), paramName);
                },
                set(value) {
                    this._parameter[paramName] = value;
                },
                configurable: true
            });
        }

        _convert(param, paramName) {
            if (this._isStruct(param) || this._isStructArray(param)) {
                return param;
            } else if (Array.isArray(param)) {
                return param.map(paramItem => this._convert(paramItem, paramName));
            }
            if (!PluginManagerEx.findTextParamSuffixList().some(regExp => paramName.match(regExp))) {
                return PluginManagerEx.convertVariables(param);
            } else {
                return String(param);
            }
        }

        _isStructArray(param) {
            return Array.isArray(param) && (param.length === 0 || this._isStruct(param[0]));
        }

        _isStruct(param) {
            return Object.prototype.toString.call(param) === '[object Object]';
        }

        _param(name) {
            return this._parameter[name];
        }

        _paramReplacer(key, value) {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
    }

    /**
     * PluginManagerEx
     */
    class PluginManagerEx {

        static convertVariables(text, data = null) {
            if (text !== String(text)) {
                return text;
            }
            text = this.convertEscapeCharacters(text, data);
            if (text === 'true') {
                return true;
            } else if (text === 'false') {
                return false;
            } else if (Number(text) === parseFloat(text)) {
                return parseFloat(text);
            } else {
                return text;
            }
        }

        static convertEscapeCharacters(text, data = null) {
            text = TextConverter.convertEscapeCharactersBase(text, data);
            text = this.convertEscapeCharactersEx(text, data);
            text = TextConverter.convertEscapeCharactersBase(text, data);
            return text;
        }

        // Additional Escape Characters
        static convertEscapeCharactersEx(text, data = null) {
            text = text.replace(/\x1bS\[(.+)]/gi, (_, p1) => {
                return $gameSwitches ? $gameSwitches.value(parseInt(p1)) : '';
            });
            const key = this._selfSwitchKey;
            if (!key) {
                return text;
            }
            text = text.replace(/\x1bSS\[(.+)]/gi, (_, p1) => {
                key[2] = p1;
                return $gameSelfSwitches ? $gameSelfSwitches.value(key) : '';
            });
            return text;
        }

        static createParameter(currentScript) {
            const paramText = PluginManager.parameters(this.findPluginName(currentScript));
            return new PluginParam(paramText);
        }

        static createCommandArgs(args) {
            const hasObject = Object.keys(args).some(key => {
                return args[key].match(/^[\[{].*[}\]]$/);
            });
            if (hasObject) {
                return new PluginParam(args);
            }
            const newArgs = {};
            Object.keys(args).forEach(key => {
                if (!this.findTextParamSuffixList().some(regExp => key.match(regExp))) {
                    newArgs[key] = this.convertVariables(args[key]);
                } else {
                    newArgs[key] = args[key];
                }
            });
            return newArgs;
        }

        static findMetaValue(object, nameList) {
            if (!Array.isArray(nameList)) {
                nameList = [nameList];
            }
            const meta = this.findMetaProperty(object);
            this.generateSelfSwitchKey(object.id);
            for (const name of nameList) {
                if (meta.hasOwnProperty(name)) {
                    return this.convertVariables(meta[name], object);
                }
            }
        }

        static findMetaObject(object, nameList) {
            if (!Array.isArray(nameList)) {
                nameList = [nameList];
            }
            const meta = this.findMetaProperty(object);
            this.generateSelfSwitchKey(object.id);
            for (const name of nameList) {
                if (meta.hasOwnProperty(name)) {
                    return new PluginParam(meta[name]);
                }
            }
        }

        static findMetaProperty(object) {
            const meta = object.meta;
            if (!meta) {
                throw new Error(`Meta property not found : ${object}`)
            }
            return meta;
        }

        static findPluginName(currentScript) {
            return currentScript.src.replace(/^.*\/(.*).js$/, function() {
                return decodeURIComponent(arguments[1]);
            });
        }

        static registerCommand(currentScript, commandName, funcName) {
            const pluginName = this.findPluginName(currentScript);
            const key = pluginName + ":" + commandName;
            const func = typeof funcName === 'function' ? funcName : Game_Interpreter.prototype[funcName];
            if (!func) {
                throw new Error(`Not found function Game_Interpreter : ${funcName}`)
            }
            PluginManager.registerCommand(pluginName, commandName, function(args) {
                func.call(this, PluginManagerEx.createCommandArgs(args, key));
            });
        }

        static isExistPlugin(pluginName) {
            return Object.keys(PluginManager.parameters(pluginName)).length > 0;
        }

        static generateSelfSwitchKey(eventId) {
            if (!$gameMap) {
                return;
            }
            this._selfSwitchKey = [$gameMap.mapId(), eventId, null];
        }

        static findClassName(object) {
            const define = object.constructor.toString();
            if (define.match(/^class/)) {
                return define.replace(/class\s+(.*?)\s+[\s\S]*/m, '$1');
            }
            return define.replace(/function\s+(.*)\s*\([\s\S]*/m, '$1');
        }

        static throwError(message, currentScript) {
            const pluginName = this.findPluginName(currentScript);
            throw new Error(`By ${pluginName} : ${message}`);
        }

        static escapeXmlTag(text) {
            text = text.replace(/&gt;?/gi, '>');
            return text.replace(/&lt;?/gi, '<');
        }

        static findTextParamSuffixList() {
            return [/text$/gi, /name$/gi, /desc$/gi, /note$/gi, /script$/gi];
        }
    }
    window.PluginManagerEx = PluginManagerEx;

    class TextConverter {
        // Copy of Window_Base.prototype.convertEscapeCharacters
        static convertEscapeCharactersBase(text, data = null) {
            text = text.replace(/\\/g, "\x1b");
            text = text.replace(/\x1b\x1b/g, "\\");
            text = text.replace(/\x1bV\[(\d+)]/gi, (_, p1) =>
                $gameVariables ? $gameVariables.value(parseInt(p1)) : ''
            );
            text = text.replace(/\x1bV\[(\d+)]/gi, (_, p1) =>
                $gameVariables ? $gameVariables.value(parseInt(p1)) : ''
            );
            text = text.replace(/\x1bN\[(\d+)]/gi, (_, p1) =>
                this.actorName(parseInt(p1))
            );
            text = text.replace(/\x1bP\[(\d+)]/gi, (_, p1) =>
                this.partyMemberName(parseInt(p1))
            );
            if ($dataSystem) {
                text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
            }
            return text;
        }

        static actorName(n) {
            const actor = n >= 1 && $gameActors ? $gameActors.actor(n) : null;
            return actor ? actor.name() : '';
        }

        static partyMemberName(n) {
            const actor = n >= 1 && $gameParty ? $gameParty.members()[n - 1] : null;
            return actor ? actor.name() : "";
        }
    }

    const _PluginManager_callCommand = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, commandName, args) {
        PluginManagerEx.generateSelfSwitchKey(self.eventId());
        _PluginManager_callCommand.apply(this, arguments);
    };

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.apply(this, arguments);
        return PluginManagerEx.convertEscapeCharacters(text);
    };

    const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        _Game_System_onAfterLoad.apply(this, arguments);
        $gameMap.initDynamicEvents();
    };

    /**
     * Game_Map
     * Support dynamic events.
     */
    const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.apply(this, arguments);
        this.initDynamicEvents();
    };

    Game_Map.prototype.initDynamicEvents = function() {
        if (!this._dynamicEvents) {
            this._dynamicEvents = [];
        }
    };

    Game_Map.prototype.isInterpreterOf = function(interpreter) {
        return this._interpreter === interpreter;
    };

    Game_Map.prototype.setupDynamicCommon = function(id) {
        const event = $dataCommonEvents[id];
        if (event) {
            this.setupDynamicInterpreter(event.list);
        }
    };

    Game_Map.prototype.setupDynamicInterpreter = function(list) {
        const interpreter = new Game_Interpreter();
        interpreter.setup(list, 0);
        this._dynamicEvents.push(interpreter);
        this._dynamicEvents = this._dynamicEvents.filter(
            interpreter => interpreter.isRunning());
    };

    const _Game_Map_updateEvents = Game_Map.prototype.updateEvents;
    Game_Map.prototype.updateEvents = function() {
        _Game_Map_updateEvents.apply(this, arguments);
        this._dynamicEvents.forEach(interpreter => interpreter.update());
    };

    /**
     * Game_Event
     */
    Game_Event.prototype.findMeta = function(metaNames) {
        return PluginManagerEx.findMetaValue(this.event(), metaNames)
    };

    /**
     * Game_Interpreter
     */
    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.apply(this, arguments);
        if (eventId) {
            PluginManagerEx.generateSelfSwitchKey(eventId);
        }
    };
})();
