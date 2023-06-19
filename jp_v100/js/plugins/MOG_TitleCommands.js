//=============================================================================
// MOG_TittleCommands.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.3) Adiciona comandos em imagens no lugar da janela.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @param -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param Animation Mode
 * @desc Definição do tipo de animação.
 * 0 - None     1 - Pulse    2 - Shake
 * @default 1
 * @type select
 * @option None
 * @value 0
 * @option Pulse Effect
 * @value 1
 * @option Shake Effect
 * @value 2
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Left & Right Input
 * @desc Ativar a seleção de comandos com as teclas Right/Left.
 * @default true
 * @type boolean
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Shake Duration
 * @desc Tempo de duração do efeito tremer.
 * @default 30
 * @type number
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Slide X-Axis
 * @desc Faz os comandos deslizarem na horizontal.
 * @default -100
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Slide Y-Axis
 * @desc Faz os comandos deslizarem na vertical.
 * @default 0
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param Cursor X-Axis
 * @text X-Axis
 * @desc Definição X-axis do cursor.
 * @default 0
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Y-Axis
 * @text Y-Axis
 * @desc Definição Y-axis do cursor.
 * @default 5
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Visible
 * @text Visible
 * @desc Ativar cursor.
 * @default true
 * @type boolean
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Wave Animation
 * @text Wave Animation
 * @desc Ativar animação de deslize.
 * @default true
 * @type boolean
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Rotation Animation
 * @text Rotation Animation
 * @desc Ativar animação de rotação.
 * @default false
 * @type boolean
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Rotation Speed
 * @text Rotation Speed
 * @desc Definição da velociade de rotação.
 * @default 0.05
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Command Pos 1
 * @desc Definição da posição do comando 1.
 * E.g -     32,32
 * @default 180,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 2
 * @desc Definição da posição do comando 2.
 * E.g -     32,32
 * @default 350,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 3
 * @desc Definição da posição do comando 3.
 * E.g -     32,32
 * @default 520,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 4
 * @desc Definição da posição do comando 4.
 * E.g -     32,32
 * @default 690,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 5
 * @desc Definição da posição do comando 5.
 * E.g -     32,32
 * @default 345,498
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Command Pos 6
 * @desc Definição da posição do comando 6.
 * E.g -     32,32
 * @default 345,530
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 7
 * @desc Definição da posição do comando 7.
 * E.g -     32,32
 * @default 0,192
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 8
 * @desc Definição da posição do comando 8.
 * E.g -     32,32
 * @default 0,224
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 9
 * @desc Definição da posição do comando 9.
 * E.g -     32,32
 * @default 0,256
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 10
 * @desc Definição da posição do comando 10.
 * E.g -     32,32
 * @default 0,288
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @help  
 * =============================================================================
 * +++ MOG - Title Picture Commands (v1.3) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona comandos em imagens no lugar da janela.
 * É necessário ter os arquivos:
 *
 * Command_0.png, Command_1.png, Command_2.png , Command_3.png ... 
 *
 * Grave as imagens na pasta:
 *
 * img/titles2/
 * ============================================================================= 
 * Será necessário também uma imagem representando o cursor.
 *
 * Cursor.png
 *
 * ============================================================================= 
 * * HISTÓRICO
 * =============================================================================
 * (v1.3) - Correção na função sort relativo a codificação.   
 * (v1.2) - Correção de selecionar o comando na transição da cena (fading). 
 * (v1.1) - Correção de apresentar a janela padrão em altas resoluções.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
    var Imported = Imported || {};
    Imported.MOG_TitleCommands = true;
    var Moghunter = Moghunter || {};

  　Moghunter.parameters = PluginManager.parameters('MOG_TitleCommands');
	Moghunter.title_comMode = Number(Moghunter.parameters['Animation Mode'] || 2);
    Moghunter.title_shakeDuration = Number(Moghunter.parameters['Shake Duration'] || 30);
	
	Moghunter.title_slideXaxis = Number(Moghunter.parameters['Slide X-Axis'] || -100);
	Moghunter.title_slideYaxis = Number(Moghunter.parameters['Slide Y-Axis'] || 0);	
	Moghunter.title_sideInput = String(Moghunter.parameters['Left & Right Input'] || "true");

	Moghunter.title_cursorVisible = String(Moghunter.parameters['Cursor Visible'] || "true");
	Moghunter.title_cursorSlide = String(Moghunter.parameters['Cursor Wave Animation'] || "true");
	Moghunter.title_cursorX = Number(Moghunter.parameters['Cursor X-Axis'] || 8);
	Moghunter.title_cursorY = Number(Moghunter.parameters['Cursor Y-Axis'] || -10);	
	Moghunter.title_cursorRot = String(Moghunter.parameters['Cursor Rotation Animation'] || "true");
	Moghunter.title_cursorRotSpeed = Number(Moghunter.parameters['Cursor Rotation Speed'] || 0.05);
	
	Moghunter.title_com_pos = [];
	for (var i = 0; i < 10; i++) {
		Moghunter.title_com_pos[i] = (Moghunter.parameters['Command Pos ' + String(i + 1)] || null);
	};	

