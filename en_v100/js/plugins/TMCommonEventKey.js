//=============================================================================
// TMPlugin - コモンイベントキー
// バージョン: 1.0.2
// 最終更新日: 2017/06/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/TMCommonEventKey.js
 * @author tomoaky (https://twitter.com/tomoaky/)
 * @plugindesc 任意のキーにコモンイベントを設定し、マップシーンでショートカットキーとして利用できるようにします。
 *
 * @param freeMove
 * @text 移動中有効化キー
 * @type boolean
 * @on 有効化
 * @off 無効化
 * @desc プレイヤーが移動中でもキーが有効になります。
 * 初期値: OFF ( false = OFF 無効 / true = ON 有効 )
 * @default false
 *
 * @param commonKey0
 * @text コモン0キー
 * @type common_event
 * @desc 0キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey1
 * @text コモン1キー
 * @type common_event
 * @desc 1キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey2
 * @text コモン2キー
 * @type common_event
 * @desc 2キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey3
 * @text コモン3キー
 * @type common_event
 * @desc 3キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey4
 * @text コモン4キー
 * @type common_event
 * @desc 4キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey5
 * @text コモン5キー
 * @type common_event
 * @desc 5キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey6
 * @text コモン6キー
 * @type common_event
 * @desc 6キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey7
 * @text コモン7キー
 * @type common_event
 * @desc 7キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey8
 * @text コモン8キー
 * @type common_event
 * @desc 8キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKey9
 * @text コモン9キー
 * @type common_event
 * @desc 9キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyA
 * @text コモンAキー
 * @type common_event
 * @desc Aキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyB
 * @text コモンBキー
 * @type common_event
 * @desc Bキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyC
 * @text コモンCキー
 * @type common_event
 * @desc Cキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyD
 * @text コモンDキー
 * @type common_event
 * @desc Dキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyE
 * @text コモンEキー
 * @type common_event
 * @desc Eキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF
 * @text コモンFキー
 * @type common_event
 * @desc Fキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyG
 * @text コモンGキー
 * @type common_event
 * @desc Gキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyH
 * @text コモンHキー
 * @type common_event
 * @desc Hキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyI
 * @text コモンIキー
 * @type common_event
 * @desc Iキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyJ
 * @text コモンJキー
 * @type common_event
 * @desc Jキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyK
 * @text コモンKキー
 * @type common_event
 * @desc Kキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyL
 * @text コモンLキー
 * @type common_event
 * @desc Lキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyM
 * @text コモンMキー
 * @type common_event
 * @desc Mキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyN
 * @text コモンNキー
 * @type common_event
 * @desc Nキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyO
 * @text コモンOキー
 * @type common_event
 * @desc Oキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyP
 * @text コモンPキー
 * @type common_event
 * @desc Pキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyQ
 * @text コモンQキー
 * @type common_event
 * @desc Qキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyR
 * @text コモンRキー
 * @type common_event
 * @desc Rキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyS
 * @text コモンSキー
 * @type common_event
 * @desc Sキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyT
 * @text コモンTキー
 * @type common_event
 * @desc Tキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyU
 * @text コモンUキー
 * @type common_event
 * @desc Uキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyV
 * @text コモンVキー
 * @type common_event
 * @desc Vキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyW
 * @text コモンWキー
 * @type common_event
 * @desc Wキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyX
 * @text コモンXキー
 * @type common_event
 * @desc Xキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyY
 * @text コモンYキー
 * @type common_event
 * @desc Yキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyZ
 * @text コモンZキー
 * @type common_event
 * @desc Zキーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF1
 * @text コモンF1キー
 * @type common_event
 * @desc F1キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF2
 * @text コモンF2キー
 * @type common_event
 * @desc F2キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF3
 * @text コモンF3キー
 * @type common_event
 * @desc F3キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF4
 * @text コモンF4キー
 * @type common_event
 * @desc F4キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF5
 * @text コモンF5キー
 * @type common_event
 * @desc F5キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF6
 * @text コモンF6キー
 * @type common_event
 * @desc F6キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF7
 * @text コモンF7キー
 * @type common_event
 * @desc F7キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF8
 * @text コモンF8キー
 * @type common_event
 * @desc F8キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF9
 * @text コモンF9キー
 * @type common_event
 * @desc F9キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF10
 * @text コモンF10キー
 * @type common_event
 * @desc F10キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF11
 * @text コモンF11キー
 * @type common_event
 * @desc F11キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @param commonKeyF12
 * @text コモンF12キー
 * @type common_event
 * @desc F12キーで起動するコモンイベント
 * 初期値: 0( 1 以上で有効)
 * @default 0
 * 
 * @help
 * TMPlugin - コモンイベントキー ver1.0.2
 * 
 * 使い方:
 *
 *   プラグインパラメータに起動したいコモンイベントの番号を設定してください、
 *   マップシーンで対応するキーを押せばコモンイベントが実行されます。
 * 
 *   下記の状況ではコモンイベントキーが無効化されます。
 *   ・シーン切り替え中
 *   ・プレイヤー移動中
 *   ・イベント実行中
 *
 *
 * 注意:
 * 
 *   RPGツクールの標準機能、または他のプラグインで使用しているキーを使うと
 *   競合によるエラーの原因になります。
 * 
 *   数字キーはテンキーではなく、アルファベットの上部にあるキーです。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var Imported = Imported || {};
Imported.TMCommonEventKey = true;

(function () {

  var parameters = PluginManager.parameters('TMCommonEventKey');
  var commonKeyCodes = {
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E',
    70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J',
    75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O',
    80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T',
    85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y',
    90: 'Z',
    112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4',
    116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8',
    120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12'
  };
  var commonKeys = {};
  var keys = Object.keys(commonKeyCodes);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var name = 'commonKey' + commonKeyCodes[key];
    var commonEventId = +parameters[name];
    if (commonEventId > 0) {
      Input.keyMapper[key] = name;
      commonKeys[name] = commonEventId;
    }
  }
  var freeMove = JSON.parse(parameters['freeMove']);

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function () {
    _Scene_Map_updateScene.call(this);
    if (!SceneManager.isSceneChanging() && !$gameMap.isEventRunning() &&
      (!$gamePlayer.isMoving() || freeMove)) {
      Object.keys(commonKeys).some(function (key) {
        if (Input.isTriggered(key)) {
          $gameTemp.reserveCommonEvent(commonKeys[key]);
          return true;
        }
      });
    }
  };

})();
