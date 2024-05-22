//=============================================================================
// RPG Maker MZ - WD Party Change Layout (ver1.00)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Setting File of Party Change Menu Layout.
 * @author Izumi
 * @url http://izumiwhite.web.fc2.com/
 *
 * @base WDmzPartyChange
 * 
 * @help WDmzPartyChangeLayout.js
 *
 * This plugin provides a Party Change Menu Layout.
 * Please edit directly with a text editor.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc パーティ編成(アクター預り所)のレイアウト設定用ファイルです。
 * @author いずみ
 * @url http://izumiwhite.web.fc2.com/
 * 
 * @base WDmzPartyChange
 *
 * @help WDmzPartyChangeLayout.js
 *
 * このプラグインは、パーティ編成(アクター預り所)のレイアウトを
 * 設定するファイルです。直接テキストエディタ等で編集して下さい。
 *
 */

(() => {

    //======== パーティリストウィンドウ レイアウト ========

    //フォントサイズの設定
    wd_front_fontsize = 9;

    //ウィンドウの設定
    wd_front_x = 0;
    wd_front_y = 60;//86;
    wd_front_width = 260;//260;
    wd_front_height = 204;//144;

    //列数の設定
    wd_front_maxcols = 4;

    //カーソルの設定
    wd_front_rect_width = 56;
    wd_front_rect_height = 86;//56;
    wd_front_rect_spacing = 4;
    wd_front_rect_interval = 4;

    //顔グラフィックの表示
    wd_front_faceview = false;
    wd_front_faceview_x = 0;
    wd_front_faceview_y = 0;

    //歩行グラフィックの表示
    wd_front_charaview = true;
    wd_front_charaview_x = 28;
    wd_front_charaview_y = 82;

    //ステートの表示
    wd_front_stateview = false;
    wd_front_stateview_x = 0;
    wd_front_stateview_y = 0;
    wd_front_stateview_width = 144;

    //名前の表示
    wd_front_nameview = true;
    wd_front_nameview_x = 0;
    wd_front_nameview_y = -12;
    wd_front_nameview_width = 56;

    //職業の表示
    wd_front_classview = false;
    wd_front_classview_x = 0;
    wd_front_classview_y = 0;
    wd_front_classview_width = 220;

    //二つ名の表示
    wd_front_nickview = false;
    wd_front_nickview_x = 0;
    wd_front_nickview_y = 0;
    wd_front_nickview_width = 220;

    //レベルの表示
    wd_front_lvview = true;
    wd_front_lvview_x = 34;
    wd_front_lvview_y = 64;
    wd_front_lvview_width = 20;

    //HPゲージの表示
    wd_front_hpgaugeview = false;
    wd_front_hpgaugeview_x = 0;
    wd_front_hpgaugeview_y = 0;

    //MPゲージの表示
    wd_front_mpgaugeview = false;
    wd_front_mpgaugeview_x = 0;
    wd_front_mpgaugeview_y = 0;

    //TPゲージの表示
    wd_front_tpgaugeview = false;
    wd_front_tpgaugeview_x = 0;
    wd_front_tpgaugeview_y = 0;

    //最大HPの表示
    wd_front_mhpview = false;
    wd_front_mhpview_x = 0;
    wd_front_mhpview_y = 0;
    wd_front_mhpview_width = 220;

    //最大MPの表示
    wd_front_mmpview = false;
    wd_front_mmpview_x = 0;
    wd_front_mmpview_y = 0;
    wd_front_mmpview_width = 220;

    //攻撃力の表示
    wd_front_atkview = false;
    wd_front_atkview_x = 0;
    wd_front_atkview_y = 0;
    wd_front_atkview_width = 220;

    //防御力の表示
    wd_front_defview = false;
    wd_front_defview_x = 0;
    wd_front_defview_y = 0;
    wd_front_defview_width = 220;

    //魔法力の表示
    wd_front_matview = false;
    wd_front_matview_x = 0;
    wd_front_matview_y = 0;
    wd_front_matview_width = 220;

    //魔法防御の表示
    wd_front_mdfview = false;
    wd_front_mdfview_x = 0;
    wd_front_mdfview_y = 0;
    wd_front_mdfview_width = 220;

    //敏捷性の表示
    wd_front_agiview = false;
    wd_front_agiview_x = 0;
    wd_front_agiview_y = 0;
    wd_front_agiview_width = 220;

    //運の表示
    wd_front_lukview = false;
    wd_front_lukview_x = 0;
    wd_front_lukview_y = 0;
    wd_front_lukview_width = 220;

    //======== メンバーリストウィンドウ レイアウト ========

    //フォントサイズの設定
    wd_back_fontsize = 9;

    //ウィンドウの設定
    wd_back_x = 0;
    wd_back_y = 324;
    wd_back_width = 260;
    wd_back_height = 388;

    //ウィンドウの設定(除籍時、リスト表示時)
    wd_back_x2 = 0;
    wd_back_y2 = 86;
    wd_back_width2 = 260;
    wd_back_height2 = 444;

    //列数の設定
    wd_back_maxcols = 4;

    //カーソルの設定
    wd_back_rect_width = 56;
    wd_back_rect_height = 86;
    wd_back_rect_spacing = 4;
    wd_back_rect_interval = 4;

    //顔グラフィックの表示
    wd_back_faceview = false;
    wd_back_faceview_x = 0;
    wd_back_faceview_y = 0;

    //歩行グラフィックの表示
    wd_back_charaview = true;
    wd_back_charaview_x = 28;
    wd_back_charaview_y = 82;

    //ステートの表示
    wd_back_stateview = false;
    wd_back_stateview_x = 0;
    wd_back_stateview_y = 0;
    wd_back_stateview_width = 144;

    //名前の表示
    wd_back_nameview = true;
    wd_back_nameview_x = 0;
    wd_back_nameview_y = -12;
    wd_back_nameview_width = 56;

    //職業の表示
    wd_back_classview = false;
    wd_back_classview_x = 0;
    wd_back_classview_y = 0;
    wd_back_classview_width = 220;

    //二つ名の表示
    wd_back_nickview = false;
    wd_back_nickview_x = 0;
    wd_back_nickview_y = 0;
    wd_back_nickview_width = 220;

    //レベルの表示
    wd_back_lvview = true;
    wd_back_lvview_x = 34;
    wd_back_lvview_y = 64;
    wd_back_lvview_width = 20;

    //HPゲージの表示
    wd_back_hpgaugeview = false;
    wd_back_hpgaugeview_x = 0;
    wd_back_hpgaugeview_y = 0;

    //MPゲージの表示
    wd_back_mpgaugeview = false;
    wd_back_mpgaugeview_x = 0;
    wd_back_mpgaugeview_y = 0;

    //TPゲージの表示
    wd_back_tpgaugeview = false;
    wd_back_tpgaugeview_x = 0;
    wd_back_tpgaugeview_y = 0;

    //最大HPの表示
    wd_back_mhpview = false;
    wd_back_mhpview_x = 0;
    wd_back_mhpview_y = 0;
    wd_back_mhpview_width = 220;

    //最大MPの表示
    wd_back_mmpview = false;
    wd_back_mmpview_x = 0;
    wd_back_mmpview_y = 0;
    wd_back_mmpview_width = 220;

    //攻撃力の表示
    wd_back_atkview = false;
    wd_back_atkview_x = 0;
    wd_back_atkview_y = 0;
    wd_back_atkview_width = 220;

    //防御力の表示
    wd_back_defview = false;
    wd_back_defview_x = 0;
    wd_back_defview_y = 0;
    wd_back_defview_width = 220;

    //魔法力の表示
    wd_back_matview = false;
    wd_back_matview_x = 0;
    wd_back_matview_y = 0;
    wd_back_matview_width = 220;

    //魔法防御の表示
    wd_back_mdfview = false;
    wd_back_mdfview_x = 0;
    wd_back_mdfview_y = 0;
    wd_back_mdfview_width = 220;

    //敏捷性の表示
    wd_back_agiview = false;
    wd_back_agiview_x = 0;
    wd_back_agiview_y = 0;
    wd_back_agiview_width = 220;

    //運の表示
    wd_back_lukview = false;
    wd_back_lukview_x = 0;
    wd_back_lukview_y = 0;
    wd_back_lukview_width = 220;

    //======== ステータスウィンドウ レイアウト ========

    //フォントサイズの設定
    wd_status_fontsize = 26;

    //ウィンドウの設定
    wd_status_x = 260;
    wd_status_y = 0;
    wd_status_width = 692;
    wd_status_height = 712;

    //顔グラフィックの表示
    wd_status_faceview = true;
    wd_status_faceview_x = 12;
    wd_status_faceview_y = 36;

    //歩行グラフィックの表示
    wd_status_charaview = true;
    wd_status_charaview_x = 180;
    wd_status_charaview_y = 182;

    //ステートの表示
    wd_status_stateview = true;
    wd_status_stateview_x = 220;
    wd_status_stateview_y = 108;
    wd_status_stateview_width = 144;

    //名前の表示
    wd_status_nameview = true;
    wd_status_nameview_x = 0;
    wd_status_nameview_y = 0;
    wd_status_nameview_width = 220;

    //職業の表示
    wd_status_classview = true;
    wd_status_classview_x = 220;
    wd_status_classview_y = 0;
    wd_status_classview_width = 220;

    //二つ名の表示
    wd_status_nickview = true;
    wd_status_nickview_x = 220;
    wd_status_nickview_y = 36;
    wd_status_nickview_width = 220;

    //レベルの表示
    wd_status_lvview = true;
    wd_status_lvview_x = 220;
    wd_status_lvview_y = 72;
    wd_status_lvview_width = 120;

    //HPゲージの表示
    wd_status_hpgaugeview = true;
    wd_status_hpgaugeview_x = 220;
    wd_status_hpgaugeview_y = 144;

    //MPゲージの表示
    wd_status_mpgaugeview = true;
    wd_status_mpgaugeview_x = 220;
    wd_status_mpgaugeview_y = 168;

    //TPゲージの表示
    wd_status_tpgaugeview = true;
    wd_status_tpgaugeview_x = 220;
    wd_status_tpgaugeview_y = 192;

    //最大HPの表示
    wd_status_mhpview = false;
    wd_status_mhpview_x = 0;
    wd_status_mhpview_y = 0;
    wd_status_mhpview_width = 220;

    //最大MPの表示
    wd_status_mmpview = false;
    wd_status_mmpview_x = 0;
    wd_status_mmpview_y = 0;
    wd_status_mmpview_width = 220;

    //攻撃力の表示
    wd_status_atkview = true;
    wd_status_atkview_x = 16;
    wd_status_atkview_y = 234;
    wd_status_atkview_width = 220;

    //防御力の表示
    wd_status_defview = true;
    wd_status_defview_x = 272;
    wd_status_defview_y = 234;
    wd_status_defview_width = 220;

    //魔法力の表示
    wd_status_matview = true;
    wd_status_matview_x = 16;
    wd_status_matview_y = 270;
    wd_status_matview_width = 220;

    //魔法防御の表示
    wd_status_mdfview = true;
    wd_status_mdfview_x = 272;
    wd_status_mdfview_y = 270;
    wd_status_mdfview_width = 220;

    //敏捷性の表示
    wd_status_agiview = true;
    wd_status_agiview_x = 16;
    wd_status_agiview_y = 306;
    wd_status_agiview_width = 220;

    //運の表示
    wd_status_lukview = true;
    wd_status_lukview_x = 272;
    wd_status_lukview_y = 306;
    wd_status_lukview_width = 220;

    //装備の表示
    wd_status_equipview = true;
    wd_status_equipview_x = 16;
    wd_status_equipview_y = 354;

    //======== テキストウィンドウ1 レイアウト ========

    //フォントサイズの設定
    wd_text1_fontsize = 26;

    //ウィンドウの設定
    wd_text1_x = 0;
    wd_text1_y = 0;
    wd_text1_width = 260;
    wd_text1_height = 60;

    //テキストの設定
    wd_text1_text_x = 0;
    wd_text1_text_y = 0;

    //======== テキストウィンドウ2 レイアウト ========

    //フォントサイズの設定
    wd_text2_fontsize = 26;

    //ウィンドウの設定
    wd_text2_x = 0;
    wd_text2_y = 264;
    wd_text2_width = 260;
    wd_text2_height = 60;

    //ウィンドウの設定(除籍時、リスト表示時)
    wd_text2_x2 = 50;
    wd_text2_y2 = 52;
    wd_text2_width2 = 152;
    wd_text2_height2 = 42;

    //テキストの設定
    wd_text2_text_x = 0;
    wd_text2_text_y = 0;

    //======== ソートウィンドウ レイアウト ========

    //フォントサイズの設定
    wd_sort_fontsize = 16;

    //ウィンドウの設定
    wd_sort_x = 144;
    wd_sort_y = 574;
    wd_sort_width = 120;
    wd_sort_height = 42;

    //ウィンドウの設定(除籍時、リスト表示時)
    wd_sort_x2 = 144;
    wd_sort_y2 = 520;
    wd_sort_width2 = 120;
    wd_sort_height2 = 42;

    //テキストの設定
    wd_sort_text_x = 0;
    wd_sort_text_y = -10;    

    //======== 設定終わり ========


    const pluginName = "WDmzPartyChange_Layout";


})();
