// ===================================================
// ARTM_TMDescriptionExMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// 1.1.0 詳細専用パラメータを追加
// 1.1.1 UIオプションOFF時の不具合対応
//=============================================================================
// TMVplugin - 詳細説明ウィンドウ
// バージョン: 2.0.3
// 最終更新日: 2017/02/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc アイテムやスキルの詳細情報を表示する機能を追加します。
 * @author Artemis
 *
 * @param descriptionKeyCode
 * @desc 説明ボタンとして使うキー
 * 初期値: 65
 * @default 65
 *
 * @param leftPaneWidth
 * @desc 左側のパラメータの幅
 * 初期値: 300
 * @default 300
 *
 * @param rightPaneWidth
 * @desc 右側のパラメータの幅
 * 初期値: 400
 * @default 400
 *
 * @param horzLineHeight
 * @desc 横線の余白も含めた高さ
 * 初期値: 28
 * @default 28
 *
 * @param secretItemA
 * @desc 隠しアイテムＡのタイプ名
 * 初期値: 隠しアイテムＡ
 * @default 隠しアイテムＡ
 *
 * @param secretItemB
 * @desc 隠しアイテムＢのタイプ名
 * 初期値: 隠しアイテムＢ
 * @default 隠しアイテムＢ
 *
 * @param consumableText
 * @desc 消耗の項目名
 * 初期値: 消耗
 * @default 消耗
 *
 * @param occasionText
 * @desc 使用可能時の項目名
 * 初期値: 制限
 * @default 制限
 *
 * @param scopeText
 * @desc 範囲の項目名
 * 初期値: 範囲
 * @default 範囲
 *
 * @param speedText
 * @desc 速度補正の項目名
 * 初期値: 速度補正
 * @default 速度補正
 *
 * @param successRateText
 * @desc 成功率の項目名
 * 初期値: 成功率
 * @default 成功率
 *
 * @param repeatsText
 * @desc 連続回数の項目名
 * 初期値: 連続回数
 * @default 連続回数
 *
 * @param tpGainText
 * @desc 得ＴＰの項目名
 * 初期値: 獲得ＴＰ
 * @default 獲得ＴＰ
 *
 * @param hitTypeText
 * @desc 命中タイプの項目名
 * 初期値: 命中判定
 * @default 命中判定
 *
 * @param priceText
 * @desc 価格の項目名
 * 初期値: 売却額
 * @default 売却額
 *
 * @param priceRate
 * @desc 価格の表示倍率
 * 初期値: 0.5
 * @default 0.5
 *
 * @param mpCostText
 * @desc 消費ＭＰの項目名
 * 初期値: 消費ＭＰ
 * @default 消費ＭＰ
 *
 * @param tpCostText
 * @desc 消費ＴＰの項目名
 * 初期値: 消費ＴＰ
 * @default 消費ＴＰ
 *
 * @param requiredWtypeText
 * @desc 必要武器の項目名
 * 初期値: 必要武器
 * @default 必要武器
 *
 * @param effectText
 * @desc 使用効果の項目名
 * 初期値: 効果
 * @default 効果
 *
 * @param traitText
 * @desc 特徴の項目名
 * 初期値: 特徴
 * @default 特徴
 *
 * @param plainText
 * @desc 詳細の項目名
 * 初期値: 詳細
 * @default 詳細
 *
 * @param effectTextRecoverHp
 * @desc ＨＰ回復の書式
 * 初期値: ＨＰが%1回復
 * @default ＨＰが%1回復
 *
 * @param effectTextRecoverMp
 * @desc ＭＰ回復の書式
 * 初期値: ＭＰが%1回復
 * @default ＭＰが%1回復
 *
 * @param effectTextGainTp
 * @desc ＴＰ増加の書式
 * 初期値: ＴＰが%1増加
 * @default ＴＰが%1増加
 *
 * @param effectTextAddState
 * @desc ステート付加の書式
 * 初期値: %2%の確率で%1を付加
 * @default %2%の確率で%1を付加
 *
 * @param effectTextRemoveState
 * @desc ステート解除の書式
 * 初期値: %2%の確率で%1を解除
 * @default %2%の確率で%1を解除
 *
 * @param effectTextAddBuff
 * @desc 強化の書式
 * 初期値: %2ターンの間だけ%1アップ
 * @default %2ターンの間だけ%1アップ
 *
 * @param effectTextAddDebuff
 * @desc 弱体の書式
 * 初期値: %2ターンの間だけ%1ダウン
 * @default %2ターンの間だけ%1ダウン
 *
 * @param effectTextRemoveBuff
 * @desc 強化の解除の書式
 * 初期値: %1アップの効果を解除
 * @default %1アップの効果を解除
 *
 * @param effectTextRemoveDebuff
 * @desc 弱体の解除の書式
 * 初期値: %1ダウンの効果を解除
 * @default %1ダウンの効果を解除
 *
 * @param effectTextSpecial
 * @desc 特殊効果の書式
 * 初期値: 戦闘から離脱する
 * @default 戦闘から離脱する
 *
 * @param effectTextGrow
 * @desc 成長の書式
 * 初期値: %1が永続的に%2上がる
 * @default %1が永続的に%2上がる
 *
 * @param effectTextLearnSkill
 * @desc スキル習得の書式
 * 初期値: %1を習得する
 * @default %1を習得する
 *
 * @param damageTextDamageHp
 * @desc ダメージタイプ『ＨＰダメージ』の書式
 * 初期値: ＨＰに%1ダメージを与える
 * @default ＨＰに%1ダメージを与える
 *
 * @param damageTextDamageMp
 * @desc ダメージタイプ『ＭＰダメージ』の書式
 * 初期値: ＭＰに%1ダメージを与える
 * @default ＭＰに%1ダメージを与える
 *
 * @param damageTextRecoverHp
 * @desc ダメージタイプ『ＨＰ回復』の書式
 * 初期値: ＨＰを回復する
 * @default ＨＰを回復する
 *
 * @param damageTextRecoverMp
 * @desc ダメージタイプ『ＭＰ回復』の書式
 * 初期値: ＭＰを回復する
 * @default ＭＰを回復する
 *
 * @param damageTextDrainHp
 * @desc ダメージタイプ『ＨＰ吸収』の書式
 * 初期値: 与えたダメージをＨＰとして吸収する
 * @default 与えたダメージをＨＰとして吸収する
 *
 * @param damageTextDrainMp
 * @desc ダメージタイプ『ＭＰ吸収』の書式
 * 初期値: 与えたダメージをＭＰとして吸収する
 * @default 与えたダメージをＭＰとして吸収する
 *
 * @param traitTextElementRate
 * @desc 属性有効度の書式
 * 初期値: %1耐性%2%
 * @default %1耐性%2%
 *
 * @param traitTextDebuffRate
 * @desc 弱体有効度の書式
 * 初期値: %1ダウン耐性%2%
 * @default %1ダウン耐性%2%
 *
 * @param traitTextStateRate
 * @desc ステート有効度の書式
 * 初期値: %1耐性%2%
 * @default %1耐性%2%
 *
 * @param traitTextStateResist
 * @desc ステート無効化の書式
 * 初期値: %1無効
 * @default %1無効
 *
 * @param traitTextParam
 * @desc 通常能力値の書式
 * 初期値: %1%2%
 * @default %1%2%
 *
 * @param traitTextXparam
 * @desc 追加能力値の書式
 * 初期値: %1%2
 * @default %1%2
 *
 * @param traitTextSparam
 * @desc 特殊能力値の書式
 * 初期値: %1%2%
 * @default %1%2%
 *
 * @param traitTextAttackElement
 * @desc 攻撃時属性の書式
 * 初期値: 攻撃に%1付加
 * @default 攻撃に%1付加
 *
 * @param traitTextAttackState
 * @desc 攻撃時ステートの書式
 * 初期値: 攻撃時に%2%の確率で%1を付加
 * @default 攻撃時に%2%の確率で%1を付加
 *
 * @param traitTextAttackSpeed
 * @desc 攻撃速度補正の書式
 * 初期値: 攻撃速度%1
 * @default 攻撃速度%1
 *
 * @param traitTextAttackTimes
 * @desc 攻撃追加回数の書式
 * 初期値: 攻撃回数%1
 * @default 攻撃回数%1
 *
 * @param traitTextStypeAdd
 * @desc スキルタイプ追加の書式
 * 初期値: %1使用可能
 * @default %1使用可能
 *
 * @param traitTextStypeSeal
 * @desc スキルタイプ封印の書式
 * 初期値: %1使用不可
 * @default %1使用不可
 *
 * @param traitTextSkillAdd
 * @desc スキル追加の書式
 * 初期値: %1使用可能
 * @default %1使用可能
 *
 * @param traitTextSkillSeal
 * @desc スキル封印の書式
 * 初期値: %1使用不可
 * @default %1使用不可
 *
 * @param traitTextEquipWtype
 * @desc 武器タイプ装備の書式
 * 初期値: %1装備可能
 * @default %1装備可能
 *
 * @param traitTextEquipAtype
 * @desc 防具タイプ装備の書式
 * 初期値: %1装備可能
 * @default %1装備可能
 *
 * @param traitTextEquipLock
 * @desc 装備固定の書式
 * 初期値: 
 * @default 
 *
 * @param traitTextEquipSeal
 * @desc 装備封印の書式
 * 初期値: %1装備不可
 * @default %1装備不可
 *
 * @param traitTextActionPlus
 * @desc 行動回数追加の書式
 * 初期値: %1%の確率で連続行動
 * @default %1%の確率で連続行動
 *
 * @param xparamText
 * @desc 追加能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,…
 * @default 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,ＨＰ再生,ＭＰ再生,ＴＰ再生
 *
 * @param sparamText
 * @desc 特殊能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,…
 * @default 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,ＴＰチャージ,物理ダメージ,魔法ダメージ,床ダメージ,経験値獲得
 *
 * @param consumableValue
 * @desc 消費の値
 * 初期値: する,しない
 * @default する,しない
 *
 * @param occasionValue
 * @desc 使用可能時の値
 * 初期値: なし,バトルのみ,メニューのみ,使用不可
 * @default なし,バトルのみ,メニューのみ,使用不可
 *
 * @param scopeValue
 * @desc 範囲の値（カンマ区切りで１２項目）
 * 初期値: なし,敵単体,敵全体,敵１体,敵２体,敵３体,敵４対,味方単体,…
 * @default なし,敵単体,敵全体,敵１体,敵２体,敵３体,敵４対,味方単体,味方全体,味方単体,味方全体,使用者
 *
 * @param hitTypeValue
 * @desc 命中タイプの値
 * 初期値: 必中,物理,魔法
 * @default 必中,物理,魔法
 *
 * @param slotTypeValue
 * @desc 特殊能力値の値
 * 初期値: 二刀流使用不可,二刀流使用可能
 * @default 二刀流使用不可,二刀流使用可能
 *
 * @param specialFlagValue
 * @desc 特殊フラグの値
 * 初期値: 自動戦闘,防御,身代わり,ＴＰ持ち越し
 * @default 自動戦闘,防御,身代わり,ＴＰ持ち越し
 *
 * @param partyAbilityValue
 * @desc パーティ能力の値（カンマ区切りで６項目）
 * 初期値: エンカウント半減,エンカウント無効,不意打ち無効,…
 * @default エンカウント半減,エンカウント無効,不意打ち無効,先制攻撃率アップ,獲得金額２倍,アイテム入手率２倍
 *
 * @param elementFooter
 * @desc 属性の接尾語
 * 初期値: 属性
 * @default 属性
 *
 * @param costExTextHp
 * @desc 消費ＨＰの書式（ TMSkillCostEx.js が必要）
 * 初期値: ＨＰを%1消費する
 * @default ＨＰを%1消費する
 *
 * @param costExTextItem
 * @desc 消費アイテムの書式（ TMSkillCostEx.js が必要）
 * 初期値: %1を%2個消費する
 * @default %1を%2個消費する
 *
 * @param costExTextExp
 * @desc 消費経験値の書式（ TMSkillCostEx.js が必要）
 * 初期値: 経験値を%1消費する
 * @default 経験値を%1消費する
 *
 * @param costExTextGold
 * @desc 消費金額の書式（ TMSkillCostEx.js が必要）
 * 初期値: お金を%1消費する
 * @default お金を%1消費する
 *
 * @param passiveAlwaysText
 * @desc 常時発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: 常に効果が適用される
 * @default 常に効果が適用される
 *
 * @param passiveTpText
 * @desc ＴＰ○○以上で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: ＴＰ%1以上で効果が適用される
 * @default ＴＰ%1以上で効果が適用される
 *
 * @param passiveTpText2
 * @desc ＴＰ○○未満で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: ＴＰ%1未満で効果が適用される
 * @default ＴＰ%1未満で効果が適用される
 *
 * @param passiveStateText
 * @desc ○○状態で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: %1状態で効果が適用される
 * @default %1状態で効果が適用される
 *
 * @help ARTM_TMDescriptionExMZ
 *
 * tomoaky様作「詳細説明ウィンドウ」プラグインのMZ移植版です。
 * 基本的な動作は変わっておりません。
 * 
 * 使い方:
 *
 *   このプラグインを導入すると、アイテムやスキルを選択中にＡキーを押すことで
 *   詳細説明ウィンドウが開くようになります。
 *   ヘルプウィンドウをクリック（タップ）しても開けます。
 *
 *   使用するキーは descriptionKeyCode の値を変更することで設定できます。
 *   65 ならＡ、66 ならＢ、とアルファベットが順に並んでいます、
 *   ＸやＺなど他の機能に割り当てられていないキーを設定してください。
 *
 *   プラグインコマンドはありません。
 * 
 *   このプラグインは RPGツクールMV Version 1.3.4 で動作確認をしています。
 *
 *
 * メモ欄タグ（スキル、アイテム、武器、防具）:
 *
 *   <dType:素材>       # タイプ名（右上に表示）を素材にする
 *   <dText:テキスト>   # 右側パラメータの下部にテキストを追加（改行可能）
 *   <dPlnText:詳細テキスト>  # 中央画面に詳細テキストのみを表示（改行可能）
 */

