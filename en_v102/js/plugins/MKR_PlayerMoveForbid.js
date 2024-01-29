//==============================================================================
// MKR_PlayerMoveForbid.js
//==============================================================================
// Copyright (c) 2016-2017 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// Version
// 1.0.5 2017/12/10 移動禁止の間、決定キーを動作させるかのフラグを追加
//
// 1.0.4 2017/08/27 プラグインパラメータの指定方法を変更
//
// 1.0.3 2017/05/24 メニュー開閉フラグが正常に動作していなかったため修正
//
// 1.0.2 2017/02/19 移動禁止の間、メニュー開閉を行えるかのフラグを追加
//
// 1.0.1 2016/09/04 未使用のコードを削除しファイル容量を小さくした。
//                  デフォルト値の設定が不適切だったので修正。
//
// 1.0.0 2016/09/04 初版公開。
// -----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//==============================================================================

/*:
 *
 * @plugindesc (v1.0.5) プレイヤー移動禁止プラグイン
 * @author マンカインド
 *
 * @help 指定された番号のスイッチがONの間、
 * プレイヤー操作によるキャラの移動を禁止します。
 *
 * プラグインパラメーター[移動禁止スイッチ]にスイッチ番号を指定します。
 * 指定された番号のスイッチがONになっている間、
 * プレイヤー操作によるキャラの移動ができなくなります。
 * ([移動ルートの設定]コマンドなどで移動させることは可能です)
 *
 * [メニュー開閉制御]により、[移動禁止スイッチ]がONになっている間の
 * メニュー開閉を制御できます。
 *
 * [決定キー制御]により、[移動禁止スイッチ]がONになっている間の
 * 決定キー/タッチ操作による動作(主にイベントの起動)を制御できます。
 *
 *
 * プラグインコマンド:
 *   ありません。
 *
 *
 * スクリプトコマンド:
 *   ありません。
 *
 *
 * 利用規約:
 *   ・作者に無断で本プラグインの改変、再配布が可能です。
 *     (ただしヘッダーの著作権表示部分は残してください。)
 *
 *   ・利用形態(フリーゲーム、商用ゲーム、R-18作品等)に制限はありません。
 *     ご自由にお使いください。
 *
 *   ・本プラグインを使用したことにより発生した問題について作者は一切の責任を
 *     負いません。
 *
 *   ・要望などがある場合、本プラグインのバージョンアップを行う
 *     可能性がありますが、
 *     バージョンアップにより本プラグインの仕様が変更される可能性があります。
 *     ご了承ください。
 *
 *
 * @param Default_Move_Flag
 * @text 移動禁止スイッチ
 * @desc ONの間、プレイヤーの移動を禁止するスイッチ番号を指定します。(デフォルト:10)
 * @type switch
 * @default 10
 *
 * @param Default_Menu_Flag
 * @text メニュー開閉制御
 * @desc プレイヤーの移動を禁止している間、メニューの開閉を許可するかどうかを設定します。(デフォルト:許可する)
 * @type boolean
 * @on 許可する
 * @off 許可しない
 * @default true
 *
 * @param Enter Flag
 * @text 決定キー制御
 * @desc プレイヤーの移動を禁止している間、決定キー/タッチ操作による動作を許可するかどうかを設定します。(デフォルト:許可する)
 * @type boolean
 * @on 許可する
 * @off 許可しない
 * @default true
 *
*/
(function () {
    'use strict';

    const PN = "MKR_PlayerMoveForbid";

    const CheckParam = function(type, param, def, min, max) {
        let Parameters, regExp, value;
        Parameters = PluginManager.parameters(PN);

        if(arguments.length < 4) {
            min = -Infinity;
            max = Infinity;
        }
        if(arguments.length < 5) {
            max = Infinity;
        }
        if(param in Parameters) {
            value = String(Parameters[param]);
        } else {
            throw new Error("[CheckParam] プラグインパラメーターがありません: " + param);
        }

        switch(type) {
            case "bool":
                if(value == "") {
                    value = (def)? true : false;
                }
                value = value.toUpperCase() === "ON" || value.toUpperCase() === "TRUE" || value.toUpperCase() === "1";
                break;
            case "switch":
                if(value == "") {
                    value = (def != "")? def : value;
                }
                if(!value.match(/^(\d+)$/i)) {
                    throw new Error("[CheckParam] " + param + "の値がスイッチではありません: " + param + " : " + value);
                }
                break;
            default:
                throw new Error("[CheckParam] " + param + "のタイプが不正です: " + type);
                break;
        }

        return [value, type, def, min, max, param];
    }

    const Params = {
        "MoveSwitch" : CheckParam("switch", "Default_Move_Flag", "10"),
        "MenuFlg" : CheckParam("bool", "Default_Menu_Flag", true),
        "EnterFlg" : CheckParam("bool", "Enter Flag", true),
    };


    //=========================================================================
    // Game_System
    //  ・メニュー開閉許可処理を再定義します。
    //
    //=========================================================================
    const _Game_System_isMenuEnabled = Game_System.prototype.isMenuEnabled;
    Game_System.prototype.isMenuEnabled = function() {
        return _Game_System_isMenuEnabled.call(this)
            && ($gameSwitches.value(Params.MoveSwitch[0]) ? Params.MenuFlg[0] == true : true);
    };


    //=========================================================================
    // Game_Player
    //  ・プレイヤーの移動処理を再定義します。
    //
    //=========================================================================
    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        if(!$gameSwitches.value(Params.MoveSwitch[0])) {
            _Game_Player_executeMove.call(this, direction);
        }
    };

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerButtonAction.call(this);
        }
        return false;
    };

    const _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerTouchAction.call(this);
        }
        return false;
    };

})();