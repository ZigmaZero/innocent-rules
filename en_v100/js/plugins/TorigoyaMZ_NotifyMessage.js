/*---------------------------------------------------------------------------*
 * TorigoyaMZ_NotifyMessage.js v.1.2.0
 *---------------------------------------------------------------------------*
 * 2021/08/15 15:00 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc 通知メッセージプラグイン (v.1.2.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.2.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/TorigoyaMZ_NotifyMessage.js
 * @base TorigoyaMZ_FrameTween
 * @orderAfter TorigoyaMZ_FrameTween
 * @help
 * 通知メッセージプラグイン (v.1.2.0)
 * https://torigoya-plugin.rutan.dev
 *
 * 画面の左下から通知メッセージを表示する機能を追加します。
 * 通知メッセージはプラグインコマンドで表示できます。
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param baseAppearTime
 * @text 登場/退場時間
 * @desc 通知が画面にスクロールイン/アウトする時間（フレーム数/60＝1秒）を指定します。
 * @type number
 * @parent base
 * @min 0
 * @default 15
 *
 * @param baseViewTime
 * @text 表示時間
 * @desc 通知の表示時間（フレーム数/60＝1秒）を指定します。0にすると画面外に押し出されるまで消えなくなります。
 * @type number
 * @parent base
 * @min 0
 * @default 90
 *
 * @param baseFontSize
 * @text 文字サイズ
 * @desc 通知メッセージの文字サイズを指定します
 * @type number
 * @parent base
 * @min 1
 * @default 22
 *
 * @param basePadding
 * @text 余白サイズ
 * @desc 通知メッセージの余白サイズを指定します
 * @type number
 * @parent base
 * @min 0
 * @default 4
 *
 * @param baseItemPadding
 * @text アイコンと文章の余白
 * @desc 通知アイコンとメッセージの間の余白サイズを指定します
 * @type number
 * @parent base
 * @min 0
 * @default 5
 *
 * @param baseSound
 * @text 効果音
 * @desc 通知表示時の効果音を指定します。
 * @type struct<Sound>
 * @parent base
 * @default {"soundName":"Saint5","soundVolume":"90"}
 *
 * @param advanced
 * @text ■ 上級設定
 *
 * @param advancedVisibleSwitch
 * @text 有効スイッチ
 * @desc このスイッチがONのときのみ画面に通知を表示するようにします。「なし」の場合は常に表示されます。
 * @type switch
 * @parent advanced
 * @default 0
 *
 * @param advancedBackgroundColor1
 * @text 背景グラデーション:左端
 * @desc 背景グラデーションの左端の色を指定します。
 * 色はCSSの記法で指定できます。
 * @type string
 * @parent advanced
 * @default rgba(0, 0, 64, 0.6)
 *
 * @param advancedBackgroundColor2
 * @text 背景グラデーション:右端
 * @desc 背景グラデーションの右端の色を指定します。
 * 色はCSSの記法で指定できます。
 * @type string
 * @parent advanced
 * @default rgba(0, 32, 64, 0)
 *
 * @param advancedUiPaddingBottom
 * @text UIエリア余白: 下端
 * @desc 通知メッセージ表示位置の下側の余白を指定します。
 * @type number
 * @parent advanced
 * @default 5
 *
 * @param advancedKeepMessage
 * @text シーン遷移しても表示をキープ
 * @desc 【危険：環境によってはONにすると不具合の原因となります】シーン遷移してもメッセージを全消ししないようにします。
 * @type boolean
 * @parent advanced
 * @on キープする（危険）
 * @off キープしない（安全）
 * @default false
 *
 * @command notify
 * @text 通知の表示
 * @desc 指定内容の通知を表示します
 *
 * @arg message
 * @text メッセージ
 * @desc 通知に表示する文章を指定します。「文章の表示」のコマンドが一部利用できます。
 * @type string
 *
 * @arg icon
 * @text アイコンID
 * @desc 通知に表示するアイコンのIDを指定します。
 * 0の場合は表示しません。
 * @type number
 *
 * @command notifyWithVariableIcon
 * @text 通知の表示(アイコン変数指定)
 * @desc 指定内容の通知を表示します。アイコンのIDを変数で指定します。
 *
 * @arg message
 * @text メッセージ
 * @desc 通知に表示する文章を指定します。「文章の表示」のコマンドが一部利用できます。
 * @type string
 *
 * @arg iconVariable
 * @text アイコンID（変数指定）
 * @desc 通知に表示するアイコンIDが設定された変数を指定します。
 * 変数の中身が0またはマイナスの場合は表示しません。
 * @type variable
 */

