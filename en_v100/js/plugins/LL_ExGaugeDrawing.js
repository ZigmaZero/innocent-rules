//=============================================================================
// RPGツクールMZ - LL_ExGaugeDrawing.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ゲージ描画をカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-exgauge/
 *
 * @help LL_ExGaugeDrawing.js
 *
 * ゲージ描画処理を拡張します。
 *   ・ゲージ枠の描画、ゲージ色を立体感のある描画へ変更
 *   ・各種ゲージ色の変更
 *   ・ゲージ高さの変更
 *   ・残り少ない時に点滅させる
 *   ・HP・MPの最大値を表示
 *   ・ラベルや数値の位置・サイズを調整
 *   ・ゲージなしにして数値のみにすることも可能
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2021/9/22
 *
 * @param gaugeHeight
 * @text ゲージの高さ
 * @desc 描画されるゲージの高さです。(初期値: 10)
 * @type number
 * @default 10
 *
 * @param solidGradation
 * @text ゲージに立体感をつける
 * @desc OFFにすると通常のゲージ描画になります。
 * @type boolean
 * @default true
 *
 * @param gaugeBackColor
 * @text ゲージの背景色
 * @desc ゲージの背景色をCSSカラーコードで指定します。
 * @default #202040
 * @type string
 *
 * @param gaugeOutlineColor
 * @text ゲージの枠色
 * @desc ゲージの枠色をCSSカラーコードで指定します。
 * 枠を付けたくない場合は、背景色と同色にしてください。
 * @default #fff
 * @type string
 *
 * @param labelY
 * @text ラベルのY座標
 * @desc ラベルの縦位置を調整します。 (初期値: 4)
 * プラスにすると下へ、マイナスにすると上へ移動します。
 * @default 4
 * @type number
 * @min -100
 * @max 100
 *
 * @param labelFontSize
 * @text ラベルのフォントサイズ
 * @desc ラベルのフォントサイズを調整します。 (初期値: -8)
 * 標準フォントサイズからどれだけ小さくするか設定。
 * @default -8
 * @type number
 * @min -100
 * @max 100
 *
 * @param valueAdjustY
 * @text 現在値のY座標
 * @desc 現在値の縦位置を調整します。 (初期値: 0)
 * プラスにすると下へ、マイナスにすると上へ移動します。
 * @default 0
 * @type number
 * @min -100
 * @max 100
 *
 * @param valueFontSize
 * @text 現在値のフォントサイズ
 * @desc 現在値のフォントサイズを調整します。 (初期値: -10)
 * 標準フォントサイズからどれだけ小さくするか設定。
 * @default -10
 * @type number
 * @min -100
 * @max 100
 *
 * @param maxValueWidth
 * @text 最大値の横幅
 * @desc 最大値の横幅を調整します。 (初期値: 32)
 * この数値を大きくすると、値と最大値の距離が広がります。
 * @default 32
 * @type number
 * @min -100
 * @max 100
 *
 * @param maxValueAdjustY
 * @text 最大値のY座標
 * @desc 最大値の縦位置を調整します。 (初期値: 2)
 * プラスにすると下へ、マイナスにすると上へ移動します。
 * @default 2
 * @type number
 * @min -100
 * @max 100
 *
 * @param maxValueFontSize
 * @text 最大値のフォントサイズ
 * @desc 最大値のフォントサイズを標準のフォントサイズから
 * どれだけ小さくするかで設定します。 (初期値: -14)
 * @default -14
 * @type number
 * @min -100
 * @max 100
 *
 * @param hpGauge
 * @text HPゲージの設定
 * @desc HPゲージの設定です。
 * @default {"gaugeColor1":"#ff784c","gaugeColor2":"#ffffa0","lowPercentage":"25","gaugeAlertColor1":"#ff2020","gaugeAlertColor2":"#ff784c","lowAlert":"battle","maxValueEnable":"true","gaugeX":"24","gaugeHidden":"false"}
 * @type struct<settings>
 *
 * @param mpGauge
 * @text MPゲージの設定
 * @desc MPゲージの設定です。
 * @default {"gaugeColor1":"#4080c0","gaugeColor2":"#99ccff","lowPercentage":"25","gaugeAlertColor1":"#ff2020","gaugeAlertColor2":"#ff784c","lowAlert":"none","maxValueEnable":"true","gaugeX":"24","gaugeHidden":"false"}
 * @type struct<settings>
 *
 * @param tpGauge
 * @text TPゲージの設定
 * @desc TPゲージの設定です。
 * @default {"gaugeColor1":"#00a040","gaugeColor2":"#80ff80","lowPercentage":"0","gaugeAlertColor1":"#ff2020","gaugeAlertColor2":"#ff784c","lowAlert":"none","maxValueEnable":"false","gaugeX":"24","gaugeHidden":"false"}
 * @type struct<settings>
 *
 * @param timeGauge
 * @text TIMEゲージの設定
 * @desc TIMEゲージ(タイムプログレスバー)の設定です。
 * @default {"gaugeColor1":"#a060e0","gaugeColor2":"#ccc0ff","lowPercentage":"0","gaugeAlertColor1":"#ff2020","gaugeAlertColor2":"#ff784c","lowAlert":"none","maxValueEnable":"false","gaugeX":"0","gaugeHidden":"false"}
 * @type struct<settings>
 */

