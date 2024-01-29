/*---------------------------------------------------------------------------*
 * TorigoyaMZ_SkillCutIn.js v.1.3.2
 *---------------------------------------------------------------------------*
 * 2022/09/17 01:02 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc スキル発動前カットイン表示プラグイン (v.1.3.2)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.3.2
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_SkillCutIn.js
 * @base TorigoyaMZ_FrameTween
 * @orderAfter TorigoyaMZ_FrameTween
 * @help
 * スキル発動前カットイン表示プラグイン (v.1.3.2)
 * https://torigoya-plugin.rutan.dev
 *
 * このプラグインは「Tweenアニメーションプラグイン」が必要です。
 * Tweenアニメーションプラグインより下に入れてください。
 *
 * 指定スキルの発動前にカットインを表示する機能を追加します。
 *
 * ------------------------------------------------------------
 * ■ 基本的な使い方
 * ------------------------------------------------------------
 *
 * (1) カットイン用の共通画像を用意する
 *
 * ・カットイン用の背景画像1
 * ・カットイン用の背景画像2
 * ・カットイン用の境界線画像
 *
 * 上記3種類の画像を用意して
 * ピクチャー用のフォルダ（img/pictures）に入れる必要があります。
 * 以下のページで自由に使える画像素材を配布しています。
 *
 * https://torigoya-plugin.rutan.dev/battle/skillCutIn
 *
 * (2) カットイン用のキャラの画像を用意する
 *
 * カットインを表示したいキャラの画像を好きなだけ用意します。
 * キャラの画像もピクチャー用のフォルダ（img/pictures）に入れてください。
 *
 * (3) カットインの設定をする
 *
 * プラグイン設定から「味方のカットイン設定」を開き、
 * 設定したい分だけ項目を追加してください。
 *
 * ■ 対象設定
 *
 * 「どのキャラが」「何のスキルを使った」を設定します。
 * 例えば「ハロルド」が「スターライトⅡ」を使った、のような設定をします。
 *
 * ここで設定した条件を満たしたときにカットインが表示されます。
 *
 * ■ キャラ画像
 *
 * 表示するキャラクターの画像ファイルの選択や
 * 表示位置・サイズの調整ができます
 *
 * ■ 個別設定（省略可）
 *
 * このカットインだけ色を変えたい！みたいな場合は設定してください。
 * 不要な場合は省略して大丈夫です。
 *
 * ■ メモ欄
 *
 * メモ欄です。自由にメモをすることができます。
 * また、一部の特殊な設定を記述できます。
 *
 * -----
 *
 * これで基本的な設定は完了です。
 * 対象のキャラでスキルを使うとカットインが表示されます。
 *
 * ------------------------------------------------------------
 * ■ プロ向けの使い方
 * ------------------------------------------------------------
 *
 * 各カットイン設定の中にあるメモ欄に
 * 特殊な記載をすることで、少し複雑な使い方ができます。
 *
 * ● カットインの角度を変える
 *
 * デフォルトでは斜め下からキャラカットインが表示されますが、
 * メモ欄に以下のように書くことで角度を変えることができます。
 *
 * <角度: 45>
 *
 * 角度は0～360で指定してください。
 * 角度が0の場合は左から、90の場合は上から、
 * 180の場合は右から、270の場合は下から
 * それぞれキャラカットインが表示されます。
 *
 * ● カットインの表示条件を複雑にする
 *
 * 例えば、HPが50%以下のときだけカットインを表示したい場合は
 * メモ欄に以下のように記述します。
 *
 * <条件: a.hp <= a.mhp * 0.5>
 *
 * 条件として書かれた内容が真のときのみ、
 * 該当のカットインが表示されます。
 * ダメージ計算式と同じように a に自分自身が入ります。
 * ただし b （相手）はありません。
 *
 * ● スキルではなくアイテム使用時にカットインを出す
 *
 * まず、カットインの設定でスキルIDを「なし」にします。
 * そして、カットイン設定のメモ欄に以下のように記述してください。
 *
 * <アイテム: 7>
 *
 * こうすると、アイテムID:7のアイテムを使ったときに
 * カットインが表示されるようになります。
 *
 * ● マップでカットインを表示する
 *
 * プラグインコマンドで呼び出すことができます。
 * なお、呼び出すカットインには
 * 事前に呼び出し名を付けておく必要があります。
 * 呼び出し名は、カットイン設定のメモ欄に以下のように記述してください。
 *
 * <呼び出し名: myCutIn>
 *
 * 「myCutIn」の部分は好きな名前にしてください。
 * この名前をプラグインコマンドで指定することで、
 * マップでもカットインを表示できます。
 * 呼び出し方法の詳細は解説ページをご覧ください。
 *
 * @param base
 * @text ■ カットイン設定
 *
 * @param actorConfig
 * @text 味方のカットイン設定
 * @desc アクター用のカットイン設定です。
 * 上にあるものから優先されます。
 * @type struct<ActorCutinSet>[]
 * @parent base
 * @default []
 *
 * @param enemyConfig
 * @text 敵のカットイン設定
 * @desc 敵用のカットイン設定です。
 * 上にあるものから優先されます。
 * @type struct<EnemyCutinSet>[]
 * @parent base
 * @default []
 *
 * @param common
 * @text ■ 共通設定
 *
 * @param commonBackImage1
 * @text 背景画像1
 * @desc 背景全体に表示される画像を指定します
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_back1
 *
 * @param commonBackImage2
 * @text 背景画像2
 * @desc キャラクターの背景部分に表示される画像を指定します
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_back2
 *
 * @param commonBorderImage
 * @text 境界線画像
 * @desc カットインの境界線部分に表示される画像を指定します
 * @type file
 * @require true
 * @parent common
 * @dir img/pictures
 * @default CutIn_border
 *
 * @param commonBorderBlendMode
 * @text 境界線画像のブレンド
 * @desc 境界線画像のブレンドモードを指定します
 * ※RPGツクールMZのみ有効
 * @type select
 * @parent common
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default add
 *
 * @param commonBorderSpeed
 * @text 境界線画像の移動速度
 * @desc 境界線画像が移動する速度を指定します
 * ※RPGツクールMZのみ有効
 * @type number
 * @parent common
 * @default 30
 *
 * @param commonSound
 * @text 効果音
 * @desc カットイン表示時の効果音を設定します
 * 各カットイン内で指定がある場合は、そちらを優先します
 * @type struct<Sound>
 * @parent common
 * @default {"name":"Skill2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param cutInLayer
 * @text カットイン表示レイヤー
 * @desc カットインが表示されるレイヤーを指定します
 * 省略の場合は共通設定を使用します
 * @type select
 * @parent common
 * @option 常に最前面
 * @value foreground
 * @option ウィンドウの上
 * @value upperWindow
 * @option ウィンドウの下
 * @value lowerWindow
 * @default foreground
 *
 * @param cutInOpenAndCloseTime
 * @text カットイン表示開始/終了アニメーション時間
 * @desc カットインの表示開始/終了アニメーションの再生時間を指定します。
 * 60＝1秒です。
 * @type number
 * @parent common
 * @default 25
 *
 * @param cutInStopTime
 * @text カットイン停止時間
 * @desc カットイン表示が画面にとどまる時間を指定します。
 * 60＝1秒です。
 * @type number
 * @parent common
 * @default 10
 *
 * @param commonActor
 * @text ■ 味方用の共通設定
 *
 * @param actorBackColor1
 * @text 味方: 背景色1
 * @desc 味方のカットイン表示領域の背景色を設定します。
 * @type string
 * @parent commonActor
 * @default #000033
 *
 * @param actorBackColor2
 * @text 味方: 背景色2
 * @desc 味方のカットイン表示領域の背景色を設定します
 * 空欄の場合は背景色1と一緒になります
 * @type string
 * @parent commonActor
 * @default #6666ff
 *
 * @param actorBackTone
 * @text 味方: エフェクト色調1
 * @desc 味方の背景エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<Color>
 * @parent commonActor
 * @default {"red":"-128","green":"-128","blue":"128"}
 *
 * @param actorBorderTone
 * @text 味方: エフェクト色調2
 * @desc 味方の境界線エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<Color>
 * @parent commonActor
 * @default {"red":"0","green":"0","blue":"0"}
 *
 * @param commonEnemy
 * @text ■ 敵用の共通設定
 *
 * @param enemyBackColor1
 * @text 敵: 背景色1
 * @desc 敵のカットイン表示領域の背景色を設定します。
 * @type string
 * @parent commonEnemy
 * @default #330000
 *
 * @param enemyBackColor2
 * @text 敵: 背景色2
 * @desc 敵のカットイン表示領域の背景色を設定します
 * 空欄の場合は背景色1と一緒になります
 * @type string
 * @parent commonEnemy
 * @default #ff6666
 *
 * @param enemyBackTone
 * @text 敵: エフェクト色調1
 * @desc 敵の背景エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<Color>
 * @parent commonEnemy
 * @default {"red":"128","green":"-128","blue":"-128"}
 *
 * @param enemyBorderTone
 * @text 敵: エフェクト色調2
 * @desc 敵の境界線エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<Color>
 * @parent commonEnemy
 * @default {"red":"0","green":"0","blue":"0"}
 *
 * @command showActorCutIn
 * @text 味方カットインの表示
 * @desc 味方のカットインを表示します
 *
 * @arg name
 * @text 使用カットイン名
 * @desc カットイン設定のメモ欄で指定した呼び出し名を指定します
 * 条件判定はすべてスキップされます
 * @type string
 * @default
 *
 * @command showEnemyCutIn
 * @text 敵カットインの表示
 * @desc 敵のカットインを表示します
 *
 * @arg name
 * @text 使用カットイン名
 * @desc カットイン設定のメモ欄で指定した呼び出し名を指定します
 * 条件判定はすべてスキップされます
 * @type string
 * @default
 */

