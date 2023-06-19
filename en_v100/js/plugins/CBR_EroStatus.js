/*
############################################
	作者: KOBRA
	営利・非営利・18禁問わず配布可、改造も可、報告不要
	積極的に配布して皆のゲーム開発を快適にしてあげて
	http://cobrara.blogspot.jp/
	https://twitter.com/onarinin_san
############################################
*/

/*:
 * @target MZ
 * @plugindesc エロステータスを追加します
 * @author 
 *
 * @param SE
 * @text SE
 * @default Cursor3
 * @desc ページを変更した時のSE音を指定、デフォルト：Cursor3
 *
 * @param SEvol
 * @text SEボリューム
 * @type number
 * @default 100
 * @desc SE音の音量を指定、デフォルト：100
 *
 * @param window
 * @text ウィンドウの表示
 * @type boolean
 * @default true
 * @desc 背景としてウィンドウの枠を表示するかどうか
 *
 * @param font
 * @text フォント
 * @default 
 * @desc Project\fontsにwoffファイルを入れ、ファイル名を記入してください
 *
 * @help エロステータスプラグイン
 *
 * イベントのスクリプトでエロステータス画面を作る事が可能に
 *
 *　～開く～
 *　イベントのスクリプトで
 *　SceneManager.push(Scene_EroStatus)
 *　とやるだけ
 *
 *　～設定～
 *  スクリプトで1行目に｢CBR-エロステータス｣と記入するとエロステータスのスクリプトを使うよーって合図に
 *
 *　～初期化～
 *　｢初期化-???｣　ALLと書くと前ページ初期化、数値だと指定したページのみ初期化
 *
 *　～データ入れる～
 * ｢ページ-???｣ 数値を入れると｢今からこのページにデータ入れるよー｣という合図を行います
 *  
 * ～画像～
 * ※注※　必ず画像-????.png を2行目に持ってきてください
 *
 * ｢画像-??????.png｣って書くととpicturesフォルダに保存された画像を表示、\V[2]で変数2を使ったりも可能
 * ｢x-???｣　x座標を指定
 * ｢y-???｣　y座標
 * ｢透明度-???｣　書かなくてもいい、無かったら100になる　数値は0～100
 * ｢サイズ-???｣　書かなくてもいい、無かったら100になる　数値は0～
 *
 * 
 * ～テキスト～
 * ※注※　必ず テキスト-??? を2行目に持ってきてください
 *
 * ｢テキスト-??????｣　\V[2]で変数3を表示したり\{でフォントを大きくしたりできます
 * ｢x-???｣　x座標を指定
 * ｢y-???｣　y座標
 * ｢左右-?｣ 書かなくてもいい、無かったら左になる　左、中、右でx座標の始点を指定
 * ｢上下-?｣ 書かなくてもいい、無かったら上になる　上、中、下で途中でフォントサイズ大きくした時の揃え方を指定
 * ｢サイズ-??｣　書かなくてもいい、無かったら28になる
 *
 * 
 */

//(function(){

var CBR = CBR || {};
CBR.eroStatus = {
	event:0,
	se:"Cursor3",
	seVol:100,
	addPage:0,
	pageNow:0,
	window:0,
	font:false,
	data:[]
};


if(!CBR_Game_Interpreter_command355){
	var CBR_Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
	Game_Interpreter.prototype.command355 = function() {
		//CBR-xxxの場合CBR.xxxにobjを渡す
		var key = this.currentCommand().parameters[0];
		if(key.match(/^CBR\-/)){
			var obj = [];
			//下に続いてるスクリプトの取得
			while (this.nextEventCode() === 655) {
				this._index++;
				obj[obj.length] = this.currentCommand().parameters[0];
			}
			var temp = key.split('-');
			//CBR-×××があったら
			if(CBR[temp[1]]){
				//下に続くデータを入れる
				CBR[temp[1]](obj);
			}
		//普通にスクリプト実行
		}else{
			CBR_Game_Interpreter_command355.call(this);
		}
		return true;
	};
};



