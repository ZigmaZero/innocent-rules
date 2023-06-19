// ===================================================
// ARTM_PlayerSensorMZ.js
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// -------------
// [Version]
// 1.0.0 初版
// ---------------------------------------------------
//  移植元:MKR_PlayerSensor.js [ver.3.0.0]
// ---------------------------------------------------
//  Copyright (c) 2016 マンカインド
//  This software is released under the MIT License.
//  http://opensource.org/licenses/mit-license.php
// ====================================================
/*:
 *
 * @plugindesc プレイヤー探索プラグイン(MZ移植版)
 * @target MZ
 * @author Artemis
 *
 * @help ARTM_PlayerSensorMZ
 *
 * マンカインド様作、プレイヤー探索プラグインのMZ移植版です。
 * 基本的な動きは変わっておりません。
 *
 * - 使用方法 -
 * 対象イベント(以下、探索者)の視界の範囲を描画し、
 * 範囲内にプレイヤーが存在した場合、
 * その探索者は発見状態となり指定されたスイッチをONにします。
 * (スイッチがONの間、探索者は話しかけられた方向に振り向かないようになります)
 *
 * プレイヤーが視界範囲マス外に出た場合、
 * ロスト状態となりONになったスイッチがOFFになります。
 * (設定により状態移行までの時間が調整できます)
 *
 * ※ トリガー[自動実行]によるイベント動作中の場合、ゲーム動作負荷を考慮して
 *    探索処理は停止します。
 *    (イベントメモ欄で設定変更が可能です)
 *
 *
 * 簡単な使い方説明:
 *   探索者にしたいイベントのメモ欄を設定し、
 *   探索者がいるマップでプラグインコマンド「探索開始」を実行すると、
 *   そのマップにいる全ての探索者が探索を開始します。
 *   (探索一時無効状態になっている探索者を除く)
 *
 *   探索者がいるマップでプラグインコマンド「強制探索開始」を実行すると、
 *   そのマップにいる全ての探索者が探索を開始します。
 *   (探索一時無効状態になっている探索者も探索を開始します)

 *   探索者のイベント内でプラグインコマンド「対象探索者の探索開始」を実行すると、
 *   その探索者が探索を開始します。
 *   (探索一時無効状態となっている探索者に対しても探索を開始させます。)
 *
 *   探索者のイベント内でプラグインコマンド「対象探索者の探索停止」を実行すると、
 *   その探索者が探索を停止します。
 *   (プレイヤーを未発見として状態が更新されます。)
 *
 *   探索者がいるマップでプラグインコマンド「探索停止」を実行すると、
 *   そのマップにいる全探索者が探索を停止します。
 *   (プレイヤーを未発見として状態が更新されます。)
 *
 *
 * メモ欄_基本設定(Xは正の整数):
 *   <PsensorL:X>
 *     ・探索者の前方Xマスを探索します。
 *
 *   <PsensorF:X>
 *     ・探索者を頂点として前方にXマス、
 *       左右にXマス進んだ地点の点をそれぞれ結んで形成される
 *       三角形の図形の範囲内を探索します。
 *
 *   <PsensorD:X>
 *     ・探索者から上下左右にXマス進んだ点を結んで形成される、
 *       ひし形の図形の範囲内を探索します。
 *
 *     ・この形状の場合、地形の通行可能状態を無視します。
 *       (常にTdオプションが1の状態となります。)
 *
 *   <PsensorS:X>
 *     ・探索者から上下にXマス、
 *       左右にXマス進んだ地点の点をそれぞれ結んで形成される
 *       四角形の図形の範囲内を探索します。
 *
 *     ・この形状の場合、地形の通行可能状態を無視します。
 *       (常にTdオプションが1の状態となります)
 *
 *   <PsensorL:\V[n]>
 *     ・視界範囲マス数を指定する部分には、
 *       変数を表す制御文字である \V[n] が使用可能です。
 *       変数番号N番の変数に格納されている値を
 *       範囲値として使用します。
 *       (変数の変更はリアルタイムに反映されます)
 *
 *   <!PsensorL:X>
 *     ・探索者の前方Xマスが範囲ですが、
 *       先頭に ! を付けると探索一時無効状態となります。
 *
 *     ・この状態の場合、後述するプラグインコマンド:「探索開始」実行時点では
 *       探索が開始されず、
 *         プラグインコマンド:「対象探索者の探索開始」か
 *         スクリプトコマンド:$gameSystem.onSensor(eventId) で
 *       個別に探索を開始させる必要があります。
 *
 *
 * メモ欄_オプション(各オプションはスペースで区切る):
 *     ・各オプションはスペースで区切ること。
 *     ・指定しない場合は初期値の設定が適用されます。
 *
 *   Sw[数字またはA～D]
 *     ・探索者がプレイヤーを発見した際に
 *       ONにするスイッチ番号またはセルフスイッチを
 *       探索者毎に指定します。
 *
 *     ・プレイヤーをロストした際にONになるスイッチは、
 *       プレイヤーを発見したときに自動的にOFFになります。
 *
 *     例)
 *       Sw10 : スイッチ番号10番のスイッチをONにします。
 *       SwC  : 探索者のセルフスイッチCをONにします。
 *
 *   Bo[0～1の数字、または\S[n]]
 *     ・探索者の両隣を探索範囲としない(0)/する(1)。
 *       1 の場合、探索者の左右マスが探索範囲となります。
 *
 *     ・\S[n]はスイッチの状態を取得する制御文字です。
 *       Nには数値かA～Dのアルファベットが入ります。(A～Dはセルフスイッチです)
 *       スイッチNの状態がON = 1を指定したことと同じです。
 *
 *   Rv[0～1の数字、または\S[n]]
 *     ・探索者の視界範囲を描画しない(0)/する(1)。
 *       0 の場合、探索者の視界範囲が画面に描画されません。
 *       (視覚的に見えなくなるだけで探索は行われます)
 *
 *     ・\S[n]はスイッチの状態を取得する制御文字です。
 *       Nには数値かA～Dのアルファベットが入ります。(A～Dはセルフスイッチです)
 *       スイッチNの状態がON = 1を指定したことと同じです。
 *
 *   Td[0または1、または\S[n]]
 *     ・視界範囲の算出に視界範囲内の地形/イベントに対する
 *       通行可能状態を考慮しない(0)/する(1)。
 *       1 の場合、視界範囲内に通行不可マスがあると視界範囲が変化します。
 *
 *     ・地形の通行可能状態を考慮する場合、
 *       通行不可マスが視界範囲の対象にならず、
 *       探索者から見て通行不可マスがあることによって
 *       死角になるマスも視覚範囲の対象になりません。
 *
 *     ・\S[n]はスイッチの状態を取得する制御文字です。
 *       Nには数値かA～Dのアルファベットが入ります。(A～Dはセルフスイッチです)
 *       スイッチNの状態がON = 1を指定したことと同じです。
 *
 *   Di[U,R,L,Dどれか1文字]
 *     ・探索者の向きを考慮せず、探索方向を固定します。
 *       Uは上、Rは右、Lは左、Dは下を表します。
 *
 *   Ev[0または1、または\S[n]]
 *     ・探索者の視界範囲がマップ上の通行不可能なイベント
 *       (プライオリティが「通常キャラと同じ」)の
 *       影響を受ける(1)/受けない(0)。
 *       1 の場合、視界範囲内に通行不可能なマップイベントがあると
 *       視界範囲が変化します。
 *
 *     ・[タイルセット B]以降のタイルをイベントの画像として指定し
 *       イベントのプライオリティが「通常キャラの下」の場合、
 *       タイルセットの通行可能設定が視界範囲に影響し、
 *       タイルセットの設定が通行不可の場合、視界範囲外となります。
 *
 *     ・視界範囲内の通行可能状態を考慮しない設定になっている場合、
 *       この設定は無視されます。
 *
 *   Rg[リージョン番号、または\V[n]]
 *     ・指定した場合探索者の視界範囲がマップ上のリージョンタイルの
 *       影響を受けます。
 *       例えば 1 を指定すると、リージョン番号1番のタイルが置かれたマスが
 *       壁扱いとなり、視界範囲外となります。
 *
 *     ・視界範囲内の通行可能状態を考慮しない設定になっている場合、
 *       この設定は無視されます。
 *
 *   Fb[フキダシ番号、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーを発見したときに
 *       探索者の頭上にフキダシが表示されます。
 *
 *   Fc[コモンイベント番号、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーを発見したときに
 *       指定したコモンイベントを実行します。
 *
 *   Fd[遅延フレーム数、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーを発見するまでの時間が
 *       フレーム数分遅れます。
 *
 *   Lb[フキダシ番号、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーをロストしたときに
 *       探索者の頭上にフキダシが表示されます。
 *
 *   Lc[コモンイベント番号、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーをロストしたときに
 *       指定したコモンイベントを実行します。
 *
 *   Ld[遅延フレーム数、または\V[n]]
 *     ・指定した場合、探索者がプレイヤーをロストするまでの時間が
 *       フレーム数分遅れます。
 *
 *   Am[0または1、または\S[n]]
 *     ・自動実行によるイベントが動作中、このオプションを設定された探索者の
 *       探索処理を続行する(1)/続行しない(0)
 *       デフォルトは0です。
 *
 *     ・探索を続行する場合、自動実行イベントが動作中の場合でも
 *       視界範囲にプレイヤーが居るかどうかの判定が行われます。
 *       (対象の探索者が探索開始状態になっている場合に限ります)
 *
 *     ・このオプションを1に設定された探索者は、探索開始状態の間
 *       常に探索を続けるためゲーム動作負荷が上がります。
 *       設定は慎重にお願いいたします。
 *
 *   Lsw[数字またはA～D]
 *     ・探索者がプレイヤーをロストした際に
 *       ONにするスイッチ番号またはセルフスイッチを
 *       探索者毎に指定します。
 *
 *     ・プレイヤーを発見した際にONになるスイッチは、
 *       プレイヤーをロストしたときに自動的にOFFになります。
 *
 *     例)
 *       Lsw11 : スイッチ番号11番のスイッチをONにします。
 *       LswB  : 探索者のセルフスイッチBをONにします。
 *
 *
 * メモ欄の設定例:
 *   <PsensorL:7>
 *     ・探索者の前方7マスの範囲を探索します。
 *
 *   <PsensorF:3>
 *     ・探索者を頂点に、前方3マス左右に3マス進んだ地点を
 *       結んでできる三角形の図形の範囲内を探索します。
 *
 *   <PsensorL:\V[100]>
 *     ・探索者の前方[変数番号100番]マスの範囲を探索します。
 *
 *   <PsensorL:4 SwC>
 *     ・探索者の前方4マスの範囲を探索します。
 *       プレイヤー発見時に探索者のセルフスイッチCをONにします。
 *
 *   <PsensorF:5 Bo1>
 *     ・探索者を頂点に、前方3マス左右に3マスの点を
 *       結んでできる三角形の図形の範囲内を探索します。
 *
 *     ・さらに探索者の両隣を探索範囲とします。
 *
 *   <PsensorL:10 Rv0>
 *     ・探索者の前方10マスの範囲を探索しますが、
 *       視界範囲の描画をしません。
 *
 *   <PsensorL:10 Rv\s[20]>
 *     ・探索者の前方10マスの範囲を探索します。
 *
 *     ・スイッチ20番の状態がOFFの場合は
 *       視界範囲の描画をしません。
 *
 *   <PsensorL:10 Td0>
 *     ・探索者の前方10マスの範囲を探索しますが、
 *       視界範囲内の通行可能マス状態を考慮しません。
 *
 *   <PsensorL:10 Td\s[A]>
 *     ・探索者の前方10マスの範囲を探索します。
 *
 *     ・セルフスイッチAの状態がOFFの場合は
 *       視界範囲内の通行可能マス状態を考慮しません。
 *
 *   <PsensorF:&2 Bo0 Sw1>
 *     ・探索者を頂点に、前方[変数番号2番]マス
 *       左右に[変数番号2番]マス進んだ地点の点を結んでできる
 *       三角形の図形の範囲内を探索しますが、
 *       探索者の両隣を範囲としません。
 *
 *     ・プレイヤー発見時にスイッチ番号1番のスイッチをONにします。
 *
 *   <PsensorL:7 DiR>
 *     ・探索者の右隣7マスの範囲を探索します。
 *
 *   <PsensorF:7 DiU>
 *     ・探索者を頂点に、上3マス左右に3マスの点を
 *       結んでできる三角形の図形の範囲内を探索します。
 *
 *   <PsensorL:10 Ev1 Rg10>
 *     ・探索者の前方10マスの範囲を探索しますが、
 *       視界範囲内のマップイベントの存在を考慮します。
 *       さらにリージョン番号10番のタイルを壁として認識します。
 *
 *
 * プラグインコマンド:
 *   探索開始
 *     ・コマンドを実行したマップ上に存在する全ての探索者が
 *       探索開始処理になります。
 *       (探索一時無効状態の探索者は対象外です)
 *
 *   強制探索開始
 *     ・コマンドを実行したマップ上に存在する全ての探索者が
 *       探索開始処理になります。
 *       (探索一時無効状態の探索者も対象となります)
 *
 *   探索停止
 *     ・コマンドを実行したマップ上に存在する全ての探索者が
 *       探索停止処理状態になります。
 *       (プレイヤーを未発見として状態が更新されます。)
 *
 *   全探索者のスイッチ初期化
 *     ・コマンドを実行したマップ上に存在する全ての探索者を対象に、
 *       プラグインパラメーター[発見後操作スイッチ]で
 *       指定した(セルフ)スイッチ、
 *       またはSwオプションで指定した(セルフ)スイッチの
 *       どちらかをOFFにします。(Swオプションの設定が優先されます)
 *
 *     ・また、resetの後に指定した(セルフ)スイッチも
 *       同様にOFFにします。まとめてOFFにしたい場合に指定してください。
 *       (X,Y はセルフスイッチ/スイッチ番号。
 *        スペース区切りで記載してください)
 *
 *   対象探索者のスイッチ初期化
 *     ・このコマンドを実行した探索者を対象に、
 *       プラグインパラメーター[発見後操作スイッチ]で
 *       指定した(セルフ)スイッチ、
 *       またはメモ欄のSwオプションで指定した(セルフ)スイッチの
 *       どちらかをOFFにします。(メモ欄の設定が優先されます)
 *
 *     ・"X", "Y" は(セルフ)スイッチを表し、ここに記載した(セルフ)スイッチも
 *       同様にOFFにします。まとめてOFFにしたい場合に指定してください。
 *       (セルフスイッチ/スイッチ番号はスペース区切りで記載してください)
 *
 *   全探索者の強制ロスト
 *     ・マップ上に存在するプレイヤー発見状態の探索者を
 *       ロスト状態へ強制移行させます。
 *
 *   対象探索者の強制ロスト
 *     ・このコマンドを実行したプレイヤー発見状態の探索者を
 *       ロスト状態へ強制移行させます。
 *
 *   対象探索者の探索開始
 *     ・このコマンドを実行した探索者を
 *       探索開始状態にします。
 *
 *     ・実際に探索を行わせるためには事前に「探索開始」コマンドの
 *       実行が必要です。
 *
 *   対象探索者の探索停止
 *     ・このコマンドを実行した探索者を探索停止状態にします。
 *       (プレイヤーを未発見として状態が更新されます。)
 *
 *   対象探索者の移動
 *     ・このコマンドを実行した時点のプレイヤー位置に隣接する位置まで、
 *       このコマンドを実行したイベントを移動させます。
 *
 *     ・Xは移動速度。1～6まで対応し、
 *       未指定の場合はイベントに設定されている速度を使用します。
 *
 *     ・プラグインパラメーター[通行不可タイル考慮]がOFFまたは
 *       メモ欄のTdオプションが0の場合は
 *       正しく移動できない可能性があります。
 *       (イベントのすり抜けを有効にすることで移動可能です)
 *
 *
 * スクリプトコマンド:
 *   $gameSystem.getEventSensorStatus(eventId)
 *     ・指定したイベントIDを持つ探索者に対して探索状態を取得します。
 *       [戻り値] | [意味]
 *          -1    | 探索一時無効状態
 *           0    | 探索停止状態
 *           1    | 探索実行状態
 *
 *   $gameSystem.onSensor(eventId)
 *     ・指定したイベントIDを持つ探索者を探索開始状態にします。
 *       探索停止/一時無効状態の探索者に対し探索を再開させる場合に使用します。
 *
 *     ・探索を開始させるためには事前に「探索開始」(「強制探索開始」)コマンドの
 *       実行が必要です。
 *
 *   $gameSystem.offSensor(eventId)
 *     ・指定したイベントIDを持つ探索者を探索停止状態にします。
 *       (プレイヤーを未発見として状態が更新されます。)
 *
 *   $gameSystem.neutralSensor(eventId, ["X","Y",...])
 *     ・現在のマップに存在する、指定したイベントIDを持つ探索者に対し、
 *       [発見後操作スイッチ]で指定した(セルフ)スイッチか、
 *       またはSwオプションで指定したセルフスイッチの
 *       どちらかをOFFにします。(メモ欄の設定が優先されます)
 *
 *     ・"X", "Y" は(セルフ)スイッチを表し、ここに記載した(セルフ)スイッチも
 *       同様にOFFにします。まとめてOFFにしたい場合に指定してください。
 *       (カンマ区切りで指定してください)
 *
 *   $gameSystem.isFoundPlayer()
 *     ・現在のマップで、プレイヤーが探索者に発見されている場合にtrueを返します。
 *       (それ以外ならfalse)
 *
 *   $gameSystem.allForceLost()
 *     ・現在のマップに存在する、プレイヤー発見状態の探索者を
 *       ロスト状態へ強制移行させます。
 *
 *   $gameSystem.forceLost(eventId)
 *     ・指定したイベントIDを持つ探索者がプレイヤー発見状態である場合、
 *       ロスト状態へ強制移行させます。
 *
 *
 * 補足：
 *   ・このプラグインに関するメモ欄の設定、プラグインコマンド、
 *     は大文字/小文字を区別していません。
 *
 *   ・プラグインパラメーターの説明に、[初期値]と書かれているものは
 *     メモ欄にて個別設定が可能です。
 *     設定した場合、[初期値]よりメモ欄の設定が
 *     優先されますのでご注意ください。
 *
 *   ・プラグインパラメーターの説明に、[変数可]と書かれているものは
 *     設定値に変数を表す制御文字である\V[n]を使用可能です。
 *     変数を設定した場合、そのパラメーターの利用時に変数の値を
 *     参照するため、パラメーターの設定をゲーム中に変更できます。
 *
 *   ・プラグインパラメーターの説明に、[スイッチ可]と書かれているものは
 *     設定値にスイッチを表す制御文字の\S[n]を使用可能です。(Nは数値)
 *     指定したスイッチがONの場合はプラグインパラメーターに
 *     ONまたは1,trueを指定したことと同じとなります。
 *     スイッチを設定した場合、そのパラメーターの利用時にスイッチの値を
 *     参照するため、パラメーターの設定をゲーム中に変更できます。
 *
 * @param 探索設定
 * @default ====================================
 *
 * @param Sensor_Switch
 * @text 発見後操作スイッチ
 * @desc [初期値] プレイヤー発見時にONにするスイッチ番号またはセルフスイッチを指定。(ロスト後操作スイッチはOFFになります)
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default D
 * @parent 探索設定
 *
 * @param Lost_Sensor_Switch
 * @text ロスト後操作スイッチ
 * @desc [初期値] プレイヤーロスト時にONにするスイッチ番号またはセルフスイッチを指定。(発見後操作スイッチはOFFになります)
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default
 * @parent 探索設定
 *
 * @param Both_Sensor
 * @text 両隣の視界
 * @desc 探索者の両隣を探索範囲とするかの設定です。
 * (デフォルト:探索範囲としない)
 * @type boolean
 * @on 探索範囲とする
 * @off 探索範囲としない
 * @default false
 * @parent 探索設定
 *
 * @param Terrain_Decision
 * @text 通行不可タイルの考慮
 * @desc 視界範囲にある通行不可タイルの存在を考慮するかの設定です。
 * (デフォルト:考慮する)
 * @type boolean
 * @on 考慮する
 * @off 考慮しない
 * @default true
 * @parent 探索設定
 *
 * @param Auto_Sensor
 * @text 探索自動開始
 * @desc マップ描画時に探索処理を自動的に開始するかの設定です。
 * (デフォルト:開始しない)
 * @type boolean
 * @on 開始する
 * @off 開始しない
 * @default false
 * @parent 探索設定
 *
 * @param Event_Decision
 * @text 他イベントの考慮
 * @desc 視界範囲にあるマップイベントの存在を考慮するかの設定です。
 * (デフォルト:考慮しない)
 * @type boolean
 * @on 考慮する
 * @off 考慮しない
 * @default false
 * @parent 探索設定
 *
 * @param Region_Decision
 * @text リージョン設定
 * @desc [初期値:変数可] 視界範囲外(壁扱い)とするリージョン番号を指定してください。
 * @type string[]
 * @default []
 * @parent 探索設定
 *
 * @param Real_Range_X
 * @text 探索範囲X拡張
 * @desc 探索範囲を指定した数値分、横に拡張します(視界描画はマス単位)。プレイヤーがピクセル単位で移動する場合に有効です。(デフォルト:0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent 探索設定
 *
 * @param Real_Range_Y
 * @text 探索範囲Y拡張
 * @desc 探索範囲を指定した数値分、縦に拡張します(視界描画はマス単位)。プレイヤーがピクセル単位で移動する場合に有効です。(デフォルト:0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent 探索設定
 *
 * @param 視界設定
 * @default ====================================
 *
 * @param Range_Visible
 * @text 視界範囲描画
 * @desc 探索者の視界範囲を描画するかの設定です。
 * (デフォルト:描画する)
 * @type boolean
 * @on 描画する
 * @off 描画しない
 * @default true
 * @parent 視界設定
 *
 * @param Range_Color
 * @text 視界範囲の色
 * @desc 視界範囲を描画する際の色を選択してください。
 * (デフォルト:白)
 * @type select
 * @option 白
 * @value white
 * @option 赤
 * @value red
 * @option 青
 * @value blue
 * @option 黄
 * @value yellow
 * @default white
 * @parent 視界設定
 *
 * @param Range_Opacity
 * @text 視界範囲の不透明度
 * @desc 視界範囲を描画する際の不透明度を数字で指定してください。
 * デフォルト:80(0-255)
 * @type number
 * @min 0
 * @max 255
 * @default 80
 * @parent 視界設定
 *
 * @param Range_Position
 * @text 視界範囲位置
 * @desc 探索者の視界範囲を表示する位置を選択します。
 * デフォルト:1(イベントの上に表示する)
 * @type select
 * @option イベントの上に表示する
 * @value 1
 * @option イベントの下に表示する
 * @value 2
 * @default 1
 * @parent 視界設定
 *
 * @param Player_Found
 * @text プレイヤー発見時設定
 * @desc 探索者がプレイヤーを発見した時の設定です。
 * @type struct<Alert>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0"}
 *
 * @param Player_Lost
 * @text プレイヤーロスト時設定
 * @desc 探索者がプレイヤーをロストした時の設定です。
 * @type struct<Alert>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0"}
 *
 * @param マップ設定
 * @default ====================================
 *
 * @param Tracking_Priority
 * @text 追跡優先度
 * @desc プレイヤー発見状態のイベントが他イベントの上または下を通行可能にするか設定します。(デフォルト:通行不可)
 * @type boolean
 * @on 通行可能
 * @off 通行不可
 * @default false
 * @parent マップ設定
 *
 * @param Follower_Through
 * @text フォロワー無視
 * @desc プレイヤー発見状態のイベントがプレイヤーのフォロワー(隊列)をすり抜けるか設定します。(デフォルト:すり抜け不可)
 * @type boolean
 * @on すり抜け可
 * @off すり抜け不可
 * @default false
 * @parent マップ設定
 *
 * @param Location_Reset
 * @text マップ移動時リセット
 * @desc 場所移動コマンド使用時、元のマップに配置された探索者の追跡状態をリセットするか設定します。(デフォルト:リセットしない)
 * @type boolean
 * @on リセットする
 * @off リセットしない
 * @default false
 * @parent マップ設定
 *
 * @command start
 * @text 探索開始
 * @desc 探索を開始します
 *
 * @command force_start
 * @text 強制探索開始
 * @desc 強制的に探索を開始します。
 *
 * @command stop
 * @text 探索停止
 * @desc 探索を停止します。
 *
 * @command reset
 * @text 全探索者のスイッチ初期化
 * @desc 全探索者の(セルフ)スイッチを初期化します
 *
 * @arg sw_ids
 * @type switch[]
 * @text スイッチID
 * @desc スイッチIDを設定します。
 * @parent database
 *
 * @arg slfsw_ids
 * @type select[]
 * @text セルフスイッチID
 * @desc セルフスイッチIDを設定します。
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @command t_reset
 * @text 対象探索者のスイッチ初期化
 * @desc 対象探索者の(セルフ)スイッチを初期化します。
 *
 * @arg sw_ids
 * @type switch[]
 * @text スイッチID
 * @desc スイッチIDを設定します。
 * @parent database
 *
 * @arg slfsw_ids
 * @type select[]
 * @text セルフスイッチID
 * @desc セルフスイッチIDを設定します。
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @command lost
 * @text 全探索者の強制ロスト
 * @desc 発見状態の全探索者を強制ロスト状態に移行させます。
 *
 * @command t_lost
 * @text 対象探索者の強制ロスト
 * @desc 発見状態の対象探索者を強制ロスト状態に移行させます。
 *
 * @command t_start
 * @text 対象探索者の探索開始
 * @desc 対象探索者を探索開始状態にします。
 *
 * @command t_stop
 * @text 対象探索者の探索停止
 * @desc 対象探索者を探索停止状態にします。
 *
 * @command t_move
 * @text 対象探索者の移動
 * @desc 対象探索者をプレイヤーの位置付近まで移動させます。
 *
 * @arg speed
 * @type number
 * @text 移動速度
 * @desc 移動速度を設定します。
 * @min 1
 * @max 6
 * @default 1
 *
 */