/*~struct~ActorCutinSet:
 * @param target
 * @text ■ 対象設定
 *
 * @param render
 * @text ■ キャラ画像設定
 *
 * @param picture
 * @text キャラ画像
 * @desc カットインで表示するキャラクターの画像を設定します
 * 画像はピクチャー用のフォルダに入れてください
 * @type file
 * @require true
 * @parent render
 * @dir img/pictures
 * @default
 *
 * @param pictureX
 * @text キャラ画像位置:X
 * @desc キャラ画像の表示位置（横方向）を調整します
 * マイナスだと左、プラスだと右にずらします
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureY
 * @text キャラ画像位置:Y
 * @desc キャラ画像の表示位置（縦方向）を調整します
 * マイナスだと上、プラスだと下にずらします
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureScale
 * @text キャラ画像:拡大率
 * @desc キャラ画像の拡大率を指定します
 * 1を指定した場合は1倍なのでそのまま表示されます
 * @type number
 * @parent render
 * @decimals 2
 * @min 0.01
 * @default 1
 *
 * @param advanced
 * @text ■ 個別設定（省略可）
 *
 * @param backColor1
 * @text 背景色1
 * @desc カットイン表示領域の背景色を設定します。
 * 省略した場合は共通設定が使用されます
 * @type string
 * @parent advanced
 * @default
 *
 * @param backColor2
 * @text 背景色2
 * @desc カットイン表示領域の背景色を設定します
 * 空欄の場合は背景色1と一緒になります
 * @type string
 * @parent advanced
 * @default
 *
 * @param backTone
 * @text エフェクト色調1
 * @desc 背景エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"-128","green":"-128","blue":"128"}
 *
 * @param borderTone
 * @text エフェクト色調2
 * @desc 境界線エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"0","green":"0","blue":"0"}
 *
 * @param backImage1
 * @text 背景画像1
 * @desc 背景全体に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param backImage2
 * @text 背景画像2
 * @desc キャラクターの背景部分に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderImage
 * @text 境界線画像
 * @desc カットインの境界線部分に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderBlendMode
 * @text 境界線画像のブレンド
 * @desc 境界線画像のブレンドモードを指定します
 * 省略の場合は共通設定を使用します
 * @type select
 * @parent advanced
 * @option 省略
 * @value
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default
 *
 * @param sound
 * @text 効果音
 * @desc カットイン表示時の効果音を指定します
 * 指定しない場合はデフォルトの効果音を使用します
 * @type struct<Sound>
 * @parent advanced
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param note
 * @text メモ欄
 * @desc メモ欄です。
 * ツクールのメモ欄同様に使えます。
 * @type multiline_string
 * @default
 *
 * @param actorId
 * @text アクターのID
 * @desc カットイン対象のアクターを設定します
 * @type actor
 * @parent target
 * @default 0
 *
 * @param skillId
 * @text スキルのID
 * @desc カットイン対象のスキルを設定します
 * @type skill
 * @parent target
 * @default 0
 */

