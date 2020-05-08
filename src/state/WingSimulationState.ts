import { createContext, useState, useEffect } from "react";
import { IdolParameter } from "model/IdolParameter";
import { loadData, saveData } from "service/LocalStrage";

const DEFAULT_IDOL: IdolParameter = {
  name: '真乃',
  vocal: 50,
  dance: 50,
  visual: 50
};

type AuditionIdolType = 'vocal' | 'dance' | 'visual';
type AuditionAppealMode = 'rotation' | 'spear';

// オーディションのアイドル設定
// 変遷型なら、judge1st、→judge2nd→judge3rdの順に1回づつアピールする。
// その際、アピール対象がいなかった場合は順番を飛ばす。
// スピア型なら、judge1stだけアピールするが、アピール対象がいなかった場合はjudge2ndにアピールする。
interface AuditionIdol {
  name: string;
  type: AuditionIdolType;
  appealMode: AuditionAppealMode;
  judge1st: number; // 最初に狙う審査員の流行順位
  judge2nd: number; // 次に狙う審査員の流行順位
  judge3rd: number; // 3番目に狙う審査員の流行順位
};

// オーディションのライバル設定
// RIVAL_DATA[x]→最終週(WING決勝)からx週前の情報
// RIVAL_DATA[x][y]→RIVAL_DATA[x]について、優先度がy+1番目のアイドルの情報
const RIVAL_DATA: AuditionIdol[][] = [
  [
    { name: '真乃', type: 'dance', appealMode: 'spear', judge1st: 3, judge2nd: 2, judge3rd: 1 },
    { name: '千雪', type: 'vocal', appealMode: 'rotation', judge1st: 2, judge2nd: 3, judge3rd: 1 },
    { name: '夏葉', type: 'vocal', appealMode: 'spear', judge1st: 1, judge2nd: 2, judge3rd: 3 },
    { name: '凛世', type: 'dance', appealMode: 'spear', judge1st: 3, judge2nd: 1, judge3rd: 2 },
    { name: '樹里', type: 'visual', appealMode: 'rotation', judge1st: 3, judge2nd: 2, judge3rd: 1 }
  ],
  [
    { name: '霧子', type: 'dance', appealMode: 'spear', judge1st: 1, judge2nd: 3, judge3rd: 2 },
    { name: '結華', type: 'vocal', appealMode: 'rotation', judge1st: 1, judge2nd: 2, judge3rd: 3 },
    { name: '咲耶', type: 'vocal', appealMode: 'rotation', judge1st: 3, judge2nd: 1, judge3rd: 2 },
    { name: '灯織', type: 'visual', appealMode: 'rotation', judge1st: 1, judge2nd: 3, judge3rd: 2 },
    { name: '真乃', type: 'visual', appealMode: 'spear', judge1st: 1, judge2nd: 2, judge3rd: 3 }
  ]
];

type AuditionAppealType = 'vocal' | 'dance' | 'visual' | 'memorial';
type AuditionAppealRank = 'perfect' | 'good' | 'normal' | 'bad' | 'memorial';

type ActionType = 'setIdolName'
  | 'setIdolVocal'
  | 'setIdolDance'
  | 'setIdolVisual'
  | 'setMemorialLevel'
  | 'setMemorialVocal'
  | 'setMemorialDance'
  | 'setMemorialVisual'
  | 'setAuditionWeek'
  | 'setBuffVocal'
  | 'setBuffDance'
  | 'setBuffVisual'
  | 'setIdolAppealRank'
  | 'setAuditionTurn'
  | 'setHandIdol'
  | 'setHandPower'
  | 'setAppealTarget'
  | 'setAppealResult'
  | 'setJudgeVocal'
  | 'setJudgeDance'
  | 'setJudgeVisual'
  | 'setAuditionTrend';

// Action
interface Action {
  type: ActionType;
  message: string;
}

// 状態
interface WingSimulationState {
  produceIdol: IdolParameter;
  memorialLevel: number;
  memorialVocal: string;
  memorialDance: string;
  memorialVisual: string;
  auditionWeek: number;
  buffVocal: number;
  buffDance: number;
  buffVisual: number;
  auditionIdolList: string[];
  auditionIdolAppealRankList: AuditionAppealRank[];
  auditionTurn: number;
  handIdolList: string[];
  handPowerList: string[];
  appealTarget: AuditionAppealType;
  appealResult: AuditionAppealRank;
  judgeVocal: number;
  judgeDance: number;
  judgeVisual: number;
  auditionTrend: string;
  dispatch: (action: Action) => void;
}

