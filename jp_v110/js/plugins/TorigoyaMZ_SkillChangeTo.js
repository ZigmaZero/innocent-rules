/*---------------------------------------------------------------------------*
 * TorigoyaMZ_SkillChangeTo.js v.1.1.0
 *---------------------------------------------------------------------------*
 * 2020/08/26 00:38 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc スキル変化条件設定プラグイン (v.1.1.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.0
 * @help
 * スキル変化条件設定プラグイン (v.1.1.0)
 *
 * そのスキルを発動した際に、設定した条件を満たしている場合は
 * 別のスキルに変化するようにできます。
 *
 * 例えば、普段は2連続攻撃だが、HPが25%以下になると
 * 超必殺技に変化する！のようなスキルがつくれます。
 *
 * ------------------------------------------------------------
 * ■ 設定方法
 * ------------------------------------------------------------
 * スキルのメモ欄に以下のように記述します。
 *
 * <ChangeTo[変化先のスキル番号]: 条件式>
 *
 * ● 変化先のスキル番号
 * 条件を満たしたときに代わりに発動するスキルの番号を設定してください。
 *
 * ● 条件式
 * ダメージ計算式の欄と同じような記述ができます。
 * a という変数にスキルを使った本人のsubjectが入っています。
 * ※ただし b はありません
 *
 * ※ 「>」記号について
 * 条件式の途中に「>」を使うとエラーになってしまいます。
 * 代わりに「 &gt; 」と入力すると、内部的に「>」に置き換わります。
 *
 * ------------------------------------------------------------
 * ■ 設定の例
 * ------------------------------------------------------------
 * ● 例1） 使用者のHPが100未満だったらスキルID: 10番に変化
 * <ChangeTo[10]: a.hp < 100>
 *
 * ● 例2） 使用者のHPが25%以下だったらスキルID: 11番に変化
 * <ChangeTo[11]: a.hp < (a.mhp * 0.25)>
 *
 * ● 例3） ランダムに10%の確率でスキルID: 12番に変化
 * <ChangeTo[12]: Math.random() < 0.10>
 *
 * ------------------------------------------------------------
 * ■ よくある質問
 * ------------------------------------------------------------
 * Q. 1つのスキルに複数の変化先を設定できますか？
 * A.
 * できます。
 * 条件は上に書かれたものから順番に判定されます。
 * ただし、同じスキル先に変化するものを2つ以上書くことはできません。
 *
 * 　▼ 良い例
 * 　<ChangeTo[11]: a.hp < 100> # 条件1：HPが100以下の場合スキル11
 * 　<ChangeTo[12]: a.hp < 300> # 条件2：HPが300以下の場合スキル12
 *
 * 　▼ できない例
 * 　<ChangeTo[11]: a.hp < 100> # HPが100以下の場合スキル11
 * 　<ChangeTo[11]: a.mp < 50>  # MPが50以下の場合もスキル11！
 * 　↑ChangeTo[11]が2つあるのでダメです
 *
 * Q. 変化後のスキルにも変化条件を設定できますか？
 * A.
 * できません。
 * その仕組みを入れてしまうと、状況次第では無限ループになり
 * ゲームがフリーズしてしまう危険性があるため、
 * 変化先では判定しないようにしています。
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'TorigoyaMZ_SkillChangeTo';
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.1.0',
        };
    }

    function unescapeMetaString(string) {
        return ''
            .concat(string || '')
            .trim()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }

    Torigoya.SkillChangeTo = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    function doEval(a, code) {
        try {
            return !!eval(unescapeMetaString(code));
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.error(e);
            return false;
        }
    }

    (() => {
        const upstream_BattleManager_startAction = BattleManager.startAction;
        BattleManager.startAction = function () {
            this.torigoyaSkillChangeToApply();
            upstream_BattleManager_startAction.apply(this);
        };

        BattleManager.torigoyaSkillChangeToApply = function () {
            const subject = this._subject;

            const action = subject.currentAction();
            if (!action) return;

            const item = action.item();
            if (!item) return;

            this.torigoyaSkillChangeTo_getConditions(item).find(({ id, condition }) => {
                if (!doEval(subject, condition)) return false;

                if (action.isSkill()) {
                    action.setSkill(id);
                } else if (action.isItem()) {
                    action.setItem(id);
                }
                return true;
            });
        };

        const cache = new WeakMap();

        BattleManager.torigoyaSkillChangeTo_getConditions = function (item) {
            if (cache.has(item)) return cache.get(item);

            const conditions = Object.keys(item.meta)
                .map((key) => {
                    const match = key.match(/ChangeTo\[(\d+)]/);
                    return match ? { id: parseInt(match[1], 10), condition: item.meta[key] } : null;
                })
                .filter(Boolean);

            cache.set(item, conditions);
            return conditions;
        };
    })();
})();