/*~struct~settings:
 *
 * @param gaugeColor1
 * @text ゲージの色1
 * @desc ゲージの色1をCSSカラーコードで指定します。
 * @type string
 *
 * @param gaugeColor2
 * @text ゲージの色2
 * @desc ゲージの色2をCSSカラーコードで指定します。
 * @type string
 *
 * @param lowPercentage
 * @text ゲージを赤くする％
 * @desc 指定％以下になったときにゲージを赤くします。
 * 無効にしたい場合は0を入力してください。
 * @type number
 * @min 0
 * @max 100
 *
 * @param gaugeAlertColor1
 * @text ゲージ赤の色1
 * @desc 赤くなった時のゲージ色1をCSSカラーコードで指定します。
 * @type string
 *
 * @param gaugeAlertColor2
 * @text ゲージ赤の色2
 * @desc 赤くなった時のゲージ色2をCSSカラーコードで指定します。
 * @type string
 *
 * @param lowAlert
 * @text 点滅アラート
 * @desc ゲージが赤くなった時の動作を選択してください。
 * @type select
 * @option 点滅しない
 * @value none
 * @option 戦闘中のみ点滅
 * @value battle
 * @option 常に点滅
 * @value always
 *
 * @param maxValueEnable
 * @text 最大値を表示
 * @desc 最大値を表示します。
 * @type boolean
 * @default true
 *
 * @param gaugeX
 * @text 始点X座標
 * @desc ゲージの始点X座標を指定します。
 * 0にするとラベルと重なります。
 * @type number
 *
 * @param gaugeHidden
 * @text ゲージを非表示
 * @desc ONにするとゲージが非表示になります。
 * @type boolean
 * @default false
 */