CBR["エロステータス"] = function(ary){	//スクリプト毎に実行されるヤツ
	//全てのデータを格納しよう
	//変数の変換は開く時かなー
	var obj ={};
	for(var A of ary){
		//A = A.replace(/\\V\[(\d+)\]/g,function(a,b){//汚いけどこれは毎回やらないとね
		//		return $gameVariables.value(b);//律儀にNumberしなくてもいいか
		//});
		var temp = A.split(/\-(.*)/,2);

		switch (temp[0]) {//初期化とページ変更はここで終わる
			case "初期化":
				if(temp[1]=='ALL'){
					CBR.eroStatus.data.length = 0;
				}else{
					delete CBR.eroStatus.data[Number(temp[1])-1];
				}
				return;//break;
			case "ページ":
				CBR.eroStatus.addPage = Number(temp[1]) - 1;
				return;//break;
			case "画像":
			case "テキスト":
				obj.val = temp[1];
				obj.type = temp[0];
				break;
			case "x":
			case "y":
			case "サイズ":
			case "左右":
			case "上下":
			case "透明度":
				obj[temp[0]] = temp[1];
				break;
			default:
				//console.log("なにこれ？"+temp[0]);
				return;
		}
	}
	CBR.eroStatus.data[CBR.eroStatus.addPage] = CBR.eroStatus.data[CBR.eroStatus.addPage] || {"画像":[],"テキスト":[]};//ページがなかったら作る
	CBR.eroStatus.data[CBR.eroStatus.addPage][obj.type][CBR.eroStatus.data[CBR.eroStatus.addPage][obj.type].length] = obj;//んで入れる
};



//まずstarted const boxMargin = 4;が原因でマージンができてしまう

function Scene_EroStatus() {
    this.initialize(...arguments);
}

Scene_EroStatus.prototype = Object.create(Scene_Base.prototype);
Scene_EroStatus.prototype.constructor = Scene_EroStatus;

Scene_EroStatus.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};
Scene_EroStatus.prototype.create = function() {
    Scene_Base.prototype.create.call(this);

	//data[{},{},,,]ってなってたら空の部分を削る
	var i = CBR.eroStatus.data.length - 1;
	while(i && !CBR.eroStatus.data[i]){
		CBR.eroStatus.data.pop();
		i--;
	}

	//開いた時表示するページ
	CBR.eroStatus.pageNow = 0;
	var i = 0;
	while(!CBR.eroStatus.data[i]){
		i++
	}
	CBR.eroStatus.pageNow = i;

	var param = PluginManager.parameters("CBR_EroStatus");
	CBR.eroStatus.se = (param["SE"] || 100);
	CBR.eroStatus.seVol = (param["SEvol"] || 100);
	if(param["window"]=="true"){
		CBR.eroStatus.window = true;
	}else{
		CBR.eroStatus.window = false;
	}
	CBR.eroStatus.font = param["font"] || false;
	if(CBR.eroStatus.font){
		if(FontManager._urls["rmmz-mainfont"] !="fonts/"+CBR.eroStatus.font+".woff"){
			FontManager._states["rmmz-mainfont"] = null;
			FontManager.load("rmmz-mainfont", CBR.eroStatus.font+".woff");
		}
	}

    this.createBackground();
    this.createWindowLayer();
	this._windowLayer.x = 0;
	this._windowLayer.y = 0;
	this.createEroStatusWindow();
};
//今まで自力でロードフラグやってたけど今回は便利な物が、シーン.isReadyのおかげ
Scene_EroStatus.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._eroStatusWindow.refresh();
};
//3/22追加
Scene_EroStatus.prototype._setWindowsOpacity = function () {
    window.opacity = 0;
};
//
Scene_EroStatus.prototype.createEroStatusWindow = function() {
    const rect = this.eroStatusWindowRect();
    this._eroStatusWindow = new Window_EroStatus(rect);
	this._eroStatusWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._eroStatusWindow);
};
Scene_EroStatus.prototype.eroStatusWindowRect = function() {
    const ww = Graphics.width;
    const wh = Graphics.height;
	const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_EroStatus.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
};
Scene_EroStatus.prototype.createBackground = function() {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	//なんか黒いフチが右下だけっていうのが気に入らないので四方に
	this._backgroundFilter.autoFit = false;
	
    this._backgroundSprite.filters = [this._backgroundFilter];
    this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(192);
};
Scene_EroStatus.prototype.setBackgroundOpacity = function(opacity) {
    this._backgroundSprite.opacity = opacity;
};
Scene_EroStatus.prototype.popScene = function() {
    FontManager._states["rmmz-mainfont"] = null;
    FontManager.load("rmmz-mainfont", $dataSystem.advanced.mainFontFilename);
    SceneManager.pop();
};