/*~struct~Alert:
 *
 * @param Ballon
 * @text [初期値] フキダシ表示
 * @desc 探索者にフキダシを表示させる場合はアイコン番号を指定します。デフォルト:表示しない
 * @type select
 * @option 表示しない
 * @value 0
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 * @default 0
 *
 * @param Se
 * @text SE設定
 * @desc Seに関する設定です。
 * @type struct<Se>
 *
 * @param Common_Event
 * @text [初期値] コモン実行
 * @desc コモンイベントを実行させる場合は指定します。デフォルト:0(なし)
 * @type common_event
 * @default 0
 *
 * @param Delay
 * @text [初期値] 状態移行遅延
 * @desc プレイヤー発見/ロスト状態に移行するタイミングを指定したフレーム分遅らせます(60フレーム=1秒)。デフォルト:0
 * @type number
 * @min 0
 * @default 0
 *
 */
/*~struct~Se:
 *
 * @param Name
 * @text ファイル名
 * @desc 再生するファイルを指定します。デフォルト:空(再生しない)
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param Volume
 * @text 再生時音量
 * @desc ファイルを再生するときの音量を指定します(0から100までの数値)。デフォルト:90
 * @type number
 * @max 100
 * @min 0
 * @default 90
 *
 * @param Pitch
 * @text 再生時ピッチ
 * @desc ファイルを再生するときのピッチを指定します(50から150までの数値)。デフォルト:100
 * @type number
 * @max 150
 * @min 50
 * @default 100
 *
 * @param Pan
 * @text 再生時位相
 * @desc ファイルを再生するときの位相を指定します(-100から100までの数値)。デフォルト:0
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
 */

