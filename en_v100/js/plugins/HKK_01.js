
// 装備画面の能力値位置微調整（フォントの潰れ対策）
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    const paramX = this.paramX();
    const paramWidth = this.paramWidth();
    const rightArrowWidth = this.rightArrowWidth();
    this.drawParamName(x, y, paramId);
    if (this._actor) {
        this.drawCurrentParam(paramX - 20, y, paramId);
    }
    this.drawRightArrow(paramX + paramWidth - 20, y);
    if (this._tempActor) {
        this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
    }
};

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    const paramWidth = this.paramWidth();
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x - 26, y, paramWidth + 26, "right");
};

Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
    const rightArrowWidth = this.rightArrowWidth();
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("\u2192", x, y, rightArrowWidth, "center");
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    const paramWidth = this.paramWidth();
    const newValue = this._tempActor.param(paramId);
    const diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x - 26, y, paramWidth + 26, "right");
};

// 最強装備コマンドを非表示にする
Window_EquipCommand.prototype.maxCols = function() {
    return 2;
};

Window_EquipCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.equip2, "equip");
//    this.addCommand(TextManager.optimize, "optimize");
    this.addCommand(TextManager.clear, "clear");
};


// 会話ウィンドウ表示時にマップ名を非表示にしない
Window_MapName.prototype.close = function() {
//    this._showCount = 0;
};


// 逃走率の制御
BattleManager.makeEscapeRatio = function() {
    this._escapeRatio = $gameParty.agility() / $gameTroop.agility();
};

BattleManager.onEscapeFailure = function() {
    $gameParty.onEscapeFailure();
    this.displayEscapeFailureMessage();
    this._escapeRatio += 1;
    if (!this.isTpb()) {
        this.startTurn();
    }
};

// 行動順の制御
Game_Action.prototype.speed = function() {
    let speed = this.subject().agi;
    if (this.item()) {
        speed += this.item().speed;
    }
    if (this.isAttack()) {
        speed += this.subject().attackSpeed();
    }
    return speed;
};

// 戦闘ウェイト調整
Window_BattleLog.prototype.messageSpeed = function() {
    return 1;
};

// ステート付与時のウェイト消去
Window_BattleLog.prototype.displayAffectedStatus = function(target) {
    if (target.result().isStatusAffected()) {
        this.push("pushBaseLine");
        this.displayChangedStates(target);
        this.displayChangedBuffs(target);
//        this.push("waitForNewLine");
//        this.push("popBaseLine");
    }
};

Window_BattleLog.prototype.displayAddedStates = function(target) {
    const result = target.result();
    const states = result.addedStateObjects();
    for (const state of states) {
        const stateText = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push("performCollapse", target);
        }
        if (stateText) {
//            this.push("popBaseLine");
//            this.push("pushBaseLine");
//            this.push("addText", stateText.format(target.name()));
//            this.push("waitForEffect");
        }
    }
};

// 挑戦者の鏡
BattleManager.makeRewards = function() {
    this._rewards = {};
    this._rewards.gold = $gameTroop.goldTotal();
    if ($gameSwitches.value(24) === true) {
        this._rewards.exp = $gameTroop.expTotal() * 0;
    } else {
        this._rewards.exp = $gameTroop.expTotal();
    }
    this._rewards.items = $gameTroop.makeDropItems();
};

Game_Character.prototype.searchLimit = function() {
    return 12;
};

// トランジションのフラッシュ調整
Scene_Map.prototype.startFlashForEncounter = function(duration) {
    const color = [255, 255, 255, 120];
    $gameScreen.startFlash(color, duration);
};