(() => {
	"use strict";
	const pluginName = "LL_ExGaugeDrawing";

	const parameters = PluginManager.parameters(pluginName);
	const gaugeHeight = Number(parameters["gaugeHeight"] || 10);
	const solidGradation = eval(parameters["solidGradation"] || "true");
	const gaugeBackColor = String(parameters["gaugeBackColor"] || "#202040");
	const gaugeOutlineColor = String(parameters["gaugeOutlineColor"] || "#fff");
	const labelY = Number(parameters["labelY"] || 4);
	const labelFontSize = Number(parameters["labelFontSize"] || -8);
	const valueAdjustY = Number(parameters["valueAdjustY"] || 0);
	const valueFontSize = Number(parameters["valueFontSize"] || -10);
	const maxValueWidth = Number(parameters["maxValueWidth"] || 32);
	const maxValueAdjustY = Number(parameters["maxValueAdjustY"] || 2);
	const maxValueFontSize = Number(parameters["maxValueFontSize"] || -14);

	const hpGaugeSettings = JSON.parse(parameters["hpGauge"] || "null");
	const mpGaugeSettings = JSON.parse(parameters["mpGauge"] || "null");
	const tpGaugeSettings = JSON.parse(parameters["tpGauge"] || "null");
	const timeGaugeSettings = JSON.parse(parameters["timeGauge"] || "null");
	//const normalGaugeSettings = JSON.parse(parameters["normalGauge"] || "null");
	const normalGaugeSettings = {"gaugeColor1":"#fff","gaugeColor2":"#fff","lowPercentage":"0","gaugeAlertColor1":"#ff2020","gaugeAlertColor2":"#ff784c","lowAlert":"none","maxValueEnable":"false","gaugeX":"0","gaugeHidden":"false"};


	// MZ for v1.3.3
	Sprite_Gauge.prototype.textHeight = function() {
		return 24;
	};

	Sprite_Gauge.prototype.gaugeHeight = function() {
		return gaugeHeight;
	};

	Sprite_Gauge.prototype.gaugeX = function() {
		if (this._statusType == "hp") return Number(hpGaugeSettings.gaugeX);
		if (this._statusType == "mp") return Number(mpGaugeSettings.gaugeX);
		if (this._statusType == "tp") return Number(tpGaugeSettings.gaugeX);
		if (this._statusType == "time") return Number(timeGaugeSettings.gaugeX);
		return Number(normalGaugeSettings.gaugeX);
	};

	Sprite_Gauge.prototype.labelY = function() {
		return labelY;
	};

	Sprite_Gauge.prototype.labelFontSize = function() {
		return $gameSystem.mainFontSize() + labelFontSize;
	};

	Sprite_Gauge.prototype.gaugeBackColor = function() {
		return gaugeBackColor;
	};

	Sprite_Gauge.prototype.gaugeOutlineColor = function() {
		return gaugeOutlineColor;
	};

	Sprite_Gauge.prototype.valueFontSize = function() {
		return $gameSystem.mainFontSize() + valueFontSize;
	};

	Sprite_Gauge.prototype.labelOutlineWidth = function() {
		return 3;
	};

	Sprite_Gauge.prototype.valueOutlineWidth = function() {
		return 3;
	};

	Sprite_Gauge.prototype.gaugeColor1 = function() {
		const rate = this.gaugeRate();
		switch (this._statusType) {
			case "hp":
				if (rate < Number(hpGaugeSettings.lowPercentage) / 100) {
					return hpGaugeSettings.gaugeAlertColor1;
				}
				return hpGaugeSettings.gaugeColor1;
			case "mp":
				if (rate < Number(mpGaugeSettings.lowPercentage) / 100) {
					return mpGaugeSettings.gaugeAlertColor1;
				}
				return mpGaugeSettings.gaugeColor1;
			case "tp":
				if (rate < Number(tpGaugeSettings.lowPercentage) / 100) {
					return tpGaugeSettings.gaugeAlertColor1;
				}
				return tpGaugeSettings.gaugeColor1;
			case "time":
				if (rate < Number(timeGaugeSettings.lowPercentage) / 100) {
					return timeGaugeSettings.gaugeAlertColor1;
				}
				return timeGaugeSettings.gaugeColor1;
			default:
				if (rate < Number(normalGaugeSettings.lowPercentage) / 100) {
					return normalGaugeSettings.gaugeAlertColor1;
				}
				return normalGaugeSettings.gaugeColor1;
		}
	};

	Sprite_Gauge.prototype.gaugeColor2 = function() {
		const rate = this.gaugeRate();
		switch (this._statusType) {
			case "hp":
				if (rate < Number(hpGaugeSettings.lowPercentage) / 100) {
					return hpGaugeSettings.gaugeAlertColor2;
				}
				return hpGaugeSettings.gaugeColor2;
			case "mp":
				if (rate < Number(mpGaugeSettings.lowPercentage) / 100) {
					return mpGaugeSettings.gaugeAlertColor2;
				}
				return mpGaugeSettings.gaugeColor2;
			case "tp":
				if (rate < Number(tpGaugeSettings.lowPercentage) / 100) {
					return tpGaugeSettings.gaugeAlertColor2;
				}
				return tpGaugeSettings.gaugeColor2;
			case "time":
				if (rate < Number(timeGaugeSettings.lowPercentage) / 100) {
					return timeGaugeSettings.gaugeAlertColor2;
				}
				return timeGaugeSettings.gaugeColor2;
			default:
				if (rate < Number(normalGaugeSettings.lowPercentage) / 100) {
					return normalGaugeSettings.gaugeAlertColor2;
				}
				return normalGaugeSettings.gaugeColor2;
		}
	};

	Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
		// ゲージ非表示オプション
		if (this._statusType === "hp" && eval(hpGaugeSettings.gaugeHidden || "false")) return;
		if (this._statusType === "mp" && eval(mpGaugeSettings.gaugeHidden || "false")) return;
		if (this._statusType === "tp" && eval(tpGaugeSettings.gaugeHidden || "false")) return;
		if (this._statusType === "time" && eval(timeGaugeSettings.gaugeHidden || "false")) return;

		const rate = this.gaugeRate();
		const fillW = Math.floor((width - 2) * rate);
		const fillH = height - 2;
		const color0 = this.gaugeOutlineColor();
		const color0b = this.gaugeBackColor();
		const color1 = this.gaugeColor1();
		const color2 = this.gaugeColor2();
		this.bitmap.fillRect(x, y, width, height, color0);
		this.bitmap.fillRect(x + 1, y + 1, width - 2, height - 2, color0b);
		this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2, false);
		// Solid Gradation
		if (solidGradation) {
			this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH / 3, "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.7)", true);
			this.bitmap.gradientFillRect(x + 1, y + fillH / 3 + 1, fillW, fillH / 2, "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0)", true);
		}
	};

	Sprite_Gauge.prototype.updateFlashing = function() {
		this._flashingCount++;
		if (this._statusType === "time") {
			if (this._battler.isInputting()) {
				if (this._flashingCount % 30 < 15) {
					this.setBlendColor(this.flashingColor1());
				} else {
					this.setBlendColor(this.flashingColor2());
				}
				return;
			} else {
				this.setBlendColor([0, 0, 0, 0]);
			}
		}

		// Alert Flashing
		switch (this._statusType) {
			case "hp":
				this.updateLowAlert(hpGaugeSettings);
				break;
			case "mp":
				this.updateLowAlert(mpGaugeSettings);
				break;
			case "tp":
				this.updateLowAlert(tpGaugeSettings);
				break;
			case "time":
				this.updateLowAlert(timeGaugeSettings);
				break;
			default:
				this.updateLowAlert(normalGaugeSettings);
		}
	};

	Sprite_Gauge.prototype.updateLowAlert = function(gaugeSettings) {
		const rate = this.gaugeRate();
		if (String(gaugeSettings.lowAlert) != "none") {
			if (String(gaugeSettings.lowAlert) == "always" || (String(gaugeSettings.lowAlert) == "battle" && $gameParty.inBattle())) {
				if (!this._battler.isDead() && rate < Number(gaugeSettings.lowPercentage) / 100) {
					if (this._flashingCount % 30 < 15) {
						this.setBlendColor([255, 92, 92, 92]);
					} else {
						this.setBlendColor([0, 0, 0, 0]);
					}
				} else {
					this.setBlendColor([0, 0, 0, 0]);
				}
			}
		}
	};

	Sprite_Gauge.prototype.drawValue = function() {
		// Max Value
		switch (this._statusType) {
			case "hp":
				this.drawValueWithMax(hpGaugeSettings);
				break;
			case "mp":
				this.drawValueWithMax(mpGaugeSettings);
				break;
			case "tp":
				this.drawValueWithMax(tpGaugeSettings);
				break;
			case "time":
				this.drawValueWithMax(timeGaugeSettings);
				break;
			default:
				this.drawValueWithMax(normalGaugeSettings);
		}
	};

	Sprite_Gauge.prototype.drawValueWithMax = function(gaugeSettings) {
		const currentValue = this.currentValue();
		const maxValue = this.currentMaxValue();
		const width = this.bitmapWidth();
		const height = this.textHeight();
		this.setupValueFont();
		if (eval(gaugeSettings.maxValueEnable || "true")) {
			this.bitmap.drawText(currentValue + "/", maxValueWidth * -1, valueAdjustY, width, height, "right");
			this.bitmap.fontSize = $gameSystem.mainFontSize() + maxValueFontSize;
			this.bitmap.drawText(maxValue, 0, maxValueAdjustY, width, height, "right");
			this.bitmap.fontSize = this.valueFontSize();
		} else {
			this.bitmap.drawText(currentValue, 0, valueAdjustY, width, height, "right");
		}
	};
})();
