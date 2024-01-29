//=============================================================================
// RPG Maker MZ - Material Base Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Material Base Plugin
 * @author triacontane
 * @base PluginCommonBase
 * @beforeThan PluginCommonBase
 *
 * @param ImageList
 * @text Image Material List
 * @desc List of registered image materials.
 * @default []
 * @type struct<Image>[]
 *
 * @param AudioList
 * @text Audio File Material List
 * @desc List of registered audio file materials.
 * @default []
 * @type struct<Audio>[]
 *
 * @command CHANGE_IMAGE
 * @text Change Image Material 
 * @desc Replaces image materials of a specified identifier with another file. The change state is saved in a save file.
 *
 * @arg Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material.
 *
 * @arg FilePath
 * @text File Path
 * @desc The file path after change. Please specify the folder and file.
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @command CHANGE_AUDIO
 * @text Change Audio File Material
 * @desc Replaces audio file materials of a specified identifier with another file. The change state is saved in a save file.
 *
 * @arg Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material.
 *
 * @arg FilePath
 * @text File Path
 * @desc The file path after change. Please specify the folder and file.
 * @default
 * @require 1
 * @dir audio/
 * @type file
 *
 * @command SHOW_PICTURE
 * @text Picture Display
 * @desc Specifies an identifier and displays a picture. Please enter the identifier directly, and not a control character.
 *
 * @arg Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material.
 *
 * @arg PictureId
 * @text Picture Number
 * @desc The picture number.
 * @default 1
 * @type number
 *
 * @arg Origin
 * @text Origin
 * @desc The origin.
 * @default 0
 * @type select
 * @option Upper left
 * @value 0
 * @option Center
 * @value 1
 *
 * @arg X
 * @text X coordinate
 * @desc The X coordinate.
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg Y
 * @text Y coordinate
 * @desc The Y coordinate.
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg ScaleX
 * @text Scale (Width)
 * @desc The scale of the X direction.
 * @default 100
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg ScaleY
 * @text Scale (Height)
 * @desc The scale of the Y direction.
 * @default 100
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg Opacity
 * @text Opacity
 * @desc The opacity.
 * @default 255
 * @type number
 * @max 255
 *
 * @arg BlendMode
 * @text Blend Mode
 * @desc The blend mode.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiplicative
 * @value 2
 * @option Screen
 * @value 3
 *
 * @command PLAY_AUDIO
 * @text Play Audio
 * @desc
 *
 * @arg Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material.
 *
 * @arg Type
 * @text  Audio Type
 * @desc The type of audio to be played.
 * @default 0
 * @type select
 * @option Bgm
 * @option Bgs
 * @option Me
 * @option Se
 *
 * @arg Volume
 * @text Volume
 * @desc The volume of the audio to be played.
 * @default 90
 * @type number
 * @min 0
 * @max 100
 *
 * @arg Pitch
 * @text Pitch
 * @desc The pitch of the audio to be played.
 * @default 100
 * @type number
 * @min 50
 * @max 150
 *
 * @arg Pan
 * @text Pan
 * @desc The pan of the audio to be played.
 * @default 0
 * @type number
 * @min -100
 * @max 100
 *
 * @help MaterialBase.js
 *
 * This is a database for registering and managing image and audio file materials used primarily in plugins.
 * Registered materials are excluded from functions that automatically delete unused materials.
 * Use the following control characters to swap in the file name of a registered material.
 *
 * \mi[aaa] //  Swaps in the file name of the image material registered with identifier [aaa].
 * \ma[bbb] //  Swaps in the file name of the audio file material registered with identifier [bbb].
 *
 * The situations where control characters can be used are as follows:
 * -Text display
 * -Event commands and conditional branch scripts
 * -Notes field (*)
 * -Plugin command (*)
 * -Plugin parameter (*)
 * -Explanation fields for skills, etc.
 * -Skill and item formulas
 * *Only for plugins that take PluginCommonBase.js as a base.
 *
 * Registered materials can be changed into other materials using plugin commands.
 *
 * Set values can be displayed or played as pictures or BGMs from plugin commands.
 * Please check the plugin command instructions for details.
 *
 * Additionally, by using a separate plugin, the "Plugin for Event Command Execution via Code",
 * this plugin can be used to do even more. 
 */

/*~struct~Image:
 *
 * @param Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material. If omitted, the file name will become the identifier.
 *
 * @param FilePath
 * @text File Path
 * @desc The file path. Please specify the folder and file.
 * @default
 * @require 1
 * @dir img/
 * @type file
 */

