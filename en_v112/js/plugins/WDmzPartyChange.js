//=============================================================================
// RPG Maker MZ - WD Party Change (ver1.00)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Party Change Menu.
 * @author Izumi
 * @url http://izumiwhite.web.fc2.com/
 *
 * @help WDmzPartyChange.js
 *
 * This plugin provides a Party Change Menu.
 * Please edit each parmeters directly with a text editor.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Preload the image file".
 *   2. Call the plugin command "Party Change Menu" or
 *      "Display the member dismissing menu" or
 *      " Display the member list menu".
 *   !! Before using this plugin, store the image "ButtonSetWD.png"
 *      in the following folder.
 * 　　 (ProjectName)\img\system
 *
 * @command change
 * @text Display the party change menu
 * @desc Display the party change menu.
 *
 * @command eliminate
 * @text Display the member dismissing menu
 * @desc Display the member dismissing menu.
 * 
 * @command show
 * @text Display the member list menu
 * @desc Display the member list menu.
 *
 * @command preload
 * @text Preload the image file
 * @desc Preload the image file.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc パーティ編成(アクター預り所)のメニューを開きます。
 * @author いずみ
 * @url http://izumiwhite.web.fc2.com/
 *
 * @help WDmzPartyChange.js
 *
 * このプラグインは、パーティ編成(アクター預り所)のメニューを
 * 呼び出すコマンドを提供します。
 * 各パラメータは直接テキストエディタ等で編集して下さい。
 *
 * 次の手順で使用してください。
 *   1. プラグインコマンド「画像の事前ロード」を呼び出します。
 *   2. プラグインコマンド「パーティ編成画面の表示」又は
 * 　　「メンバー除籍画面の表示」又は「メンバーリスト画面の表示」を
 * 　　　呼び出します。
 * 　※事前に、以下のフォルダに"ButtonSetWD.png"を格納しておいてください。
 * 　　(ProjectName)\img\system
 *
 * @command change
 * @text パーティ編成画面の表示
 * @desc パーティ編成(アクター預り所)のメニューを呼び出します。
 *
 * @command eliminate
 * @text メンバー除籍画面の表示
 * @desc メンバー除籍のメニューを呼び出します。
 * 
 * @command show
 * @text メンバーリスト画面の表示
 * @desc メンバーリストのメニューを呼び出します。
 * 
 * @command preload
 * @text 画像の事前ロード
 * @desc 画像を事前に読み込み画像が表示されない現象を防ぎます。
 * 
 */