//ウィンドウ
function Window_EroStatus() {
    this.initialize(...arguments);
}

Window_EroStatus.prototype = Object.create(Window_Selectable.prototype);
Window_EroStatus.prototype.constructor = Window_EroStatus;

Window_EroStatus.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._CBR_drawn = false;
    this.refresh();
};
Window_EroStatus.prototype.itemPadding = function() {
    return 0;
};
Window_EroStatus.prototype.updatePadding = function() {
    this.padding = 0;
};

Window_EroStatus.prototype.colSpacing = function() {
    return 0;
};
Window_EroStatus.prototype.rowSpacing = function() {
    return 0;
};

Window_EroStatus.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
	
	if(CBR.eroStatus.data.length !== 1 && ImageManager.isReady() && FontManager.isReady()){//読み込み終わってたら、結局画像読み終えてない限りリフレッシュする必要なし
		var pn = CBR.eroStatus.pageNow;
		var n;
		if(Input.isRepeated("right")){
			for(var i=1,len=CBR.eroStatus.data.length; i<len; i++){
				n = i+pn;
				if( len <= i+pn){
					n -= len;
				}
				if(CBR.eroStatus.data[n]){
					break;
				}
			}
		}else if(Input.isRepeated("left")){
			for(var i=1,len=CBR.eroStatus.data.length; i<len; i++){
				n = pn - i;
				if( n < 0){
					n += len;
				}
				if(CBR.eroStatus.data[n]){
					break;
				}
			}
		}
		if(n!==undefined && CBR.eroStatus.pageNow != n){//ページの変更だったら
			CBR.eroStatus.pageNow = n;
			AudioManager.playSe({"name":CBR.eroStatus.se ,"volume":CBR.eroStatus.seVol,"pitch":100,"pan":0});
			this._CBR_drawn = false;
			this.refresh();
		}else if(!this._CBR_drawn){//画像が読み込まれてるというのに描写されて無い時
			this.refresh();
		}
	}

};