/*~struct~Audio:
 *
 * @param Id
 * @text Identifier
 * @desc An identifier that uniquely designates a material. If omitted, the file name will become the identifier.
 *
 * @param FilePath
 * @text File Path
 * @desc The file path. Please specify the folder and file.
 * @default
 * @require 1
 * @dir audio/
 * @type file
 */

 /*:ja
 * @target MZ
 * @plugindesc 素材をデータベースとして登録、参照できます。
 * @author トリアコンタン
 * @base PluginCommonBase
 * @beforeThan PluginCommonBase
 *
 * @param ImageList
 * @text 画像素材のリスト
 * @desc 登録する画像素材のリストです。
 * @default []
 * @type struct<Image>[]
 *
 * @param AudioList
 * @text 音声素材のリスト
 * @desc 登録する音声素材のリストです。
 * @default []
 * @type struct<Audio>[]
 *
 * @command CHANGE_IMAGE
 * @text 画像素材変更
 * @desc 指定した識別子の画像素材を別のファイルに置き換えます。変更状態はセーブファイルに保存されます。
 *
 * @arg Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。
 *
 * @arg FilePath
 * @text ファイルパス
 * @desc 変更後のファイルパスです。フォルダおよびファイルを指定してください。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 * @command CHANGE_AUDIO
 * @text 音声素材変更
 * @desc 指定した識別子の音声素材を別のファイルに置き換えます。変更状態はセーブファイルに保存されます。
 *
 * @arg Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。
 *
 * @arg FilePath
 * @text ファイルパス
 * @desc 変更後のファイルパスです。フォルダおよびファイルを指定してください。
 * @default
 * @require 1
 * @dir audio/
 * @type file
 *
 * @command SHOW_PICTURE
 * @text ピクチャ表示
 * @desc 識別子を指定してピクチャを表示します。制御文字ではなく直接、識別子を入力してください。
 *
 * @arg Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。
 *
 * @arg PictureId
 * @text ピクチャ番号
 * @desc ピクチャ番号です。
 * @default 1
 * @type number
 *
 * @arg Origin
 * @text 原点
 * @desc 原点です。
 * @default 0
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 *
 * @arg X
 * @text X座標
 * @desc X座標です。
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg Y
 * @text Y座標
 * @desc Y座標です。
 * @default 0
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg ScaleX
 * @text 拡大率(幅)
 * @desc X方向の拡大率です。
 * @default 100
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg ScaleY
 * @text 拡大率(高さ)
 * @desc Y方向の拡大率です。
 * @default 100
 * @type number
 * @min -2000
 * @max 2000
 *
 * @arg Opacity
 * @text 不透明度
 * @desc 不透明度です。
 * @default 255
 * @type number
 * @max 255
 *
 * @arg BlendMode
 * @text 合成方法
 * @desc 合成方法です。
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 *
 * @command PLAY_AUDIO
 * @text オーディオ演奏
 * @desc
 *
 * @arg Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。
 *
 * @arg Type
 * @text オーディオ種別
 * @desc 演奏するオーディオ種別です。
 * @default 0
 * @type select
 * @option Bgm
 * @option Bgs
 * @option Me
 * @option Se
 *
 * @arg Volume
 * @text 音量
 * @desc 演奏するオーディオの音量です。
 * @default 90
 * @type number
 * @min 0
 * @max 100
 *
 * @arg Pitch
 * @text ピッチ
 * @desc 演奏するオーディオのピッチです。
 * @default 100
 * @type number
 * @min 50
 * @max 150
 *
 * @arg Pan
 * @text 位相
 * @desc 演奏するオーディオの位相です。
 * @default 0
 * @type number
 * @min -100
 * @max 100
 *
 * @help MaterialBase.js
 *
 * 主にプラグインで使用する画像、音声素材を登録、管理できるデータベースです。
 * 登録した素材は、自動的に未使用素材削除機能の対象外となります。
 * 以下の制御文字を使用すると登録した素材のファイル名に置き換わります。
 *
 * \mi[aaa] // 識別子[aaa]で登録した画像素材のファイル名に置き換わります。
 * \ma[bbb] // 識別子[bbb]で登録した音声素材のファイル名に置き換わります。
 *
 * 制御文字を利用可能な場面は以下の通りです。
 * ・文章の表示
 * ・メモ欄(※)
 * ・プラグインコマンド(※)
 * ・プラグインパラメータ(※)
 * ・スキルなどの説明欄
 * ※ PluginCommonBase.jsをベースとして取り込んだプラグインのみ
 *
 * 登録した素材はプラグインコマンドにより別の素材に変更できます。
 *
 * 設定した値はプラグインコマンドから「ピクチャ」や「BGM」として表示、再生できます。
 * 詳細はプラグインコマンドの説明を確認してください。
 *
 * また、別プラグイン「イベントコマンドのコード実行プラグイン」を使えば
 * より広い用途に使用できます。
 *
 */