var Imported = Imported || {};
Imported.TMDescriptionEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.DescriptionEx = {};
TMPlugin.DescriptionEx.Parameters = PluginManager.parameters("ARTM_TMDescriptionExMZ");
TMPlugin.DescriptionEx.LeftPaneWidth = +TMPlugin.DescriptionEx.Parameters["leftPaneWidth"];
TMPlugin.DescriptionEx.RightPaneWidth = +TMPlugin.DescriptionEx.Parameters["rightPaneWidth"];
TMPlugin.DescriptionEx.HorzLineHeight = +TMPlugin.DescriptionEx.Parameters["horzLineHeight"];
TMPlugin.DescriptionEx.SecretItemA = TMPlugin.DescriptionEx.Parameters["secretItemA"];
TMPlugin.DescriptionEx.SecretItemB = TMPlugin.DescriptionEx.Parameters["secretItemB"];
TMPlugin.DescriptionEx.ConsumableText = TMPlugin.DescriptionEx.Parameters["consumableText"];
TMPlugin.DescriptionEx.OccasionText = TMPlugin.DescriptionEx.Parameters["occasionText"];
TMPlugin.DescriptionEx.ScopeText = TMPlugin.DescriptionEx.Parameters["scopeText"];
TMPlugin.DescriptionEx.SpeedText = TMPlugin.DescriptionEx.Parameters["speedText"];
TMPlugin.DescriptionEx.SuccessRateText = TMPlugin.DescriptionEx.Parameters["successRateText"];
TMPlugin.DescriptionEx.RepeatsText = TMPlugin.DescriptionEx.Parameters["repeatsText"];
TMPlugin.DescriptionEx.TpGainText = TMPlugin.DescriptionEx.Parameters["tpGainText"];
TMPlugin.DescriptionEx.HitTypeText = TMPlugin.DescriptionEx.Parameters["hitTypeText"];
TMPlugin.DescriptionEx.PriceText = TMPlugin.DescriptionEx.Parameters["priceText"];
TMPlugin.DescriptionEx.PriceRate = +TMPlugin.DescriptionEx.Parameters["priceRate"];
TMPlugin.DescriptionEx.MpCostText = TMPlugin.DescriptionEx.Parameters["mpCostText"];
TMPlugin.DescriptionEx.TpCostText = TMPlugin.DescriptionEx.Parameters["tpCostText"];
TMPlugin.DescriptionEx.RequiredWtypeText = TMPlugin.DescriptionEx.Parameters["requiredWtypeText"];
TMPlugin.DescriptionEx.EffectText = TMPlugin.DescriptionEx.Parameters["effectText"];
TMPlugin.DescriptionEx.TraitText = TMPlugin.DescriptionEx.Parameters["traitText"];
TMPlugin.DescriptionEx.PlainText = TMPlugin.DescriptionEx.Parameters["plainText"];
TMPlugin.DescriptionEx.EffectTextRecoverHp = TMPlugin.DescriptionEx.Parameters["effectTextRecoverHp"];
TMPlugin.DescriptionEx.EffectTextRecoverMp = TMPlugin.DescriptionEx.Parameters["effectTextRecoverMp"];
TMPlugin.DescriptionEx.EffectTextGainTp = TMPlugin.DescriptionEx.Parameters["effectTextGainTp"];
TMPlugin.DescriptionEx.EffectTextAddState = TMPlugin.DescriptionEx.Parameters["effectTextAddState"];
TMPlugin.DescriptionEx.EffectTextRemoveState = TMPlugin.DescriptionEx.Parameters["effectTextRemoveState"];
TMPlugin.DescriptionEx.EffectTextAddBuff = TMPlugin.DescriptionEx.Parameters["effectTextAddBuff"];
TMPlugin.DescriptionEx.EffectTextAddDebuff = TMPlugin.DescriptionEx.Parameters["effectTextAddDebuff"];
TMPlugin.DescriptionEx.EffectTextRemoveBuff = TMPlugin.DescriptionEx.Parameters["effectTextRemoveBuff"];
TMPlugin.DescriptionEx.EffectTextRemoveDebuff = TMPlugin.DescriptionEx.Parameters["effectTextRemoveDebuff"];
TMPlugin.DescriptionEx.EffectTextSpecial = TMPlugin.DescriptionEx.Parameters["effectTextSpecial"];
TMPlugin.DescriptionEx.EffectTextGrow = TMPlugin.DescriptionEx.Parameters["effectTextGrow"];
TMPlugin.DescriptionEx.EffectTextLearnSkill = TMPlugin.DescriptionEx.Parameters["effectTextLearnSkill"];
TMPlugin.DescriptionEx.DamageTextDamageHp  = TMPlugin.DescriptionEx.Parameters["damageTextDamageHp"];
TMPlugin.DescriptionEx.DamageTextDamageMp  = TMPlugin.DescriptionEx.Parameters["damageTextDamageMp"];
TMPlugin.DescriptionEx.DamageTextRecoverHp = TMPlugin.DescriptionEx.Parameters["damageTextRecoverHp"];
TMPlugin.DescriptionEx.DamageTextRecoverMp = TMPlugin.DescriptionEx.Parameters["damageTextRecoverMp"];
TMPlugin.DescriptionEx.DamageTextDrainHp   = TMPlugin.DescriptionEx.Parameters["damageTextDrainHp"];
TMPlugin.DescriptionEx.DamageTextDrainMp   = TMPlugin.DescriptionEx.Parameters["damageTextDrainMp"];
TMPlugin.DescriptionEx.TraitTextElementRate = TMPlugin.DescriptionEx.Parameters["traitTextElementRate"];
TMPlugin.DescriptionEx.TraitTextDebuffRate = TMPlugin.DescriptionEx.Parameters["traitTextDebuffRate"];
TMPlugin.DescriptionEx.TraitTextStateRate = TMPlugin.DescriptionEx.Parameters["traitTextStateRate"];
TMPlugin.DescriptionEx.TraitTextStateResist = TMPlugin.DescriptionEx.Parameters["traitTextStateResist"];
TMPlugin.DescriptionEx.TraitTextParam = TMPlugin.DescriptionEx.Parameters["traitTextParam"];
TMPlugin.DescriptionEx.TraitTextXparam = TMPlugin.DescriptionEx.Parameters["traitTextXparam"];
TMPlugin.DescriptionEx.TraitTextSparam = TMPlugin.DescriptionEx.Parameters["traitTextSparam"];
TMPlugin.DescriptionEx.TraitTextAttackElement = TMPlugin.DescriptionEx.Parameters["traitTextAttackElement"];
TMPlugin.DescriptionEx.TraitTextAttackState = TMPlugin.DescriptionEx.Parameters["traitTextAttackState"];
TMPlugin.DescriptionEx.TraitTextAttackSpeed = TMPlugin.DescriptionEx.Parameters["traitTextAttackSpeed"];
TMPlugin.DescriptionEx.TraitTextAttackTimes = TMPlugin.DescriptionEx.Parameters["traitTextAttackTimes"];
TMPlugin.DescriptionEx.TraitTextStypeAdd = TMPlugin.DescriptionEx.Parameters["traitTextStypeAdd"];
TMPlugin.DescriptionEx.TraitTextStypeSeal = TMPlugin.DescriptionEx.Parameters["traitTextStypeSeal"];
TMPlugin.DescriptionEx.TraitTextSkillAdd = TMPlugin.DescriptionEx.Parameters["traitTextSkillAdd"];
TMPlugin.DescriptionEx.TraitTextSkillSeal = TMPlugin.DescriptionEx.Parameters["traitTextSkillSeal"];
TMPlugin.DescriptionEx.TraitTextEquipWtype = TMPlugin.DescriptionEx.Parameters["traitTextEquipWtype"];
TMPlugin.DescriptionEx.TraitTextEquipAtype = TMPlugin.DescriptionEx.Parameters["traitTextEquipAtype"];
TMPlugin.DescriptionEx.TraitTextEquipLock = TMPlugin.DescriptionEx.Parameters["traitTextEquipLock"];
TMPlugin.DescriptionEx.TraitTextEquipSeal = TMPlugin.DescriptionEx.Parameters["traitTextEquipSeal"];
TMPlugin.DescriptionEx.TraitTextActionPlus = TMPlugin.DescriptionEx.Parameters["traitTextActionPlus"];
TMPlugin.DescriptionEx.XparamText = TMPlugin.DescriptionEx.Parameters["xparamText"].split(",");
TMPlugin.DescriptionEx.SparamText = TMPlugin.DescriptionEx.Parameters["sparamText"].split(",");
TMPlugin.DescriptionEx.ConsumableValue = TMPlugin.DescriptionEx.Parameters["consumableValue"].split(",");
TMPlugin.DescriptionEx.OccasionValue = TMPlugin.DescriptionEx.Parameters["occasionValue"].split(",");
TMPlugin.DescriptionEx.ScopeValue = TMPlugin.DescriptionEx.Parameters["scopeValue"].split(",");
TMPlugin.DescriptionEx.HitTypeValue = TMPlugin.DescriptionEx.Parameters["hitTypeValue"].split(",");
TMPlugin.DescriptionEx.SlotTypeValue = TMPlugin.DescriptionEx.Parameters["slotTypeValue"].split(",");
TMPlugin.DescriptionEx.SpecialFlagValue = TMPlugin.DescriptionEx.Parameters["specialFlagValue"].split(",");
TMPlugin.DescriptionEx.PartyAbilityValue = TMPlugin.DescriptionEx.Parameters["partyAbilityValue"].split(",");
TMPlugin.DescriptionEx.ElementFooter = TMPlugin.DescriptionEx.Parameters["elementFooter"];
TMPlugin.DescriptionEx.CostExTextHp   = TMPlugin.DescriptionEx.Parameters["costExTextHp"];
TMPlugin.DescriptionEx.CostExTextItem = TMPlugin.DescriptionEx.Parameters["costExTextItem"];
TMPlugin.DescriptionEx.CostExTextExp  = TMPlugin.DescriptionEx.Parameters["costExTextExp"];
TMPlugin.DescriptionEx.CostExTextGold = TMPlugin.DescriptionEx.Parameters["costExTextGold"];
TMPlugin.DescriptionEx.PassiveAlwaysText = TMPlugin.DescriptionEx.Parameters["passiveAlwaysText"];
TMPlugin.DescriptionEx.PassiveTpText = TMPlugin.DescriptionEx.Parameters["passiveTpText"];
TMPlugin.DescriptionEx.PassiveTpText2 = TMPlugin.DescriptionEx.Parameters["passiveTpText2"];
TMPlugin.DescriptionEx.PassiveStateText = TMPlugin.DescriptionEx.Parameters["passiveStateText"];