//=============================================================================
// ■■■ Scene Title  ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Create
//==============================
var _mog_titleCom_ccreate = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	_mog_titleCom_ccreate.call(this);
	if (this._titleField3) {this._titleField3.children.sort((a, b) => a.z - b.z)}
};

//================================
// ♦ ALIAS ♦  createCommandWindow
//================================
var _mog_titleCom_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_mog_titleCom_createCommandWindow.call(this);
	if (!this._titleField3) {this.createTitleField3()};
	this.createTitlePictureCommands();
	this._sideInput = String(Moghunter.title_sideInput) == "true" ? true : false;
	if (String(Moghunter.title_cursorVisible) == "true") {this.createCursorCommand()};
};

//================================
// ♦ ALIAS ♦  update
//================================
var _mog_titleCom_scnTittle_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_mog_titleCom_scnTittle_update.call(this);
    this.updatePicCommands();
};

//==============================
// * Create Title Field 3
//==============================
Scene_Title.prototype.createTitleField3 = function() {
    this._titleField3 = new Sprite();
	this._titleField3.z = 200;
    this.addChild(this._titleField3);
};

//==============================
// * createTitlePictureCommands
//==============================
Scene_Title.prototype.createTitlePictureCommands = function() {
	this._picComE = false;
	this._TpictureCom = [];
	this._tComTouch = [TouchInput.x,TouchInput.y];
	this._picComIndex = this._commandWindow._index;
	for (i = 0; i < this._commandWindow._list.length; i++){
		 this._TpictureCom[i] = new TpictureCom(this._commandWindow,i);
		 this._TpictureCom[i].z = 300;
		 this._titleField3.addChild(this._TpictureCom[i]);
	};
 	this._commandWindow.x = -(Graphics.width * 2);	
};

//==============================
// * Create Cursor Command
//==============================
Scene_Title.prototype.createCursorCommand = function() {
	this._cursorSlide = [0,0,0,false];
	if (String(Moghunter.title_cursorSlide) == "true") {this._cursorSlide[3] = true};
    this._cursor = new Sprite(ImageManager.loadTitle2("Cursor"));
	this._cursor.anchor.x = 0.5;
	this._cursor.anchor.y = 0.5;
	this._cursor.org = [Moghunter.title_cursorX,Moghunter.title_cursorY]
	if (this._cursorSlide[3]) {this._cursor.org[0] -= 5}
	this._cursor.opacity = 0;
	this._cursor.z = 350;
	this._cursor.rot = [true,0.05];
	this._cursor.rot[0] = String(Moghunter.title_cursorRot) == "true" ? true : false;
	this._cursor.rot[1] = Moghunter.title_cursorRotSpeed;
	this._titleField3.addChild(this._cursor);
};

//==============================
// * update Title Cursor
//==============================
Scene_Title.prototype.updateTitleCursor = function() {
	 if (this._cursorSlide[3]) {this.updateCursorSlide()};
	 if (this._cursor.rot[0]) {this.updateCursorRotation()}; 
   	 this._cursor.opacity += 5;
 	 var nx = this.comSprite().x - (this.comSprite().bitmap.width / 2) - (this._cursor.width / 2) + this._cursorSlide[0];
	 var ny = this.comSprite().y - (this.comSprite().bitmap.height / 2) + (this._cursor.height / 2) + this._cursor.org[1];
     this._cursor.x = this.cursorMoveto(this._cursor.x , nx, 10);
	 this._cursor.y = this.cursorMoveto(this._cursor.y, ny, 10);
};

//==============================
// * Com Sprite
//==============================
Scene_Title.prototype.comSprite = function() {
    return this._TpictureCom[this._commandWindow._index];
};

//==============================
// * Uodate Cursor Rotation
//==============================
Scene_Title.prototype.updateCursorRotation = function() {
    this._cursor.rotation += this._cursor.rot[1];
};

//==============================
// * update Cursor Slide
//==============================
Scene_Title.prototype.updateCursorSlide = function() {
     this._cursorSlide[1] ++
	 if (this._cursorSlide[1] < 3) {return};
	 this._cursorSlide[1] = 0
	 this._cursorSlide[2] ++
	 if (this._cursorSlide[2] < 15) {
		 this._cursorSlide[0] ++;
	 } else if (this._cursorSlide[2] < 30) {
		 this._cursorSlide[0] --;
	 } else {
		 this._cursorSlide[0] = 0;
		 this._cursorSlide[2] = 0;
	 };
};

