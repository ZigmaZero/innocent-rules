//=============================================================================
// TA_AdventureNoteMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Add the function of "adventure note".
 * @author Tamaki Awana
 * @url https://razor-edge.work/
 * @help Add the "adventure note" function that show the next action
 *  to take in the game, and list of sub events.
 * ･Display a sentence that describes the next action to
 *  be taken according to the value of the set variable.
 * ･Display the text according to the value of the variable corresponding
 *  to the sub event in the dedicated detail window.
 * ･When sub event cleared, you can add a cleared symbol
 *  to the event list and details window.
 * 
 * About Main Event:
 *  If you assign the value set in MainEventValue to the
 *  variable set in MainEventVariable, the text and title linked with
 *  the assigned value will be displayed in a dedicated window.
 *  You can switch the displayed text by changing the value of
 *  the variable as the main event progresses.
 * 
 * About Sub Event:
 *  ･When the variable set in SubEventVariable in each subevent becomes
 *   the value set in SubEventStartValue or larger than that,
 *   it is determined that the event has started.
 *  ･Sub event is considered cleared when the value of the variable
 *   is greater than or equal to the value of SubEventClearValue.
 *  ･You can switch the displayed text by changing the value
 *   of the variable as you progress.
 * 
 * Plugin Commands:
 *  SetStartSubEvent [ID of subevent]
 *  Set start a sub event with the setted ID number.
 * 
 *  SetClearSubEvent [ID of subevent]
 *  Set clear a sub event with the setted ID number.
 * 
 *  ResetAllSubEvents
 *  Resets the progress of all sub events,
 *  and sets the all sub events unstarted.
 * 
 *  OpenAdventureNote
 *  Open the adventure note scene.
 * 
 * Notions:
 *  There is no function to display a dedicated notification
 *  at the start / end of a sub-event.
 *  If you want to let the player know the progress of the event,
 *  please use various event commands and other plugins.
 *
 * Update History:
 * ver.1.1 Added plugin command of "Open Adventure Memo".
 *         Added a setting to display other windows
 *         when displaying the details of sub events.
 *         Code Optimized.
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * This plugin is based on a RGSS2 sample script of
 *  "Rector And Black Lion Coat Of Arms"(レクトールと黒獅子の紋章)
 *  of RMVX sample game, and 回想領域's RGSS3 material
 *  "Adventure note"(冒険メモ).
 * Thanks to 回想領域(http://kaisou-ryouiki.sakura.ne.jp/) and
 *  "Rector And Black Lion Coat Of Arms".
 *
 * @param AdvNoteBackground
 * @desc Background on adventure note scene. Select "None" to disable it.
 * @type file
 * @dir img/system
 * @default
 *
 * @param AdvNoteForeground
 * @desc Foreground on adventure note scene. Select "None" to disable it.
 * @type file
 * @dir img/system
 * @default
 *
 * @param AdventureNoteMenuCommand
 * @desc Menu command setting.
 * 
 * @param AdvNoteMenuCommandName
 * @desc The command name of the adventure note to be displayed in the menu.
 * @default Adv. Note
 * @parent Adventure Note Menu Command
 *
 * @param AdvNoteMenuComShowSW
 * @desc When this switch is turned on, the adventure note command is showed on the menu scene. Select "None" to show everytime.
 * @type switch
 * @default 0
 * @parent Adventure Note Menu Command
 *
 * @param AdvNoteMenuComEnableSW
 * @desc When this switch is turned on, enable the adventure note command on the menu scene. Select "None" to show everytime.
 * @type switch
 * @default 0
 * @parent Adventure Note Menu Command
 *
 * @param MainEvent
 * @desc Main event window setting.
 * 
 * @param MainEvents
 * @desc List of main events.
 * @type struct<MainEventList>[]
 * @default ["{\"MainEventValue\":\"0\",\"MainEventTitle\":\"Title of main event.\",\"MainEventNote\":\"\\\"Please enter the details of the main event here.\\\\nIt also supports line breaks and control characters.\\\"\"}"]
 * @parent MainEvent
 *
 * @param MainEventHeaderText
 * @desc Header of main event.
 * @default Next purpose
 * @parent MainEvent
 *
 * @param MainEventVariable
 * @desc Set the variable used to determine the progress of the main event.
 * @type variable
 * @default 0
 * @parent MainEvent
 *
 * @param MainEventWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of main event window.
 * @default 0
 * @parent MainEvent
 *
 * @param MainEventWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of main event window.
 * @default 52
 * @parent MainEvent
 *
 * @param MainEventWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of main event window.
 * @default 808
 * @parent MainEvent
 *
 * @param MainEventWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of main event window.
 * @default 172
 * @parent MainEvent
 * 
 * @param MainEventWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of main event window.
 * @default 255
 * @parent MainEvent
 *
 * @param SubEventHeader
 * @desc Sub event header window setting.
 * 
 * @param SubEventHeaderText
 * @desc Header of sub event.
 * @default Sub Events
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of sub event header window.
 * @default 0
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of sub event header window.
 * @default 224
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of sub event header window.
 * @default 808
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of sub event header window.
 * @default 64
 * @parent SubEventHeader
 * 
 * @param SubEventHeaderWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of sub event header window.
 * @default 255
 * @parent SubEventHeader
 * 
 * @param AchievementRate
 * @desc Sets whether to show the achievement rate in the sub event heading window.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default true
 * @parent SubEventHeader
 *
 * @param AchievementRateHeader
 * @desc Header of achievement rate.
 * @default Achievement Rate
 * @parent SubEventHeader
 * 
 * @param AchievementRateFooter
 * @desc Footer of achievement rate.
 * @default %
 * @parent SubEventHeader
 * 
 * @param SubEvent
 * @desc Sub event setting.
 * 
 * @param SubEventStartValue
 * @desc The value of the variable that is considered to have started the sub event.
 * @type number
 * @min 0
 * @max 99999999
 * @default 1
 * @parent SubEvent
 *
 * @param SubEventClearValue
 * @desc The value of the variable that is considered to have cleared the sub event.
 * @type number
 * @min 0
 * @max 99999999
 * @default 9999
 * @parent SubEvent
 * 
 * @param SubEvents
 * @desc List of sub events.
 * @type struct<SubEventList>[]
 * @default ["{\"id\":\"0\",\"SubEventTitle\":\"Title of sub event.\",\"SubEventVariable\":\"2\",\"SubEventStartNote\":\"\\\"Please enter the details when\\\\n the sub-event started here.\\\\nIt also supports line breaks\\\\n and control characters.\\\"\",\"SubEventClearNote\":\"\\\"Please enter the details when\\\\n the sub-event cleared here.\\\\nIt also supports line breaks\\\\n and control characters.\\\"\",\"SubEventProgress\":\"[\\\"{\\\\\\\"SubEventProgressValue\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"SubEventProgressNote\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Please enter the details of\\\\\\\\\\\\\\\\n the sub-event in progress here.\\\\\\\\\\\\\\\\nIt also supports line breaks\\\\\\\\\\\\\\\\n and control characters.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * @parent SubEvent
 * 
 * @param SubEventListWindow
 * @desc Sub event list window setting.
 * @parent SubEvent
 * 
 * @param SubEventListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of sub event list window.
 * @default 0
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of sub event list window.
 * @default 288
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of sub event list window.
 * @default 808
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of sub event list window.
 * @default 328
 * @parent SubEventListWindow
 * 
 * @param SubEventListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of sub event list window.
 * @default 255
 * @parent SubEventListWindow
 *
 * @param SubEventListCol
 * @desc Number of columns of sub event list window.
 * @default 2
 * @parent SubEventListWindow
 *
 * @param LockedSubEventText
 * @desc The text that shows in place of the title of a sub-event that has not started.
 * @default ----------------------
 * @parent SubEventListWindow
 * 
 * @param SubEventListClearIcon
 * @desc This icon is showed at the head of the cleared sub event name. If set to 0, it will not be displayed.
 * @default 87
 * @parent SubEventListWindow
 *
 * @param SubEventNoteWindow
 * @desc Sub event note window setting.
 * @parent SubEvent
 * 
 * @param SubEventNoteWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of sub event note window.
 * @default 60
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of sub event note window.
 * @default 36
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of sub event note window.
 * @default 640
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of sub event note window.
 * @default 544
 * @parent SubEventNoteWindow
 * 
 * @param SubEventNoteWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of sub event note window.
 * @default 255
 * @parent SubEventNoteWindow
 * 
 * @param SubEventTitleFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc Font size of the title displayed in the sub event note window.
 * @default 30
 * @parent SubEventNoteWindow
 * 
 * @param BackWindows_SENW
 * @desc Whether to display other windows when displaying the notes of the sub event.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default false
 * @parent SubEventNoteWindow
 * 
 * @param Foreground_SENW
 * @desc Whether to display the foreground when displaying the notes of the sub event.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default false
 * @parent SubEventNoteWindow
 * 
 * @param SubEventNoteForeground
 * @desc Foreground used only when the details of the sub-event are displayed. "None" gives priority to the normal foreground.
 * @type file
 * @dir img/system
 * @default
 * @parent Foreground_SENW
 * 
 * @param SubEventClearSymbol
 * @desc Whether the symbol is displayed in the sub event note window when the sub event is cleared.
 * @type select
 * @option None
 * @value none
 * @option Text
 * @value text
 * @option Image
 * @value image
 * @default none
 * @parent SubEvent
 *
 * @param SubEventClearText
 * @desc Text to display in the details of the cleared subevent when selecting "Text".
 * @default CLEAR!
 * @parent SubEventClearSymbol
 *
 * @param SubEventClearImage
 * @desc Image to display in the details of the cleared subevent when selecting "Image".
 * @type file
 * @dir img/system
 * @default
 * @parent SubEventClearSymbol
 * 
 * @param SubEventClearImageWidth
 * @type number
 * @min 1
 * @max 9007
 * @desc Width of the image to be displayed in the details of the cleared sub event when selecting "Image".
 * @default 1
 * @parent SubEventClearImage
 * 
 * @param SubEventClearImageHeight
 * @type number
 * @min 1
 * @max 9007
 * @desc Height of the image to be displayed in the details of the cleared sub event when selecting "Image".
 * @default 1
 * @parent SubEventClearImage
 * 
 * @command SetStartSubEvent
 * @text SetSubEventToStart
 * @desc Set starts a sub event with the setted id number.
 * 
 * @arg SubEventId
 * @type number
 * @default 0
 * @text SubEventID
 * @desc The ID of the sub　event you want to set to the start state.
 * 
 * @command SetClearSubEvent
 * @text SetSubEventToClear
 * @desc Set clears a sub event with the setted id number.
 *
 * @arg SubEventId
 * @type number
 * @default 0
 * @text SubEventID
 * @desc The ID of the sub　event you want to set to the clear state.
 * 
 * @command AllSubEventsReset
 * @text ResetAllSubEvents
 * @desc Resets the progress of all sub-events, and sets the all sub-events unstarted.
 * 
 * @command AdvNoteOpen
 * @text OpenAdventureNote
 * @desc Open the adventure note.
 */
/*~struct~MainEventList:
 * @param MainEventValue
 * @type number
 * @min 0
 * @max 99999999
 * @desc Progress of the main event.
 * @default 0
 *
 * @param MainEventTitle
 * @desc Title of the main event.
 * @default
 *
 * @param MainEventNote
 * @desc Details of the main event.
 * @type note
 * @default
 */
/*~struct~SubEventList:
 * @param id
 * @type number
 * @desc ID of the sub event.
 * @default 0
 * 
 * @param SubEventTitle
 * @desc Title of the sub event.
 * @default
 *
 * @param SubEventVariable
 * @desc Variable corresponding to the sub event.
 * @type variable
 * @default 0
 *
 * @param SubEventStartNote
 * @desc Details when startingthe sub event.
 * @type note
 * @default
 *
 * @param SubEventClearNote
 * @desc Details when clearing the sub event.
 * @type note
 * @default
 *
 * @param SubEventProgress
 * @desc List of the progress of sub events.
 * @type struct<SubEventProgressList>[]
 * @default
 */
/*~struct~SubEventProgressList:
 * @param SubEventProgressValue
 * @desc Progress of the sub event.
 * @type number
 * @min 0
 * @max 99999999
 * @default 2
 *
 * @param SubEventProgressNote
 * @desc Details of the progress of the sub event.
 * @type note
 * @default
 */
/*:ja
 * @target MZ
 * @plugindesc 「冒険メモ」の機能を追加します
 * @author 沫那環
 * @url https://razor-edge.work/
 * @help ゲーム内で次に取るべき行動や、サブイベントの一覧を表示する
 * 機能を備えた「冒険メモ」を追加します。
 * ・設定した変数の値に応じた、次にとるべき行動を記した
 * 　文章を表示することができます。
 * ・サブイベントと対応した変数の値に応じた文章を、
 * 　専用の詳細ウィンドウに表示することができます。
 * ・サブイベントのクリア時に、イベント一覧や詳細ウィンドウに、
 * 　クリア済みのマークを付けることができます。
 * 
 * 【メインイベントについて】
 * 　MainEventVariableで設定した変数に、MainEventValueで設定した値を代入すると、
 * 　代入された値と連動したテキストとタイトルが、専用のウィンドウに表示されます。
 * 　メインイベントの進行に合わせて変数の値を変更することで、
 * 　表示されるテキストを切り替えることができます。
 * 
 * 【サブイベントについて】
 * 　・各サブイベントにあるSubEventVariableで設定した変数が、
 * 　　SubEventStartValueに設定された値、またはそれより大きくなると、
 * 　　そのイベントが開始されていると判定されます。
 * 　・変数の値がSubEventClearValueの値、またはそれより大きくなると、
 * 　　そのサブイベントはクリアされたとみなされます。
 * 　・進行に合わせて変数の値を変更することで、表示されるテキストを
 * 　　切り替えることができます。
 * 
 * 【プラグインコマンド】
 * 　サブイベントを開始状態にする [サブイベントのID]
 * 　指定したIDのサブイベントを開始状態に設定します。
 * 
 * 　サブイベントをクリア状態にする [サブイベントのID]
 * 　指定したIDのサブイベントをクリア状態に設定します。
 * 
 * 　全サブイベントリセット
 * 　全てのサブイベントの進行状況をリセットし、開始されていない状態に設定します。
 * 
 * 　冒険メモを開く
 * 　冒険メモを開きます。
 * 
 * 【注意】
 * 　サブイベントの開始時・終了時に、専用の通知を表示する機能はありません。
 * 　イベントの進行をプレイヤーに知らせたい場合は、
 * 　各種イベントコマンドや、他のプラグインを利用してください。
 *
 * 【更新履歴】
 * 　ver.1.1 プラグインコマンドに「冒険メモを開く」を追加。
 *           サブイベントの詳細表示時に、その他のウィンドウを
 *           表示するかどうかの設定を追加。
 *           コードの最適化。
 * 　ver.1.0 公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * このプラグインを制作するにあたり、
 * RPGツクールVXサンプルゲーム
 * 「レクトールと黒獅子の紋章」の内部スクリプトの一部と、
 * 「回想領域」（http://kaisou-ryouiki.sakura.ne.jp/）の
 * RGSS3素材「冒険メモ」を参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 *
 * @param AdvNoteBackground
 * @desc 冒険メモ画面の背景です。「なし」で無効になります。
 * @type file
 * @dir img/system
 * @default
 *
 * @param AdvNoteForeground
 * @desc 冒険メモ画面の前景です。「なし」で無効になります。
 * @type file
 * @dir img/system
 * @default
 *
 * @param AdventureNoteMenuCommand
 * @desc メニューコマンドに関する設定です。
 * 
 * @param AdvNoteMenuCommandName
 * @desc メニューに表示する冒険メモのコマンド名です。
 * @default 冒険メモ
 * @parent Adventure Note Menu Command
 *
 * @param AdvNoteMenuComShowSW
 * @desc このスイッチをONにすると、メニュー画面に冒険メモのコマンドを表示します。「なし」で常時表示します。
 * @type switch
 * @default 0
 * @parent Adventure Note Menu Command
 *
 * @param AdvNoteMenuComEnableSW
 * @desc このスイッチをONにすると、メニュー画面の冒険メモのコマンドを有効にします。「なし」で常時有効です。
 * @type switch
 * @default 0
 * @parent Adventure Note Menu Command
 *
 * @param MainEvent
 * @desc メインイベントウィンドウのパラメーター設定です。
 * 
 * @param MainEvents
 * @desc メインイベントの一覧です。
 * @type struct<MainEventList>[]
 * @default ["{\"MainEventValue\":\"0\",\"MainEventTitle\":\"メインイベントのタイトル\",\"MainEventNote\":\"\\\"ここにメインイベントの内容を記入してください。\\\\n改行や、制御文字にも対応しています。\\\"\"}"]
 * @parent MainEvent
 *
 * @param MainEventHeaderText
 * @desc メインイベントの見出しです。
 * @default 次の目的
 * @parent MainEvent
 *
 * @param MainEventVariable
 * @desc メインイベントの進行度の判定に使う変数を設定します。
 * @type variable
 * @default 0
 * @parent MainEvent
 *
 * @param MainEventWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc メインイベントウィンドウのX座標です。
 * @default 0
 * @parent MainEvent
 *
 * @param MainEventWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc メインイベントウィンドウのY座標です。
 * @default 52
 * @parent MainEvent
 *
 * @param MainEventWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc メインイベントウィンドウの横幅です。
 * @default 808
 * @parent MainEvent
 *
 * @param MainEventWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc メインイベントウィンドウの縦幅です。
 * @default 172
 * @parent MainEvent
 * 
 * @param MainEventWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc メインイベントウィンドウの透明度です。
 * @default 255
 * @parent MainEvent
 *
 * @param SubEventHeader
 * @desc サブイベント見出しウィンドウのパラメーター設定です。
 * 
 * @param SubEventHeaderText
 * @desc サブイベントの見出しとして表示するテキストです。
 * @default サブイベント
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント見出しウィンドウのX座標です。
 * @default 0
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント見出しウィンドウのY座標です。
 * @default 224
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント見出しウィンドウの横幅です。
 * @default 808
 * @parent SubEventHeader
 *
 * @param SubEventHeaderWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント見出しウィンドウの縦幅です。
 * @default 64
 * @parent SubEventHeader
 * 
 * @param SubEventHeaderWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc サブイベント見出しウィンドウの透明度です。
 * @default 255
 * @parent SubEventHeader
 * 
 * @param AchievementRate
 * @desc サブイベント見出しウィンドウに達成率を表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @parent SubEventHeader
 *
 * @param AchievementRateHeader
 * @desc 達成率の見出しとして表示するテキストです。
 * @default 達成率
 * @parent SubEventHeader
 * 
 * @param AchievementRateFooter
 * @desc 達成率の末尾につけるテキストの設定です。
 * @default ％
 * @parent SubEventHeader
 * 
 * @param SubEvent
 * @desc サブイベント機能についてのパラメーター設定です。
 * 
 * @param SubEventStartValue
 * @desc サブイベントを開始したとみなす変数の値です。
 * @type number
 * @min 0
 * @max 99999999
 * @default 1
 * @parent SubEvent
 *
 * @param SubEventClearValue
 * @desc サブイベントをクリアしたとみなす変数の値です。
 * @type number
 * @min 0
 * @max 99999999
 * @default 9999
 * @parent SubEvent
 * 
 * @param SubEvents
 * @desc サブイベントの一覧です。
 * @type struct<SubEventList>[]
 * @default ["{\"id\":\"0\",\"SubEventTitle\":\"サブイベントのタイトル\",\"SubEventVariable\":\"2\",\"SubEventStartNote\":\"\\\"ここにサブイベントが開始した時の内容を\\\\n記入してください。\\\\n改行や、制御文字にも対応しています。\\\"\",\"SubEventClearNote\":\"\\\"ここにサブイベントをクリアした時の内容を\\\\n記入してください。\\\\n改行や、制御文字にも対応しています。\\\"\",\"SubEventProgress\":\"[\\\"{\\\\\\\"SubEventProgressValue\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"SubEventProgressNote\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ここにサブイベント進行中の内容を\\\\\\\\\\\\\\\\n記入してください。\\\\\\\\\\\\\\\\n改行や、制御文字にも対応しています。\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * @parent SubEvent
 * 
 * @param SubEventListWindow
 * @desc サブイベント一覧ウィンドウのパラメーター設定です。
 * @parent SubEvent
 * 
 * @param SubEventListWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント一覧ウィンドウのX座標です。
 * @default 0
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント一覧ウィンドウのY座標です。
 * @default 288
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント一覧ウィンドウの横幅です。
 * @default 808
 * @parent SubEventListWindow
 *
 * @param SubEventListWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント一覧ウィンドウの縦幅です。
 * @default 328
 * @parent SubEventListWindow
 * 
 * @param SubEventListWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc サブイベント一覧ウィンドウの透明度です。
 * @default 255
 * @parent SubEventListWindow
 *
 * @param SubEventListCol
 * @desc サブイベント一覧ウィンドウの列数です。
 * @default 2
 * @parent SubEventListWindow
 *
 * @param LockedSubEventText
 * @desc 開始されていないサブイベントのタイトルの代わりに表示されるテキストです。
 * @default ----------------------
 * @parent SubEventListWindow
 * 
 * @param SubEventListClearIcon
 * @desc クリアしたサブイベント名の頭に表示されるアイコンです。0を設定すると表示されません。
 * @default 87
 * @parent SubEventListWindow
 *
 * @param SubEventNoteWindow
 * @desc サブイベント詳細ウィンドウのパラメーター設定です。
 * @parent SubEvent
 * 
 * @param SubEventNoteWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント詳細ウィンドウのX座標です。
 * @default 60
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc サブイベント詳細ウィンドウのY座標です。
 * @default 36
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント詳細ウィンドウの横幅です。
 * @default 640
 * @parent SubEventNoteWindow
 *
 * @param SubEventNoteWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc サブイベント詳細ウィンドウの縦幅です。
 * @default 544
 * @parent SubEventNoteWindow
 * 
 * @param SubEventNoteWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc サブイベント詳細ウィンドウの透明度です。
 * @default 255
 * @parent SubEventNoteWindow
 * 
 * @param SubEventTitleFontSize
 * @type number
 * @min 1
 * @max 9007
 * @desc サブイベント詳細ウィンドウに表示されるタイトルのフォントサイズを設定します。
 * @default 30
 * @parent SubEventNoteWindow
 * 
 * @param BackWindows_SENW
 * @desc サブイベントの詳細表示時に、その他のウィンドウを表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent SubEventNoteWindow
 * 
 * @param Foreground_SENW
 * @desc サブイベントの詳細表示時に、前景を表示するかどうか設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @parent SubEventNoteWindow
 * 
 * @param SubEventNoteForeground
 * @desc サブイベントの詳細表示時のみに使用する前景です。「なし」で通常の前景の設定が優先されます。
 * @type file
 * @dir img/system
 * @default
 * @parent Foreground_SENW
 * 
 * @param SubEventClearSymbol
 * @desc サブイベントのクリア時に、詳細ウィンドウにシンボルを表示するかどうか設定します。
 * @type select
 * @option 表示しない
 * @value none
 * @option テキスト
 * @value text
 * @option 画像
 * @value image
 * @default none
 * @parent SubEvent
 *
 * @param SubEventClearText
 * @desc テキストを選択した時に、クリアしたサブイベントの詳細に表示するテキストです。
 * @default CLEAR!
 * @parent SubEventClearSymbol
 *
 * @param SubEventClearImage
 * @desc 画像を選択した時に、クリアしたサブイベントの詳細に表示する画像です。
 * @type file
 * @dir img/system
 * @default
 * @parent SubEventClearSymbol
 * 
 * @param SubEventClearImageWidth
 * @type number
 * @min 1
 * @max 9007
 * @desc 画像を選択した時に、クリアしたサブイベントの詳細に表示する画像の横幅です。
 * @default 1
 * @parent SubEventClearImage
 * 
 * @param SubEventClearImageHeight
 * @type number
 * @min 1
 * @max 9007
 * @desc 画像を選択した時に、クリアしたサブイベントの詳細に表示する画像の縦幅です。
 * @default 1
 * @parent SubEventClearImage
 * 
 * @command SetStartSubEvent
 * @text サブイベントを開始状態にする
 * @desc 指定したIDのサブイベントを開始状態に設定します。
 * 
 * @arg SubEventId
 * @type number
 * @default 0
 * @text サブイベントID
 * @desc 開始状態に設定したいサブイベントのIDです。
 * 
 * @command SetClearSubEvent
 * @text サブイベントをクリア状態にする
 * @desc 指定したIDのサブイベントをクリア状態に設定します。
 *
 * @arg SubEventId
 * @type number
 * @default 0
 * @text サブイベントID
 * @desc クリア状態に設定したいサブイベントのIDです。
 * 
 * @command AllSubEventsReset
 * @text 全サブイベントリセット
 * @desc 全てのサブイベントの進行状況をリセットし、開始されていない状態に設定します。
 * 
 * @command AdvNoteOpen
 * @text 冒険メモを開く
 * @desc 冒険メモを開きます。
 */
/*~struct~MainEventList:ja
 * @param MainEventValue
 * @type number
 * @min 0
 * @max 99999999
 * @desc メインイベントの進行度です。
 * @default 0
 *
 * @param MainEventTitle
 * @desc メインイベントのタイトルです。
 * @default
 *
 * @param MainEventNote
 * @desc メインイベントの詳細です。
 * @type note
 * @default
 */
/*~struct~SubEventList:ja
 * @param id
 * @type number
 * @desc サブイベントのIDです。
 * @default 0
 * 
 * @param SubEventTitle
 * @desc サブイベントのタイトルです。
 * @default
 *
 * @param SubEventVariable
 * @desc サブイベントに対応する変数を設定します。
 * @type variable
 * @default 0
 *
 * @param SubEventStartNote
 * @desc サブイベント開始時の詳細です。
 * @type note
 * @default
 *
 * @param SubEventClearNote
 * @desc サブイベントクリア時の詳細です。
 * @type note
 * @default
 *
 * @param SubEventProgress
 * @desc サブイベントの進捗の一覧です。
 * @type struct<SubEventProgressList>[]
 * @default
 */
/*~struct~SubEventProgressList:ja
 * @param SubEventProgressValue
 * @desc サブイベントの進捗に対応した値です。
 * @type number
 * @min 0
 * @max 99999999
 * @default 2
 *
 * @param SubEventProgressNote
 * @desc サブイベントの進捗の詳細です。
 * @type note
 * @default
 */
(function () {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  function StructConvert(basestruct) {
    return JSON.parse(
      JSON.stringify(basestruct, function (key, value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          try {
            return eval(value);
          } catch (e) {
            return value;
          }
        }
      })
    );
  }

  const mevbase = parameters["MainEvents"];
  const mainevent = StructConvert(mevbase);

  const sevbase = parameters["SubEvents"];
  const subevent = StructConvert(sevbase);

  const advnbg = String(parameters["AdvNoteBackground"] || "");
  const advnfg = String(parameters["AdvNoteForeground"] || "");
  const advnmc = String(parameters["AdvNoteMenuCommandName"]);
  const advnshow = Number(parameters["AdvNoteMenuComShowSW"] || 0);
  const advnenable = Number(parameters["AdvNoteMenuComEnableSW"] || 0);

  const mevwx = Number(parameters["MainEventWindowX"] || 0);
  const mevwy = Number(parameters["MainEventWindowY"] || 52);
  const mevww = Number(parameters["MainEventWindowWidth"] || 808);
  const mevwh = Number(parameters["MainEventWindowHeight"] || 172);
  const mevwop = Number(parameters["MainEventWindowOpacity"] || 255);
  const mevh = parameters["MainEventHeaderText"];
  const mevv = Number(parameters["MainEventVariable"] || 0);

  const sevhwx = Number(parameters["SubEventHeaderWindowX"] || 0);
  const sevhwy = Number(parameters["SubEventHeaderWindowY"] || 224);
  const sevhww = Number(parameters["SubEventHeaderWindowWidth"] || 808);
  const sevhwh = Number(parameters["SubEventHeaderWindowHeight"] || 64);
  const sevhwop = Number(parameters["SubEventHeaderWindowOpacity"] || 255);
  const sevh = parameters["SubEventHeaderText"];
  const achrate = (parameters["AchievementRate"] || "true");
  const achrh = parameters["AchievementRateHeader"];
  const achrf = parameters["AchievementRateFooter"];

  const sevstartv = Number(parameters["SubEventStartValue"] || 1);
  const sevclearv = Number(parameters["SubEventClearValue"] || 9999);

  const sevlwx = Number(parameters["SubEventListWindowX"] || 0);
  const sevlwy = Number(parameters["SubEventListWindowY"] || 288);
  const sevlww = Number(parameters["SubEventListWindowWidth"] || 808);
  const sevlwh = Number(parameters["SubEventListWindowHeight"] || 328);
  const sevlwop = Number(parameters["SubEventListWindowOpacity"] || 255);
  const lsevt = (parameters["LockedSubEventText"]);
  const sevlci = Number(parameters["SubEventListClearIcon"] || 0);

  const sevnwx = Number(parameters["SubEventNoteWindowX"] || 60);
  const sevnwy = Number(parameters["SubEventNoteWindowY"] || 36);
  const sevnww = Number(parameters["SubEventNoteWindowWidth"] || 640);
  const sevnwh = Number(parameters["SubEventNoteWindowHeight"] || 544);
  const sevnwop = Number(parameters["SubEventNoteWindowOpacity"] || 255);
  const sevtsize = Number(parameters["SubEventTitleFontSize"] || 30);
  const bwsenw = (parameters["BackWindows_SENW"] || "false");
  const fgsenw = (parameters["Foreground_SENW"] || "false");
  const sevnfg = (parameters["SubEventNoteForeground"]);

  const sevcs = (parameters["SubEventClearSymbol"] || "none");
  const sevctxt = (parameters["SubEventClearText"]);
  const sevcimg = (parameters["SubEventClearImage"]);
  const sevcimgw = Number(parameters["SubEventClearImageWidth"] || 1);
  const sevcimgh = Number(parameters["SubEventClearImageHeight"] || 1);

  //Plugin Commands
  PluginManager.registerCommand(pluginName, "AllSubEventsReset", args => {
    const ssnumber = $gameSystem.SubEventNumber();
    for (let i = 0; i < ssnumber; i++) {
      $gameVariables.setValue($gameSystem.SubEventVariable(i), 0);
    }
  });

  PluginManager.registerCommand(pluginName, "SetStartSubEvent", args => {
    const seid = Number(args.SubEventId);
    $gameSystem.SetSubEventStart(seid);
  });

  PluginManager.registerCommand(pluginName, "SetClearSubEvent", args => {
    const seid = Number(args.SubEventId);
    $gameSystem.SetSubEventClear(seid);
  });

  PluginManager.registerCommand(pluginName, "AdvNoteOpen", args => {
    SceneManager.push(Scene_AdventureNote);
  });

  //Game_System
  Game_System.prototype.MainEventData = function () {
    const msvslv = $gameVariables.value(mevv);
    const mevdata = mainevent.filter(function ({ MainEventValue }) {
      return MainEventValue <= msvslv;
    });
    return mevdata[mevdata.length - 1];
  };

  Game_System.prototype.MainEventTitle = function () {
    return this.MainEventData().MainEventTitle;
  };

  Game_System.prototype.MainEventNote = function () {
    return this.MainEventData().MainEventNote;
  };

  Game_System.prototype.SubEventNumber = function () {
    return subevent.length;
  };

  Game_System.prototype.SubEventData = function (sevid) {
    return subevent[sevid];
  };

  Game_System.prototype.SubEventTitle = function (sevid) {
    if (this.IsSubEventStarted(sevid)) {
      title = this.SubEventData(sevid).SubEventTitle;
    } else {
      title = lsevt;
    }
    return title;
  };

  Game_System.prototype.SubEventVariable = function (sevid) {
    return this.SubEventData(sevid).SubEventVariable;
  };

  Game_System.prototype.IsSubEventStarted = function (sevid) {
    const sevvslv = $gameVariables.value(this.SubEventVariable(sevid));
    return sevvslv >= sevstartv;
  };

  Game_System.prototype.IsSubEventCleard = function (sevid) {
    const sevvslv = $gameVariables.value(this.SubEventVariable(sevid));
    return sevvslv >= sevclearv;
  };

  Game_System.prototype.SetSubEventStart = function (sevid) {
    $gameVariables.setValue(this.SubEventVariable(sevid), sevstartv);
  };

  Game_System.prototype.SetSubEventClear = function (sevid) {
    $gameVariables.setValue(this.SubEventVariable(sevid), sevclearv);
  };

  Game_System.prototype.SubEventNote = function (sevid) {
    let note = null;
    const sevvslv = $gameVariables.value(this.SubEventVariable(sevid));
    const sevdata = this.SubEventData(sevid).SubEventProgress;
    if (this.IsSubEventCleard(sevid)) {
      note = this.SubEventData(sevid).SubEventClearNote;
    } else if (this.IsSubEventStarted(sevid)) {
      if (sevvslv > sevstartv) {
        result = sevdata.filter(function ({ SubEventProgressValue }) {
          return SubEventProgressValue <= sevvslv;
        });
        note = result[result.length - 1].SubEventProgressNote;
      } else {
        note = this.SubEventData(sevid).SubEventStartNote;
      }
    }
    return note;
  };

  Game_System.prototype.AchievementRate = function () {
    let prog = 0;
    const ssnumber = this.SubEventNumber();
    for (let i = 0; i < ssnumber; i++) {
      if (this.IsSubEventCleard(i)) {
        prog += 2;
      } else if (this.IsSubEventStarted(i)) {
        prog += 1;
      }
    }
    return (prog * 100) / (ssnumber * 2);
  };

  //Window_MainEvent
  function Window_MainEvent() {
    this.initialize.apply(this, arguments);
  }

  Window_MainEvent.prototype = Object.create(Window_Base.prototype);
  Window_MainEvent.prototype.constructor = Window_MainEvent;

  Window_MainEvent.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.drawMSTexts();
  };

  Window_MainEvent.prototype.drawMSTexts = function () {
    const mevhw = this.textWidth(mevh);
    this.drawMSHeader(0, 0);
    this.drawMSTitle(mevhw + 32, 0);
    const lineY = this.lineHeight() + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(
      0,
      lineY,
      this.contentsWidth(),
      2,
      ColorManager.normalColor()
    );
    this.contents.paintOpacity = 255;
    this.drawMSNote(this.itemPadding(), this.lineHeight() * 2);
  };

  Window_MainEvent.prototype.drawMSHeader = function (x, y) {
    const mevhw = this.textWidth(mevh);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(mevh, x, y, mevhw);
    this.resetTextColor();
  };

  Window_MainEvent.prototype.drawMSTitle = function (x, y) {
    const MStitle = $gameSystem.MainEventTitle();
    const mevw = this.textWidth(MStitle);
    this.drawText(MStitle, x, y, mevw);
  };

  Window_MainEvent.prototype.drawMSNote = function (x, y) {
    const MSnote = $gameSystem.MainEventNote();
    this.drawTextEx(MSnote, x, y);
  };

  //Window_SubEventHeader
  function Window_SubEventHeader() {
    this.initialize.apply(this, arguments);
  }

  Window_SubEventHeader.prototype = Object.create(Window_Base.prototype);
  Window_SubEventHeader.prototype.constructor = Window_SubEventHeader;

  Window_SubEventHeader.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.drawSSHeader();
  };

  Window_SubEventHeader.prototype.drawSSHeader = function () {
    const sevhw = this.textWidth(sevh);
    this.drawText(sevh, 0, 0, sevhw);
    if (achrate == "true") {
      this.drawAchievementRate();
    }
  };

  Window_SubEventHeader.prototype.drawAchievementRate = function () {
    const arx = this.contentsWidth() * 0.7;
    const achrhw = this.textWidth(achrh);
    const arate = Number($gameSystem.AchievementRate());
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(achrh, arx, 0, achrhw);
    this.drawText(achrf, arx + achrhw + 72, 0, this.textWidth(achrf));
    this.resetTextColor();
    this.drawText(arate, arx + 56, 0, 96, 'right');
  };

  //Window_SubEventList
  function Window_SubEventList() {
    this.initialize.apply(this, arguments);
  }

  Window_SubEventList.prototype = Object.create(Window_Selectable.prototype);
  Window_SubEventList.prototype.constructor = Window_SubEventList;

  Window_SubEventList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._data = [];
    this.refresh();
  };

  Window_SubEventList.prototype.maxCols = function () {
    return 2;
  };

  Window_SubEventList.prototype.spacing = function () {
    return 48;
  };

  Window_SubEventList.prototype.makeItemList = function () {
    this._data = subevent;
  };

  Window_SubEventList.prototype.maxItems = function () {
    return subevent.length;
  };

  Window_SubEventList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
  };
  
  Window_SubEventList.prototype.isEnabled = function(item) {
    return $gameSystem.IsSubEventStarted(item);
  };

  Window_SubEventList.prototype.drawItem = function (index) {
    const item = this._data[index];
    if (item) {
      const rect = this.itemLineRect(index);
      rect.width -= this.itemPadding();
      const icbw = ImageManager.iconWidth + 4;
      this.resetTextColor();
      this.changePaintOpacity($gameSystem.IsSubEventStarted(index));
      const sev = $gameSystem.SubEventTitle(index);
      if (sevlci > 0) {
        //追加
        if ($gameSystem.IsSubEventCleard(index)) {
          this.drawIcon(sevlci, rect.x + 2, rect.y + 2);
          this.changeTextColor(ColorManager.mpCostColor());
          this.drawText(sev, rect.x + icbw, rect.y, rect.width - icbw);
          this.resetTextColor();
        } else {
        this.drawText(sev, rect.x + icbw, rect.y, rect.width - icbw);
        }
        //ここまで
      } else {
        this.drawText(sev, rect.x, rect.y, rect.width);
      }
      this.changePaintOpacity(1);
    }
  };

  Window_SubEventList.prototype.refresh = function () {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  //Window_SubEventNote
  function Window_SubEventNote() {
    this.initialize.apply(this, arguments);
  }

  Window_SubEventNote.prototype = Object.create(Window_Selectable.prototype);
  Window_SubEventNote.prototype.constructor = Window_SubEventNote;

  Window_SubEventNote.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.note_index = 0;
  };

  Window_SubEventNote.prototype.refresh = function () {
    const cw = this.contents.width;
    const lineheight = this.lineHeight();
    this.contents.clear();
    const sevid = this.note_index;
    this.contents.fontSize = sevtsize;
    this.drawText($gameSystem.SubEventTitle(sevid), 0, 0, cw);
    this.resetFontSettings();
    if ($gameSystem.IsSubEventCleard(sevid)) {
      if (sevcs == "text") {
        const cltxtw = this.textWidth(sevctxt);
        const fsize = this.contents.fontSize;
        this.drawText(sevctxt, cw - cltxtw - fsize / 2, 0, cltxtw);
      } else if (sevcs == "image") {
        const bitmap = ImageManager.loadSystem(sevcimg);
        this.contents.blt(bitmap, 0, 0, sevcimgw, sevcimgh, cw - sevcimgw, 0)
      }
    }
    this.drawTextEx($gameSystem.SubEventNote(sevid), this.itemPadding(), lineheight * 2)
  };

  //Scene_AdventureNote
  function Scene_AdventureNote() {
    this.initialize.apply(this, arguments);
  }

  Scene_AdventureNote.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_AdventureNote.prototype.constructor = Scene_AdventureNote;

  Scene_AdventureNote.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_AdventureNote.prototype.create = function () {
    if (sevcs == "image") {
      ImageManager.loadSystem(sevcimg);
    }
    Scene_MenuBase.prototype.create.call(this);
    this.createMainEventWindow();
    this.createSubEventHeaderWindow();
    this.createSubEventListWindow();
    this.createSubEventNoteWindow();
    this._subeventlistWindow.activate();
    this._subeventlistWindow.select(0);
    this.createSSNBackSprite();
  };

  Scene_AdventureNote.prototype.createMainEventWindow = function () {
    const rect = this.mainEventWindowRect();
    this._maineventWindow = new Window_MainEvent(rect);
    this.addWindow(this._maineventWindow);
    this._maineventWindow.opacity = mevwop;
  };

  Scene_AdventureNote.prototype.mainEventWindowRect = function () {
    const wx = mevwx;
    const wy = mevwy;
    const ww = mevww;
    const wh = mevwh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_AdventureNote.prototype.createSubEventHeaderWindow = function () {
    const rect = this.subEventHeaderWindowRect();
    this._ssheaderWindow = new Window_SubEventHeader(rect);
    this.addWindow(this._ssheaderWindow);
    this._ssheaderWindow.opacity = sevhwop;
  };

  Scene_AdventureNote.prototype.subEventHeaderWindowRect = function () {
    const wx = sevhwx;
    const wy = sevhwy;
    const ww = sevhww;
    const wh = sevhwh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_AdventureNote.prototype.createSubEventListWindow = function () {
    const rect = this.subEventListWindowRect();
    this._subeventlistWindow = new Window_SubEventList(rect);
    this._subeventlistWindow.setHandler("ok", this.showSSNote.bind(this));
    this._subeventlistWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._subeventlistWindow);
    this._subeventlistWindow.opacity = sevlwop;
  };

  Scene_AdventureNote.prototype.subEventListWindowRect = function () {
    const wx = sevlwx;
    const wy = sevlwy;
    const ww = sevlww;
    const wh = sevlwh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_AdventureNote.prototype.createSSNBackSprite = function () {
    this._ssnbgSprite = new Sprite();
    if (sevnfg) {
      this._ssnbgSprite.bitmap = ImageManager.loadSystem(sevnfg);
    } else {
      this._ssnbgSprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
      this._ssnbgSprite.bitmap.fillRect(0, 0, this.width, this.height, "rgba(0, 0, 0, 0.75)");
    }
    this.addChildAt(this._ssnbgSprite, 1);
    this._ssnbgSprite.visible = false;
  };

  Scene_AdventureNote.prototype.createSubEventNoteWindow = function () {
    const rect = this.subEventNoteWindowRect();
    this._subeventnoteWindow = new Window_SubEventNote(rect);
    this._subeventnoteWindow.setHandler("cancel", this.hideSSNote.bind(this));
    this.addWindow(this._subeventnoteWindow);
    this._subeventnoteWindow.opacity = sevnwop;
    this._subeventnoteWindow.visible = false;
  };

  Scene_AdventureNote.prototype.subEventNoteWindowRect = function () {
    const wx = sevnwx;
    const wy = sevnwy;
    const ww = sevnww;
    const wh = sevnwh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_AdventureNote.prototype.showSSNote = function () {
    if (bwsenw == "false") {
      this._maineventWindow.visible = false;
      this._ssheaderWindow.visible = false;
      this._subeventlistWindow.visible = false;
    }
    if (advnfg && fgsenw == "false") {
      this._foregroundSprite.visible = false;
    }
    this._ssnbgSprite.visible = true;
    this._subeventnoteWindow.note_index = this._subeventlistWindow.index();
    this._subeventnoteWindow.refresh();
    this._subeventnoteWindow.visible = true;
    this._subeventnoteWindow.open();
    this._subeventnoteWindow.activate();
  };

  Scene_AdventureNote.prototype.hideSSNote = function () {
    if (advnfg && fgsenw == "false") {
      this._foregroundSprite.visible = true;
    }
    this._ssnbgSprite.visible = false;
    this._subeventnoteWindow.close();
    this._subeventnoteWindow.visible = false;
    if (bwsenw == "false") {
      this._maineventWindow.visible = true;
      this._ssheaderWindow.visible = true;
      this._subeventlistWindow.visible = true;
    }
    this._subeventlistWindow.activate();
  };

  const _Scene_AdventureNote_createBackground =
    Scene_AdventureNote.prototype.createBackground;
  Scene_AdventureNote.prototype.createBackground = function () {
    if (!advnbg) {
      _Scene_AdventureNote_createBackground.call(this);
    } else {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(advnbg);
      this.addChild(this._backgroundSprite);
    }
    if (advnfg) {
      this._foregroundSprite = new Sprite();
      this._foregroundSprite.bitmap = ImageManager.loadSystem(advnfg);
      this.addChild(this._foregroundSprite);
    }
  };

  //Scene_Menu
  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("advnote", this.commandAdvNote.bind(this));
  };

  Scene_Menu.prototype.commandAdvNote = function () {
    SceneManager.push(Scene_AdventureNote);
  };

  //Window_MenuCommand
//  const _Window_MenuCommand_addOriginalCommands =
//    Window_MenuCommand.prototype.addOriginalCommands;
//  Window_MenuCommand.prototype.addOriginalCommands = function () {
//    _Window_MenuCommand_addOriginalCommands.call(this);
//    this.addAdvNoteCommand();
//  };

  Window_MenuCommand.prototype.addAdvNoteCommand = function () {
    if (advnshow !== 0) {
      show = $gameSwitches.value(advnshow);
    } else {
      show = true;
    }
    if (advnenable !== 0) {
      enable = $gameSwitches.value(advnenable);
    } else {
      enable = true;
    }
    if (show) {
      this.addCommand(advnmc, "advnote", enable);
    }
  };
})();