(() => {

    //-----------------------------------------------------------------------------
    // Input
    //

    Input.keyMapper[+TMPlugin.DescriptionEx.Parameters["descriptionKeyCode"]] = "description";

    //-----------------------------------------------------------------------------
    // Window_Selectable
    //

    const _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
    Window_Selectable.prototype.processHandling = function() {
        if (this.isOpenAndActive() &&
            this.isDescriptionEnabled() &&
            this.isDescriptionTriggered()) {
             this.processDescription();
        } else {
            _Window_Selectable_processHandling.call(this);
        }
    };

    Window_Selectable.prototype.isDescriptionEnabled = function() {
        return this.isHandled("description");
    };

    Window_Selectable.prototype.isDescriptionTriggered = function() {
        if (this._helpWindow && TouchInput.isTriggered()) {
            const wx = (Graphics.width - Graphics.boxWidth) / 2 + this._helpWindow.x;
            const wy = (Graphics.height - Graphics.boxHeight) / 2 + this._helpWindow.y;
            return (
                TouchInput.x >= wx && 
                TouchInput.x < wx + this._helpWindow.width &&
                TouchInput.y >= wy &&
                TouchInput.y < wy + this._helpWindow.height
            );
        }
        return Input.isRepeated("description");
    };

    Window_Selectable.prototype.processDescription = function() {
        if (this.isCurrentItemDescriptionEnabled()) {
            SoundManager.playOk();
            this.updateInputData();
            this.deactivate();
            this.callDescriptionHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_Selectable.prototype.isCurrentItemDescriptionEnabled = function() {
        return true;
    };
    
    Window_Selectable.prototype.callDescriptionHandler = function() {
        if (this.isHandled("description")) {
            this._handlers["description"](this);
        }
    };
    
    //-----------------------------------------------------------------------------
    // Window_ItemList
    //

    Window_ItemList.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_SkillList
    //

    Window_SkillList.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_EquipSlot
    //

    Window_EquipSlot.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_ShopBuy
    //

    Window_ShopBuy.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_Message
    //
    
    // Window_Message.prototype.setDescriptionExWindow = function(descriptionExWindow) {
    //     this._descriptionExWindow = descriptionExWindow;
    // };

    // const _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    // Window_Message.prototype.isAnySubWindowActive = function() {
    //     return (
    //         _Window_Message_isAnySubWindowActive.call(this) ||
    //         this._descriptionExWindow.active
    //     );
    // };

    //-----------------------------------------------------------------------------
    // Window_DescriptionEx
    //

    function Window_DescriptionEx() {
        this.initialize.apply(this, arguments);
    }

    Window_DescriptionEx.prototype = Object.create(Window_Selectable.prototype);
    Window_DescriptionEx.prototype.constructor = Window_DescriptionEx;

    Window_DescriptionEx.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.openness = 0;
    };

    Window_DescriptionEx.prototype.setItem = function(item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_DescriptionEx.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            if (DataManager.isItem(this._item)) {
                this.refreshItem();
            } else if (DataManager.isWeapon(this._item)) {
                this.refreshWeapon();
            } else if (DataManager.isArmor(this._item)) {
                this.refreshArmor();
            } else if (DataManager.isSkill(this._item)) {
                this.refreshSkill();
            }
        }
    };

    Window_DescriptionEx.prototype.refreshItem = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawItemType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            this.drawItemParameters(x, y);
            this.drawEffects(
                this.contents.width - x - descEx.RightPaneWidth, y
            );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.refreshWeapon = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawWeaponType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
           this.drawEquipParameters(x, y);
           this.drawTraits(
               this.contents.width - x - descEx.RightPaneWidth, y
           );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.refreshArmor = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawArmorType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            this.drawEquipParameters(x, y);
            this.drawTraits(
                this.contents.width - x - descEx.RightPaneWidth, y
            );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };
    
    Window_DescriptionEx.prototype.refreshSkill = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawSkillType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            if (Imported.TMPassiveSkill && this._item.meta.passive) {
              this.drawPassiveSkillParameters(x, y);
            } else {
              this.drawSkillParameters(x, y);
              this.drawEffects(
                  this.contents.width - x - descEx.RightPaneWidth, y
              );
            }
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.drawItemType = function() {
        const descEx = TMPlugin.DescriptionEx;
        let text;
        if (this._item.meta.dType) {
          text = this._item.meta.dType;
        } else if (this._item.itypeId === 1) {
          text = TextManager.item;
        } else if (this._item.itypeId === 2) {
          text = TextManager.keyItem;
        } else if (this._item.itypeId === 3) {
          text = descEx.SecretItemA;
        } else if (this._item.itypeId === 4) {
          text = descEx.SecretItemB;
        }
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawWeaponType = function() {
        const text = 
            this._item.meta.dType ? 
            this._item.meta.dType :
            $dataSystem.weaponTypes[this._item.wtypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawArmorType = function() {
        const text =
            this._item.meta.dType ?
            this._item.meta.dType :
            $dataSystem.armorTypes[this._item.atypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawSkillType = function() {
        const text =
            this._item.meta.dType ?
            this._item.meta.dType :
            $dataSystem.skillTypes[this._item.stypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawItemParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const lineHeight = this.lineHeight();
        let yy = y;
        yy = this.drawLeftParameter(
            x, yy, descEx.ConsumableText,
            descEx.ConsumableValue[this._item.consumable ? 0 : 1]
        );
        yy = this.drawLeftParameter(
            x, yy, descEx.OccasionText,
            descEx.OccasionValue[this._item.occasion]
        );
        yy = this.drawBattleItemParameters(x, yy + lineHeight);
        this.drawPrice(x, yy + lineHeight);
    };
    
    Window_DescriptionEx.prototype.drawEquipParameters = function(x, y, item) {
        const descEx = TMPlugin.DescriptionEx;
        const lineHeight = this.lineHeight();
        const itemT = item || this._item;
        const leftPaneWidth = descEx.LeftPaneWidth;
        for (let i = 0; i < 8; i++) {
            if (TextManager.param(i)) {
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(i), x, y, leftPaneWidth);
                this.resetTextColor();;
                this.drawText(itemT.params[i], x, y, leftPaneWidth, "right");
                y += lineHeight;
            }
        }
        this.drawPrice(x, y + lineHeight);
    };
    
    Window_DescriptionEx.prototype.drawSkillParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const leftPaneWidth = descEx.LeftPaneWidth;
        const lineHeight = this.lineHeight();
        let text;
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.MpCostText, x, y + lineHeight * 0, leftPaneWidth);
        this.drawText(descEx.TpCostText, x, y + lineHeight * 1, leftPaneWidth);
        this.drawText(descEx.OccasionText, x, y + lineHeight * 2, leftPaneWidth);
        this.resetTextColor();
        text = this._item.mpCost;
        if (Imported.TMSkillCostEx && this._item.meta.mpRateCost) {
            text = this._item.meta.mpRateCost + "%";
        }
        this.drawText(text, x, y + lineHeight * 0, leftPaneWidth, "right");
        this.drawText(this._item.tpCost, x, y + lineHeight * 1, leftPaneWidth, "right");
        text = descEx.OccasionValue[this._item.occasion];
        this.drawText(text, x, y + lineHeight * 2, leftPaneWidth, "right");
        this.drawLeftParameter(
            x, y + lineHeight * 3, descEx.RequiredWtypeText,
            this.requiredWtypeValue()
        );
        this.drawBattleItemParameters(x, y + lineHeight * 5);
    };
    
    Window_DescriptionEx.prototype.elementText = function(elementId) {
        const elementFooter = TMPlugin.DescriptionEx.ElementFooter;
        if (elementId > 0) {
            return $dataSystem.elements[elementId] +elementFooter;
        } else if (elementId === 0) {
            return "無" + elementFooter;
        } else {
            return "";
        }
    };
    
    Window_DescriptionEx.prototype.requiredWtypeValue = function() {
        let text;
        if (this._item.requiredWtypeId1 > 0) {
            text = $dataSystem.weaponTypes[this._item.requiredWtypeId1];
            if (this._item.requiredWtypeId2 > 0) {
                text += " " + $dataSystem.weaponTypes[this._item.requiredWtypeId2];
            }
        } else if (this._item.requiredWtypeId2 > 0) {
            text = $dataSystem.weaponTypes[this._item.requiredWtypeId2];
        } else {
            text = "None";
        }
        return text;
    };
    
    Window_DescriptionEx.prototype.valueToText = function(value) {
        return (value >= 0 ? "+" : "") + value;
    };
    
    Window_DescriptionEx.prototype.rateToText = function(rate, useSign) {
        return (
            (((useSign === undefined ? true : useSign) && rate > 1) ? "+" : "") +
            (rate * 1000000 - 1000000) / 10000
        );
    };
    
    Window_DescriptionEx.prototype.drawBattleItemParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        y = this.drawLeftParameter(
            x, y, descEx.ScopeText,
            descEx.ScopeValue[this._item.scope]
        );
        y = this.drawLeftParameter(
            x, y, descEx.SpeedText, this._item.speed
        );
        y = this.drawLeftParameter(
            x, y, descEx.SuccessRateText,
            this._item.successRate + "%"
        );
        y = this.drawLeftParameter(
            x, y, descEx.RepeatsText,
            this._item.repeats
        );
        y = this.drawLeftParameter(
            x, y, descEx.TpGainText,
            this._item.tpGain
        );
        y = this.drawLeftParameter(
            x, y, descEx.HitTypeText,
            descEx.HitTypeValue[this._item.hitType]
        );
        return y;
    };
    
    Window_DescriptionEx.prototype.drawLeftParameter = function(x, y, text, value) {
        if (text === "") return y;
        const descEx = TMPlugin.DescriptionEx;
        const leftPaneWidth = descEx.LeftPaneWidth;
        this.changeTextColor(this.systemColor());
        this.drawText(text, x, y, leftPaneWidth);
        this.resetTextColor();;
        this.drawText(value, x, y, leftPaneWidth, "right");
        return y + this.lineHeight();
    };
    
    Window_DescriptionEx.prototype.drawRightParameter = function(x, y, text) {
        if (text === "") return y;
        const descEx = TMPlugin.DescriptionEx;
        const rightPaneWidth = descEx.RightPaneWidth;
        const lineHeight = this.lineHeight();
        y += lineHeight;
        if (y <= this.profileY() - lineHeight) {
            this.resetTextColor();
            this.drawText(text, x, y, rightPaneWidth);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawPrice = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        if (descEx.PriceText === "" ||
            this._item.price === undefined) {return y};
        const leftPaneWidth = descEx.LeftPaneWidth;
        const priceText = descEx.PriceText;
        const priceRate = descEx.PriceRate;
        this.changeTextColor(this.systemColor());
        this.drawText(priceText, x, y, leftPaneWidth);
        this.drawCurrencyValue(
            (this._item.price * priceRate).toFixed(0),
            TextManager.currencyUnit, x, y, leftPaneWidth
        );
        return y + this.lineHeight();
    };
    
    Window_DescriptionEx.prototype.drawEffects = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.EffectText, x, y, descEx.RightPaneWidth);
        this.resetTextColor();;
        if (Imported.TMSkillCostEx) y = this.drawCostEx(x, y);
        y = this.drawDamage(x, y);
        for (let i = 0; i < this._item.effects.length; i++) {
            const effect = this._item.effects[i];
            let text = "";
            if (effect.code === Game_Action.EFFECT_RECOVER_HP) {
                if (effect.value1 !== 0) {
                    text = descEx.EffectTextRecoverHp.format(effect.value1 * 1000000 / 10000 + "%");
                } else {
                    text = descEx.EffectTextRecoverHp.format(effect.value2);
                }
            } else if (effect.code === Game_Action.EFFECT_RECOVER_MP) {
                if (effect.value1 !== 0) {
                    text = descEx.EffectTextRecoverMp.format(effect.value1 * 1000000 / 10000 + "%");
                } else {
                    text = descEx.EffectTextRecoverMp.format(effect.value2);
                }
            } else if (effect.code === Game_Action.EFFECT_GAIN_TP) {
                text = descEx.EffectTextGainTp.format(effect.value1);
            } else if (effect.code === Game_Action.EFFECT_ADD_STATE) {
                if (effect.dataId > 0) {
                    text = descEx.EffectTextAddState.format($dataStates[effect.dataId].name,
                       Math.floor(effect.value1 * 1000000 / 10000));
                }
            } else if (effect.code === Game_Action.EFFECT_REMOVE_STATE) {
                text = descEx.EffectTextRemoveState.format($dataStates[effect.dataId].name,
                     Math.floor(effect.value1 * 1000000 / 10000));
            } else if (effect.code === Game_Action.EFFECT_ADD_BUFF) {
                text = descEx.EffectTextAddBuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
                text = descEx.EffectTextAddDebuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_REMOVE_BUFF) {
                text = descEx.EffectTextRemoveBuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_REMOVE_DEBUFF) {
                text = descEx.EffectTextRemoveDebuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_SPECIAL) {
                text = descEx.EffectTextSpecial;
            } else if (effect.code === Game_Action.EFFECT_GROW) {
                text = descEx.EffectTextGrow.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_LEARN_SKILL) {
                text = descEx.EffectTextLearnSkill.format($dataSkills[effect.dataId].name);
            }
            y = this.drawRightParameter(x, y, text);
        }
        this.drawOptionText(x, y);
    };
    
    Window_DescriptionEx.prototype.profileY = function() {
        return (
            this.contents.height - this.lineHeight() * 2 -
            TMPlugin.DescriptionEx.HorzLineHeight
        );
    };
    
    Window_DescriptionEx.prototype.drawDamage = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        let text = "";
        if (this._item.damage.type === 1 || this._item.damage.type === 5) {
            text = descEx.DamageTextDamageHp.format(this.elementText(this._item.damage.elementId));
        } else if (this._item.damage.type === 2 || this._item.damage.type === 6) {
            text = descEx.DamageTextDamageMp.format(this.elementText(this._item.damage.elementId));
        } else if (this._item.damage.type === 3) {
            text = descEx.DamageTextRecoverHp;
        } else if (this._item.damage.type === 4) {
            text = descEx.DamageTextRecoverMp;
        }
        y = this.drawRightParameter(x, y, text);
        if (this._item.damage.type >= 5) {
            text =
                this._item.damage.type === 5 ? descEx.DamageTextDrainHp :
                descEx.DamageTextDrainMp;
            y = this.drawRightParameter(x, y, text);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawTraits = function(x, y, item) {
        const descEx = TMPlugin.DescriptionEx;
        itemT = item || this._item
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.TraitText, x, y, descEx.RightPaneWidth);
        this.resetTextColor();;
        if (Imported.TMPassiveSkill && this._item.meta.passive) {
            y = this.drawPassiveSkillOccasion(x, y);
        }
        for (let i = 0; i < itemT.traits.length; i++) {
            const trait = itemT.traits[i];
            let text = "";
            if (trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE) {
                text = descEx.TraitTextElementRate.format(this.elementText(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_DEBUFF_RATE) {
                text = descEx.TraitTextDebuffRate.format(TextManager.param(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RATE) {
                text = descEx.TraitTextStateRate.format($dataStates[trait.dataId].name,
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RESIST) {
                text = descEx.TraitTextStateResist.format($dataStates[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_PARAM) {
                text = descEx.TraitTextParam.format(TextManager.param(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_XPARAM) {
                text = descEx.TraitTextXparam.format(descEx.XparamText[trait.dataId],
                     this.valueToText(trait.value * 1000000 / 10000));
            } else if (trait.code === Game_BattlerBase.TRAIT_SPARAM) {
                text = descEx.TraitTextSparam.format(descEx.SparamText[trait.dataId],
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT) {
                text = descEx.TraitTextAttackElement.format(this.elementText(trait.dataId));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE) {
                text = descEx.TraitTextAttackState.format($dataStates[trait.dataId].name,
                     trait.value * 1000000 / 10000);
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_SPEED) {
                text = descEx.TraitTextAttackSpeed.format(this.valueToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_TIMES) {
                text = descEx.TraitTextAttackTimes.format(this.valueToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_ADD) {
                text = descEx.TraitTextStypeAdd.format($dataSystem.skillTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_SEAL) {
                text = descEx.TraitTextStypeSeal.format($dataSystem.skillTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_ADD) {
                text = descEx.TraitTextSkillAdd.format($dataSkills[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_SEAL) {
                text = descEx.TraitTextSkillSeal.format($dataSkills[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE) {
                text = descEx.TraitTextEquipWtype.format($dataSystem.weaponTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_ATYPE) {
                text = descEx.TraitTextEquipAtype.format($dataSystem.armorTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_LOCK) {
                text = descEx.TraitTextEquipLock.format($dataSystem.equipTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_SEAL) {
                text = descEx.TraitTextEquipSeal.format($dataSystem.equipTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_SLOT_TYPE) {
                text = descEx.SlotTypeValue[trait.value];
            } else if (trait.code === Game_BattlerBase.TRAIT_ACTION_PLUS) {
                text = descEx.TraitTextActionPlus.format(trait.value * 1000000 / 10000);
            } else if (trait.code === Game_BattlerBase.TRAIT_SPECIAL_FLAG) {
                text = descEx.SpecialFlagValue[trait.dataId];
            } else if (trait.code === Game_BattlerBase.TRAIT_PARTY_ABILITY) {
                text = descEx.PartyAbilityValue[trait.dataId];
            }
            y = this.drawRightParameter(x, y, text);
        }
        this.drawOptionText(x, y);
    };
    
    Window_DescriptionEx.prototype.drawOptionText = function(x, y) {
        if (this._item.meta.dText) {
            const textArray = this._item.meta.dText.split(/\r\n|\r|\n/);
            let yy = y;
            for (let i = 0; i < textArray.length; i++) {
                yy = this.drawRightParameter(x, yy, textArray[i]);
            }
        }
    };

    Window_DescriptionEx.prototype.drawPlainText = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const textArray = this._item.meta.dPlnText.split(/\r\n|\r|\n/);
        this.changeTextColor(this.systemColor());
        let yy = y;
        this.drawText(descEx.PlainText, x, yy, descEx.RightPaneWidth);
        this.resetTextColor();
        for (let i = 0; i < textArray.length; i++) {
            yy = this.drawRightParameter(x, yy, textArray[i]);
        }
    };

    Window_DescriptionEx.prototype.drawHorzLineUpper = function(y) {
        const horzLineHeight = TMPlugin.DescriptionEx.HorzLineHeight;
        const yy = y + this.lineHeight();
        const lineY = yy + horzLineHeight / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
        return yy + horzLineHeight;
    };

    Window_DescriptionEx.prototype.drawHorzLineLower = function(y) {
        const horzLineHeight = TMPlugin.DescriptionEx.HorzLineHeight;
        const yy =  y - this.lineHeight() - this.itemPadding() * 2;
        const lineY = yy + horzLineHeight / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
        return yy + horzLineHeight;
    };

    Window_DescriptionEx.prototype.lineColor = function() {
        return ColorManager.normalColor();
    };

    Window_DescriptionEx.prototype.drawProfile = function(x, y) {
        this.drawTextEx(this._item.description, x + this.itemPadding(), y);
    };

    Window_DescriptionEx.prototype.drawCostEx = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const dummyActor = new Game_Actor(1);
        let text = "";
        if (this._item.meta.hpRateCost) {
            text = descEx.CostExTextHp.format(this._item.meta.hpRateCost + "%");
        } else if (this._item.meta.hpCost) {
            text = descEx.CostExTextHp.format(this._item.meta.hpCost);
        }
        y = this.drawRightParameter(x, y, text);
        const cost = dummyActor.skillItemCost(this._item);
        if (cost) {
            text = descEx.CostExTextItem.format(cost.item.name, cost.num);
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.expCost) {
            text = descEx.CostExTextExp.format(this._item.meta.expCost);
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.goldCost) {
            text = descEx.CostExTextGold.format(
                this._item.meta.goldCost + TextManager.currencyUnit
            );
            y = this.drawRightParameter(x, y, text);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawPassiveSkillParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const item = $dataWeapons[+this._item.meta.passive];
        this.drawTraits(
            this.contents.width - this.itemPadding() -
            descEx.RightPaneWidth, y, item
        );
        this.drawLeftParameter(x, y, descEx.RequiredWtypeText, this.requiredWtypeValue());
        y += this.lineHeight() * 2;
        this.drawEquipParameters(this.itemPadding(), y, item);
    };
    
    Window_DescriptionEx.prototype.drawPassiveSkillOccasion = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const lastY = y;
        if (this._item.meta.passiveTp) {
            if (+this._item.meta.passiveTp > 0) {
                text = descEx.PassiveTpText.format(this._item.meta.passiveTp);
            } else {
                text = descEx.PassiveTpText2.format(-this._item.meta.passiveTp);
            }
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.passiveState) {
            text = descEx.PassiveStateText.format($dataStates[+this._item.meta.passiveState].name);
            y = this.drawRightParameter(x, y, text);
        }
        if (lastY === y) {
            y = this.drawRightParameter(x, y, descEx.PassiveAlwaysText);
        }
        return y;
    };
    
    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    Scene_Base.prototype.createDescriptionExWindow = function() {
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._descriptionExWindow = new Window_DescriptionEx(rect);
        this._descriptionExWindow.setHandler("description", this.descriptionClose.bind(this));
        this._descriptionExWindow.setHandler("cancel", this.descriptionClose.bind(this));
        this.addWindow(this._descriptionExWindow);
    };

    Scene_Base.prototype.descriptionOpen = function(mainWindow) {
        this._descriptionMainWindow = mainWindow;
        this._descriptionExWindow.setItem(this._descriptionMainWindow.item());
        this._descriptionExWindow.open();
        this._descriptionExWindow.activate();
    };
    
    Scene_Base.prototype.descriptionClose = function() {
        this._descriptionExWindow.close();
        this._descriptionMainWindow.activate();
    };

    //-----------------------------------------------------------------------------
    // Scene_Message
    //
    // const _Scene_Message_createEventItemWindow = Scene_Message.prototype.createEventItemWindow;
    // Scene_Message.prototype.createEventItemWindow = function() {
    //     _Scene_Message_createEventItemWindow.call(this);
    //     this._eventItemWindow.setHandler("description", this.descriptionOpen.bind(this));
    //     this.createDescriptionExWindow();
    //     this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
    // };

    // Scene_Message.prototype.descriptionOpen = function(mainWindow) {
    //     Scene_Base.prototype.descriptionOpen.call(this, mainWindow);
    //     this.moveMenuButton(true);
    // };
    
    // Scene_Message.prototype.descriptionClose = function() {
    //     Scene_Base.prototype.descriptionClose.call(this);
    //     this.moveMenuButton(false);
    // };

    // Scene_Message.prototype.moveMenuButton = function(flag) {
    //     const descriptionExWindow = this._descriptionExWindow;
    //     const h1 = descriptionExWindow.lineHeight();
    //     const h2 = TMPlugin.DescriptionEx.HorzLineHeight;
    //     if (flag) {
    //         this._saveButtonY = this._cancelButton.y;
    //         this._cancelButton.y = h1 + h2 - 1 ;
    //     } else {
    //         this._cancelButton.y = this._saveButtonY;
    //         this._saveButtonY = undefined;
    //     }
    // };

    //-----------------------------------------------------------------------------
    // Scene_MenuBase
    //
    Scene_MenuBase.prototype.descriptionOpen = function(mainWindow) {
        Scene_Base.prototype.descriptionOpen.call(this, mainWindow);
        if (this._cancelButton) {
            this.moveMenuButton(true);
        }
    };
    
    Scene_MenuBase.prototype.descriptionClose = function() {
        Scene_Base.prototype.descriptionClose.call(this);
        if (this._cancelButton) {
            this.moveMenuButton(false);
        }
    };

    Scene_MenuBase.prototype.moveMenuButton = function(flag) {
        const descriptionExWindow = this._descriptionExWindow;
        const h1 = descriptionExWindow.lineHeight();
        const h2 = TMPlugin.DescriptionEx.HorzLineHeight;
        if (flag) {
            this._saveButtonY = this._cancelButton.y;
            this._cancelButton.y = h1 + h2 - 1 ;
        } else {
            this._cancelButton.y = this._saveButtonY;
            this._saveButtonY = undefined;
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Item
    //

    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    //-----------------------------------------------------------------------------
    // Scene_Skill
    //

    const _Scene_Skill_createItemWindow = Scene_Skill.prototype.createItemWindow;
    Scene_Skill.prototype.createItemWindow = function() {
        _Scene_Skill_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Skill_arePageButtonsEnabled = Scene_Skill.prototype.arePageButtonsEnabled;
    Scene_Skill.prototype.arePageButtonsEnabled = function() {
        return (
            this._descriptionExWindow.active ? false :
            _Scene_Skill_arePageButtonsEnabled.call(this)
        );
    };

    //-----------------------------------------------------------------------------
    // Scene_Equip
    //

    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        _Scene_Equip_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _Scene_Equip_createSlotWindow.call(this);
        this._slotWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    const _Scene_Equip_arePageButtonsEnabled = Scene_Equip.prototype.arePageButtonsEnabled;
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
        return (
            this._descriptionExWindow.active ? false :
            _Scene_Equip_arePageButtonsEnabled.call(this)
        );
    };

    //-----------------------------------------------------------------------------
    // Scene_Shop
    //

    const _Scene_Shop_createBuyWindow = Scene_Shop.prototype.createBuyWindow;
    Scene_Shop.prototype.createBuyWindow = function() {
        _Scene_Shop_createBuyWindow.call(this);
        this._buyWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    const _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
    Scene_Shop.prototype.createSellWindow = function() {
        _Scene_Shop_createSellWindow.call(this);
        this._sellWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Shop_descriptionOpen = Scene_Shop.prototype.descriptionOpen;
    Scene_Shop.prototype.descriptionOpen = function(mainWindow) {
        _Scene_Shop_descriptionOpen.call(this, mainWindow);
        if (Imported.TMGreedShop) {
            if (this._materialWindow) {
                this._materialWindow.hide();
            }
        }
    };
    
    const _Scene_Shop_descriptionClose = Scene_Shop.prototype.descriptionClose;
    Scene_Shop.prototype.descriptionClose = function() {
        _Scene_Shop_descriptionClose.call(this);
        if (Imported.TMGreedShop) {
            if (this._materialWindow) {
                this._materialWindow.show();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //
    // const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    // Scene_Battle.prototype.isAnyInputWindowActive = function() {
    //     return (
    //         _Scene_Battle_isAnyInputWindowActive.call(this) ||
    //         this._descriptionExWindow.active
    //     );
    // };

    // const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    // Scene_Battle.prototype.createSkillWindow = function() {
    //     _Scene_Battle_createSkillWindow.call(this);
    //     this._skillWindow.setHandler("description", this.descriptionOpen.bind(this));
    // };

    // const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    // Scene_Battle.prototype.createItemWindow = function() {
    //     _Scene_Battle_createItemWindow.call(this);
    //     this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
    // };

    // Scene_Battle.prototype.createEventItemWindow = function() {
    //     Scene_Message.prototype.createEventItemWindow.call(this);
    //     this._eventItemWindow.setHandler("description", this.descriptionOpen.bind(this));
    //     this.createDescriptionExWindow();
    //     this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
    // };

})();