(() => {

    //======== 基本設定 ========

    //パーティメンバーの最大数
    var wd_party_max = 6;

    //1番のアクターの加入条件 (この場合スイッチ21がONの時、加入可能)
    //2番以降のアクターの加入条件は、この数値に1ずつ足したものになります。
    var wd_actor1_switch = 31;

    //アクターの入れ替え不可用のスイッチ
    var wd_fix_switch1 = []; //この行は消さないこと
    wd_fix_switch1[1] = 201; //3番のスイッチがONの時、1番のアクターは入れ替え(外すこと)不可。
    wd_fix_switch1[2] = 209; //

    //アクターの除籍不可用のスイッチ
    var wd_fix_switch2 = []; //この行は消さないこと
    wd_fix_switch2[1] = 6; //6番のスイッチがONの時、1番のアクターは除籍不可。
    wd_fix_switch2[2] = 7; //7番のスイッチがONの時、3番のアクターは除籍不可。
    wd_fix_switch2[6] = 8; //8番のスイッチがONの時、6番のアクターは除籍不可。

    //除籍時のコマンドの記載テキスト
    var wd_eliminate_text = "Remove"; 

    //テキストウィンドウ1に表示するテキスト
    var wd_text1_mess = "Current Party" ;

    //テキストウィンドウ2に表示するテキスト
    var wd_text2_mess = "Reserve Characters";

    //パーティから外すのみの処理を可能にする場合はtrue。falseの場合追加と交代のみ。
    var wd_remove_only = true;

    //編成時パーティが全滅していても編成完了を許可する場合はtrue。
    var wd_alldead_ok = false;

    //ページ切り替えのボタンを表示するか
    var wd_pagebutton_use = true;

    //パーティリストがアクティブ時にページ切り替えボタンで、パーティリストのページを切り替える場合はtrue。
    //パーティリストがアクティブ時もメンバーリストのページを切り替える場合はfalse。
    var wd_pagebutton_partylist = true;

    //ソート機能を使用するか
    var wd_sort_use = false;

    //ソート番号格納用の変数
    var wd_sort_variables = 0;

    //使用するソートを順に記載。対応は下記の通り。
    // 0:ID順, 1:職業順, 2:レベル順, 3:ＨＰ順, 4:ＭＰ順, 5:攻撃力順, 6:防御力順,
    // 7:魔法力順, 8:魔法防御順, 9:敏捷性順, 10:運順, 11:指定ソート
    var wd_sort_series = [0,1,2,3,4,5,6,7,8,9,10,11]; 

    //wd_sort_seriesで指定したソートの名称を順に記載。
    var wd_sort_names  = ["ID順","職業順","レベル順","ＨＰ順","ＭＰ順","攻撃力順","防御力順","魔法力順","魔法防御順","敏捷性順","運順","指定ソート"];

    //指定ソート。アクターのID順に優先順位を記載。
    var wd_sort_assing = [2,1,3,4,5,6,8,7];

    //======== 基本設定終わり(以下、本体プログラム) ========



    const pluginName = "WDmzPartyChange";

    PluginManager.registerCommand(pluginName, "change", args => {
        SceneManager.push(Scene_PartyChange);
    });
    PluginManager.registerCommand(pluginName, "eliminate", args => {
        SceneManager.push(Scene_PartyEliminate);
    });
    PluginManager.registerCommand(pluginName, "show", args => {
        SceneManager.push(Scene_PartyShow);
    });
    PluginManager.registerCommand(pluginName, "preload", args => {
        var i;
        var j=0;
        for (i = 1; i < $dataActors.length; i++) {
            if($gameSwitches.value(wd_actor1_switch+i-1)){
                actor = $gameActors.actor(i);
                if(wd_front_charaview || wd_back_charaview || wd_status_charaview){
                    ImageManager.loadCharacter(actor.characterName());
                }
                if(wd_front_faceview || wd_back_faceview || wd_status_faceview){
                    ImageManager.loadFace(actor.faceName());
                }
            }
        }
    });

    
    const _Sprite_Button_loadButtonImage = Sprite_Button.prototype.loadButtonImage;
    Sprite_Button.prototype.loadButtonImage = function() {
        _Sprite_Button_loadButtonImage.apply(this, arguments);
        if(this._buttonType=='sort'){
            this.bitmap = ImageManager.loadSystem("ButtonSetWD");
        }
    };

    const _Sprite_Button_buttonData = Sprite_Button.prototype.buttonData;
    Sprite_Button.prototype.buttonData = function() {
        if(this._buttonType=='sort'){
            return { x: 0, w: 2 };
        }

        return _Sprite_Button_buttonData.apply(this, arguments);
    };



    function Scene_PartyChange() {
        this.initialize(...arguments);
    }

    Scene_PartyChange.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_PartyChange.prototype.constructor = Scene_PartyChange;
    
    Scene_PartyChange.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_PartyChange.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._mode = 0;
        this.createFrontWindow();
        this.createBackWindow();
        this.createStatusWindow();
        this.createText1Window();
        this.createText2Window();
        if(wd_sort_use){
            this.createSortWindow();
        }
        this._frontWindow.setStatusWindow(this._statusWindow);
        this._backWindow.setStatusWindow(this._statusWindow);
        this._frontWindow.activate();
        this._backWindow.deactivate();
    };

    Scene_PartyChange.prototype.createFrontWindow = function() {
        const rect = this.frontWindowRect();
        this._frontWindow = new Window_PartyChangeFront(rect);
        this._frontWindow.setHandler("cancel", this.frontCancel.bind(this));
        this._frontWindow.setHandler('ok', this.frontOk.bind(this));
        this.addWindow(this._frontWindow);
    };

    Scene_PartyChange.prototype.frontWindowRect = function() {
        const wx = wd_front_x;
        const wy = wd_front_y;
        const ww = wd_front_width;
        const wh = wd_front_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.createBackWindow = function() {
        const rect = this.backWindowRect();
        this._backWindow = new Window_PartyChangeBack(rect, this._mode);
        this._backWindow.setHandler("cancel", this.backCancel.bind(this));
        this._backWindow.setHandler('ok', this.backOk.bind(this));
        this.addWindow(this._backWindow);
    };

    Scene_PartyChange.prototype.backWindowRect = function() {
        const wx = wd_back_x;
        const wy = wd_back_y;
        const ww = wd_back_width;
        const wh = wd_back_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_PartyChangeStatus(rect);
        this.addWindow(this._statusWindow);
    };

    Scene_PartyChange.prototype.statusWindowRect = function() {
        const wx = wd_status_x;
        const wy = wd_status_y;
        const ww = wd_status_width;
        const wh = wd_status_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.createText1Window = function() {
        const rect = this.text1WindowRect();
        this._text1Window = new Window_PartyChangeText1(rect);
        this.addWindow(this._text1Window);
    };

    Scene_PartyChange.prototype.text1WindowRect = function() {
        const wx = wd_text1_x;
        const wy = wd_text1_y;
        const ww = wd_text1_width;
        const wh = wd_text1_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.createText2Window = function() {
        const rect = this.text2WindowRect();
        this._text2Window = new Window_PartyChangeText2(rect);
        this.addWindow(this._text2Window);
    };

    Scene_PartyChange.prototype.text2WindowRect = function() {
        const wx = wd_text2_x;
        const wy = wd_text2_y;
        const ww = wd_text2_width;
        const wh = wd_text2_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.createSortWindow = function() {
        const rect = this.sortWindowRect();
        this._sortWindow = new Window_PartyChangeSort(rect);
        this.addWindow(this._sortWindow);
    };

    Scene_PartyChange.prototype.sortWindowRect = function() {
        const wx = wd_sort_x;
        const wy = wd_sort_y;
        const ww = wd_sort_width;
        const wh = wd_sort_height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyChange.prototype.frontOk = function() {
        this._frontWindow.deactivate();
        this._backWindow.activate();
        this._backWindow.setFrontActor($gameParty.members()[this._frontWindow._index]);
        this._backWindow.refresh();
        if(this._backWindow._index==this._backWindow.maxItems()){
            this._backWindow.select(this._backWindow.maxItems()-1);
        }
    };

    Scene_PartyChange.prototype.frontCancel = function() {
        if($gameParty.isAllDead()&&!wd_alldead_ok){
            this._frontWindow.activate();
        }else{
            this.popScene();
        }
    };

    Scene_PartyChange.prototype.backOk = function() {      
        if(this._backWindow._list[this._backWindow._index]){
            $gameParty._actors.splice(this._frontWindow._index, 1, this._backWindow._list[this._backWindow._index]._actorId);
        }else{
            $gameParty._actors.splice(this._frontWindow._index, 1);            
        }
        $gamePlayer.refresh();
        this._frontWindow.refresh();
        this._backWindow.refresh();
        this._backWindow.deactivate();
        this._frontWindow.activate();
    };

    Scene_PartyChange.prototype.backCancel = function() {
        this._backWindow.deactivate();
        this._frontWindow.activate();
    };

    Scene_PartyChange.prototype.sortActors = function() {
        $gameVariables.setValue(wd_sort_variables, $gameVariables.value(wd_sort_variables)+1);
        if($gameVariables.value(wd_sort_variables) >= wd_sort_series.length){
            $gameVariables.setValue(wd_sort_variables, 0);
        }
        this._backWindow.refresh();
        this._sortWindow.refresh();
        SoundManager.playCursor();
    };

    Scene_PartyChange.prototype.needsPageButtons = function() {
        return wd_pagebutton_use;
    };

    Scene_PartyChange.prototype.arePageButtonsEnabled = function() {
        if(this._mode==1&&this._backWindow){
            if(this._backWindow.active){
                return true;
            }else{
                return false;
            }    
        }else{
            return true;
        }
    };

    Scene_PartyChange.prototype.nextActor = function() {
        if(wd_pagebutton_partylist&&this._mode==0){
            if(this._frontWindow.active){
                this._frontWindow.cursorPagedown();
            }else{
                this._backWindow.cursorPagedown();
            }
        }else{
            this._backWindow.cursorPagedown();
        }
        SoundManager.playCursor();
    };
    
    Scene_PartyChange.prototype.previousActor = function() {
        if(wd_pagebutton_partylist&&this._mode==0){
            if(this._frontWindow.active){
                this._frontWindow.cursorPageup();
            }else{
                this._backWindow.cursorPageup();
            }
        }else{
            this._backWindow.cursorPageup();
        }
        SoundManager.playCursor();
    };

    Scene_PartyChange.prototype.createButtons = function() {
        if (ConfigManager.touchUI) {
            if (this.needsCancelButton()) {
                this.createCancelButton();
            }
            if (this.needsPageButtons()) {
                this.createPageButtons();
            }
            if(wd_sort_use){
                this.createSortButton();
            }
        }
    };
    
    Scene_PartyChange.prototype.createSortButton = function() {
        this._sortButton = new Sprite_Button("sort");
        this._sortButton.x = 204;
        this._sortButton.y = this.buttonY();
        this.addWindow(this._sortButton);
        this._sortButton.setClickHandler(this.sortActors.bind(this));
    };
    
    Scene_PartyChange.prototype.updateSortButton = function() {
        if (this._sortButton) {
            const enabled = this.areSortButtonEnabled();
            this._sortButton.visible = enabled;
        }
    };
    
    Scene_PartyChange.prototype.areSortButtonEnabled = function() {
        return this.arePageButtonsEnabled();
    };

    Scene_PartyChange.prototype.updateSortTrigger = function() {
        if (this._sortButton) {
            const enabled = this.areSortButtonEnabled();
            this._sortButton.visible = enabled;
        }
    };

    Scene_PartyChange.prototype.updateSortRequested = function() {
        if (Input.isTriggered("shift")&&this._sortButton&&this.areSortButtonEnabled()) {
            this.sortActors();
        }
    };

    Scene_PartyChange.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.updatePageButtons();
        this.updateSortButton();
        this.updateSortRequested();
    };



    function Scene_PartyEliminate() {
        this.initialize(...arguments);
    }

    Scene_PartyEliminate.prototype = Object.create(Scene_PartyChange.prototype);
    Scene_PartyEliminate.prototype.constructor = Scene_PartyEliminate;

    Scene_PartyEliminate.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._mode = 1;
        this.createBackWindow();
        this.createStatusWindow();
        this.createText2Window();
        if(wd_sort_use){
            this.createSortWindow();
        }
        this.createEliminateWindow();
        this._backWindow.setStatusWindow(this._statusWindow);
        this._backWindow.activate();
        this._eliminateWindow.deactivate();
    };

    Scene_PartyEliminate.prototype.createBackWindow = function() {
        const rect = this.backWindowRect();
        this._backWindow = new Window_PartyChangeBack(rect, this._mode);
        this._backWindow.setHandler("cancel", this.popScene.bind(this));
        this._backWindow.setHandler('ok', this.backOk.bind(this));
        this.addWindow(this._backWindow);
    };

    Scene_PartyEliminate.prototype.backWindowRect = function() {
        const wx = wd_back_x2;
        const wy = wd_back_y2;
        const ww = wd_back_width2;
        const wh = wd_back_height2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyEliminate.prototype.text2WindowRect = function() {
        const wx = wd_text2_x2;
        const wy = wd_text2_y2;
        const ww = wd_text2_width2;
        const wh = wd_text2_height2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyEliminate.prototype.sortWindowRect = function() {
        const wx = wd_sort_x2;
        const wy = wd_sort_y2;
        const ww = wd_sort_width2;
        const wh = wd_sort_height2;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_PartyEliminate.prototype.createEliminateWindow = function() {
        const rect = this.eliminateWindowRect();
        this._eliminateWindow = new Window_PartyChangeEliminate(rect);
        this._eliminateWindow.setHandler("cancel", this.eliminateCancel.bind(this));
        this._eliminateWindow.setHandler('ok', this.eliminateOk.bind(this));
        this.addWindow(this._eliminateWindow);
    };

    Scene_PartyEliminate.prototype.eliminateWindowRect = function() {
        const wx = (Graphics.boxWidth - 240) / 2;
        const wy = 240;
        const ww = 240;
        const wh = this.calcWindowHeight(2, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_PartyEliminate.prototype.backOk = function() {
        this._backWindow.deactivate();
        this._eliminateWindow.select(1);
        this._eliminateWindow.show();
        this._eliminateWindow.activate();
    };

    Scene_PartyEliminate.prototype.eliminateOk = function() {      
        if(this._backWindow._list[this._backWindow._index]){
            var i = this._backWindow._list[this._backWindow._index]._actorId
            $gameSwitches.setValue(wd_actor1_switch+i-1, false);
        }
        this._backWindow.refresh();
        this._backWindow.activate();
        this._eliminateWindow.hide();
        this._eliminateWindow.deactivate();
        if(!this._backWindow._list[this._backWindow._index]){
            this._backWindow.select(this._backWindow._index-1);
        }
    };

    Scene_PartyEliminate.prototype.eliminateCancel = function() {      
        this._backWindow.activate();
        this._eliminateWindow.hide();
        this._eliminateWindow.deactivate();
    };



    function Scene_PartyShow() {
        this.initialize(...arguments);
    }

    Scene_PartyShow.prototype = Object.create(Scene_PartyEliminate.prototype);
    Scene_PartyShow.prototype.constructor = Scene_PartyShow;

    Scene_PartyShow.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._mode = 2;
        this.createBackWindow();
        this.createStatusWindow();
        this.createText2Window();
        if(wd_sort_use){
            this.createSortWindow();
        }
        this._backWindow.setStatusWindow(this._statusWindow);
        this._backWindow.activate();
    };

    Scene_PartyShow.prototype.createBackWindow = function() {
        const rect = this.backWindowRect();
        this._backWindow = new Window_PartyChangeBack(rect, this._mode);
        this._backWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._backWindow);
    };



    function Window_PartyChangeBase() {
        this.initialize(...arguments);
    } 
    Window_PartyChangeBase.prototype = Object.create(Window_StatusBase.prototype);
    Window_PartyChangeBase.prototype.constructor = Window_PartyChangeBase;

    Window_PartyChangeBase.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.updateStatus();
    };
    
    Window_PartyChangeBase.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };

    Window_PartyChangeBase.prototype.updateStatus = function() {
        if (this._statusWindow && this.active) {
            var item = this._list[this.index()];
            this._statusWindow.setItem(item);
        }
    };

    Window_PartyChangeBase.prototype.isCurrentItemEnabled = function() {
        return this._listEnabled[this._index];
    };

    Window_PartyChangeBase.prototype.maxItems = function() {
        return this._list ? this._list.length : 0;
    };

    Window_PartyChangeBase.prototype.drawActorCharacter = function(actor, x, y) {
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
    };

    Window_PartyChangeBase.prototype.drawActorParam = function(actor, i, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.param(i), x, y, width - 60);
        this.resetTextColor();
        this.drawText(actor.param(i), x + width - 60, y, 60, 'right');
    };

    Window_PartyChangeBase.prototype.drawActorLevel = function(actor, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + width - 36, y, 36, 'right');
    };

    Window_PartyChangeBase.prototype.cursorDown = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
            this.smoothSelect((index + maxCols) % maxItems);
        }else if(this.row() == this.maxRows()-2){ //modify
            this.smoothSelect(maxItems-1); //modify
        }
    };



    function Window_PartyChangeFront() {
        this.initialize(...arguments);
    }

    Window_PartyChangeFront.prototype = Object.create(Window_PartyChangeBase.prototype);
    Window_PartyChangeFront.prototype.constructor = Window_PartyChangeFront;

    Window_PartyChangeFront.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this.refresh();
        this.setTopRow(0);
        this.select(0);
    };

    Window_PartyChangeFront.prototype.maxCols = function() {
        return wd_front_maxcols;
    };

    Window_PartyChangeFront.prototype.refresh = function() {
        var i, actor;
        this._list = [];
        this._listEnabled = [];
        for (const actor of $gameParty.members()) {
            this._list.push(actor);
            if($gameSwitches.value(wd_fix_switch1[actor._actorId])){
                this._listEnabled.push(false);                
            }else{
                this._listEnabled.push(true);                
            }
        }
        if($gameParty.members().length < wd_party_max){
            this._list.push(null);
            this._listEnabled.push(true); 
        }
        this.paint();
    };

    Window_PartyChangeFront.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = wd_front_rect_width;
        rect.height = wd_front_rect_height;
        rect.x = index % maxCols * (rect.width + wd_front_rect_spacing) - this.scrollBaseX();
        rect.y = Math.floor(index / maxCols) * (rect.height + wd_front_rect_interval) - this.scrollBaseY();
        return rect;
    };

    Window_PartyChangeFront.prototype.itemHeight = function() {
        return wd_front_rect_height + wd_front_rect_interval;
    };

    Window_PartyChangeFront.prototype.scrollBlockHeight = function() {
        return wd_front_rect_height + wd_front_rect_interval;
    };   

    Window_PartyChangeFront.prototype.drawItem = function(index) {
        var actor = this._list[index];
        var rect = this.itemRect(index);
        if(actor){
            this.changePaintOpacity(this._listEnabled[index]);

            this.contents.fontSize =  wd_front_fontsize;
            if(wd_front_faceview){
                this.drawActorFace(actor, rect.x + wd_front_faceview_x, rect.y + wd_front_faceview_y)
            }
            if(wd_front_charaview){
                this.drawActorCharacter(actor, rect.x + wd_front_charaview_x, rect.y + wd_front_charaview_y)
            }
            if(wd_front_stateview){
                this.drawActorIcons(actor, rect.x + wd_front_stateview_x, rect.y + wd_front_stateview_y, wd_front_stateview_width);
            }
            if(wd_front_nameview){
                this.drawActorName(actor, rect.x + wd_front_nameview_x, rect.y + wd_front_nameview_y, wd_front_nameview_width);
            }
            if(wd_front_classview){
                this.drawActorClass(actor, rect.x + wd_front_classview_x, rect.y + wd_front_classview_y, wd_front_classview_width);
            }
            if(wd_front_nickview){
                this.drawActorNickname(actor, rect.x + wd_front_nickview_x, rect.y + wd_front_nickview_y, wd_front_nickview_width);
            }
            if(wd_front_lvview){
                this.drawActorLevel(actor, rect.x + wd_front_lvview_x, rect.y + wd_front_lvview_y, wd_front_lvview_width);
            }
            if(wd_front_hpgaugeview){
                this.placeGauge(actor, "hp", rect.x + wd_front_hpgaugeview_x, rect.y + wd_front_hpgaugeview_y);
            }
            if(wd_front_mpgaugeview){
                this.placeGauge(actor, "mp", rect.x + wd_front_mpgaugeview_x, rect.y + wd_front_mpgaugeview_y);
            }
            if(wd_front_tpgaugeview){
                this.placeGauge(actor, "tp", rect.x + wd_front_tpgaugeview_x, rect.y + wd_front_tpgaugeview_y);
            }
            if(wd_front_mhpview){
                this.drawActorParam(actor, 0, rect.x + wd_front_mhpview_x, rect.y + wd_front_mhpview_y, wd_front_mhpview_width);
            }
            if(wd_front_mmpview){
                this.drawActorParam(actor, 1, rect.x + wd_front_mmpview_x, rect.y + wd_front_mmpview_y, wd_front_mmpview_width);
            }
            if(wd_front_atkview){
                this.drawActorParam(actor, 2, rect.x + wd_front_atkview_x, rect.y + wd_front_atkview_y, wd_front_atkview_width);
            }
            if(wd_front_defview){
                this.drawActorParam(actor, 3, rect.x + wd_front_defview_x, rect.y + wd_front_defview_y, wd_front_defview_width);
            }
            if(wd_front_matview){
                this.drawActorParam(actor, 4, rect.x + wd_front_matview_x, rect.y + wd_front_matview_y, wd_front_matview_width);
            }
            if(wd_front_mdfview){
                this.drawActorParam(actor, 5, rect.x + wd_front_mdfview_x, rect.y + wd_front_mdfview_y, wd_front_mdfview_width);
            }
            if(wd_front_agiview){
                this.drawActorParam(actor, 6, rect.x + wd_front_agiview_x, rect.y + wd_front_agiview_y, wd_front_agiview_width);
            }
            if(wd_front_lukview){
                this.drawActorParam(actor, 7, rect.x + wd_front_lukview_x, rect.y + wd_front_lukview_y, wd_front_lukview_width);
            }
            this.contents.fontSize = $gameSystem.mainFontSize();

        }
    };



    function Window_PartyChangeBack() {
        this.initialize(...arguments);
    }

    Window_PartyChangeBack.prototype = Object.create(Window_PartyChangeBase.prototype);
    Window_PartyChangeBack.prototype.constructor = Window_PartyChangeBack;

    Window_PartyChangeBack.prototype.initialize = function(rect, mode) {
        this._mode = mode;
        Window_StatusBase.prototype.initialize.call(this, rect);
        this.refresh();
        this.setTopRow(0);
        this.select(0);
    };

    Window_PartyChangeBack.prototype.maxCols = function() {
        return wd_back_maxcols;
    };

    Window_PartyChangeBack.prototype.refresh = function() {
        var i, actor;
        this._list = [];
        for (i = 1; i < $dataActors.length; i++) {
            if($gameSwitches.value(wd_actor1_switch+i-1)){
                actor = $gameActors.actor(i);
                this._list.push(actor);
            }
        }
        sort_flag = wd_sort_series[$gameVariables.value(wd_sort_variables)];
        switch (sort_flag){
        case 0:
            this._list.sort(function(a, b) {
                return - b._actorId + a._actorId;
            });        
            break;
        case 1:
            this._list.sort(function(a, b) {
                return - b._classId * 1000000 - b._actorId + a._classId * 1000000 + a._actorId;
            });        
            break;
        case 2:
            this._list.sort(function(a, b) {
                return b.level * 1000000 - b._actorId - a.level * 1000000 + a._actorId;
            });        
            break;
        case 3:
            this._list.sort(function(a, b) {
                return b.mhp * 1000000 - b._actorId - a.mhp * 1000000 + a._actorId;
            });        
            break;
        case 4:
            this._list.sort(function(a, b) {
                return b.mmp * 1000000 - b._actorId - a.mmp * 1000000 + a._actorId;
            });        
            break;
        case 5:
            this._list.sort(function(a, b) {
                return b.atk * 1000000 - b._actorId - a.atk * 1000000 + a._actorId;
            });        
            break;
        case 6:
            this._list.sort(function(a, b) {
                return b.def * 1000000 - b._actorId - a.def * 1000000 + a._actorId;
            });        
            break;
        case 7:
            this._list.sort(function(a, b) {
                return b.mat * 1000000 - b._actorId - a.mat * 1000000 + a._actorId;
            });        
            break;
        case 8:
            this._list.sort(function(a, b) {
                return b.mdf * 1000000 - b._actorId - a.mdf * 1000000 + a._actorId;
            });        
            break;
        case 9:
            this._list.sort(function(a, b) {
                return b.agi * 1000000 - b._actorId - a.agi * 1000000 + a._actorId;
            });        
            break;
        case 10:
            this._list.sort(function(a, b) {
                return b.luk * 1000000 - b._actorId - a.luk * 1000000 + a._actorId;
            });        
            break;
        case 11:
            this._list.sort(function(a, b) {
                return - wd_sort_assing[b._actorId-1] + wd_sort_assing[a._actorId-1];
            });        
            break;
        }

        this._listEnabled = [];
        for (i = 0; i < this._list.length; i++) {
            actor =  this._list[i]
            if (this._mode !=2 && $gameParty.members().contains(actor)) {
                this._listEnabled.push(false);
            }else if(this._mode == 1 && $gameSwitches.value(wd_fix_switch2[actor._actorId])){
                this._listEnabled.push(false);
            }else{
                this._listEnabled.push(true);                
            }
        }

        if(wd_remove_only && this._mode==0 && $gameParty.members().length>1){
            if(this._frontActor){
                this._list.push(null);
                this._listEnabled.push(true);    
            }
        }

        this.paint();
    };

    Window_PartyChangeBack.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = wd_back_rect_width;
        rect.height = wd_back_rect_height;
        rect.x = index % maxCols * (rect.width + wd_back_rect_spacing) - this.scrollBaseX();
        rect.y = Math.floor(index / maxCols) * (rect.height + wd_back_rect_interval) - this.scrollBaseY();
        return rect;
    };

    Window_PartyChangeBack.prototype.itemHeight = function() {
        return wd_back_rect_height + wd_back_rect_interval;
    };

    Window_PartyChangeBack.prototype.scrollBlockHeight = function() {
        return wd_back_rect_height + wd_back_rect_interval;
    };   

    Window_PartyChangeBack.prototype.setFrontActor = function(actor) {
        this._frontActor = actor;
    };  

    Window_PartyChangeBack.prototype.drawItem = function(index) {
        var actor = this._list[index];
        var rect = this.itemRect(index);
        if(actor){
            this.changePaintOpacity(this._listEnabled[index]);

            this.contents.fontSize =  wd_back_fontsize;
            if(wd_back_faceview){
                this.drawActorFace(actor, rect.x + wd_back_faceview_x, rect.y + wd_back_faceview_y)
            }
            if(wd_back_charaview){
                this.drawActorCharacter(actor, rect.x + wd_back_charaview_x, rect.y + wd_back_charaview_y)
            }
            if(wd_back_stateview){
                this.drawActorIcons(actor, rect.x + wd_back_stateview_x, rect.y + wd_back_stateview_y, wd_back_stateview_width);
            }
            if(wd_back_nameview){
                this.drawActorName(actor, rect.x + wd_back_nameview_x, rect.y + wd_back_nameview_y, wd_back_nameview_width);
            }
            if(wd_back_classview){
                this.drawActorClass(actor, rect.x + wd_back_classview_x, rect.y + wd_back_classview_y, wd_back_classview_width);
            }
            if(wd_back_nickview){
                this.drawActorNickname(actor, rect.x + wd_back_nickview_x, rect.y + wd_back_nickview_y, wd_back_nickview_width);
            }
            if(wd_back_lvview){
                this.drawActorLevel(actor, rect.x + wd_back_lvview_x, rect.y + wd_back_lvview_y, wd_back_lvview_width);
            }
            if(wd_back_hpgaugeview){
                this.placeGauge(actor, "hp", rect.x + wd_back_hpgaugeview_x, rect.y + wd_back_hpgaugeview_y);
            }
            if(wd_back_mpgaugeview){
                this.placeGauge(actor, "mp", rect.x + wd_back_mpgaugeview_x, rect.y + wd_back_mpgaugeview_y);
            }
            if(wd_back_tpgaugeview){
                this.placeGauge(actor, "tp", rect.x + wd_back_tpgaugeview_x, rect.y + wd_back_tpgaugeview_y);
            }
            if(wd_back_mhpview){
                this.drawActorParam(actor, 0, rect.x + wd_back_mhpview_x, rect.y + wd_back_mhpview_y, wd_back_mhpview_width);
            }
            if(wd_back_mmpview){
                this.drawActorParam(actor, 1, rect.x + wd_back_mmpview_x, rect.y + wd_back_mmpview_y, wd_back_mmpview_width);
            }
            if(wd_back_atkview){
                this.drawActorParam(actor, 2, rect.x + wd_back_atkview_x, rect.y + wd_back_atkview_y, wd_back_atkview_width);
            }
            if(wd_back_defview){
                this.drawActorParam(actor, 3, rect.x + wd_back_defview_x, rect.y + wd_back_defview_y, wd_back_defview_width);
            }
            if(wd_back_matview){
                this.drawActorParam(actor, 4, rect.x + wd_back_matview_x, rect.y + wd_back_matview_y, wd_back_matview_width);
            }
            if(wd_back_mdfview){
                this.drawActorParam(actor, 5, rect.x + wd_back_mdfview_x, rect.y + wd_back_mdfview_y, wd_back_mdfview_width);
            }
            if(wd_back_agiview){
                this.drawActorParam(actor, 6, rect.x + wd_back_agiview_x, rect.y + wd_back_agiview_y, wd_back_agiview_width);
            }
            if(wd_back_lukview){
                this.drawActorParam(actor, 7, rect.x + wd_back_lukview_x, rect.y + wd_back_lukview_y, wd_back_lukview_width);
            }
            this.contents.fontSize = $gameSystem.mainFontSize();

        }
    };



    function Window_PartyChangeStatus() {
        this.initialize(...arguments);
    }

    Window_PartyChangeStatus.prototype = Object.create(Window_StatusBase.prototype);
    Window_PartyChangeStatus.prototype.constructor = Window_PartyChangeStatus;

    Window_PartyChangeStatus.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_PartyChangeStatus.prototype.setItem = function(item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_PartyChangeStatus.prototype.drawActorCharacter = function(actor, x, y) {
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
    };

    Window_PartyChangeStatus.prototype.drawActorParam = function(actor, i, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.param(i), x, y, width - 60);
        this.resetTextColor();
        this.drawText(actor.param(i), x + width - 60, y, 60, 'right');
    };

    Window_PartyChangeStatus.prototype.drawActorLevel = function(actor, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + width - 36, y, 36, 'right');
    };

    Window_PartyChangeStatus.prototype.drawActorEquipments = function(actor, x, y) {
        var equips = actor.equips();
        var count = Math.min(equips.length, 8);
        for (var i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };

    Window_PartyChangeStatus.prototype.refresh = function() {
        var actor = this._item;

        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();

        this.contents.clear();
        this.hideAdditionalSprites();

        if (!actor) {
            return;
        }
            this.contents.fontSize =  wd_status_fontsize;
            if(wd_status_faceview){
                this.drawActorFace(actor, x + wd_status_faceview_x, y + wd_status_faceview_y)
            }
            if(wd_status_charaview){
                this.drawActorCharacter(actor, x + wd_status_charaview_x, y + wd_status_charaview_y)
            }
            if(wd_status_stateview){
                this.drawActorIcons(actor, x + wd_status_stateview_x, y + wd_status_stateview_y, wd_status_stateview_width);
            }
            if(wd_status_nameview){
                this.drawActorName(actor, x + wd_status_nameview_x, y + wd_status_nameview_y, wd_status_nameview_width);
            }
            if(wd_status_classview){
                this.drawActorClass(actor, x + wd_status_classview_x, y + wd_status_classview_y, wd_status_classview_width);
            }
            if(wd_status_nickview){
                this.drawActorNickname(actor, x + wd_status_nickview_x, y + wd_status_nickview_y, wd_status_nickview_width);
            }
            if(wd_status_lvview){
                this.drawActorLevel(actor, x + wd_status_lvview_x, y + wd_status_lvview_y, wd_status_lvview_width);
            }
            if(wd_status_hpgaugeview){
                this.placeGauge(actor, "hp", x + wd_status_hpgaugeview_x, y + wd_status_hpgaugeview_y);
            }
            if(wd_status_mpgaugeview){
                this.placeGauge(actor, "mp", x + wd_status_mpgaugeview_x, y + wd_status_mpgaugeview_y);
            }
            if(wd_status_tpgaugeview){
                this.placeGauge(actor, "tp", x + wd_status_tpgaugeview_x, y + wd_status_tpgaugeview_y);
            }
            if(wd_status_mhpview){
                this.drawActorParam(actor, 0, x + wd_status_mhpview_x, y + wd_status_mhpview_y, wd_status_mhpview_width);
            }
            if(wd_status_mmpview){
                this.drawActorParam(actor, 1, x + wd_status_mmpview_x, y + wd_status_mmpview_y, wd_status_mmpview_width);
            }
            if(wd_status_atkview){
                this.drawActorParam(actor, 2, x + wd_status_atkview_x, y + wd_status_atkview_y, wd_status_atkview_width);
            }
            if(wd_status_defview){
                this.drawActorParam(actor, 3, x + wd_status_defview_x, y + wd_status_defview_y, wd_status_defview_width);
            }
            if(wd_status_matview){
                this.drawActorParam(actor, 4, x + wd_status_matview_x, y + wd_status_matview_y, wd_status_matview_width);
            }
            if(wd_status_mdfview){
                this.drawActorParam(actor, 5, x + wd_status_mdfview_x, y + wd_status_mdfview_y, wd_status_mdfview_width);
            }
            if(wd_status_agiview){
                this.drawActorParam(actor, 6, x + wd_status_agiview_x, y + wd_status_agiview_y, wd_status_agiview_width);
            }
            if(wd_status_lukview){
                this.drawActorParam(actor, 7, x + wd_status_lukview_x, y + wd_status_lukview_y, wd_status_lukview_width);
            }
            if(wd_status_equipview){
                this.drawActorEquipments(actor, x + wd_status_equipview_x, y + wd_status_equipview_y);
            }
            this.contents.fontSize = $gameSystem.mainFontSize();

    };



    function Window_PartyChangeText1() {
        this.initialize(...arguments);
    }

    Window_PartyChangeText1.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeText1.prototype.constructor = Window_PartyChangeText1;

    Window_PartyChangeText1.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };
    
    Window_PartyChangeText1.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = wd_text1_fontsize;
        this.drawText(wd_text1_mess, wd_text1_text_x, wd_text1_text_y, this._width-24, 'center');
    }



    function Window_PartyChangeText2() {
        this.initialize(...arguments);
    }

    Window_PartyChangeText2.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeText2.prototype.constructor = Window_PartyChangeText1;

    Window_PartyChangeText2.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };
    
    Window_PartyChangeText2.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = wd_text2_fontsize;
        this.drawText(wd_text2_mess, wd_text2_text_x, wd_text2_text_y, this._width-24, 'center');
    }



    function Window_PartyChangeSort() {
        this.initialize(...arguments);
    }

    Window_PartyChangeSort.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeSort.prototype.constructor = Window_PartyChangeText1;

    Window_PartyChangeSort.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };
    
    Window_PartyChangeSort.prototype.refresh = function() {
        this.contents.clear();
        this.contents.fontSize = wd_sort_fontsize;
        this.drawText(wd_sort_names[$gameVariables.value(wd_sort_variables)], wd_sort_text_x, wd_sort_text_y, this._width-24, 'center');
    }



    function Window_PartyChangeEliminate() {
        this.initialize(...arguments);
    }

    Window_PartyChangeEliminate.prototype = Object.create(Window_Command.prototype);
    Window_PartyChangeEliminate.prototype.constructor = Window_PartyChangeEliminate;

    Window_PartyChangeEliminate.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.hide();
    };

    Window_PartyChangeEliminate.prototype.makeCommandList = function() {
        this.addCommand(wd_eliminate_text, 'ok');
        this.addCommand("キャンセル",  'cancel');
    };



})();