/*~struct~Image:ja
 *
 * @param Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。省略した場合はファイル名が識別子となります。
 *
 * @param FilePath
 * @text ファイルパス
 * @desc ファイルパスです。フォルダおよびファイルを指定してください。
 * @default
 * @require 1
 * @dir img/
 * @type file
 *
 */

/*~struct~Audio:ja
 *
 * @param Id
 * @text 識別子
 * @desc 素材を一意に特定するための識別子です。省略した場合はファイル名が識別子となります。
 *
 * @param FilePath
 * @text ファイルパス
 * @desc ファイルパスです。フォルダおよびファイルを指定してください。
 * @default
 * @require 1
 * @dir audio/
 * @type file
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param  = PluginManagerEx.createParameter(script);

    PluginManagerEx.registerCommand(script, 'CHANGE_IMAGE', args => {
        $gameSystem.setMaterialImage(args.Id, args.FilePath);
    });

    PluginManagerEx.registerCommand(script, 'CHANGE_AUDIO', args => {
        $gameSystem.setMaterialAudio(args.Id, args.FilePath);
    });

    PluginManagerEx.registerCommand(script, 'SHOW_PICTURE', args => {
        const name = $gameSystem.getMaterialImage(args.Id);
        $gameScreen.showPicture(args.PictureId, name, args.Origin, args.X, args.Y,
            args.ScaleX, args.ScaleY, args.Opacity, args.BlendMode);
    });

    PluginManagerEx.registerCommand(script, 'PLAY_AUDIO', args => {
        const name = $gameSystem.getMaterialAudio(args.Id);
        const param = {
            name: name,
            volume: args.Volume,
            pitch: args.Pitch,
            pan: args.Pan
        };
        const method = `play${args.Type}`;
        if (typeof AudioManager[method] === 'function') {
            AudioManager[method](param);
        }
    });

    const _PluginManagerEx_convertEscapeCharactersEx = PluginManagerEx.convertEscapeCharactersEx;
    PluginManagerEx.convertEscapeCharactersEx = function(text) {
        text = _PluginManagerEx_convertEscapeCharactersEx.apply(this, arguments);
        text = text.replace(/\x1bMI\[(.+)]/gi, (_, p1) =>
            $gameSystem ? $gameSystem.getMaterialImage(p1) : findMaterialParam(param.ImageList, p1)
        );
        text = text.replace(/\x1bMA\[(.+)]/gi, (_, p1) =>
            $gameSystem ? $gameSystem.getMaterialAudio(p1) : findMaterialParam(param.AudioList, p1)
        );
        return text;
    };

    Game_System.prototype.setMaterialImage = function(id, fileName) {
        if (!this._materialImage) {
            this._materialImage = {};
        }
        this._materialImage[id || fileName] = findFileName(fileName);
    };

    Game_System.prototype.getMaterialImage = function(id) {
        if (!this._materialImage) {
            this._materialImage = {};
        }
        return this._materialImage[id] || findMaterialParam(param.ImageList, id);
    };

    Game_System.prototype.setMaterialAudio = function(id, fileName) {
        if (!this._materialAudio) {
            this._materialAudio = {};
        }
        this._materialAudio[id || fileName] = findFileName(fileName);
    };

    Game_System.prototype.getMaterialAudio = function(id) {
        if (!this._materialAudio) {
            this._materialAudio = {};
        }
        return this._materialAudio[id] || findMaterialParam(param.AudioList, id);
    };

    const findMaterialParam = (list, id) => {
        const filePath = list.filter(item => {
            return (item.Id || item.FilePath) === id;
        }).map(item => item.FilePath)[0] || '';
        return findFileName(filePath);
    };

    const findFileName = filePath => {
        return filePath.replace(/^.*\/(.+)$/, (_, pl) => pl);
    };
})();