// 状態の生成
export const useWingSimulationState = () => {
  // 状態定義
  const [produceIdol, setProduceIdol] = useState<IdolParameter>(loadData('produceIdol', DEFAULT_IDOL));
  const [memorialLevel, setMemorialLevel] = useState(loadData('memorialLevel', 1));
  const [memorialVocal, setMemorialVocal] = useState(loadData('memorialVocal', '0.0'));
  const [memorialDance, setMemorialDance] = useState(loadData('memorialDance', '0.0'));
  const [memorialVisual, setMemorialVisual] = useState(loadData('memorialVisual', '0.0'));
  const [auditionWeek, setAuditionWeek] = useState(loadData('auditionWeek', 0));
  const [buffVocal, setBuffVocal] = useState(loadData('buffVocal', 20));
  const [buffDance, setBuffDance] = useState(loadData('buffDance', 0));
  const [buffVisual, setBuffVisual] = useState(loadData('buffVisual', 0));
  const [auditionIdolAppealRankList, setAuditionIdolAppealRankList] = useState<AuditionAppealRank[]>(
    loadData<AuditionAppealRank[]>('auditionIdolAppealRankList', [
      'good', 'perfect', 'good', 'normal', 'normal'
    ])
  );
  const [auditionTurn, setAuditionTurn] = useState(loadData('auditionTurn', 3));
  const [handIdolList, setHandIdolList] = useState(loadData('handIdolList', ['霧子', '真乃', '甘奈']));
  const [handPowerList, setHandPowerList] = useState(loadData('handPowerList', ['3.0', '2.0', '2.5']));
  const [appealTarget, setAppealTarget] = useState<AuditionAppealType>(loadData<AuditionAppealType>('appealTarget', 'visual'));
  const [appealResult, setAppealResult] = useState<AuditionAppealRank>(loadData<AuditionAppealRank>('appealResult', 'perfect'));
  const [judgeVocal, setJudgeVocal] = useState(loadData('judgeVocal', 0));
  const [judgeDance, setJudgeDance] = useState(loadData('judgeDance', 0));
  const [judgeVisual, setJudgeVisual] = useState(loadData('judgeVisual', 0));
  const [auditionTrend, setAuditionTrend] = useState(loadData('auditionTrend', 'vodavi'));

  // データの自動保存
  useEffect(() => saveData('produceIdol', produceIdol), [produceIdol]);
  useEffect(() => saveData('memorialLevel', memorialLevel), [memorialLevel]);
  useEffect(() => saveData('memorialVocal', memorialVocal), [memorialVocal]);
  useEffect(() => saveData('memorialDance', memorialDance), [memorialDance]);
  useEffect(() => saveData('memorialVisual', memorialVisual), [memorialVisual]);
  useEffect(() => saveData('auditionWeek', auditionWeek), [auditionWeek]);
  useEffect(() => saveData('buffVocal', buffVocal), [buffVocal]);
  useEffect(() => saveData('buffDance', buffDance), [buffDance]);
  useEffect(() => saveData('buffVisual', buffVisual), [buffVisual]);
  useEffect(() => saveData('auditionIdolAppealRankList', auditionIdolAppealRankList), [auditionIdolAppealRankList]);
  useEffect(() => saveData('auditionTurn', auditionTurn), [auditionTurn]);
  useEffect(() => saveData('handIdolList', handIdolList), [handIdolList]);
  useEffect(() => saveData('handPowerList', handPowerList), [handPowerList]);
  useEffect(() => saveData('appealTarget', appealTarget), [appealTarget]);
  useEffect(() => saveData('appealResult', appealResult), [appealResult]);
  useEffect(() => saveData('judgeVocal', judgeVocal), [judgeVocal]);
  useEffect(() => saveData('judgeDance', judgeDance), [judgeDance]);
  useEffect(() => saveData('judgeVisual', judgeVisual), [judgeVisual]);
  useEffect(() => saveData('auditionTrend', auditionTrend), [auditionTrend]);

  // 数値計算(アピール順番を特定する)
  useEffect(() => {
    const idolList: {name: string, result: string}[] = [];
    // プロデュースアイドルの情報を入力する
    // nameキーがアイドル名、resultがアピールの種類を表す
    if (appealTarget === 'memorial') {
      // プロデュースアイドルが思い出アピールを打った場合
      idolList.push({name: 'user', result: 'memorial'});
    } else {
      // プロデュースアイドルがその他のアピールを打った場合
      idolList.push({name: 'user', result: appealResult});
    }

    // 他のアイドルの情報を入力する
    for (let i = 0; i < RIVAL_DATA[auditionWeek].length; i += 1) {
      idolList.push(
        {name: RIVAL_DATA[auditionWeek][i].name, result: auditionIdolAppealRankList[i]}
      );
    }

    // 情報同士を比較する関数。交換するべきとみなした場合はtrueが返る
    const nameList = RIVAL_DATA[auditionWeek].map(r => r.name);
    const isSwap = (a: {name: string, result: string}, b: {name: string, result: string}): boolean => {
      // プロデュースアイドルの思い出アピールは最優先とする
      if (b.name === 'user' && b.result === 'memorial') {
        return true;
      }
      if (a.name === 'user' && a.result === 'memorial') {
        return false;
      }

      // 判定が同じ場合、bがプロデュースアイドルだった場合のみ交換する
      // ・idolListの中にプロデュースアイドルは1つしか存在しない
      // ・bがプロデュースアイドルの場合、aは各日にプロデュースアイドルではないので交換できる
      // ・aがプロデュースアイドルの場合、交換しない
      // ・aもbもプロデュースアイドルではない場合、アイドルの名称を見て処理する
      if (a.result === b.result) {
        if (b.name === 'user') {
          return true;
        }
        if (a.name === 'user') {
          return false;
        }
        const indexA = nameList.indexOf(a.name);
        const indexB = nameList.indexOf(b.name);
        if (indexA > indexB) {
          return true;
        } else {
          return false;
        }
      }

      // 判定が異なるため、より優先度が高い判定を先に持ってくる
      const dict: {[key: string]: number} = {
        'perfect': 0,
        'memorial': 1,
        'good': 2,
        'normal': 3,
        'bad': 4
      };
      return dict[a.result] > dict[b.result];
    }

    // ソート処理
    for (let i = 0; i < idolList.length - 1; i += 1) {
      for (let j = i + 1; j < idolList.length; j += 1) {
        if (isSwap(idolList[i], idolList[j])) {
          const temp = {name: idolList[i].name, result: idolList[i].result};
          idolList[i] = {name: idolList[j].name, result: idolList[j].result};
          idolList[j] = temp;
        }
      }
    }

    // 結果を表示
    console.log(JSON.stringify(idolList,null,4));
  }, [auditionWeek, auditionIdolAppealRankList, appealTarget, appealResult]);

  // dispatch関数
  const dispatch = (action: Action) => {
    console.debug(action);
    switch (action.type) {
      case 'setIdolName':
        setProduceIdol({ ...produceIdol, name: action.message });
        break;
      case 'setIdolVocal':
        setProduceIdol({ ...produceIdol, vocal: parseInt(action.message, 10) });
        break;
      case 'setIdolDance':
        setProduceIdol({ ...produceIdol, dance: parseInt(action.message, 10) });
        break;
      case 'setIdolVisual':
        setProduceIdol({ ...produceIdol, visual: parseInt(action.message, 10) });
        break;
      case 'setMemorialLevel':
        setMemorialLevel(parseInt(action.message, 10));
        break;
      case 'setMemorialVocal':
        setMemorialVocal(action.message);
        break;
      case 'setMemorialDance':
        setMemorialDance(action.message);
        break;
      case 'setMemorialVisual':
        setMemorialVisual(action.message);
        break;
      case 'setAuditionWeek':
        setAuditionWeek(parseInt(action.message, 10));
        break;
      case 'setBuffVocal':
        setBuffVocal(parseInt(action.message, 10));
        break;
      case 'setBuffDance':
        setBuffDance(parseInt(action.message, 10));
        break;
      case 'setBuffVisual':
        setBuffVisual(parseInt(action.message, 10));
        break;
      case 'setIdolAppealRank': {
        const temp = [...auditionIdolAppealRankList];
        const temp2 = action.message.split(',');
        temp[parseInt(temp2[0], 10)] = temp2[1] as AuditionAppealRank;
        setAuditionIdolAppealRankList(temp);
        break;
      };
      case 'setAuditionTurn':
        setAuditionTurn(parseInt(action.message, 10));
        break;
      case 'setHandIdol': {
        const temp = [...handIdolList];
        const temp2 = action.message.split(',');
        temp[parseInt(temp2[0], 10)] = temp2[1];
        setHandIdolList(temp);
        break;
      };
      case 'setHandPower': {
        const temp = [...handPowerList];
        const temp2 = action.message.split(',');
        temp[parseInt(temp2[0], 10)] = temp2[1];
        setHandPowerList(temp);
        break;
      };
      case 'setAppealTarget':
        setAppealTarget(action.message as AuditionAppealType);
        if (action.message === 'memorial') {
          if (appealResult !== 'good' && appealResult !== 'bad') {
            setAppealResult('good');
          }
        }
        break;
      case 'setAppealResult':
        setAppealResult(action.message as AuditionAppealRank);
        break;
      case 'setJudgeVocal':
        setJudgeVocal(parseInt(action.message, 10));
        break;
      case 'setJudgeDance':
        setJudgeDance(parseInt(action.message, 10));
        break;
      case 'setJudgeVisual':
        setJudgeVisual(parseInt(action.message, 10));
        break;
      case 'setAuditionTrend':
        setAuditionTrend(action.message);
        break;
    }
  };

  return {
    produceIdol,
    memorialLevel,
    memorialVocal,
    memorialDance,
    memorialVisual,
    auditionWeek,
    buffVocal,
    buffDance,
    buffVisual,
    auditionIdolList: RIVAL_DATA[auditionWeek].map(r => r.name),
    auditionIdolAppealRankList,
    auditionTurn,
    handIdolList,
    handPowerList,
    appealTarget,
    appealResult,
    judgeVocal,
    judgeDance,
    judgeVisual,
    auditionTrend,
    dispatch
  };
};

// コンテキスト
export const WingSimulationContext = createContext<WingSimulationState>({} as WingSimulationState);