/*~struct~EnemyCutinSet:
 * @param target
 * @text ■ 対象設定
 *
 * @param render
 * @text ■ キャラ画像設定
 *
 * @param picture
 * @text キャラ画像
 * @desc カットインで表示するキャラクターの画像を設定します
 * 画像はピクチャー用のフォルダに入れてください
 * @type file
 * @require true
 * @parent render
 * @dir img/pictures
 * @default
 *
 * @param pictureX
 * @text キャラ画像位置:X
 * @desc キャラ画像の表示位置（横方向）を調整します
 * マイナスだと左、プラスだと右にずらします
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureY
 * @text キャラ画像位置:Y
 * @desc キャラ画像の表示位置（縦方向）を調整します
 * マイナスだと上、プラスだと下にずらします
 * @type number
 * @parent render
 * @min -10000
 * @max 10000
 * @default 0
 *
 * @param pictureScale
 * @text キャラ画像:拡大率
 * @desc キャラ画像の拡大率を指定します
 * 1を指定した場合は1倍なのでそのまま表示されます
 * @type number
 * @parent render
 * @decimals 2
 * @min 0.01
 * @default 1
 *
 * @param advanced
 * @text ■ 個別設定（省略可）
 *
 * @param backColor1
 * @text 背景色1
 * @desc カットイン表示領域の背景色を設定します。
 * 省略した場合は共通設定が使用されます
 * @type string
 * @parent advanced
 * @default
 *
 * @param backColor2
 * @text 背景色2
 * @desc カットイン表示領域の背景色を設定します
 * 空欄の場合は背景色1と一緒になります
 * @type string
 * @parent advanced
 * @default
 *
 * @param backTone
 * @text エフェクト色調1
 * @desc 背景エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"-128","green":"-128","blue":"128"}
 *
 * @param borderTone
 * @text エフェクト色調2
 * @desc 境界線エフェクトの色調を設定します
 * ※RPGツクールMZのみ有効
 * @type struct<ColorCustomize>
 * @parent advanced
 * @default {"isUse": false, "red":"0","green":"0","blue":"0"}
 *
 * @param backImage1
 * @text 背景画像1
 * @desc 背景全体に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param backImage2
 * @text 背景画像2
 * @desc キャラクターの背景部分に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderImage
 * @text 境界線画像
 * @desc カットインの境界線部分に表示される画像を指定します
 * 空欄の場合は共通設定を使用します
 * @type file
 * @require true
 * @parent advanced
 * @dir img/pictures
 * @default
 *
 * @param borderBlendMode
 * @text 境界線画像のブレンド
 * @desc 境界線画像のブレンドモードを指定します
 * 省略の場合は共通設定を使用します
 * @type select
 * @parent advanced
 * @option 省略
 * @value
 * @option 通常
 * @value normal
 * @option 加算
 * @value add
 * @default
 *
 * @param sound
 * @text 効果音
 * @desc カットイン表示時の効果音を指定します
 * 指定しない場合はデフォルトの効果音を使用します
 * @type struct<Sound>
 * @parent advanced
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param note
 * @text メモ欄
 * @desc メモ欄です。
 * ツクールのメモ欄同様に使えます。
 * @type multiline_string
 * @default
 *
 * @param enemyId
 * @text 敵のID
 * @desc カットイン対象の敵を設定します
 * @type enemy
 * @parent target
 * @default 0
 *
 * @param skillId
 * @text スキルのID
 * @desc カットイン対象のスキルを設定します
 * @type skill
 * @parent target
 * @default 0
 */

/*~struct~Color:
 * @param red
 * @text 赤
 * @desc 赤色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param green
 * @text 青
 * @desc 青色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param blue
 * @text 緑
 * @desc 緑色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 */

/*~struct~ColorCustomize:
 * @param isUse
 * @text 使用するか？
 * @desc 個別設定を使用するか指定します
 * 使用しない場合は共通設定の色になります
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 *
 * @param red
 * @text 赤
 * @desc 赤色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param green
 * @text 青
 * @desc 青色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 *
 * @param blue
 * @text 緑
 * @desc 緑色の強さを設定します
 * -255から255の範囲で設定してください
 * @type number
 * @min -255
 * @max 255
 * @default 0
 */