//==============================
// * Sprite Move To
//==============================
Scene_Title.prototype.cursorMoveto = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * checkTPicCom
//==============================
Scene_Title.prototype.checkTPicCom = function() {
	for (i = 0; i < this._TpictureCom.length; i++){
	     if (this._TpictureCom[i].isOnPicCom()) {
			 this._commandWindow._index = i;
			 if (this._picComIndex == this._commandWindow._index) {			    
			      this._commandWindow.processOk();
			 } else {
				  this._commandWindow.playCursorSound()
			 };
			 this._picComIndex = this._commandWindow._index 
		 };
	};
};

//==============================
// * picComNeedCheckTouch
//==============================
Scene_Title.prototype.picComNeedCheckTouch = function() {
   if (this._tComTouch[0] != TouchInput.x) {return true};
   if (this._tComTouch[1] != TouchInput.y) {return true}; 
   return false;
};

//==============================
// * update Title Touch Input Com
//==============================
Scene_Title.prototype.updateTitleTouchInputCom = function() {
    if (TouchInput.isTriggered()) {this.checkTPicCom()}; 
	if (this.picComNeedCheckTouch()) {this.updateTComMouseIsOnPic()};
	this._tComTouch = [TouchInput.x,TouchInput.y];
};

//==============================
// * Update Com Side Input
//==============================
Scene_Title.prototype.updateComSideInput = function() {
    if (Input.isRepeated('right')) {
		this.addTitleComIndex(1);
	} else if (Input.isRepeated('left')) {
		this.addTitleComIndex(-1);
	};
};

//==============================
// * updateTComMouseIsOnPic
//==============================
Scene_Title.prototype.updateTComMouseIsOnPic = function() {
	var picID = -1;
	for (i = 0; i < this._TpictureCom.length; i++){
	     if (this._TpictureCom[i].isOnPicCom()) {
			 this._commandWindow._index = i;
			 if (this._picComIndex != this._commandWindow._index) {			    
	    		 this._commandWindow.playCursorSound();
			 };
			 this._picComIndex = this._commandWindow._index ;
		 };
	};
};

//==============================
// * add Title ComIndex
//==============================
Scene_Title.prototype.addTitleComIndex = function(value) {
    SoundManager.playCursor();
	var maxIndex = this._commandWindow._list.length - 1
	this._commandWindow._index += value;
	if (this._commandWindow._index < 0) {
		this._commandWindow._index = maxIndex;
	} else if (this._commandWindow._index > maxIndex) {
		this._commandWindow._index = 0;
	};
};

//==============================
// * update Pic Commands
//==============================
Scene_Title.prototype.updatePicCommands = function() {
	 if (!this._picComE) {
	     this.updateTitleTouchInputCom();
	     if (this._sideInput) {this.updateComSideInput()};
	 };
	 if (this._cursor) {this.updateTitleCursor()};
	 if (!this._picComE && this._commandWindow.isClosing()) {this._picComE = true;}
};

//=============================================================================
// ■■■ TpictureCom  ■■■ 
//=============================================================================
function TpictureCom() {
    this.initialize.apply(this, arguments);
};

TpictureCom.prototype = Object.create(Sprite.prototype);
TpictureCom.prototype.constructor = TpictureCom;

//==============================
// * Initialize
//==============================
TpictureCom.prototype.initialize = function(data,index) {
    Sprite.prototype.initialize.call(this);
	this._index = index;
	this._data = data;
	this._index2 = this._data._index;
	this._wait = 5 * index;
	this.opacity = 0;
	this._aniData = {};
	this._aniData.mode = Moghunter.title_comMode;
	this._aniData.zoomON = Moghunter.title_zoomEffect == "true" ? true : false;
	this._aniData.zoomMax = 1.3;
    this._aniData.zoomPhase = 0; 
	this._aniData.zoomSpeed = 0.010;
	this._aniData.shakeD1 = 60;
	this._aniData.shakeD2 = 0;
	this._aniData.shakeX = 0;
	this._enabled = data.isCommandEnabled(index);
	this._orgXY = this.set_tcp(Moghunter.title_com_pos[index]);
	this.prepareBitmap();
};

//==============================
// * Prepare Bitmap
//==============================
TpictureCom.prototype.prepareBitmap = function() {
	var name = "Command_" + String(this._index);
    this.bitmap = ImageManager.loadTitle2(name)
};