/*~struct~Sound:
 * @param name
 * @text 効果音ファイル名
 * @desc 通知表示時に再生する効果音ファイル
 * 空っぽの場合は効果音なしになります
 * @type file
 * @require true
 * @dir audio/se/
 * @default Item1
 *
 * @param volume
 * @text 効果音の音量
 * @desc 通知表示時に再生する効果音の音量（%）
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text 効果音のピッチ
 * @desc 通知表示時に再生する効果音のピッチ（%）
 * @type number
 * @min 0
 * @max 200
 * @default 100
 *
 * @param pan
 * @text 効果音の位相
 * @desc 通知表示時に再生する効果音の位相
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
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_NotifyMessage';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickNumberValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseFloat(parameter[key]);
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return ''.concat(parameter[key] || defaultValue) === 'true';
    }

    function pickStructSound(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            name: pickStringValueFromParameter(parameter, 'name', 'Item1'),
            volume: pickNumberValueFromParameter(parameter, 'volume', 90),
            pitch: pickNumberValueFromParameter(parameter, 'pitch', 100),
            pan: pickNumberValueFromParameter(parameter, 'pan', 0),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.2.0',
            baseAppearTime: pickIntegerValueFromParameter(parameter, 'baseAppearTime', 15),
            baseViewTime: pickIntegerValueFromParameter(parameter, 'baseViewTime', 90),
            baseFontSize: pickIntegerValueFromParameter(parameter, 'baseFontSize', 22),
            basePadding: pickIntegerValueFromParameter(parameter, 'basePadding', 4),
            baseItemPadding: pickIntegerValueFromParameter(parameter, 'baseItemPadding', 5),
            baseSound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.baseSound),
            advancedVisibleSwitch: pickIntegerValueFromParameter(parameter, 'advancedVisibleSwitch', 0),
            advancedBackgroundColor1: pickStringValueFromParameter(
                parameter,
                'advancedBackgroundColor1',
                'rgba(0, 0, 64, 0.6)'
            ),

            advancedBackgroundColor2: pickStringValueFromParameter(
                parameter,
                'advancedBackgroundColor2',
                'rgba(0, 32, 64, 0)'
            ),
            advancedUiPaddingBottom: pickIntegerValueFromParameter(parameter, 'advancedUiPaddingBottom', 5),
            advancedKeepMessage: pickBooleanValueFromParameter(parameter, 'advancedKeepMessage', false),
        };
    }

    function parseVersion(version) {
        return version.split('.', 3).map((n) => parseInt(n || '0', 10));
    }

    function isGreaterThanOrEqualVersion(a, b) {
        if (a === b) return true;

        const version1 = parseVersion(a);
        const version2 = parseVersion(b);

        if (version1[0] !== version2[0]) return version1[0] < version2[0];
        if (version1[1] !== version2[1]) return version1[1] < version2[1];
        return version1[2] < version2[2];
    }

    function checkExistPlugin(pluginObject, errorMessage) {
        if (typeof pluginObject !== 'undefined') return;
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    function checkPluginVersion(version, requireVersion, errorMessage) {
        if (typeof version === 'string' && isGreaterThanOrEqualVersion(requireVersion, version)) return;
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    checkExistPlugin(
        Torigoya.FrameTween,
        '「通知メッセージプラグイン」より上に「[鳥小屋.txt ベースプラグイン] Tweenアニメーション」が導入されていません。'
    );

    checkPluginVersion(
        Torigoya.FrameTween.parameter.version,
        '2.1.0',
        '「[鳥小屋.txt ベースプラグイン] Tweenアニメーション」のバージョンが古いです。アップデートをしてください。'
    );

    Torigoya.NotifyMessage = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        // -------------------------------------------------------------------------
        // NotifyItem

        class NotifyItem {
            constructor(params) {
                this.initialize(params);
            }

            initialize(params) {
                this.message = params.message;
                this.icon = params.icon;
                this._openness = 0;
            }

            get openness() {
                return this._openness;
            }

            set openness(value) {
                if (value < 0) value = 0;
                if (value > 255) value = 255;
                this._openness = value;
            }
        }

        Torigoya.NotifyMessage.NotifyItem = NotifyItem;

        // -------------------------------------------------------------------------
        // Window_NotifyMessage

        /**
         * 通知メッセージウィンドウ
         */
        class Window_NotifyMessage extends Window_Base {
            constructor() {
                const rect = new Rectangle(0, 0, 1, 1);
                super(rect);
                this._notifyItem = null;
                this.opacity = 0;
                this.createBackCoverSprite();
            }

            get contentsOpacity() {
                return super.contentsOpacity;
            }

            set contentsOpacity(value) {
                super.contentsOpacity = value;
                this._backCoverSprite.opacity = value;
            }

            /**
             * 背景用スプライトの生成
             */
            createBackCoverSprite() {
                this._backCoverSprite = new Sprite(new Bitmap(1, 1));
                this.addChildAt(this._backCoverSprite, 0);
            }

            /**
             * 通知メッセージの設定
             * @param {NotifyItem} notifyItem
             */
            setup(notifyItem) {
                this._notifyItem = notifyItem;
                this.refresh();
            }

            update() {
                if (this._notifyItem) this.contentsOpacity = this._notifyItem.openness;
                super.update();
            }

            /**
             * 画面の再描画
             */
            refresh() {
                if (!this._notifyItem) return;

                // サイズ計算
                const { message, icon } = this._notifyItem;
                const itemPadding = this.itemPadding();
                const { width: messageWidth, height: messageHeight } = this.textSizeEx(message);
                const totalWidth = Math.min(
                    (icon ? ImageManager.iconWidth + itemPadding : 0) + messageWidth + 30,
                    Graphics.width
                );

                const totalHeight = Math.max(ImageManager.iconHeight, messageHeight);

                // ウィンドウのサイズを調整
                this.width = totalWidth + this.padding * 2;
                this.height = totalHeight + this.padding * 2;
                this.createContents();
                this._refreshBackCoverSprite();

                // 描画
                const gap = messageHeight - ImageManager.iconHeight;
                if (icon) {
                    const x = ImageManager.iconWidth + itemPadding;
                    this.drawIcon(icon, 0, gap > 0 ? gap / 2 : 0);
                    this.drawTextEx(message, x, gap < 0 ? -gap / 2 : 0, totalWidth - x);
                } else {
                    this.drawTextEx(message, 0, gap < 0 ? -gap / 2 : 0, totalWidth);
                }
            }

            /**
             * 背景画像の再生成
             * @private
             */
            _refreshBackCoverSprite() {
                const bitmap = this._backCoverSprite.bitmap;
                const w = this.width;
                const h = this.height;
                const c1 = Torigoya.NotifyMessage.parameter.advancedBackgroundColor1;
                const c2 = Torigoya.NotifyMessage.parameter.advancedBackgroundColor2;
                bitmap.resize(w, h);
                bitmap.gradientFillRect(0, 0, w, h, c1, c2, false);
                this._backCoverSprite.setFrame(0, 0, w, h);
                this._backCoverSprite.opacity = this.contentsOpacity;
            }

            /**
             * Paddingの設定
             */
            updatePadding() {
                this.padding = Torigoya.NotifyMessage.parameter.basePadding;
            }

            /**
             * フォント設定
             */
            resetFontSettings() {
                super.resetFontSettings();
                this.contents.fontSize = Torigoya.NotifyMessage.parameter.baseFontSize;
            }

            /**
             * 行間
             * @returns {number}
             */
            lineHeight() {
                return this.contents.fontSize * 1.25;
            }

            /**
             * アイコンとメッセージの間の余白
             * @returns {number}
             */
            itemPadding() {
                return Torigoya.NotifyMessage.parameter.baseItemPadding;
            }
        }

        Torigoya.NotifyMessage.Window = Window_NotifyMessage;

        // -------------------------------------------------------------------------
        // NotifyManagerClass

        /**
         * 通知マネージャー
         */
        class NotifyManagerClass {
            constructor() {
                this._currentScene = null;
                this._stacks = [];
                this._pools = [];
                this._scrollAnimations = [];
                this._requestSound = null;
                this._group = new Torigoya.FrameTween.Group();
                this._handlers = [];
            }

            /**
             * 通知登録
             * @param handler
             */
            on(handler) {
                this._handlers.push(handler);
            }

            /**
             * 通知登録の解除
             * @param handler
             */
            off(handler) {
                const index = this._handlers.indexOf(handler);
                if (index === -1) return;
                this._handlers.splice(index, 1);
            }

            /**
             * すべての通知登録を解除
             */
            offAll() {
                this._handlers.length = 0;
            }

            /**
             * 現在表示中のすべての通知ウィンドウを破棄
             * ※シーン遷移時に呼び出される想定
             */
            clear() {
                this._currentScene = null;

                this._stacks.forEach((stack) => {
                    if (!stack.window) return;

                    if (stack.window.parent) stack.window.parent.removeChild(window);
                    stack.window.parent = null;
                    stack.window = null;
                });

                if (!Torigoya.NotifyMessage.parameter.advancedKeepMessage) {
                    this._stacks.length = 0;
                    this._group.clear();
                }

                this._scrollAnimations.forEach((a) => a.abort());
                this._scrollAnimations.length = 0;

                this._pools.forEach((pool) => pool.destroy());
                this._pools.length = 0;
            }

            /**
             * 表示先シーンの設定
             * @param scene
             */
            setScene(scene) {
                if (this._currentScene === scene) return;
                if (this._currentScene) this.clear();

                this._currentScene = scene;
                if (!this._currentScene.torigoyaNotifyMessageContainer) {
                    const container = new Sprite();
                    this._currentScene.torigoyaNotifyMessageContainer = container;
                    this._currentScene.addChild(container);
                }

                if (Torigoya.NotifyMessage.parameter.advancedKeepMessage) {
                    this._stacks.forEach((stack) => {
                        stack.window = this._setupWindow(stack.notifyItem);
                        stack.window.y = stack.y;
                        stack.window.contentsOpacity = 255;
                        this._appendToScene(stack.window);
                    });
                }
            }

            /**
             * 通知メッセージごとのマージン
             * @returns {number}
             */
            itemMargin() {
                return 5;
            }

            /**
             * 更新処理
             */
            update() {
                const visible = this.isVisible();
                if (visible) this._group.update();
                if (this._currentScene && this._currentScene.torigoyaNotifyMessageContainer)
                    this._currentScene.torigoyaNotifyMessageContainer.visible = visible;
            }

            /**
             * 表示中であるか？
             */
            isVisible() {
                const switchId = Torigoya.NotifyMessage.parameter.advancedVisibleSwitch;
                if (!switchId) return true;

                return $gameSwitches.value(switchId);
            }

            /**
             * 通知の発生
             * @param {NotifyItem} notifyItem
             */
            notify(notifyItem) {
                // 非表示中は新規の追加を行わない
                if (!this.isVisible()) return;

                const window = this._setupWindow(notifyItem);
                this._appendToScene(window);

                const stack = {
                    notifyItem,
                    window,
                    y: window.y + this.itemMargin(),
                };

                this._stacks.unshift(stack);

                this.startAppearAndExitAnimation(stack);
                this.startScrollAnimation(stack.window.height);
                this.requestPlaySound();

                // 通知
                this._handlers.forEach((func) => func(notifyItem));
            }

            /**
             * 通知メッセージの登場/退場アニメーション
             * @param stack
             */
            startAppearAndExitAnimation(stack) {
                const appearTime = Torigoya.NotifyMessage.parameter.baseAppearTime;
                const viewTime = Torigoya.NotifyMessage.parameter.baseViewTime;
                const animation = Torigoya.FrameTween.create(stack.notifyItem).group(this._group);

                // 登場アニメーション
                animation.to({ openness: 255 }, appearTime, Torigoya.FrameTween.Easing.easeInOutQuad);

                // 停止→退場アニメーション
                if (viewTime > 0) {
                    animation
                        .wait(viewTime)
                        .to({ openness: 0 }, appearTime, Torigoya.FrameTween.Easing.easeInOutQuad)
                        .call(() => this._destroyStack(stack));
                }

                animation.start();
            }

            /**
             * 通知メッセージリストのスクロールアニメーション
             * @param newWindowHeight
             */
            startScrollAnimation(newWindowHeight) {
                const appearTime = Torigoya.NotifyMessage.parameter.baseAppearTime;

                // 既に動作中のアニメーションがある場合は破棄
                this._scrollAnimations.forEach((a) => a.abort());
                this._scrollAnimations.length = 0;

                let i = 0;
                while (i < this._stacks.length) {
                    const stack = this._stacks[i];

                    if (stack.y + stack.window.height < 0) {
                        this._destroyStack(stack);
                        continue;
                    }

                    stack.y -= newWindowHeight + this.itemMargin();
                    const animation = Torigoya.FrameTween.create(stack.window)
                        .group(this._group)
                        .to({ y: stack.y }, appearTime, Torigoya.FrameTween.Easing.easeInOutQuad)
                        .start();
                    this._scrollAnimations.push(animation);

                    ++i;
                }
            }

            /**
             * 通知メッセージをもとにウィンドウを初期化
             * @param notifyItem
             * @returns {Window|Window_NotifyMessage}
             * @private
             */
            _setupWindow(notifyItem) {
                const bottom = Torigoya.NotifyMessage.parameter.advancedUiPaddingBottom;

                const window = this._createOrGetFromPoolWindow();
                window.setup(notifyItem);
                window.x = 0;
                window.y = Graphics.height - bottom;
                window.contentsOpacity = 0;
                return window;
            }

            /**
             * ウィンドウをプールから取得、ない場合は生成する
             * @returns {Window_NotifyMessage|*}
             * @private
             */
            _createOrGetFromPoolWindow() {
                const window = this._pools.pop();
                if (window) return window;

                return new Window_NotifyMessage();
            }

            /**
             * 使用済みウィンドウをプールに戻す
             * @param window
             * @private
             */
            _releaseWindow(window) {
                if (window.parent) window.parent.removeChild(window);
                window.parent = null;
                this._pools.push(window);
            }

            /**
             * シーンへのaddChild
             * @param window
             * @private
             */
            _appendToScene(window) {
                if (!this._currentScene) return;
                if (!this._currentScene.torigoyaNotifyMessageContainer) return;
                this._currentScene.torigoyaNotifyMessageContainer.addChild(window);
            }

            /**
             * スタックから指定の通知を削除
             * @param stack
             * @private
             */
            _destroyStack(stack) {
                const index = this._stacks.indexOf(stack);
                if (index === -1) return;
                this._stacks.splice(index, 1);
                if (stack.window) this._releaseWindow(stack.window);
            }

            /**
             * 効果音の再生
             * @private
             */
            requestPlaySound() {
                const se = Torigoya.NotifyMessage.parameter.baseSound;
                if (!se.name) return;

                // 大量に同時にメッセージが追加された場合に爆音になるのを防止するため
                // 1フレームバッファしてから再生する
                if (this._requestSound) return;

                this._requestSound = Torigoya.FrameTween.create(this)
                    .wait(1)
                    .call(() => {
                        AudioManager.playSe(se);
                        this._requestSound = null;
                    })
                    .start();
            }
        }

        const NotifyManager = new NotifyManagerClass();
        Torigoya.NotifyMessage.Manager = NotifyManager;

        // -------------------------------------------------------------------------
        // Scene_Map

        const upstream_Scene_Map_createWindowLayer = Scene_Map.prototype.createWindowLayer;
        Scene_Map.prototype.createWindowLayer = function () {
            NotifyManager.setScene(this);
            upstream_Scene_Map_createWindowLayer.apply(this);
        };

        const upstream_Scene_Map_update = Scene_Map.prototype.update;
        Scene_Map.prototype.update = function () {
            upstream_Scene_Map_update.apply(this);
            NotifyManager.update();
        };

        // -------------------------------------------------------------------------
        // SceneManager

        const upstream_SceneManager_onSceneTerminate = SceneManager.onSceneTerminate;
        SceneManager.onSceneTerminate = function () {
            NotifyManager.clear();
            upstream_SceneManager_onSceneTerminate.apply(this);
        };

        // -------------------------------------------------------------------------
        // プラグインコマンド

        function commandNotify({ message, icon }) {
            const item = new NotifyItem({ message, icon: parseInt(icon, 10) });
            NotifyManager.notify(item);
        }

        function commandNotifyWithVariableIcon({ message, iconVariable }) {
            const variableId = parseInt(iconVariable, 10);
            const icon = Math.max($gameVariables.value(variableId), 0);
            const item = new NotifyItem({ message, icon });
            NotifyManager.notify(item);
        }

        PluginManager.registerCommand(Torigoya.NotifyMessage.name, 'notify', commandNotify);
        PluginManager.registerCommand(
            Torigoya.NotifyMessage.name,
            'notifyWithVariableIcon',
            commandNotifyWithVariableIcon
        );
    })();
})();