Window_EroStatus.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();

	var test = CBR.eroStatus.data[CBR.eroStatus.pageNow];//このページの画像&&テキスト
	if(!test){
		return;
	}
	for(var obj of test["画像"]){

		var val = obj.val.replace(/\\V\[(\d+)\]/g,function(a,b){
			return $gameVariables.value(b);
		});
		const bitmap = ImageManager.loadPicture(val.slice(0,-4));
		
		const pw = bitmap.width;
		const ph = bitmap.height;
		var top = 0;
		var left = 0;
		if(obj["左右"] =="中"){
			left -= pw / 2;
		}else if(obj["左右"] =="右"){
			left -= pw;
		}
		if(obj["上下"] =="中"){
			top -= ph / 2;
		}else if(obj["上下"] =="下"){
			top -= ph;
		}
		if(obj["透明度"]){
			this.contents.paintOpacity = 255 * Number(obj["透明度"]) / 100;
		}
		var zoom = 1;
		if(obj["サイズ"]){
			zoom = Number(obj["サイズ"]) / 100;
		}
		this.contents.blt(bitmap, 0, 0, pw, ph, Number(obj.x)+left, Number(obj.y)+top,pw*zoom,ph*zoom);
		this.contents.paintOpacity = 255;
	}
	
	//画像読み込み全部終わってなかったら終了
	if(!ImageManager.isReady()){
		return;
	}


	for(var obj of test["テキスト"]){
		//まず変数や値を変換
		var text = obj.val.replace(/\\(\\)|\\([VNP])\[(\d+)\]|\\(<)(.+)\\>/g,function(a,b,c,d,e,f){
			if(b){//\\
				return '\\';
			}else if(c){//[VNP]
				d = Number(d);
				switch(c){
					case 'V':
						return $gameVariables.value(d);
						break;
					case 'N':
						return $gameActors._data[d]._name;
						break;
					case 'P':
						return $dataActors[$gameParty._actors[d-1]].name;
						break;
				}
			}else{//script
				return eval(f);
			}
		});

		this.contents.context.font = this.contents._makeFontNameText();
		this.contents.fontSize = Number(obj["サイズ"]) || $gameSystem.mainFontSize();
		this.resetTextColor();

		const reg = RegExp(/\\([CI])\[(\d+)\]|\\\{|\\\}/, 'g');
		var ary;
		var c = 0;
		var left = 0;
		
		var strAry = [];//分割された文字列いれる
		var wAry = [];//分割された横幅いれる
		var fAry = [];//分割ごとの操作を入れる
		
		var ii = 0;
		var strWidth = 0;
		var maxH = this.contents.fontSize;
		//テキストのwidthや分割集め
		while ((ary = reg.exec(text)) !== null){

			var str = text.substring(c,ary.index);//描写したい部分を抜き出す
			strAry[ii] = str;
			wAry[ii] = this.textWidth(str);
			strWidth += wAry[ii];

			switch(ary[1]){
				case undefined://{や}の時
					if(ary[0].substring(1)=="{"){
						fAry[ii] = {type:"{"};
						this.contents.fontSize += 6;
						if(maxH < this.contents.fontSize){
							maxH = this.contents.fontSize;
						}
					}else{
						fAry[ii] = {type:"}"};
						this.contents.fontSize -= 6;
					}
					break;
				default:
					fAry[ii] = {type:ary[1],val:ary[2]};
					break;
			}

			c = reg.lastIndex;
			ii++;
		}
		if(c != text.length){
			var str = text.substring(c);//描写したい部分を抜き出す
			strAry[ii] = str;
			fAry[ii] = {type:false,val:false};
			wAry[ii] = this.textWidth(str);
			strWidth += wAry[ii];
			ii++;
		}

		this.contents.context.font = this.contents._makeFontNameText();
		this.contents.fontSize = Number(obj["サイズ"]) || $gameSystem.mainFontSize();

		var left = 0;
		var top = 0;
		if(obj["左右"] == "中"){
			left -= strWidth / 2;
		}else if(obj["左右"] == "右"){
			left -= strWidth;
		}
		for(var i=0; i<ii; i++){	
			var top = 0;
			if(obj["上下"] == "中"){
				top = maxH / 2 - this.contents.fontSize / 2;
			}else if(obj["上下"] == "下"){
				top = maxH - this.contents.fontSize;
			}
			this.drawText(strAry[i], Number(obj.x)+left, Number(obj.y)+top, wAry[i], this.contents.fontSize, "right");
			left += wAry[i];
			switch(fAry[i].type){
				case 'C':
					this.changeTextColor(ColorManager.textColor(fAry[i].val));//カラチェン
					break;
				case 'I':
					//return $gameActors._data[d]._name;
					break;
				case "{":
					this.contents.fontSize += 6;
					break;
				case "}":
					this.contents.fontSize -= 6;
					break;
			}
		}

		this.resetTextColor();
		this.contents.fontSize = $gameSystem.mainFontSize();
		this._CBR_drawn = true;
	}
};
//window.drawTextだとlineHeightが36に固定されちゃうので変える
Window_EroStatus.prototype.drawText = function(text, x, y, maxWidth, h, align) {
    this.contents.drawText(text, x, y, maxWidth, h, align);
};

Window_EroStatus.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
//アクティブじゃなくてもキャンセルできるように
Window_EroStatus.prototype.processHandling = function() {
	if (this.isCancelEnabled() && this.isCancelTriggered()) {
		return this.processCancel();
	}
};
Window_EroStatus.prototype.loadWindowskin = function() {
	if(CBR.eroStatus.window){
		this.windowskin = ImageManager.loadSystem("Window");
	}else{
	    return;
	}
};