//==============================
// * set tcp
//==============================
TpictureCom.prototype.set_tcp = function(value) {
	if (!value) {return null};
	var s = value.split(',');
	if (!s[0] || !s[1]) {return null};
	return  [Number(s[0]),Number(s[1])];
};

//==============================
// * get Data
//==============================
TpictureCom.prototype.getData = function() {
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._cw = this.bitmap.width;
	this._ch = this.bitmap.height / 2;
	var fx = (Graphics.width - 816) / 2; 
	var fy = (Graphics.height - 624) / 2;	
	this._orgXY[0] += (this._cw / 2) + fx;
	this._orgXY[1] += fy;
	this.x = this._orgXY[0];
	this.y = this._orgXY[1];
    this._pw1 = this.x - (this._cw / 2);
	this._pw2 = this.x + (this._cw / 2);
	this._ph1 = this.y - (this._ch / 2);
	this._ph2 = this.y + (this._ch / 2);	
	var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
	this.setFrame(0, rectY, this._cw, this._ch);
	this.x += Moghunter.title_slideXaxis;
	this.y += Moghunter.title_slideYaxis;
};

//==============================
// * On Picture Com
//==============================
TpictureCom.prototype.isOnPicCom = function() {
    if (TouchInput.x < this._pw1) {return false};
	if (TouchInput.x > this._pw2) {return false};
	if (TouchInput.y < this._ph1) {return false};
	if (TouchInput.y > this._ph2) {return false};
	return true;
};

//==============================
// * update Zoom Animation
//==============================
TpictureCom.prototype.updateZoomAnimation = function() {
	this._aniData.shakeX = 0;
 	if (this._index == this._data._index) {
		if (this._aniData.zoomPhase == 0) {
			this.scale.x -= this._aniData.zoomSpeed;
			if (this.scale.x <= 1.00) {
				this.scale.x = 1.00;
				this._aniData.zoomPhase = 1;
			};
		} else {
			this.scale.x += this._aniData.zoomSpeed;
			if (this.scale.x >= this._aniData.zoomMax) {
				this.scale.x = this._aniData.zoomMax;
				this._aniData.zoomPhase = 0;
			};		
	    };
	} else {
		this._aniData.zoomPhase = 0;
		if (this.scale.x > 1.00) {this.scale.x -= (this._aniData.zoomSpeed * 3)};
	}; 
	this.scale.y = this.scale.x  
};

//==============================
// * set Frame Index
//==============================
TpictureCom.prototype.setFrameIndex = function() {
	this._aniData.shakeD1 = Moghunter.title_shakeDuration;
	this._aniData.shakeD2 = 3;
    this._index2 = this._data._index
	var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
	this.setFrame(0, rectY, this._cw, this._ch);
};

//==============================
// * update Slide
//==============================
TpictureCom.prototype.updateSlide = function() {
    this.x = this.cSlide(this.x, (this._orgXY[0] + this._aniData.shakeX), 60);
	this.y = this.cSlide(this.y, this._orgXY[1], 60);	
};

//==============================
// * Sprite Move To
//==============================
TpictureCom.prototype.cSlide = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Opacity
//==============================
TpictureCom.prototype.updateOpacity = function() {
    this.opacity += 15;
};

//==============================
// * shakeClear
//==============================
TpictureCom.prototype.shakeClear = function() {
	this._aniData.shakeD1 = 0;
	this._aniData.shakeD2 = 0;
	this._aniData.shakeX = 0;
};
			
//==============================
// * update Shake Animation
//==============================
TpictureCom.prototype.updateShakeAnimation = function() {
	if (this._index != this._data._index) {this.shakeClear();return};
	if (this._aniData.shakeD1 > 0) {
		if (this._aniData.shakeD2 > 0) {
			this._aniData.shakeD2--;
		    if (this._aniData.shakeD2 <= 0) {
			    this._aniData.shakeD2 = 3;
			    this._aniData.shakeX = -5 + (Math.abs(Math.random() * 10));
			};
		};
		this._aniData.shakeD1--;
	    if (this._aniData.shakeD1 <= 0) {this.shakeClear()};
	};
};

//==============================
// * update Pic Command
//==============================
TpictureCom.prototype.updatePicCommand = function() {
	if (this._wait > 0) {this._wait--;return};
    if (this._aniData.mode == 1) {
		this.updateZoomAnimation()
	} else if (this._aniData.mode == 2) {
		this.updateShakeAnimation();
	};
	if (this._index2 != this._data._index) {this.setFrameIndex()};
	this.updateSlide();
	this.updateOpacity();
};

//==============================
// * Update
//==============================
TpictureCom.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._cw) {
	    if (this.bitmap.isReady()) {this.getData()};
	} else {
		this.updatePicCommand();
    };
};