/*~struct~Sound:
 * @param name
 * @text 効果音ファイル
 * @desc 効果音ファイルを選択します
 * @type file
 * @require true
 * @dir audio/se
 * @default
 *
 * @param volume
 * @text 音量
 * @desc 効果音の音量を指定します。
 * 0～100で指定してください。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text ピッチ
 * @desc 効果音のピッチを指定します。
 * 100が通常です。
 * @type number
 * @min 0
 * @max 200
 * @default 100
 *
 * @param pan
 * @text パン
 * @desc 効果音のパンを指定します。
 * 0が通常です。
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_SkillCutIn';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return `${parameter[key] || ''}`;
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickNumberValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseFloat(parameter[key]);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return `${parameter[key] || defaultValue}` === 'true';
    }

    function pickStructActorCutinSet(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            picture: pickStringValueFromParameter(parameter, 'picture', ''),
            pictureX: pickIntegerValueFromParameter(parameter, 'pictureX', 0),
            pictureY: pickIntegerValueFromParameter(parameter, 'pictureY', 0),
            pictureScale: pickNumberValueFromParameter(parameter, 'pictureScale', 1),
            backColor1: pickStringValueFromParameter(parameter, 'backColor1', ''),
            backColor2: pickStringValueFromParameter(parameter, 'backColor2', ''),
            backTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.backTone),
            borderTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.borderTone),
            backImage1: pickStringValueFromParameter(parameter, 'backImage1', ''),
            backImage2: pickStringValueFromParameter(parameter, 'backImage2', ''),
            borderImage: pickStringValueFromParameter(parameter, 'borderImage', ''),
            borderBlendMode: pickStringValueFromParameter(parameter, 'borderBlendMode', ''),
            sound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.sound),
            note: pickStringValueFromParameter(parameter, 'note', ''),
            actorId: pickIntegerValueFromParameter(parameter, 'actorId', 0),
            skillId: pickIntegerValueFromParameter(parameter, 'skillId', 0),
        };
    }

    function pickStructEnemyCutinSet(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            picture: pickStringValueFromParameter(parameter, 'picture', ''),
            pictureX: pickIntegerValueFromParameter(parameter, 'pictureX', 0),
            pictureY: pickIntegerValueFromParameter(parameter, 'pictureY', 0),
            pictureScale: pickNumberValueFromParameter(parameter, 'pictureScale', 1),
            backColor1: pickStringValueFromParameter(parameter, 'backColor1', ''),
            backColor2: pickStringValueFromParameter(parameter, 'backColor2', ''),
            backTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.backTone),
            borderTone: ((parameter) => {
                return pickStructColorCustomize(parameter);
            })(parameter.borderTone),
            backImage1: pickStringValueFromParameter(parameter, 'backImage1', ''),
            backImage2: pickStringValueFromParameter(parameter, 'backImage2', ''),
            borderImage: pickStringValueFromParameter(parameter, 'borderImage', ''),
            borderBlendMode: pickStringValueFromParameter(parameter, 'borderBlendMode', ''),
            sound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.sound),
            note: pickStringValueFromParameter(parameter, 'note', ''),
            enemyId: pickIntegerValueFromParameter(parameter, 'enemyId', 0),
            skillId: pickIntegerValueFromParameter(parameter, 'skillId', 0),
        };
    }

    function pickStructColor(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            red: pickIntegerValueFromParameter(parameter, 'red', 0),
            green: pickIntegerValueFromParameter(parameter, 'green', 0),
            blue: pickIntegerValueFromParameter(parameter, 'blue', 0),
        };
    }

    function pickStructColorCustomize(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            isUse: pickBooleanValueFromParameter(parameter, 'isUse', 'false'),
            red: pickIntegerValueFromParameter(parameter, 'red', 0),
            green: pickIntegerValueFromParameter(parameter, 'green', 0),
            blue: pickIntegerValueFromParameter(parameter, 'blue', 0),
        };
    }

    function pickStructSound(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            name: pickStringValueFromParameter(parameter, 'name', ''),
            volume: pickIntegerValueFromParameter(parameter, 'volume', 90),
            pitch: pickIntegerValueFromParameter(parameter, 'pitch', 100),
            pan: pickIntegerValueFromParameter(parameter, 'pan', 0),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.3.2',
            actorConfig: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructActorCutinSet(parameter);
                });
            })(parameter.actorConfig),
            enemyConfig: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructEnemyCutinSet(parameter);
                });
            })(parameter.enemyConfig),
            commonBackImage1: pickStringValueFromParameter(parameter, 'commonBackImage1', 'CutIn_back1'),
            commonBackImage2: pickStringValueFromParameter(parameter, 'commonBackImage2', 'CutIn_back2'),
            commonBorderImage: pickStringValueFromParameter(parameter, 'commonBorderImage', 'CutIn_border'),
            commonBorderBlendMode: pickStringValueFromParameter(parameter, 'commonBorderBlendMode', 'add'),
            commonBorderSpeed: pickIntegerValueFromParameter(parameter, 'commonBorderSpeed', 30),
            commonSound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.commonSound),
            cutInLayer: pickStringValueFromParameter(parameter, 'cutInLayer', 'foreground'),
            cutInOpenAndCloseTime: pickIntegerValueFromParameter(parameter, 'cutInOpenAndCloseTime', 25),
            cutInStopTime: pickIntegerValueFromParameter(parameter, 'cutInStopTime', 10),
            actorBackColor1: pickStringValueFromParameter(parameter, 'actorBackColor1', '#000033'),
            actorBackColor2: pickStringValueFromParameter(parameter, 'actorBackColor2', '#6666ff'),
            actorBackTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.actorBackTone),
            actorBorderTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.actorBorderTone),
            enemyBackColor1: pickStringValueFromParameter(parameter, 'enemyBackColor1', '#330000'),
            enemyBackColor2: pickStringValueFromParameter(parameter, 'enemyBackColor2', '#ff6666'),
            enemyBackTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.enemyBackTone),
            enemyBorderTone: ((parameter) => {
                return pickStructColor(parameter);
            })(parameter.enemyBorderTone),
        };
    }

    function unescapeMetaString(string) {
        return `${string || ''}`.trim().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }

    function evalCondition(a, code) {
        try {
            return !!eval(code);
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.error(e);
            return false;
        }
    }

    class Sprite_CutInBase extends Sprite {
        constructor(params) {
            super();
            this._params = params;
            this._callback = null;
            this._isPlaying = false;
            this._isStarting = false;
            this.anchor.x = this.anchor.y = 0.5;
            this.visible = false;
            this.onCreate();
        }

        get params() {
            return this._params;
        }

        /**
         * metaから指定keyを読み取る
         * @param {String | String[]} keys
         * @param {any} defaultValue
         * @returns {any}
         */
        getMeta(keys, defaultValue = undefined) {
            if (Array.isArray(keys)) {
                for (const key of keys) {
                    if (this.params.meta[key] !== undefined) return this.params.meta[key];
                }
            } else {
                if (this.params.meta[keys] !== undefined) return this.params.meta[keys];
            }
            return defaultValue;
        }

        /**
         * 全体の表示角度を取得
         * @returns {number}
         */
        getMainRotation() {
            if (!this._mainRotationCache) {
                const rotation = this.getMeta(['rotate', '角度'], undefined);
                if (rotation === undefined) {
                    if (this.params.isEnemy) {
                        this._mainRotationCache = Math.atan2(-Graphics.height, -Graphics.width);
                    } else {
                        this._mainRotationCache = Math.atan2(-Graphics.height, Graphics.width);
                    }
                } else {
                    this._mainRotationCache = (parseFloat(rotation) * Math.PI) / 180;
                }
            }
            return this._mainRotationCache;
        }

        /**
         * カットイン幅を取得
         * ※カットイン幅は画面の対角線の長さになる
         * @returns {number}
         */
        getMainWidth() {
            if (!this._mainWidthCache) {
                this._mainWidthCache = Math.ceil(Math.sqrt(Math.pow(Graphics.width, 2) + Math.pow(Graphics.height, 2)));
            }
            return this._mainWidthCache;
        }

        /**
         * 破棄
         */
        destroy() {
            this.onDestroy();
            if (Sprite.prototype.destroy) {
                Sprite.prototype.destroy.apply(this);
            }
        }

        /**
         * 再生開始
         * @returns {Promise}
         */
        play() {
            if (this._isPlaying) Promise.reject('isPlaying');

            return new Promise((resolve) => {
                this._callback = resolve;
                this._isPlaying = true;
            });
        }

        /**
         * 再生終了
         * このメソッドを外部から呼び出すことはない
         */
        finish() {
            if (!this._isPlaying) return;
            if (this._callback) this._callback();
            this._callback = null;
            this._isPlaying = false;
            this._isStarting = false;
        }

        /**
         * 更新
         */
        update() {
            if (this._isStarting) {
                this.onUpdate();
            } else if (this._isPlaying) {
                if (this.isReady()) {
                    this._isStarting = true;
                    this.visible = true;
                    this.onStart();
                }
            }

            super.update();
        }

        /**
         * 画像等のリソース読み込みが完了しているか
         * @returns {boolean}
         */
        isReady() {
            return ImageManager.isReady();
        }

        /**
         * カットイン効果音の再生
         */
        playSe() {
            const sound = this.getConfigSound();
            if (sound) AudioManager.playSe(sound);
        }

        /**
         * カットイン効果音の取得
         * @returns {null|any}
         */
        getConfigSound() {
            if (this.params.sound && this.params.sound.name) {
                return this.params.sound;
            } else if (Torigoya.SkillCutIn.parameter.commonSound && Torigoya.SkillCutIn.parameter.commonSound.name) {
                return Torigoya.SkillCutIn.parameter.commonSound;
            }
            return null;
        }

        /**
         * 背景画像1のファイル名を取得
         * @returns {string}
         */
        getCutInBackImageName1() {
            if (this.params.backImage1) return this.params.backImage1;
            return Torigoya.SkillCutIn.parameter.commonBackImage1;
        }

        /**
         * 背景画像2のファイル名を取得
         * @returns {string}
         */
        getCutInBackImageName2() {
            if (this.params.backImage2) return this.params.backImage2;
            return Torigoya.SkillCutIn.parameter.commonBackImage2;
        }

        /**
         * 境界線画像のファイル名を取得
         * @returns {string}
         */
        getCutInBorderImageName() {
            if (this.params.borderImage) return this.params.borderImage;
            return Torigoya.SkillCutIn.parameter.commonBorderImage;
        }

        /**
         * 境界線画像のブレンドモードを取得
         * @returns {PIXI.BLEND_MODES}
         */
        getCutInBorderBlendMode() {
            const mode = this.params.borderBlendMode || Torigoya.SkillCutIn.parameter.commonBorderBlendMode;
            switch (mode) {
                case 'add':
                    return PIXI.BLEND_MODES.ADD;
                case 'normal':
                default:
                    return PIXI.BLEND_MODES.NORMAL;
            }
        }

        /**
         * 背景色1を取得
         * @returns {string}
         */
        getBackColor1() {
            if (this.params.backColor1) return this.params.backColor1;

            if (this.params.isEnemy) {
                return Torigoya.SkillCutIn.parameter.enemyBackColor1;
            } else {
                return Torigoya.SkillCutIn.parameter.actorBackColor1;
            }
        }

        /**
         * 背景色2を取得
         * @returns {string}
         */
        getBackColor2() {
            if (this.params.backColor2) return this.params.backColor2;
            if (this.params.backColor1) return this.params.backColor1;

            if (this.params.isEnemy) {
                return Torigoya.SkillCutIn.parameter.enemyBackColor2 || Torigoya.SkillCutIn.parameter.enemyBackColor1;
            } else {
                return Torigoya.SkillCutIn.parameter.actorBackColor2 || Torigoya.SkillCutIn.parameter.actorBackColor1;
            }
        }

        /**
         * 背景色のトーンを取得
         * @returns {number[]}
         */
        getBackTone() {
            if (this.params.backTone && this.params.backTone.isUse) {
                const tone = this.params.backTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else if (this.params.isEnemy) {
                const tone = Torigoya.SkillCutIn.parameter.enemyBackTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else {
                const tone = Torigoya.SkillCutIn.parameter.actorBackTone;
                return [tone.red, tone.green, tone.blue, 0];
            }
        }

        /**
         * 境界線のトーンを取得
         * @returns {number[]}
         */
        getBorderTone() {
            if (this.params.borderTone && this.params.borderTone.isUse) {
                const tone = this.params.borderTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else if (this.params.isEnemy) {
                const tone = Torigoya.SkillCutIn.parameter.enemyBorderTone;
                return [tone.red, tone.green, tone.blue, 0];
            } else {
                const tone = Torigoya.SkillCutIn.parameter.actorBorderTone;
                return [tone.red, tone.green, tone.blue, 0];
            }
        }

        /**
         * 生成処理（継承先で上書き）
         */
        onCreate() {
            // override me
        }

        /**
         * 開始処理（継承先で上書き）
         */
        onStart() {
            // override me
        }

        /**
         * 更新処理（継承先で上書き）
         */
        onUpdate() {
            // override me
        }

        /**
         * 破棄処理（継承先で上書き）
         */
        onDestroy() {
            // override me
        }
    }

    function callBitmapLoaded(bitmap, callback) {
        if (bitmap.isReady()) {
            callback();
        } else {
            bitmap.addLoadListener(callback);
        }
    }

    function easingBounce(n) {
        const s = 1.70158;
        const t2 = n - 1;
        return t2 * t2 * ((s + 1) * t2 + s) + 1;
    }

    class Sprite_CutInWoss extends Sprite_CutInBase {
        getMainSmallHeight() {
            if (!this._mainSmallHeightCache) {
                this._mainSmallHeightCache = this.getMainWidth() / 4;
            }
            return this._mainSmallHeightCache;
        }

        getMainLargeHeight() {
            if (!this._mainLargeHeightCache) {
                this._mainLargeHeightCache = this.getMainWidth() / 2;
            }
            return this._mainLargeHeightCache;
        }

        getBorderSpeed() {
            return Torigoya.SkillCutIn.parameter.commonBorderSpeed;
        }

        getOpenAndCloseTime() {
            return Torigoya.SkillCutIn.parameter.cutInOpenAndCloseTime;
        }

        getStopTime() {
            return Torigoya.SkillCutIn.parameter.cutInStopTime;
        }

        onCreate() {
            this._createMask();
            this._createGlobalBackPlaneSprite();
            this._createGlobalBackEffectSprite();
            this._createMainBackSprite();
            this._createCharacterSprite();
            this._createBorderSprites();
        }

        _createMask() {
            const w = this.getMainWidth();
            const h1 = this.getMainSmallHeight();
            const h2 = this.getMainLargeHeight();

            this._maskShape = new PIXI.Graphics();
            this._maskShape.clear();
            this._maskShape.beginFill(0xffffff);
            this._maskShape.moveTo(0, (h2 - h1) / 2);
            this._maskShape.lineTo(w, 0);
            this._maskShape.lineTo(w, h2);
            this._maskShape.lineTo(0, h2 - (h2 - h1) / 2);
            this._maskShape.endFill();
            this._maskShape.pivot = new PIXI.Point(w / 2, h2 / 2);
            this._maskShape.scale.y = 0;

            this._maskShape.rotation = this.getMainRotation();

            this.addChild(this._maskShape);
        }

        _createGlobalBackPlaneSprite() {
            const size = this.getMainWidth();
            const colorBitmap = new Bitmap(32, 32);
            colorBitmap.fillAll('#000000');
            this._globalBackPlaneSprite = new Sprite(colorBitmap);
            this._globalBackPlaneSprite.scale.x = this._globalBackPlaneSprite.scale.y = size / colorBitmap.width;
            this._globalBackPlaneSprite.anchor.x = this._globalBackPlaneSprite.anchor.y = 0.5;
            this._globalBackPlaneSprite.opacity = 0;
            this.addChild(this._globalBackPlaneSprite);
        }

        _createGlobalBackEffectSprite() {
            const size = this.getMainWidth();
            const bitmap = ImageManager.loadPicture(this.getCutInBackImageName1());
            const shapeHeight = (this.getMainLargeHeight() - this.getMainSmallHeight()) / 2;
            const r = Math.atan2(shapeHeight, this.getMainWidth());
            const colorTone = this.getBackTone();

            this._globalBackEffectSprites = new Array(2).fill(0).map((_, i) => {
                const mask = new PIXI.Graphics();
                mask.beginFill(0xffffff);
                mask.moveTo(0, 0);
                mask.lineTo(size, 0);
                mask.lineTo(size, size / 2);
                mask.lineTo(0, size / 2);
                mask.lineTo(0, 0);
                mask.endFill();
                mask.pivot = new PIXI.Point(size / 2, i === 0 ? size / 2 : 0);
                mask.rotation = this.getMainRotation();
                this.addChild(mask);

                const wrapperSprite = new Sprite();
                wrapperSprite.opacity = 0;
                wrapperSprite.mask = mask;
                wrapperSprite.x = Math.cos(r) * shapeHeight * (i === 0 ? -1 : 1);
                wrapperSprite.y = shapeHeight * (i === 0 ? -1 : 1);
                wrapperSprite.rotation = this.getMainRotation() + (i === 0 ? -1 : 1) * r;
                wrapperSprite.setColorTone(colorTone);
                wrapperSprite.blendMode = PIXI.BLEND_MODES.ADD;
                this.addChild(wrapperSprite);

                const sprite = new TilingSprite(bitmap);
                sprite.move(-size, -size, size * 2, size * 2);
                wrapperSprite.addChild(sprite);

                return sprite;
            });
        }

        _createMainBackSprite() {
            const width = this.getMainWidth();
            const height = this.getMainLargeHeight();

            const color1 = this.getBackColor1();
            const color2 = this.getBackColor2();

            const colorBitmap = new Bitmap(64, 64);
            colorBitmap.gradientFillRect(0, 0, colorBitmap.width, colorBitmap.height / 2, color1, color2, true);
            colorBitmap.gradientFillRect(
                0,
                colorBitmap.height / 2,
                colorBitmap.width,
                colorBitmap.height / 2,
                color2,
                color1,
                true
            );

            this._mainBackSprite = new Sprite(colorBitmap);
            this._mainBackSprite.anchor.x = this._mainBackSprite.anchor.y = 0.5;
            this._mainBackSprite.scale.x = width / colorBitmap.width;
            this._mainBackSprite.scale.y = height / colorBitmap.height;
            this._mainBackSprite.rotation = this.getMainRotation();
            this._mainBackSprite.mask = this._maskShape;
            this.addChild(this._mainBackSprite);

            const wrapperSprite = new Sprite();
            wrapperSprite.rotation = this.getMainRotation();
            wrapperSprite.mask = this._maskShape;
            this.addChild(wrapperSprite);

            const effectBitmap = ImageManager.loadPicture(this.getCutInBackImageName2());
            this._mainBackEffectSprite = new TilingSprite(effectBitmap);
            this._mainBackEffectSprite.blendMode = PIXI.BLEND_MODES.ADD;
            this._mainBackEffectSprite.opacity = 128;
            this._mainBackEffectSprite.move(-width / 2, -height / 2, width, height);
            wrapperSprite.addChild(this._mainBackEffectSprite);
        }

        _createCharacterSprite() {
            const l = this.getMainWidth() / 2;
            const x = -Math.cos(this.getMainRotation()) * l;
            const y = -Math.sin(this.getMainRotation()) * l;

            this._characterSprite = new Sprite();
            this._characterSprite.addChild(this._createCharacterInnerSprite());
            this._characterSprite.x = x;
            this._characterSprite.y = y;
            this._characterSprite.scale.x = this._characterSprite.scale.y = 2;
            this._characterSprite.mask = this._maskShape;
            this.addChild(this._characterSprite);

            const blurInner = this._createCharacterInnerSprite();
            blurInner.blendMode = PIXI.BLEND_MODES.ADD;
            this._blurCharacterSprite = new Sprite();
            this._blurCharacterSprite.addChild(blurInner);
            this._blurCharacterSprite.opacity = 0;
            this._blurCharacterSprite.scale.x = this._characterSprite.scale.y = 2;
            this._blurCharacterSprite.mask = this._maskShape;
            this.addChild(this._blurCharacterSprite);
        }

        _createCharacterInnerSprite() {
            const characterBitmap = ImageManager.loadPicture(this.params.picture);
            const sprite = new Sprite(characterBitmap);
            sprite.anchor.x = sprite.anchor.y = 0.5;

            sprite.x = this.params.pictureX;
            sprite.y = this.params.pictureY;
            sprite.scale.x = sprite.scale.y = this.params.pictureScale;

            return sprite;
        }

        _createBorderSprites() {
            const borderBitmap = ImageManager.loadPicture(this.getCutInBorderImageName());
            const colorTone = this.getBorderTone();

            this._borderSprites = new Array(2).fill(0).map((_, i) => {
                const wrapperSprite = new Sprite();
                wrapperSprite.rotation = this.getMainRotation();
                wrapperSprite.scale.y = 0;
                wrapperSprite.setColorTone(colorTone);
                this.addChild(wrapperSprite);

                const sprite = new TilingSprite(borderBitmap);
                callBitmapLoaded(borderBitmap, () => {
                    const w = this.getMainWidth();
                    const h = borderBitmap.height;
                    sprite.move(-w / 2, -h / 2, w, h);
                });
                sprite.blendMode = this.getCutInBorderBlendMode();
                wrapperSprite.addChild(sprite);
                return sprite;
            });
        }

        onStart() {
            this.playSe();

            this._onStartShape();
            this._onStartGlobalBackPlane();
            this._onStartGlobalBackEffect();
            this._onStartBorders();
            this._onStartCharacter();
        }

        _onStartShape() {
            Torigoya.FrameTween.create(this._maskShape.scale)
                .to(
                    {
                        y: 1,
                    },
                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        y: 0,
                    },
                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .call(() => this.finish())
                .start();
        }

        _onStartGlobalBackPlane() {
            Torigoya.FrameTween.create(this._globalBackPlaneSprite)
                .to(
                    {
                        opacity: 128,
                    },
                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        opacity: 0,
                    },
                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();
        }

        _onStartGlobalBackEffect() {
            this._globalBackEffectSprites.forEach((sprite) => {
                const wrapper = sprite.parent;
                Torigoya.FrameTween.create(wrapper)
                    .to(
                        {
                            opacity: 255,
                        },
                        this.getOpenAndCloseTime(),
                        easingBounce
                    )
                    .wait(this.getStopTime())
                    .to(
                        {
                            opacity: 0,
                        },
                        this.getOpenAndCloseTime(),
                        Torigoya.FrameTween.Easing.easeOutCubic
                    )
                    .start();
            });
        }

        _onStartBorders() {
            this._borderSprites.forEach((sprite) => {
                const wrapper = sprite.parent;
                Torigoya.FrameTween.create(wrapper.scale)
                    .to(
                        {
                            y: 1,
                        },
                        this.getOpenAndCloseTime(),
                        easingBounce
                    )
                    .wait(this.getStopTime())
                    .to(
                        {
                            y: 0,
                        },
                        this.getOpenAndCloseTime(),
                        Torigoya.FrameTween.Easing.easeOutCubic
                    )
                    .start();
            });
        }

        _onStartCharacter() {
            Torigoya.FrameTween.create(this._characterSprite)
                .to(
                    {
                        x: 0,
                        y: 0,
                        opacity: 255,
                    },
                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        opacity: 0,
                    },
                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            Torigoya.FrameTween.create(this._characterSprite.scale)
                .to(
                    {
                        x: 1,
                        y: 1,
                    },
                    this.getOpenAndCloseTime(),
                    easingBounce
                )
                .wait(this.getStopTime())
                .to(
                    {
                        x: 3,
                        y: 3,
                    },
                    this.getOpenAndCloseTime(),
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            const blurAnimationTime = this.getOpenAndCloseTime() / 2;

            Torigoya.FrameTween.create(this._blurCharacterSprite)
                .wait(blurAnimationTime)
                .to(
                    {
                        opacity: 255,
                    },
                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .to(
                    {
                        opacity: 0,
                    },
                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();

            Torigoya.FrameTween.create(this._blurCharacterSprite.scale)
                .wait(blurAnimationTime)
                .to(
                    {
                        x: 1,
                        y: 1,
                    },
                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .to(
                    {
                        x: 3,
                        y: 3,
                    },
                    blurAnimationTime,
                    Torigoya.FrameTween.Easing.easeOutCubic
                )
                .start();
        }

        onUpdate() {
            this._mainBackEffectSprite.origin.x -= 30;
            this._globalBackEffectSprites.forEach((sprite, i) => {
                sprite.origin.x += i === 0 ? -45 : 45;
            });
            this._onUpdateBorders();
        }

        _onUpdateBorders() {
            const shapeHeight = ((this.getMainLargeHeight() - this.getMainSmallHeight()) / 2) * this._maskShape.scale.y;
            const length =
                ((this.getMainSmallHeight() + (this.getMainLargeHeight() - this.getMainSmallHeight()) / 2) / 2) *
                this._maskShape.scale.y;
            const r = Math.atan2(shapeHeight, this.getMainWidth());

            this._borderSprites.forEach((sprite, i) => {
                const wrapperSprite = sprite.parent;
                const r2 = this.getMainRotation() + (i === 0 ? -1 : 1) * r;
                wrapperSprite.rotation = r2 + (i === 1 ? Math.PI : 0);
                const r3 = r2 + Math.PI / 2;
                wrapperSprite.x = Math.cos(r3) * length * (i === 0 ? -1 : 1);
                wrapperSprite.y = Math.sin(r3) * length * (i === 0 ? -1 : 1);

                sprite.origin.x += this.getBorderSpeed();
            });
        }

        onDestroy() {
            if (this._globalBackPlaneSprite.destroy) {
                this._globalBackPlaneSprite.destroy();
            } else {
                this._globalBackPlaneSprite.bitmap.resize(1, 1);
            }

            if (this._mainBackSprite.bitmap.destroy) {
                this._mainBackSprite.bitmap.destroy();
            } else {
                this._mainBackSprite.bitmap.resize(1, 1);
            }
            this._mainBackSprite.bitmap = null;
        }
    }

    class CutInManagerClass {
        constructor() {
            this._configCache = new Map();
            this._cutInParameter = null;
        }

        reset() {
            this.clear();
            this._configCache.clear();
        }

        clear() {
            this._cutInParameter = null;
        }

        setParameter(config, isEnemy = false) {
            this._cutInParameter = Object.assign({ isEnemy }, config);
        }

        getConfigByActor(actor, item) {
            const actorId = actor.actorId();

            if (DataManager.isSkill(item)) {
                const key = `actorSkill::${actorId}::${item.id}`;
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                    (config) => config.actorId === actorId && config.skillId === item.id
                );
                this._configCache.set(key, result);

                return result;
            } else if (DataManager.isItem(item)) {
                const key = `actorItem::${actorId}::${item.id}`;
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                    (config) =>
                        config.actorId === actorId &&
                        parseInt(config.meta['item'] || config.meta['アイテム'] || 0, 10) === item.id
                );
                this._configCache.set(key, result);

                return result;
            } else {
                return [];
            }
        }

        getConfigByEnemy(enemy, item) {
            const enemyId = enemy.enemyId();

            if (DataManager.isSkill(item)) {
                const key = `enemySkill::${enemyId}::${item.id}`;
                const cache = this._configCache.get(key);
                if (cache) return cache;

                const result = Torigoya.SkillCutIn.parameter.enemyConfig.filter(
                    (config) => config.enemyId === enemyId && config.skillId === item.id
                );
                this._configCache.set(key, result);

                return result;
            } else {
                return [];
            }
        }

        getConfigByNameFromActor(name) {
            const key = `nameFromActor::${name}`;
            const cache = this._configCache.get(key);
            if (cache) return cache;

            const result = Torigoya.SkillCutIn.parameter.actorConfig.filter(
                (config) => (config.meta['name'] || config.meta['呼び出し名'] || '').trim() === name
            );
            this._configCache.set(key, result);

            return result;
        }

        getConfigByNameFromEnemy(name) {
            const key = `nameFromEnemy::${name}`;
            const cache = this._configCache.get(key);
            if (cache) return cache;

            const result = Torigoya.SkillCutIn.parameter.enemyConfig.filter(
                (config) => (config.meta['name'] || config.meta['呼び出し名'] || '').trim() === name
            );
            this._configCache.set(key, result);

            return result;
        }

        canPlayConfig(config, battler) {
            const condition = unescapeMetaString(config.meta['condition'] || config.meta['条件'] || '');
            if (condition && !evalCondition(battler, condition)) return false;

            return true;
        }

        isPlaying() {
            return !!this._cutInParameter;
        }

        getParameter() {
            return this._cutInParameter;
        }

        detectCutInClass() {
            return Sprite_CutInWoss;
        }
    }

    const CutInManager = new CutInManagerClass();

    function applyPluginToSpritesetBattle() {
        const upstream_Spriteset_Battle_isEffecting = Spriteset_Battle.prototype.isEffecting;
        Spriteset_Battle.prototype.isEffecting = function () {
            return upstream_Spriteset_Battle_isEffecting.apply(this) || CutInManager.isPlaying();
        };
    }

    //effectでは高速化でスキップされてしまうためeffect2を追加
    Window_BattleLog.prototype.updateWaitMode = function() {
        let waiting = false;
        switch (this._waitMode) {
            case "effect":
                waiting = this._spriteset.isEffecting();
                break;
            case "effect_hakika":
                waiting = this._spriteset.isEffecting();
                break;
            case "movement":
                waiting = this._spriteset.isAnyoneMoving();
                break;
        }
        if (!waiting) {
            this._waitMode = "";
        }
        return waiting;
    };

    function applyPluginToBattleManager() {
        const upstream_BattleManager_startAction = BattleManager.startAction;
        BattleManager.startAction = function () {
            this.torigoyaSkillCutIn_playCutIn();
            upstream_BattleManager_startAction.apply(this);
        };

        BattleManager.torigoyaSkillCutIn_playCutIn = function () {
            const subject = this._subject;
            if (!subject) return;

            const action = subject.currentAction();
            const item = action && action.item();
            if (!item) return;

            const configs = subject.isEnemy()
                ? CutInManager.getConfigByEnemy(subject, item)
                : CutInManager.getConfigByActor(subject, item);
            if (configs.length === 0) return;

            const config = configs.find((config) => CutInManager.canPlayConfig(config, subject));
            if (!config) return;

            CutInManager.setParameter(config, subject.isEnemy());

            //this._logWindow.setWaitMode('effect');
            this._logWindow.setWaitMode('effect_hakika');//編集
        };
    }

    function applyPluginToGameInterpreter() {
        const upstream_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
        Game_Interpreter.prototype.updateWaitMode = function () {
            if (this._waitMode === 'torigoyaSkillCutIn') {
                return CutInManager.isPlaying();
            }

            return upstream_Game_Interpreter_updateWaitMode.apply(this);
        };
    }

    function createAndPlayCutInSprite() {
        const klass = CutInManager.detectCutInClass();
        if (!klass) {
            console.error('カットイン用のSpriteクラスが見つかりません');
            CutInManager.clear();
            return;
        }

        const parent = this._torigoyaSkillCutIn_cutInContainer || this;

        this._torigoyaSkillCutIn_cutInSprite = new klass(CutInManager.getParameter());
        this._torigoyaSkillCutIn_cutInSprite.x = Graphics.width / 2;
        this._torigoyaSkillCutIn_cutInSprite.y = Graphics.height / 2;
        parent.addChild(this._torigoyaSkillCutIn_cutInSprite);

        this._torigoyaSkillCutIn_cutInSprite.play().then(() => {
            CutInManager.clear();
            parent.removeChild(this._torigoyaSkillCutIn_cutInSprite);
            this._torigoyaSkillCutIn_cutInSprite.destroy();
            this._torigoyaSkillCutIn_cutInSprite = null;
        });
    }

    function commandShowActorCutIn({ name }) {
        const config = CutInManager.getConfigByNameFromActor(name)[0];
        if (!config) {
            return;
        }
        CutInManager.setParameter(config, false);
        this.setWaitMode('torigoyaSkillCutIn');
    }

    function commandShowEnemyCutIn({ name }) {
        const config = CutInManager.getConfigByNameFromEnemy(name)[0];
        if (!config) {
            return;
        }
        CutInManager.setParameter(config, true);
        this.setWaitMode('torigoyaSkillCutIn');
    }

    function createCutInContainer() {
        if (this._torigoyaSkillCutIn_cutInContainer) return;
        this._torigoyaSkillCutIn_cutInContainer = new Sprite();

        const layer = Torigoya.SkillCutIn.parameter.cutInLayer;

        if (this._windowLayer && layer !== 'foreground') {
            const windowIndex = this.getChildIndex(this._windowLayer);
            switch (Torigoya.SkillCutIn.parameter.cutInLayer) {
                case 'upperWindow':
                    this.addChildAt(this._torigoyaSkillCutIn_cutInContainer, windowIndex + 1);
                    break;
                case 'lowerWindow':
                    this.addChildAt(this._torigoyaSkillCutIn_cutInContainer, windowIndex);
                    break;
                default:
                    this.addChild(this._torigoyaSkillCutIn_cutInContainer);
            }
        } else {
            this.addChild(this._torigoyaSkillCutIn_cutInContainer);
        }
    }

    Torigoya.SkillCutIn = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    Torigoya.SkillCutIn.parameter.actorConfig.forEach((config) => DataManager.extractMetadata(config));
    Torigoya.SkillCutIn.parameter.enemyConfig.forEach((config) => DataManager.extractMetadata(config));

    Torigoya.SkillCutIn.CutInManager = CutInManager;
    Torigoya.SkillCutIn.Sprite_CutInBase = Sprite_CutInBase;
    Torigoya.SkillCutIn.Sprite_CutInWoss = Sprite_CutInWoss;

    applyPluginToBattleManager();
    applyPluginToSpritesetBattle();
    applyPluginToGameInterpreter();

    (() => {
        // -------------------------------------------------------------------------
        // SceneManager

        const upstream_SceneManager_onSceneTerminate = SceneManager.onSceneTerminate;
        SceneManager.onSceneTerminate = function () {
            CutInManager.reset();
            upstream_SceneManager_onSceneTerminate.apply(this);
        };

        // -------------------------------------------------------------------------
        // Scene_Message

        const upstream_Scene_Message_update = Scene_Message.prototype.update;
        Scene_Message.prototype.update = function () {
            upstream_Scene_Message_update.apply(this);
            this.torigoyaSkillCutIn_updateCutIn();
        };

        Scene_Message.prototype.torigoyaSkillCutIn_updateCutIn = function () {
            if (!CutInManager.isPlaying()) return;
            if (this._torigoyaSkillCutIn_cutInSprite) return;

            this.torigoyaSkillCutIn_createCutInContainer();
            this.torigoyaSkillCutIn_createAndPlayCutInSprite();
        };

        Scene_Message.prototype.torigoyaSkillCutIn_createCutInContainer = createCutInContainer;
        Scene_Message.prototype.torigoyaSkillCutIn_createAndPlayCutInSprite = createAndPlayCutInSprite;

        // -------------------------------------------------------------------------
        // プラグインコマンド

        PluginManager.registerCommand(Torigoya.SkillCutIn.name, 'showActorCutIn', commandShowActorCutIn);
        PluginManager.registerCommand(Torigoya.SkillCutIn.name, 'showEnemyCutIn', commandShowEnemyCutIn);
    })();
})();