(() => {

    const PNAME = "ARTM_PlayerSensorMZ";
    const CheckParam = function(type, name, value, def, min, max, options) {
        if (min === undefined || min === null) {
            min = -Infinity;
        }
        if (max === undefined || max === null) {
            max = Infinity;
        }
        if (value === null) {
            value = "";
        } else {
            value = String(value);
        }
        const regExp = /^\x1bV\[\d+\]|\x1bS\[\d+\]$/i;
        value = value.replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (!regExp.test(value)) {
            switch (type) {
                case "bool":
                    if (value === "") {
                        value = def ? true : false;
                    } else {
                        value =
                            value.toUpperCase() === "ON" ||
                            value.toUpperCase() === "TRUE" ||
                            value.toUpperCase() === "1";
                    }
                    break;
                case "num":
                    if (value === "") {
                        value = isFinite(def) ? parseInt(def, 10) : 0;
                    } else {
                        value =
                            isFinite(value) ?
                            parseInt(value, 10) :
                            isFinite(def) ? parseInt(def, 10) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "float":
                    if (value === "") {
                        value = isFinite(def) ? parseFloat(def) : 0;
                    } else {
                        value =
                            isFinite(value) ?
                            parseFloat(value) :
                            isFinite(def) ? parseFloat(def) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "string":
                    if (value === "") {
                        value = def !== "" ? def : value;
                    }
                    break;
                case "switch":
                    if (value === "") {
                        value = def !== "" ? def : value;
                    }
                    if (name === "Lost_Sensor_Switch" && (
                        value === null || value === undefined)) {
                         value = "";
                    }
                    if (name !== "Lost_Sensor_Switch" &&
                        !value.match(/^([A-D]|\d+)$/i)) {
                         const msbErr = "Plugin parameter value is not switch : "
                         throw new Error(msbErr + name + " : "+value);
                    }
                    break;
                default:
                    const msbErrs = ["[CheckParam] ", "のタイプが不正です: "];
                    throw new Error(msbErrs[0] + name + msbErrs[1]  + type);
            }
        }
        return [value, type, def, min, max];
    };

    const CEC = function(params) {
        const text = (param => {
            let t = String(param);
            t = t.replace(/\\/g, '\x1b');
            t = t.replace(/\x1b\x1b/g, '\\');
            return convertEscapeCharacters(t);
        })(params[0]);
        const type = params[1];
        const def = params[2];
        const min = params[3];
        const max = params[4];
        let value;
        switch (type) {
            case "bool":
                value = CEC_bool(text, def, min, max);
                break;
            case "num":
                value = CEC_num(text, def, min, max);
                break;
            case "float":
                value = CEC_float(text, def, min, max);
                break;
            case "string":
                value = CEC_string(text, def, min, max);
                break;
            case "switch":
                value = CEC_switch(text, def, min, max);
                break;
            default:
                const msbErr = "[CEC] Plugin parameter type is illegal: ";
                throw new Error(msbErr + type);
        }
        return value;
    };

    function CEC_bool(text, def, min, max) {
       if (text === "") {
           return def ? true : false;
        } else {
            return (
                text === true ||
                text.toUpperCase() === "ON" ||
                text.toUpperCase() === "TRUE" ||
                text.toUpperCase() === "1"
            );
        }
    }

    function CEC_num(text, def, min, max) {
        return (
            (isFinite(text) ? parseInt(text, 10) :
             isFinite(def) ? parseInt(def, 10) : 0
            ).clamp(min, max)
        );
    }

    function CEC_float(text, def, min, max) {
        return (
            (isFinite(text) ? parseFloat(text) :
            isFinite(def) ? parseFloat(def) : 0
            ).clamp(min, max)
        );
    }

    function CEC_string(text, def, min, max) {
        if (text === "") {
            return def !== "" ? def : value;
        } else {
            return text;
        }
    }

    function CEC_switch(text, def, min, max) {
        if (value === "") {
            return def !== "" ? def : value;
        }
        if (!value.match(/^([A-D]|\d+)$/)) {
            const msbErr = "Plugin parameter value is not switch : ";
            throw new Error(msbErr + value);
        }
    }

    const convertEscapeCharacters = function(text) {
        if (typeof text !== "string") {
            return text;
        }
        const scene = SceneManager._scene;
        if (scene && scene._windowLayer) {
             const windowChild = scene._windowLayer.children[0];
             return (
                 windowChild ?
                 windowChild.convertEscapeCharacters(text) :
                 text
             );
        } else {
            return ConvVb(text);
        }
    };

    const ConvVb = function(text) {
        const regExp = /^\x1bV\[(\d+)\]$/i;
        if (typeof text === "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(regExp, function() {
                const num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            });
            text = text.replace(regExp, function() {
                const num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            });
        }
        return text;
    };

    const ConvSw = function(text, target) {
        const regExp = /^\x1bV\[\d+\]$|^\x1bS\[\d+\]$/i;
        if (typeof text === "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(/\x1bS\[(\d+)\]/i, function() {
                const num = parseInt(arguments[1]);
                return $gameSwitches.value(num);
            });
            text = text.replace(/\x1bS\[([A-D])\]/i, function() {
                if (target) {
                    const key = [target._mapId, target._eventId,
                                 arguments[1].toUpperCase()];
                    return $gameSelfSwitches.value(key);
                }
                return false;
            });
            if (text === true ||
               text.toLowerCase() === "true" ||
               text === "1") {
                text = 1;
            } else {
                text = 0;
            }
        }
        return text;
    };

    const paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    const paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    const Parameters = paramParse(PluginManager.parameters(PNAME));
    let DIR_UP, DIR_DOWN, DIR_RIGHT, DIR_LEFT,
        DefSensorSwitch, DefBothSensor, DefRangeVisible,
        DefTerrainDecision, DefRangeColor, DefRangeOpacity,
        DefAutoSensor, DefEventDecision, DefRegionDecisions,
        DefRealRangeX, DefRealRangeY, DefLostSensorSwitch,
        DefFoundBallon, DefFoundCommon, DefFoundDelay, DefFoundSe,
        DefLostBallon, DefLostCommon, DefLostDelay, DefLostSe,
        DefRangePosition, DefTrackingPriority, DefFollowerThrough, DefLocationReset;
    DefSensorSwitch = CheckParam("switch", "Sensor_Switch", Parameters["Sensor_Switch"], "D");
    DefLostSensorSwitch = CheckParam("switch", "Lost_Sensor_Switch", Parameters["Lost_Sensor_Switch"]);
    DefBothSensor = CheckParam("bool", "Both_Sensor", Parameters["Both_Sensor"], false);
    DefRangeVisible = CheckParam("bool", "Range_Visible", Parameters["Range_Visible"], true);
    DefTerrainDecision = CheckParam("bool", "Terrain_Decision", Parameters["Terrain_Decision"], false);
    DefRangeColor = CheckParam("string", "Range_Color", Parameters["Range_Color"], "white");
    DefRangeOpacity = CheckParam("num", "Range_Opacity", Parameters["Range_Opacity"], 80, 0, 255);
    DefRangePosition = CheckParam("num", "Range_Position", Parameters["Range_Position"], 1);
    DefAutoSensor = CheckParam("bool", "Auto_Sensor", Parameters["Auto_Sensor"], false);
    DefEventDecision = CheckParam("bool", "Event_Decision", Parameters["Event_Decision"], false);
    DefRegionDecisions = [];
    Parameters["Region_Decision"].forEach(function(region) {
        DefRegionDecisions.push(CheckParam("string", "Region_Decision", region, 0));
    });
    DefRealRangeX = CheckParam("float", "Real_Range_X", Parameters["Real_Range_X"], 0.000, 0.000, 0.999);
    DefRealRangeY = CheckParam("float", "Real_Range_Y", Parameters["Real_Range_Y"], 0.000, 0.000, 0.999);
    DefFoundBallon = CheckParam("num", "Player_Found.Ballon", Parameters["Player_Found"]["Ballon"], 0, 0);
    DefFoundCommon = CheckParam("num", "Player_Found.Common_Event", Parameters["Player_Found"]["Common_Event"], 0, 0);
    DefFoundDelay = CheckParam("num", "Player_Found.Delay", Parameters["Player_Found"]["Delay"], 0, 0);
    DefFoundSe = {
        "name" : CheckParam("string", "Player_Found.Se.Name", Parameters["Player_Found"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Found.Se.Volume", Parameters["Player_Found"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Found.Se.Pitch", Parameters["Player_Found"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Found.Se.Pan", Parameters["Player_Found"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefLostBallon = CheckParam("num", "Player_Lost.Ballon", Parameters["Player_Lost"]["Ballon"], 0, 0);
    DefLostCommon = CheckParam("num", "Player_Lost.Common_Event", Parameters["Player_Lost"]["Common_Event"], 0, 0);
    DefLostDelay = CheckParam("num", "Player_Lost.Delay", Parameters["Player_Lost"]["Delay"], 0, 0);
    DefLostSe = {
        "name" : CheckParam("string", "Player_Lost.Se.Name", Parameters["Player_Lost"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Lost.Se.Volume", Parameters["Player_Lost"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Lost.Se.Pitch", Parameters["Player_Lost"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Lost.Se.Pan", Parameters["Player_Lost"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefTrackingPriority = CheckParam("bool", "Tracking_Priority", Parameters["Tracking_Priority"], false);
    DefFollowerThrough = CheckParam("bool", "Follower_Through", Parameters["Follower_Through"], false);
    DefLocationReset = CheckParam("bool", "Location_Reset", Parameters["Location_Reset"], false);

    DIR_UP = 8;
    DIR_DOWN = 2;
    DIR_RIGHT = 6;
    DIR_LEFT = 4;

    //=========================================================================
    //  ・プレイヤー探索制御プラグインコマンドを定義
    //=========================================================================
    function _eventId() {
        return $gameTemp.getEventId_MKR() || 0;
    }

    function toAryArgs(args) {
        return args.replace(/(\[|\"|\])/g, "").split(",");
    }

    // 探索開始
    PluginManager.registerCommand(PNAME, "start", args => {
        $gameSystem.startSensor();
    });

    // 強制探索開始
    PluginManager.registerCommand(PNAME, "force_start", args => {
        $gameSystem.startSensor(1);
    });

    // 探索停止
    PluginManager.registerCommand(PNAME, "stop", args => {
        $gameSystem.stopSensor();
    });

    // 全探索者のスイッチ初期化
    PluginManager.registerCommand(PNAME, "reset", args => {
        const sw_ids = toAryArgs(args.sw_ids);
        const slfsw_ids = toAryArgs(args.slfsw_ids);
        $gameSystem.resetSensor([...sw_ids, ...slfsw_ids]);
    });

    // 対象探索者のスイッチ初期化
    PluginManager.registerCommand(PNAME, "t_reset", args => {
        const sw_ids = toAryArgs(args.sw_ids);
        const slfsw_ids = toAryArgs(args.slfsw_ids);
        $gameSystem.neutralSensor(_eventId(), [...sw_ids, ...slfsw_ids]);
    });

    // 全探索者の強制ロスト
    PluginManager.registerCommand(PNAME, "lost", args => {
        $gameSystem.allForceLost();
    });

    // 対象探索者の強制ロスト
    PluginManager.registerCommand(PNAME, "t_lost", args => {
        $gameSystem.forceLost(_eventId());
    });

    // 対象探索者の探索開始
    PluginManager.registerCommand(PNAME, "t_start", args => {
        $gameSystem.onSensor(_eventId());
    });

    // 対象探索者の探索停止
    PluginManager.registerCommand(PNAME, "t_stop", args => {
        $gameSystem.offSensor(_eventId());
    });

    // 対象探索者をプレイヤーの位置付近まで移動
    PluginManager.registerCommand(PNAME, "t_move", args => {
        $gameMap._interpreter.moveNearPlayer(args[0]);
    });

    //=========================================================================
    // Game_Temp
    //  ・MZ専用処理を定義
    //=========================================================================
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._eventId_MKR = 0;
    };

    Game_Temp.prototype.getEventId_MKR = function() {
        return this._eventId_MKR;
    };

    Game_Temp.prototype.setEventId_MKR = function(eventId) {
        if (this.getEventId_MKR() !== eventId) {
            this._eventId_MKR = eventId;
        }
    };

    //=========================================================================
    // Game_Interpreter
    //  ・イベントをプレイヤー近くまで移動させるコマンドを定義
    //=========================================================================
    Game_Interpreter.prototype.moveNearPlayer = function(speed) {
        const event = $gameMap.event(this._eventId);
        const oldSpeed = event.moveSpeed();
        const sx = Math.abs(event.deltaXFrom($gamePlayer.x));
        const sy = Math.abs(event.deltaYFrom($gamePlayer.y));
        const list = [];
        let newSpeed = oldSpeed;
        if (event) {
            // 移動スピード設定
            if (speed && isFinite(speed) && speed > 0) {
                newSpeed = parseInt(speed, 10);
            }
            // 移動ルート設定
            list.push({"code":29,"parameters":[newSpeed]}, {"code":25})
            for (let i = 1; i < sx + sy; i++) {
                list.push({"code":10});
            }
            list.push({"code":25}, {"code":29,"parameters":[oldSpeed]}, {"code":0});
            // 移動開始
            this.setWaitMode('route');
            event.forceMoveRoute({
                "list":list,
                "repeat":false,
                "skippable":true,
                "wait":true
            });
        }
    };

    Game_Interpreter.prototype.setupReservedCommonEventEx = function(eventId) {
        if ($gameTemp.isCommonEventReserved()) {
            this.setup($gameTemp.reservedCommonEvent().list, eventId);
            $gameTemp.clearCommonEvent();
            return true;
        } else {
            return false;
        }
    };

    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
        $gameTemp.setEventId_MKR(eventId);
    };

    const _Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        $gameTemp.setEventId_MKR(this.eventId());
        return _Game_Interpreter_executeCommand.call(this);
    };

    //=========================================================================
    // Game_System
    //  プレイヤー探索制御を定義
    //=========================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(){
        _Game_System_initialize.call(this);
        this._sensorStart = false
        this._switchStatuses  = {};
    };

    Game_System.prototype.startSensor = function(type) {
        this.setSensorStart(true);
        this.setSensorStatusAll(1, type || 0);
        this.setViewRangeStatusAll(2);
    };

    Game_System.prototype.stopSensor = function() {
        this.setSensorStart(false);
        this.setSensorStatusAll(0);
        this.setViewRangeStatusAll(0);
    };

    Game_System.prototype.resetSensor = function(args) {
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null) {
                $gameSystem.neutralSensor(event.eventId(), args)
            }
        }, this);
    };

    Game_System.prototype.onSensor = function(eventId) {
        const event = $gameMap.event(eventId);
        if (event && event.getSensorType() !== null) {
            event.setSensorStatus(1);
        }
    };

    Game_System.prototype.offSensor = function(eventId) {
        const event = $gameMap.event(eventId);
        if (event && event.getSensorType() !== null) {
            event.setSensorStatus(0);
            event.setFoundStatus(0);
        }
    };

    Game_System.prototype.neutralSensor = function(eventId, args) {
        const mapId = $gameMap.mapId();
        const event = $gameMap.event(eventId);
        const switches = args && args.length >= 2 ? args.slice(1) : [];
        sensorSwitch = DefSensorSwitch[0];
        if (!event) return;
        if (event.getSensorType() !== null) {
            const sw =
                event.getSensorSwitch() !== null ?
                event.getSensorSwitch() : sensorSwitch;
            switches.push(sw);
            switches.forEach(function(sw) {
                if (isFinite(sw)) {
                    $gameSwitches.setValue(sw, false);
                } else if (sw.match(/[a-dA-D]/)) {
                    $gameSelfSwitches.setValue([
                        mapId, eventId, sw.toUpperCase()
                    ], false);
                }
            }, this)
        }
    };

    Game_System.prototype.isSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStart = function(sensorStart) {
        this._sensorStart = sensorStart || false;
    };

    Game_System.prototype.getSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStatusAll = function(status, type) {
        if (!type) type = 0;
        if (type) {
            $gameMap.events().forEach(function(event) {
                if (event.getSensorType() !== null) {
                    event.setSensorStatus(status);
                    event.setFoundStatus(0);
                }
            }, this);
            return;
        }
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null &&
                event.getSensorStatus() !== -1) {
                 event.setSensorStatus(status);
                 event.setFoundStatus(0);
            }
        }, this);
    }

    Game_System.prototype.setViewRangeStatusAll = function(status) {
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null) event.setViewRangeStatus(status);
        }, this);
    }

    Game_System.prototype.getEventSensorStatus = function(eventId) {
        let event;
        if (eventId && isFinite(eventId) && $gameMap.event(eventId)) {
            event = $gameMap.event(eventId);
            return event.getSensorStatus();
        } else {
            return null;
        }
    };

    Game_System.prototype.getSwitchStatuses = function() {
        return this._switchStatuses;
    };

    Game_System.prototype.setSwitchStatuses = function(sw, eventId) {
        if (this._switchStatuses[sw]) {
            if (this._switchStatuses[sw] instanceof Array &&
                this._switchStatuses[sw].length > 0 &&
                !this._switchStatuses[sw].contains(eventId)) {
                 this._switchStatuses[sw].push(eventId);
            } else {
                this._switchStatuses[sw] = [eventId];
            }
        } else {
            this._switchStatuses[sw] = [eventId];
        }
    };

    Game_System.prototype.isSwitchStatuses = function(sw, eventId) {
        if (!sw || !isFinite(sw)) {
            return false;
        }
        if (this._switchStatuses[sw]) {
            if (eventId === null) {
                return true;
            } else {
                if (this._switchStatuses[sw] instanceof Array &&
                    this._switchStatuses[sw].length > 0 &&
                    this._switchStatuses[sw].contains(eventId)) {
                     return true;
                }
            }
        }
        return false;
    };

    Game_System.prototype.removeSwitchStatuses = function(sw, eventId) {
        if (!this._switchStatuses[sw]) return;
        if (!eventId) {
            delete this._switchStatuses[sw];
            return;
        }
        if (this._switchStatuses[sw] instanceof Array &&
            this._switchStatuses[sw].length > 0 &&
            this._switchStatuses[sw].contains(eventId)) {
             this._switchStatuses[sw].some((v, i) => {
                 if (v === eventId) {
                     this._switchStatuses[sw].splice(i, 1);
                 }
             }, this);
        }
        if (this._switchStatuses[sw].length === 0) {
            delete this._switchStatuses[sw];
        }
    };

    Game_System.prototype.isFoundPlayer = function() {
        if (!this.isSensorStart()) return false;
        return $gameMap.events().some(e => e.isSensorFound());
    };

    Game_System.prototype.allForceLost = function() {
        if (!this.isSensorStart()) return false;
        $gameMap.events().filter(e => {
            return e.getFoundStatus() === 1;
        }).forEach(e => e.setForceLost(1));
    };

    Game_System.prototype.forceLost = function(eventId) {
        if (!this.isSensorStart() ||
            !eventId ||
            !isFinite(eventId) ||
            !$gameMap.event(eventId)) {
             return ;
        }
        const event = $gameMap.event(eventId);
        if (event.getFoundStatus() === 1) {
            event.setForceLost(1);
        }
    };

    //=========================================================================
    // Game_Player
    //  場所移動を行った際に追跡状態をリセットする処理を定義します。
    //
    //=========================================================================
    const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        if (DefLocationReset[0] &&
            !$gameParty.inBattle() &&
            !$gameMessage.isBusy()) {
             $gameSystem.resetSensor();
        }
        _Game_Player_reserveTransfer.apply(this, arguments);
    };

    //=========================================================================
    // Game_CharacterBase
    //  プレイヤー探索制御用メンバーを追加定義し、
    //  センサー状態を変更する処理を再定義します。
    //
    //  センサー状態：
    //   -2 = センサー初期化前
    //   -1 = 探索一時停止
    //    0 = 探索停止
    //    1 = 探索中
    //  視界描画状態：
    //    0 = 描画停止
    //    1 = 描画更新
    //    2 = 描画新規
    //  発見状態：
    //    0 = 未発見
    //    1 = 発見済み
    //  強制ロスト：
    //    0 = 無効
    //    1 = 設定反映ロスト
    //    2 = 即ロスト
    //=========================================================================
    const _Game_CharacterBaseInitMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBaseInitMembers.call(this);
        const foundBallon = DefFoundBallon[0];
        const foundCommon = DefFoundCommon[0];
        const foundSe = DefFoundSe;
        const foundDelay = DefFoundDelay[0];
        const lostBallon = DefLostBallon[0];
        const lostCommon = DefLostCommon[0];
        const lostSe = DefLostSe;
        const lostDelay = DefLostDelay[0];
        this._foundStatus = 0;
        this._sensorStatus = -2;
        this._sensorType = null;
        this._sensorRange = 0;
        this._sensorRangeC = 0;
        this._bothSensorR = false;
        this._bothSensorL = false;
        this._viewRangeStatus = 0;
        this._coordinate = [];
        this._sensorSwitch = null;
        this._lostSensorSwitch = null;
        this._sideSensor = -1;
        this._rangeVisible = -1;
        this._terrainDecision = -1;
        this._directionFixed = -1;
        this._eventDecision = -1;
        this._regionDecision = "";
        this._createRange = false;
        this._foundBallon = foundBallon;
        this._foundCommon = foundCommon;
        this._foundSe = foundSe;
        this._foundMaxDelay = foundDelay;
        this._foundDelay = this._foundMaxDelay;
        this._lostBallon = lostBallon;
        this._lostCommon = lostCommon;
        this._lostSe = lostSe;
        this._lostMaxDelay = lostDelay;
        this._lostDelay = this._lostMaxDelay;
        this._activeMode = 0;
        this._forceLost = 0;
    };

    const _Game_CharacterBaseMoveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        const status = this.direction() === d ? 1 : 2;
        _Game_CharacterBaseMoveStraight.call(this,d);
        if (this.isMovementSucceeded() && d &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(status);
        }
    };

    const _Game_CharacterBaseMoveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
        _Game_CharacterBaseMoveDiagonally.call(this,horz, vert);
        if (this.isMovementSucceeded() &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(2);
        }
    };

    const _Game_CharacterBaseSetDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d) {
        const status = (this.direction() === d) ? 1 : 2;
        if (!this.isDirectionFixed() && d &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(status);
        }
        _Game_CharacterBaseSetDirection.call(this,d);
    }
    Game_CharacterBase.prototype.startViewRange = function() {
        this.setViewRangeStatus(1);
    };

    Game_CharacterBase.prototype.setSensorStatus = function(sensorStatus) {
        this._sensorStatus = sensorStatus;
    };

    Game_CharacterBase.prototype.getSensorStatus = function() {
        return this._sensorStatus;
    };

    Game_CharacterBase.prototype.setFoundStatus = function(foundStatus) {
        this._foundStatus = foundStatus;
    };

    Game_CharacterBase.prototype.getFoundStatus = function() {
        return this._foundStatus;
    };

    Game_CharacterBase.prototype.setSensorType = function(sensorType) {
        this._sensorType = sensorType;
    };

    Game_CharacterBase.prototype.getSensorType = function() {
        return this._sensorType;
    };

    Game_CharacterBase.prototype.setSensorRange = function(sensorRange) {
        this._sensorRange = sensorRange;
    };

    Game_CharacterBase.prototype.getSensorRange = function() {
        const value1 = parseInt(ConvVb(this._sensorRange), 10);
        const value2 = value1 % 2 ? 2 : value1;
        return this.getSensorType() === "df" ?  value2 : value1;
    };

    Game_CharacterBase.prototype.setSensorRangeC = function(sensorRangeC) {
        this._sensorRangeC = sensorRangeC;
    };

    Game_CharacterBase.prototype.getSensorRangeC = function() {
        const value1 = parseInt(ConvVb(this._sensorRangeC), 10);
        const value2 = value1 % 2 ? 2 : value1
        return this.getSensorType() === "df" ? value2 : value1;
    };

    Game_CharacterBase.prototype.setViewRangeStatus = function(viewRangeStatus) {
        this._viewRangeStatus = viewRangeStatus;
    };

    Game_CharacterBase.prototype.getViewRangeStatus = function() {
        return this._viewRangeStatus;
    };

    Game_CharacterBase.prototype.setCoordinate = function(x, y, status) {
        this._coordinate.push([x, y, status, -1]);
    };

    Game_CharacterBase.prototype.getCoordinate = function() {
        return this._coordinate;
    };

    Game_CharacterBase.prototype.clearCoordinate = function() {
        this._coordinate = [];
    };

    Game_CharacterBase.prototype.setBothSensorRight = function(bothSensor) {
        this._bothSensorR = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorRight = function() {
        return this._bothSensorR;
    };

    Game_CharacterBase.prototype.setBothSensorLeft = function(bothSensor) {
        this._bothSensorL = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorLeft = function() {
        return this._bothSensorL;
    };

    Game_CharacterBase.prototype.setBothSensor = function(bothSensor) {
        this._sideSensor = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensor = function() {
        return parseInt(ConvSw(this._sideSensor, this), 10);
    };

    Game_CharacterBase.prototype.setSensorSwitch = function(sensorSwitch) {
        if (isFinite(sensorSwitch)) {
            this._sensorSwitch = parseInt(sensorSwitch, 10);
        } else if (sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._sensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getSensorSwitch = function() {
        return this._sensorSwitch;
    };

    Game_CharacterBase.prototype.setLostSensorSwitch = function(sensorSwitch) {
        if (isFinite(sensorSwitch)) {
            this._lostSensorSwitch = parseInt(sensorSwitch, 10);
        } else if (sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._lostSensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getLostSensorSwitch = function() {
        return this._lostSensorSwitch;
    };

    Game_CharacterBase.prototype.setRangeVisible = function(rangeVisible) {
        this._rangeVisible = rangeVisible;
    };

    Game_CharacterBase.prototype.getRangeVisible = function() {
        return parseInt(ConvSw(this._rangeVisible, this), 10);
    };

    Game_CharacterBase.prototype.setTerrainDecision = function(terrainDecision) {
        this._terrainDecision = terrainDecision;
    };

    Game_CharacterBase.prototype.getTerrainDecision = function() {
        return parseInt(ConvSw(this._terrainDecision, this), 10);
    };

    Game_CharacterBase.prototype.setEventDecision = function(eventDecision) {
        this._eventDecision = eventDecision;
    };

    Game_CharacterBase.prototype.getEventDecision = function() {
        return parseInt(ConvSw(this._eventDecision, this), 10);
    };

    Game_CharacterBase.prototype.setRegionDecision = function(regionDecision) {
        this._regionDecision = String(regionDecision);
    };

    Game_CharacterBase.prototype.getRegionDecision = function() {
        return parseInt(ConvVb(this._regionDecision), 10);
    };

    Game_CharacterBase.prototype.setDirectionFixed = function(directionFixed) {
        let direction;
        switch(directionFixed) {
            case "u":
                direction = DIR_UP;
                break;
            case "r":
                direction = DIR_RIGHT;
                break;
            case "l":
                direction = DIR_LEFT;
                break;
            case "d":
                direction = DIR_DOWN;
                break;
            default:
                direction = -1;
        }
        this._directionFixed = parseInt(direction, 10);
    };

    Game_CharacterBase.prototype.getDirectionFixed = function() {
        return this._directionFixed;
    };

    Game_CharacterBase.prototype.isMapPassableEx = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const d2 = this.reverseDir(d);
        const eventDecision = CEC(DefEventDecision);
        const regDec = getRegionIds(DefRegionDecisions, this.getRegionDecision());
        let passableFlag = true;
        if ($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) {
            if (this.getEventDecision() === 1 ||
                (this.getEventDecision() === -1 && eventDecision)) {
                 const events = $gameMap.eventsXyNt(x2, y2);
                 passableFlag = !events.some(function(event) {
                     return event.isNormalPriority();
                 });
            }
            if (regDec.length > 0 && !!passableFlag) {
                const id = $gameMap.regionId(x2, y2);
                passableFlag = !regDec.contains(id);
            }
        } else {
            passableFlag = false;
        }
        return passableFlag;
    };

    Game_CharacterBase.prototype.isCreateRange = function() {
        return this._createRange;
    };

    Game_CharacterBase.prototype.enableCreateRange = function() {
        this._createRange = true;
    };

    Game_CharacterBase.prototype.setFoundBallon = function(ballon) {
        this._foundBallon = ballon;
    };

    Game_CharacterBase.prototype.getFoundBallon = function() {
        return parseInt(ConvVb(this._foundBallon), 10);
    };

    Game_CharacterBase.prototype.setFoundCommon = function(common) {
        this._foundCommon = common;
    };

    Game_CharacterBase.prototype.getFoundCommon = function() {
        return parseInt(ConvVb(this._foundCommon), 10);
    };

    Game_CharacterBase.prototype.setFoundDelay = function(delay) {
        this._foundDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getFoundDelay = function() {
        return this._foundDelay;
    };

    Game_CharacterBase.prototype.resetFoundDelay = function() {
        this._foundDelay = this.getFoundMaxDelay();
    };

    Game_CharacterBase.prototype.setFoundMaxDelay = function(delay) {
        this._foundMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getFoundMaxDelay = function() {
        return parseInt(ConvVb(this._foundMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setLostBallon = function(ballon) {
        this._lostBallon = ballon;
    };

    Game_CharacterBase.prototype.getLostBallon = function() {
        return parseInt(ConvVb(this._lostBallon), 10);
    };

    Game_CharacterBase.prototype.setLostCommon = function(common) {
        this._lostCommon = common;
    };

    Game_CharacterBase.prototype.getLostCommon = function() {
        return parseInt(ConvVb(this._lostCommon), 10);
    };

    Game_CharacterBase.prototype.setLostDelay = function(delay) {
        this._lostDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getLostDelay = function() {
        return this._lostDelay;
    };

    Game_CharacterBase.prototype.resetLostDelay = function() {
        this._lostDelay = this.getLostMaxDelay();
    };

    Game_CharacterBase.prototype.setLostMaxDelay = function(delay) {
        this._lostMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getLostMaxDelay = function() {
        return parseInt(ConvVb(this._lostMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setActiveMode = function(mode) {
        this._activeMode = mode;
    };

    Game_CharacterBase.prototype.getActiveMode = function() {
        return parseInt(ConvSw(this._activeMode, this), 10);;
    };

    Game_CharacterBase.prototype.setForceLost = function(forceLost) {
        this._forceLost = forceLost;
    };

    Game_CharacterBase.prototype.getForceLost = function() {
        return this._forceLost;
    };

    Game_CharacterBase.prototype.isSensorFound = function() {
        return this.getSensorStatus() === 1 && this.getFoundStatus() === 1;
    };

    //=========================================================================
    // Game_Map
    //  探索開始処理の自動実行を定義します。
    //=========================================================================
    const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.call(this);
        if (DefAutoSensor[0]) {
            $gameSystem.startSensor();
        }
    };

    //=========================================================================
    // Game_Event
    //  プレイヤーとの距離を測り
    //  指定範囲内にプレイヤーがいる場合に指定されたスイッチをONにします。
    //=========================================================================
    const _Game_EventSetupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_EventSetupPageSettings.call(this);
        if (this.getSensorStatus() === -2) {
            this.setupSensor();
        }
    };

    Game_Event.prototype.setupSensor = function() {
        const pattern = /<(.?)(?:psensor)(l|f|s|d)?(?:\:)(\\v\[\d+\]|\d+)([ 0-9a-z\[\]\\]*)?>/i
        const event = this.event();
        if (!event.note) return;
        note = event.note.toLowerCase();
        note = note.split(/ (?=<)/);
        cnt = note.length;
        for (let i = 0;i < cnt;i++) {
            const n = note[i].trim();
            if (n.match(pattern)) {
                match = n.match(pattern);
                if (match[1] && match[1] === "!") { // 探索一時無効
                    this.setSensorStatus(-1);
                }
                switch(match[2]) { // 探索種別
                    case "l":
                    case "f":
                    case "s":
                    case "d":
                        this.setSensorType(match[2]);
                        break;
                    default:
                        continue;
                        break;
                }
                if (match[3]) { // 探索対象マス数
                    value = String(match[3]);
                    value = value.replace(/\\/g, '\x1b');
                    value = value.replace(/\x1b\x1b/g, '\\');
                    if (this.getSensorType() === "df" &&
                        isFinite(value) &&
                        (value <= 1 || (value % 2))) {
                         value = 2;
                    }
                    this.setSensorRange(value);
                    this.setSensorRangeC(value);
                }
                if (match[4]) { // オプション
                    options = match[4].trim().split(" ");
                    setupSensor_option(this, options);
                }
            }
        }
    };

    function setupSensor_option(obj, options) {
        options.forEach(function(op){
            op = op.replace(/\\/g, '\x1b');
            op = op.replace(/\x1b\x1b/g, '\\');
            if (op.match(/^sw([a-d]|\d+)$/)) { // スイッチ指定
                const m = op.match(/^sw([a-d]|\d+)$/);
                obj.setSensorSwitch(m[1]);
            } else if (op.match(/^lsw([a-d]|\d+)$/)) { // ロストスイッチ指定
                const m = op.match(/^lsw([a-d]|\d+)$/);
                obj.setLostSensorSwitch(m[1]);
            } else if (op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 両隣探索指定
                const m = op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setBothSensor(m[1]);
            } else if (op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 描画指定
                const m = op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setRangeVisible(m[1]);
            } else if (op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 地形考慮指定
                const m = op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setTerrainDecision(m[1]);
            } else if (op.match(/^di([urld])$/)) { // 探索方向固定
                const m = op.match(/^di([urld])$/);
                obj.setDirectionFixed(m[1]);
            } else if (op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // イベント考慮指定
                const m = op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setEventDecision(m[1]);
            } else if (op.match(/^rg(\d+|\x1bv\[(\d+)\])$/)) { // リージョン考慮指定
                const m = op.match(/^rg(\d+|\x1bv\[(\d+)\])$/);
                obj.setRegionDecision(m[1]);
            } else if (op.match(/^fb(\d+|\x1bv\[(\d+)\])$/)) { // 発見フキダシ指定
                const m = op.match(/^fb(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundBallon(m[1]);
            } else if (op.match(/^fc(\d+|\x1bv\[(\d+)\])$/)) { // 発見コモン指定
                const m = op.match(/^fc(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundCommon(m[1]);
            } else if (op.match(/^fd(\d+|\x1bv\[(\d+)\])$/)) { // 発見遅延指定
                const m = op.match(/^fd(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundMaxDelay(m[1]);
                obj.setFoundDelay(m[1]);
            } else if (op.match(/^lb(\d+|\x1bv\[(\d+)\])$/)) { // ロストフキダシ指定
                const m = op.match(/^lb(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostBallon(m[1]);
            } else if (op.match(/^lc(\d+|\x1bv\[(\d+)\])$/)) { // ロストコモン指定
                const m = op.match(/^lc(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostCommon(m[1]);
            } else if (op.match(/^ld(\d+|\x1bv\[(\d+)\])$/)) { // ロスト遅延指定
                const m = op.match(/^ld(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostMaxDelay(m[1]);
                obj.setLostDelay(m[1]);
            } else if (op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // 探索続行指定
                const m = op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setActiveMode(m[1]);
            }
        });
    }

    const _Game_EventUpdate = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_EventUpdate.call(this);
        if (!this.isInvisible() && $gameSystem.isSensorStart()) {
            this.sensorUpdate();
        }
    };

    Game_Event.prototype.sensorUpdate = function() {
        // 探索中のイベントであること
        // マップイベント実行中でないこと or 探索続行オプションが付与されている
        if (this.getSensorStatus() === 1 &&
            (!this.isStarting() || this.getActiveMode() === 1)){
             // プレイヤーを発見して、かつ強制ロストが無効
             if (this.isFoundPlayer() && this.getForceLost() === 0) {
                 if (this.getFoundStatus() === 0) {
                     this.foundPlayer();
                 }
                 if (this.getLostDelay() < this.getLostMaxDelay()) this.resetLostDelay();
             // 強制ロストが有効
             } else if(this.getForceLost() > 0) {
                 this.lostPlayer(true);
             // プレイヤー発見状態
             } else if(this.getFoundStatus() == 1) {
                 this.lostPlayer();
                 if (this.getFoundDelay() < this.getFoundMaxDelay()) {
                     this.resetFoundDelay();
                     this.setForceLost(0);
                 }
             } else {
                 if (this.getFoundDelay() < this.getFoundMaxDelay()) {
                     this.resetFoundDelay();
                     this.setForceLost(0);
                 }
             }
        }
    };

    Game_Event.prototype.foundPlayer = function() {
        const delay = this.getFoundDelay();
        if (delay <= 0) {
            const sensorSwitch = DefSensorSwitch[0];
            const lostSensorSwitch = DefLostSensorSwitch[0];
            const mapId = $gameMap.mapId();
            const eventId = this.eventId();
            this.setFoundStatus(1);
            this.resetFoundDelay();
            this.resetLostDelay();
            // 発見後スイッチON
            const sw_on = 
                this.getSensorSwitch() !== null ?
                this.getSensorSwitch() : sensorSwitch;
            foundPlayer_swon(sw_on, mapId, eventId);
            // ロスト後スイッチOFF
            const sw_off = 
                this.getLostSensorSwitch() !== null ?
                this.getLostSensorSwitch() : lostSensorSwitch;
            if (sw_off !== "") {
                foundPlayer_swoff(sw_off, mapId, eventId);
            }
            if (this._foundSe.name !== "") {
                AudioManager.playSe(this._foundSe);
            }
            if (this._foundBallon > 0) {
                $gameTemp.requestBalloon(this, this._foundBallon);
            }
            if (this._foundCommon > 0) {
                $gameTemp.reserveCommonEvent(this._foundCommon);
                if ($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else {
            this.setFoundDelay(delay - 1);
        }
    };

    Game_Event.prototype.lostPlayer = function(forceLost = false) {
        const delay = this.getLostDelay();
        if (delay <= 0 || forceLost) {
            const sensorSwitch = DefSensorSwitch[0];
            const lostSensorSwitch = DefLostSensorSwitch[0];
            const mapId = $gameMap.mapId();
            const eventId = this.eventId();
            this.setForceLost(0);
            this.setFoundStatus(0);
            this.resetLostDelay();
            this.resetFoundDelay();
            // 発見後スイッチOFF
            const sw_off = 
                this.getSensorSwitch() !== null ?
                this.getSensorSwitch() : sensorSwitch;
            foundPlayer_swoff(sw_off, mapId, eventId);
            // ロスト後スイッチON
            const sw_on = 
                this.getLostSensorSwitch() !== null ?
                this.getLostSensorSwitch() : lostSensorSwitch;
            if (sw_on !== "") {
                foundPlayer_swon(sw_on, mapId, eventId);
            }
            if (this._lostSe.name !== "") {
                AudioManager.playSe(this._lostSe);
            }
            if (this._lostBallon > 0) {
                $gameTemp.requestBalloon(this, this._lostBallon);
            }
            if (this._lostCommon > 0) {
                $gameTemp.reserveCommonEvent(this._lostCommon);
                if ($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else {
            this.setLostDelay(delay - 1);
        }
    };

    function foundPlayer_swon(...arg) {
        const sw = arg[0];
        const mapId = arg[1];
        const eventId = arg[2];
        if (isFinite(sw)) {
            if (!$gameSwitches.value(sw)) {
                $gameSwitches.setValue(sw, true);
            }
        } else if (sw.match(/[a-dA-D]/)) {
            key = [mapId, eventId, sw.toUpperCase()];
            if (!$gameSelfSwitches.value(key)) {
                $gameSelfSwitches.setValue(key, true);
            }
        }
    }

    function foundPlayer_swoff(...arg) {
        const sw = arg[0];
        const mapId = arg[1];
        const eventId = arg[2];
        if (sw === "") return;
        if (isFinite(sw)) {
            if ($gameSwitches.value(sw)) {
                $gameSwitches.setValue(sw, false);
            }
        } else if (sw.match(/[a-dA-D]/)) {
            key = [mapId, eventId, sw.toUpperCase()];
            if ($gameSelfSwitches.value(key)) {
                $gameSelfSwitches.setValue(key, false);
            }
        }
    }

    Game_Event.prototype.isFoundPlayer = function() {
        switch (this.getSensorType()) {
            case "l": // 直線の探索
                return this.sensorLine();
            case "f": // 扇範囲の探索
                return this.sensorFan();
            case "s": // 四角範囲の探索
                return this.sensorSquare();
            case "d": // 菱形範囲の探索
                return this.sensorDiamond();
        }
        return false;
    };

    // 直線の探索
    Game_Event.prototype.sensorLine = function() {
        const sensorRange = this.getSensorRange();
        const dirFixed = this.getDirectionFixed();
        const dir = dirFixed === -1 ? this.direction() : dirFixed;
        const px = $gamePlayer._realX;
        const py = $gamePlayer._realY;
        const ex = this._realX;
        const ey = this._realY;
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // currentRange初期化
        const sensorRangeC = sensorRange;
        let strDir, diagoDir, coordinates, cnt;
        // coordinate初期化
        this.clearCoordinate();
        switch (dir) {
            case 8:// 上向き(y<0)
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;
                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);
                // 隣接マス探索
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), -1, 0)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (px >= ex + coordinates[i][0] - realX && 
                            px <= ex + coordinates[i][0] + realX &&
                            py >= ey - Math.abs(coordinates[i][1]) - realY &&
                            py <= ey + Math.abs(coordinates[i][0])) {
                             return true;
                        }
                    }
                }
                break;
            case 6:// 右向き(x>0)
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;
                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);
                // 隣接マス探索
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, -1)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (py >= ey + coordinates[i][1] - realY &&
                            py <= ey + coordinates[i][1] + realY &&
                            px >= ex + Math.abs(coordinates[i][1]) - realX &&
                            px <= ex + coordinates[i][0] + realX) {
                             return true;
                        }
                    }
                }
                break;
            case 4:// 左向き(x<0)
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;
                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);
                // 隣接マス探索
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, 1)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (py <= ey + coordinates[i][1] + realY &&
                            py >= ey + coordinates[i][1] - realY &&
                            px <= ex + Math.abs(coordinates[i][1]) + realX &&
                            px >= ex + coordinates[i][0] - realX) {
                             return true;
                        }
                    }
                }
                break;
            case 2:// 下向き(y>0)
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;
                // 正面範囲確定
                this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);
                // 隣接マス探索
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 1, 0)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (px >= ex + coordinates[i][0] - realX &&
                            px <= ex + coordinates[i][0] + realX &&
                            py >= ey + Math.abs(coordinates[i][0]) &&
                            py <= ey + coordinates[i][1] + realY) {
                             return true;
                        }
                    }
                }
        }
        return false;
    };

    // 扇範囲の探索
    Game_Event.prototype.sensorFan = function() {
        const sensorRange = this.getSensorRange();
        const dirFixed = this.getDirectionFixed();
        const dir = dirFixed === -1 ? this.direction() : dirFixed;
        const px = $gamePlayer._realX;
        const py = $gamePlayer._realY;
        const sx = this.deltaXFrom($gamePlayer.x);
        const sy = this.deltaYFrom($gamePlayer.y);
        const ex = this.x;
        const ey = this.y;
        const rex = this._realX;
        const rey = this._realY;
        const terrainDecision = CEC(DefTerrainDecision);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        let sign, strDir, diagoDir, noPass, noPassTemp, coordinates, cnt;
        noPass = 0;
        // currentRange初期化
        this.setSensorRangeC(sensorRange);
        // coordinate初期化
        this.clearCoordinate();
        switch (dir) {
            case DIR_UP:// 上向き(y<0)
                sign = 1;
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;
                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // 斜め直線上の範囲確定
                for (let i = 1; i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, -j, 0, -1, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision) && (
                            !this.isMapPassableEx(ex + j * sign, ey - j, diagoDir) ||
                            !this.isMapPassableEx(ex + j * sign, ey - j, strDir) ||
                            !this.isMapPassableEx(ex + j * sign, ey - j - 1, diagoDir) ||
                            !this.isMapPassableEx(ex + (j + 1) * sign, ey - j, strDir))) {
                             break;
                        }
                    }
                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // 隣接マス探索
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, -1, 0)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (px <= rex + coordinates[i][0] + realX &&
                        px >= rex + coordinates[i][0] - realX &&
                        py <= rey - Math.abs(coordinates[i][0]) + realY &&
                        py >= rey + coordinates[i][1] - realY) {
                        return true;
                    }
                }
                break;
            case DIR_RIGHT:// 右向き(x>0)
                sign = 1;
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;
                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // 斜め直線上の範囲確定
                for (let i = 1; i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j, j * sign, 1, 0, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 || 
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                           if (!this.isMapPassableEx(ex + j, ey + j * sign, diagoDir) ||
                               !this.isMapPassableEx(ex + j, ey + j * sign, strDir) ||
                               !this.isMapPassableEx(ex + j + 1, ey + j * sign, diagoDir) ||
                               !this.isMapPassableEx(ex + j, ey + (j + 1) * sign, strDir)) {
                                break;
                           }
                       }
                    }
                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // 隣接マス探索
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, -1)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (py >= rey + coordinates[i][1] - realY &&
                        py <= rey + coordinates[i][1] + realY &&
                        px >= rex + Math.abs(coordinates[i][1]) - realX &&
                        px <= rex + coordinates[i][0] + realX) {
                         return true;
                    }
                }
                break;
            case DIR_LEFT:// 左向き(x<0)
                sign = -1;
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;
                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // 斜め直線上の範囲確定
                for (let i = 1;i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, -j, j * sign, -1, 0, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                            if (!this.isMapPassableEx(ex - j, ey + j * sign, diagoDir) ||
                                !this.isMapPassableEx(ex - j, ey + j * sign, strDir) ||
                                !this.isMapPassableEx(ex - j - 1, ey + j * sign, diagoDir) ||
                                !this.isMapPassableEx(ex - j, ey + (j + 1) * sign, strDir)) {
                                 break;
                            }
                        }
                    }
                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // 隣接マス探索
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, 1)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (py <= rey + coordinates[i][1] + realY &&
                        py >= rey + coordinates[i][1] - realY &&
                        px <= rex - Math.abs(coordinates[i][1]) + realX &&
                        px >= rex + coordinates[i][0] - realX) {
                        return true;
                    }
                }
                break;
            case DIR_DOWN:// 下向き(y>0)
                sign = -1;
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;
                // 正面範囲確定
                noPass = this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // 切り替え用
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // 斜め直線上の範囲確定
                for (let i = 1;i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, j, 0, 1, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                            if (!this.isMapPassableEx(ex + j * sign, ey + j, diagoDir) ||
                                !this.isMapPassableEx(ex + j * sign, ey + j, strDir) ||
                                !this.isMapPassableEx(ex + j * sign, ey + j + 1, diagoDir) ||
                                !this.isMapPassableEx(ex + (j + 1) * sign, ey + j, strDir)) {
                                 break;
                            }
                        }
                    }
                    // 配列の要素数合わせ
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // 切り替え用
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // 隣接マス探索
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 1, 0)) {
                    return true;
                }
                // プレイヤー範囲探索
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (px >= rex + coordinates[i][0] - realX &&
                        px <= rex + coordinates[i][0] + realX &&
                        py >= rey + Math.abs(coordinates[i][0]) - realY &&
                        py <= rey + coordinates[i][1] + realY) {
                         return true;
                    }
                }
        }
        return false;
    };

    // 菱形範囲の探索(地形考慮完全無視)
    Game_Event.prototype.sensorDiamond = function() {
        const sensorRange = this.getSensorRange();
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // currentRange初期化
        this.setSensorRangeC(sensorRange);
        // coordinate初期化
        this.clearCoordinate();
        // coordinateセット
        this.setCoordinate(0, -sensorRange, DIR_RIGHT);
        this.setCoordinate(sensorRange, 0, DIR_DOWN);
        this.setCoordinate(0, sensorRange, DIR_LEFT);
        this.setCoordinate(-sensorRange, 0, DIR_UP);
        // プレイヤー範囲探索
        if (Math.abs(sx) + Math.abs(sy) <= sensorRange + Math.max(realX, realY)) {
            return true;
        }
    }

    // 四角範囲の探索(地形考慮完全無視)
    Game_Event.prototype.sensorSquare = function() {
        const sensorRange = this.getSensorRange();
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // currentRange初期化
        this.setSensorRangeC(sensorRange);
        // coordinate初期化
        this.clearCoordinate();
        // プレイヤー範囲探索
        if (Math.abs(sx) <= sensorRange + realX && Math.abs(sy) <= sensorRange + realY) {
            return true;
        }
    }

    Game_Event.prototype.isSideSearch = function(directionR, directionL, vx, vy) {
        const bothSensor = CEC(DefBothSensor);
        const terrainDecision = CEC(DefTerrainDecision);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const ex = this.x;
        const ey = this.y;
        if (this.getBothSensor() === -1 && bothSensor) {
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else if (this.getBothSensor() === 1) {
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else {
            this.setBothSensorRight(false);
            this.setBothSensorLeft(false);
        }
        if (this.getBothSensorRight() &&
           sx >= vx - realX && sx <= vx + realX &&
           sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        vx = vx === 0 ? vx : -vx;
        vy = vy === 0 ? vy : -vy;
        if (this.getBothSensorLeft() &&
           sx >= vx - realX && sx <= vx + realX &&
           sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        return false;
    };

    Game_Event.prototype.rangeSearch = function(strDir, rx, ry, signX, signY, noPass) {
        const sensorRange = this.getSensorRange();
        const cnt = sensorRange - Math.abs(rx);
        const noPassDir = signX !== 0 ? ry : rx;
        const terrainDecision = CEC(DefTerrainDecision);
        const ex = this.x;
        const ey = this.y;
        let obstacle, status;
        obstacle = -1;
        status = "Last";
        // 正面探索
        for (j = 0; j <= cnt; j++) {
            cx = rx + j * signX;
            cy = ry + j * signY;
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                if (!this.isMapPassableEx(ex + cx, ey + cy, strDir) && j < sensorRange) {
                    obstacle = j + Math.abs(rx);
                    status = "Line";
                    break;
                }
                if (j + Math.abs(noPassDir) >= noPass && noPass < sensorRange) {
                    status = "Nopass";
                    break;
                }
            }
        }
        // 座標セット
        sx = this.deltaXFrom(ex + cx);
        if (sx !== 0) sx *= -1;
        sy = this.deltaYFrom(ey + cy);
        if (sy !== 0) sy *= -1;
        this.setCoordinate(sx, sy, status);
        return obstacle < 0 ? noPass : obstacle;
    };

    const _GameEvent_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function() {
        if (this.getSensorStatus() !== 1) {
            _GameEvent_lock.call(this);
        } else {
            // 話しかけられた場合振り向かない(探索者が探索中に限る)
            if (!this._locked) {
                this._prelockDirection = this.direction();
                this._locked = true;
            }
        }
    };

    Game_Event.prototype.addCoordinate = function(length) {
        // 左右の配列要素数を指定数に合わせる
        const coordinates = this.getCoordinate();
        const cnt = coordinates.length;
        for (let j = cnt; j < length; j++) {
            this.setCoordinate(0, 0, "Add");
        }
    };

    const _Game_Event_erase = Game_Event.prototype.erase;
    Game_Event.prototype.erase = function() {
        this.setSensorStatus(0);
        this.setFoundStatus(0);
        this.setViewRangeStatus(0);
        _Game_Event_erase.call(this);
    };

    const _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        if (this.isSensorFound() && DefTrackingPriority[0]) {
            return Game_CharacterBase.prototype.isCollidedWithEvents.apply(this, arguments);
        } else {
            return _Game_Event_isCollidedWithEvents.apply(this, arguments);
        }
    };

    Game_Event.prototype.isInvisible = function() {
        return this._erased || this.characterName() === "";
    }

    const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        if (!this.isSensorFound() || !DefFollowerThrough[0]) {
            return _Game_Event_isCollidedWithPlayerCharacters.call(this, x, y);
        }
        return (
            this.isNormalPriority() &&
            !$gamePlayer.isThrough() &&
            $gamePlayer.pos(x, y)
        );
    };

    //=========================================================================
    // Spriteset_Map
    //  探索者の視界範囲を表す図形を描画させる処理を追加定義します。
    //=========================================================================
    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createViewRange();
    }

    Spriteset_Map.prototype.createViewRange = function() {
        this._viewRangeSprites = [];
        $gameMap.events().forEach(event => {
            if (event._sensorType) {
                this._viewRangeSprites.push(new Sprite_ViewRange(event));
                addSideSprite(this, event);
                event.enableCreateRange();
            }
        }, this);
        for (let i = 0; i < this._viewRangeSprites.length; i++) {
            this._tilemap.addChild(this._viewRangeSprites[i]);
        }
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        if (this._viewRangeSprites && ConvSw(DefRangeVisible[0])) {
            this.updateViewRange();
        }
    };

    Spriteset_Map.prototype.updateViewRange = function() {
        const _cnt = this._viewRangeSprites.length - 1
        cnt = _cnt >= 0 ? _cnt : 0;
        $gameMap.events().filter(event => {
            return !event.isCreateRange();
        }).forEach(event => {
            if (event._sensorType) {
                this._viewRangeSprites.push(new Sprite_ViewRange(event));
                addSideSprite(this, event);
                event.enableCreateRange();
            }
        }, this);
        for (; cnt < this._viewRangeSprites.length; cnt++) {
            this._tilemap.addChild(this._viewRangeSprites[cnt]);
        }
    };

    function addSideSprite(spriteset, event) {
        const viewRangeSprites = spriteset._viewRangeSprites;
        const bsprite = viewRangeSprites[viewRangeSprites.length - 1];
        const sprite = new Sprite();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const opacity = DefRangeOpacity[0];
        sprite.opacity = opacity;
        sprite.blendMode = PIXI.BLEND_MODES.ADD;
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;      
        sprite.visible = true;
        bsprite._spriteSD = sprite;
        spriteset._tilemap.addChild(sprite);
    }
    //=========================================================================
    // Sprite_ViewRange
    //  探索者の視界範囲を表す図形を描画させる処理を定義します。
    //=========================================================================
    function Sprite_ViewRange() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ViewRange.prototype = Object.create(Sprite.prototype);
    Sprite_ViewRange.prototype.constructor = Sprite_ViewRange;

    Sprite_ViewRange.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
        this._frameCount = 0;
        this.z = DefRangePosition[0] === 1 ? 6 : 2;
    };

    Sprite_ViewRange.prototype.initMembers = function() {
        this._character = null;
        this._coordinates = null;
    };

    Sprite_ViewRange.prototype.setCharacter = function(character) {
        this._character = character;
    };

    Sprite_ViewRange.prototype.update = function() {
        Sprite.prototype.update.call(this);
        const sensorStatus = this._character.getSensorStatus();
        const rangeStatus = this._character.getViewRangeStatus();
        const rangeVisible = this._character.getRangeVisible();
        const defVisible = ConvSw(DefRangeVisible[0]);
        if (this._character && this._character._erased) {
            this.parent.removeChild(this._spriteSD);
            this.parent.removeChild(this);
        }
        if (this._character &&
            !this._character._erased &&
            sensorStatus === 1 && (rangeVisible === 1 ||
            (rangeVisible === -1 && defVisible))) {
             this.updatePosition();
             if (this.bitmap) {
                 if (rangeStatus === 1) {
                     // 描画更新
                     if (this._coordinate.length === 0) {
                         this._coordinate = this._character.getCoordinate();
                     }
                     this.updateBitmap();
                 } else if (rangeStatus === 2) {
                     // 描画新規
                     this._coordinate = this._character.getCoordinate();
                     this.createBitmap();
                 }
             } else {
                 // 描画新規
                 this._coordinate = this._character.getCoordinate();
                 this.createBitmap();
             }
            this.visible = true;
            this._spriteSD.visible = true;
        } else {
            this.visible = false;
            this._spriteSD.visible = false;
        }
    };

    Sprite_ViewRange.prototype.createBitmap = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const bothSensor = CEC(DefBothSensor);
        const coordinates = this._coordinate;
        const sensorType = this._character.getSensorType();
        const sensorRange = this._character.getSensorRange();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const sideSensorR = this._character.getBothSensorRight();
        const sideSensorL = this._character.getBothSensorLeft();
        const color = DefRangeColor[0];
        const opacity = DefRangeOpacity[0];
        const bias =
            bothSensor ? 3 : 
            this._character.getBothSensor() > 0 ? 3 : 1;
        let width, height;
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);
                this._spriteSD.bitmap = new Bitmap(tileWidth * 3, tileHeight * 3);
                this.bitmap.fillViewRangeLine(color, this._character, this._spriteSD);
                break;
            case "f":
                if (direction === DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;

                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);
                if (sensorType === "f") {
                    this._spriteSD.bitmap = new Bitmap(tileWidth * 3, tileHeight * 3);
                    this.bitmap.fillViewRangeFan(color, this._character, this._spriteSD);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillRect(0, 0, width, height - tileHeight, color);
                break;
        }
        this.opacity = opacity;
        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.visible = true;
        this._character.setViewRangeStatus(1);
    };

    Sprite_ViewRange.prototype.updateBitmap = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const bothSensor = CEC(DefBothSensor);
        const sensorType = this._character.getSensorType();
        const sensorRange = this._character.getSensorRange();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const tmpCoordinate =  this._coordinate;
        const coordinate = this._character.getCoordinate();
        const cnt = tmpCoordinate.length < coordinate.length ? tmpCoordinate.length : coordinate.length;
        color = DefRangeColor[0];
        opacity = DefRangeOpacity[0];
        bias =
            bothSensor ? 3 :
            this._character.getBothSensor() > 0 ? 3 : 1;
        for (let i = 0; i < cnt; i++) {
            if (coordinate[i][0] !==tmpCoordinate[i][0] || coordinate[i][1] !== tmpCoordinate[i][1]) {
                if (tmpCoordinate[i][3] === -1) {
                    tmpCoordinate[i][3] = $gameMap.tileWidth();
                } else if (tmpCoordinate[i][3] !== 0) {
                    tmpCoordinate[i][3]--;
                }
            } else {
                coordinate[i][3] = 0;
            }
        }
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this._spriteSD.bitmap.clear();
                this.bitmap.fillViewRangeLine(color, this._character, this._spriteSD);
                break;
            case "f":
                if (direction === DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                if (sensorType === "f") {
                    this._spriteSD.bitmap.clear();
                    this.bitmap.fillViewRangeFan(color, this._character, this._spriteSD);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillRect(0, 0, width, height - tileHeight, color);
                break;
        }
        this.opacity = opacity;
        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.visible = true;
    };

    Sprite_ViewRange.prototype.updatePosition = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = _direction === -1 ? _direction : dirFixed;
        const sensorType = this._character.getSensorType();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const cx = this._character.screenX();
        const cy = this._character.screenY();
        const posSD = calcPositionSD(this);
        const bias = 6; // 位置微調整
        this.x = cx;
        this.y = cy;
        this._spriteSD.x = posSD.x;
        this._spriteSD.y = posSD.y;
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                }
                break;
            case "f":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                }
                break;
            case "df":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx + tileWidth / 2 - tileWidth;
                    this.y = cy - tileHeight / 2 + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx + tileWidth / 2;
                    this.y = cy - tileHeight / 2 + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy - tileHeight + bias;
                }
                break;
        }
    };

    function calcPositionSD(bsprite) {
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const event = bsprite._character;
        const _cx = event._x;
        const _cy = event._y;
        const _sx = event.screenX();
        const _sy = event.screenY();
        const offsetY = tileHeight - _sy / (_cy + 1);
        const sx = _sx - tileWidth * 1.5;
        const sy = _sy - tileHeight * 2;
        return {"x":sx, "y":sy};
    }

    //=========================================================================
    // Bitmap
    //  探索者の視界範囲を表す図形を描画させる処理を追加定義します。
    //=========================================================================
    Bitmap.prototype.fillViewRangeLine = function(color, character, spriteSD) {
        const _direction = character.direction();
        const context = this._context;
        const contextSD = spriteSD.bitmap._context;
        const dirFixed = character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        const sideSensorR = character.getBothSensorRight();
        const sideSensorL = character.getBothSensorLeft();
        let cx, cy, num, distanceX, distanceY;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (direction === DIR_UP) {
            if (coordinates && cnt === 1) {
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = cy - Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 8]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_RIGHT) {
            if (coordinates && cnt === 1) {
                num = 0;
                cx = tileWidth / 2;
                cy = height / 2;
                distanceX = cx + Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 6]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_LEFT) {
            if (coordinates && cnt === 1) {
                num = 0;
                cx = width - tileWidth / 2;
                cy = height / 2 - tileHeight;
                distanceX = cx - Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy + tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 4]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_DOWN) {
            if (coordinates && cnt === 1) {
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = 0;
                distanceX = cx + tileWidth;
                distanceY = cy + Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 2]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.fillViewRangeFan = function(color, character, spriteSD) {
        const _direction = character.direction();
        const context = this._context;
        const contextSD = spriteSD.bitmap._context;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        const dirFixed = character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const sideSensorR = character.getBothSensorRight();
        const sideSensorL = character.getBothSensorLeft();
        let cx, cy, num, distanceX, distanceY, sign;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (direction === DIR_UP) {
            if (coordinates && cnt > 0) {
                sign = 1;
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = height - tileHeight - Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 8]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = height - tileHeight * i;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = height - tileHeight - Math.abs(coordinates[j][num]) * tileHeight;
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_RIGHT) {
            if (coordinates && cnt > 0) {
                sign = 1;
                num = 0;
                cx = tileWidth / 2;
                cy = height / 2;
                distanceX = tileWidth / 2 + Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 6]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = tileWidth * i - tileWidth / 2;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    cy -= tileHeight / 2;
                    distanceX = tileWidth / 2 + Math.abs(coordinates[j][num]) * tileWidth ;
                    distanceY = cy + tileHeight * signChange(sign);
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_LEFT) {
            if (coordinates && cnt > 0) {
                sign = -1;
                num = 0;
                cx = width - tileWidth / 2;
                cy = height / 2;
                distanceX = width - Math.abs(coordinates[0][num]) * tileWidth;
                distanceX -= tileWidth/ 2;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 4]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width - tileWidth * i + tileWidth / 2;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    cy -= tileHeight / 2;
                    distanceX = width - tileWidth / 2 - Math.abs(coordinates[j][num]) * tileWidth;
                    distanceY = cy + tileHeight * signChange(sign);
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_DOWN) {
            if (coordinates && cnt > 0) {
                sign = -1;
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = 0;
                distanceX = cx + tileWidth;
                distanceY = Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 2]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = tileHeight * i - tileHeight;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = Math.abs(coordinates[j][num]) * tileHeight;
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.fillViewRangeDiamond = function(color, character) {
        const context = this._context;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        let rx, ry, dx, dy, ndx, ndy, sign;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (coordinates && cnt > 0) {
            cx = width / 2 - tileWidth / 2;
            cy = 0;
            rx = cx;
            ry = cy;
            context.moveTo(cx, cy);
            for (let i = 0; i < cnt; i++) {
                dx = coordinates[i][0];
                dy = coordinates[i][1];
                ndx = (i < cnt - 1)? coordinates[i+1][0] : coordinates[0][0];
                ndy = (i < cnt - 1)? coordinates[i+1][1] : coordinates[0][1];
                dir = coordinates[i][2];
                switch(dir) {
                    case DIR_UP:
                        ry -= tileHeight;
                        break;
                    case DIR_RIGHT:
                        rx += tileWidth;
                        break;
                    case DIR_DOWN:
                        ry += tileHeight;
                        break;
                    case DIR_LEFT:
                        rx -= tileWidth;
                        break;
                }
                context.lineTo(rx, ry);
                while(dx !== ndx || dy !== ndy) {
                    switch(dir) {
                        case DIR_UP:
                        case DIR_DOWN:
                            if (dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if (dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            if (dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if (dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            break;
                        case DIR_RIGHT:
                        case DIR_LEFT:
                            if (dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if (dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            if (dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if (dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            break;
                    }
                }
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.mkrDrawLine = function(context, cx, cy, distanceX, distanceY) {
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const lx = distanceX;
        const ly = distanceY;
        context.moveTo(cx, cy);
        context.lineTo(lx, cy);
        context.lineTo(lx, ly);
        context.lineTo(cx, ly);
    };

    Bitmap.prototype.mkrSideDrawLine = function(context, sideSensors) {
        const color = DefRangeColor[0];
        const width = this.width;
        const height = this.height;
        const tw = $gameMap.tileWidth();
        const th = $gameMap.tileHeight();
        const d = sideSensors[2];
        if (!sideSensors[0] && !sideSensors[1]) return;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (sideSensors[0]) {
            mkrSideDrawLineProc(context, d, tw, th)
        }
        if (sideSensors[1]) {
            mkrSideDrawLineProc(context, 10 - d, tw, th)
        }
        context.fill();
        context.restore();
    };
    
    function mkrSideDrawLineProc(context, d, tw, th) {
        const dirTable = {8:[0, th], 6:[tw, 0], 4:[tw, th * 2], 2:[tw * 2, th]};
        if (dirTable[d]) {
            const x1 = dirTable[d][0];
            const y1 = dirTable[d][1];
            const x2 = x1 + tw;
            const y2 = y1 + th;
            context.moveTo(x1, y1);
            context.lineTo(x2, y1);
            context.lineTo(x2, y2);
            context.lineTo(x1, y2);
            context.lineTo(x1, y1);
        }
    }

    //=========================================================================
    // ユーティリティ
    //  汎用的な処理を定義します。
    //=========================================================================
    function signChange(sign) {
        return sign * -1;
    }

    function getRegionIds() {
        const ArrayRegionId = [];
        if (arguments && arguments.length > 0) {
            const argCount = arguments.length;
            for (let i = 0; i < argCount; i++) {
                if (Array.isArray(arguments[i]) && arguments[i].length > 0) {
                    ArrayRegionId.push(CEC(arguments[i][0]));
                } else if (typeof arguments[i] === "string") {
                    const ary = arguments[i].split("_").filter(function(val){
                        return val !== "" && val !== "0";
                    }).map(function(val) {
                        return parseInt(ConvVb(val), 10);
                    });
                    Array.prototype.push.apply(ArrayRegionId, ary);
                } else if (isFinite(arguments[i])) {
                    ArrayRegionId.push(parseInt(arguments[i], 10));
                }
            }
        }

        return ArrayRegionId.filter(function(val, i, self) {
            return self.indexOf(val) === i && val > 0;
        });
    }

})();