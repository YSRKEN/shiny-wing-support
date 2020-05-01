import { createContext, useState, useEffect } from "react";
import { IdolParameter } from "model/IdolParameter";
import { loadData, saveData } from "service/LocalStrage";

const DEFAULT_IDOL: IdolParameter = {
  name: '真乃',
  vocal: 50,
  dance: 50,
  visual: 50
};

type ActionType = 'setIdolName'
  | 'setIdolVocal'
  | 'setIdolDance'
  | 'setIdolVisual'
  | 'setMemorialLevel'
  | 'setMemorialVocal'
  | 'setMemorialDance'
  | 'setMemorialVisual';

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
  dispatch: (action: Action) => void;
}

// 状態の生成
export const useWingSimulationState = () => {
  // 状態定義
  const [produceIdol, setProduceIdol] = useState<IdolParameter>(
    loadData('produceIdol', DEFAULT_IDOL)
  );
  const [memorialLevel, setMemorialLevel] = useState(3);
  const [memorialVocal, setMemorialVocal] = useState('0.0');
  const [memorialDance, setMemorialDance] = useState('0.0');
  const [memorialVisual, setMemorialVisual] = useState('0.6');

  // データの自動保存
  useEffect(() => {
    saveData('produceIdol', produceIdol);
  }, [produceIdol]);

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

    }
  };

  return {
    produceIdol,
    memorialLevel,
    memorialVocal,
    memorialDance,
    memorialVisual,
    dispatch
  };
};

// コンテキスト
export const WingSimulationContext = createContext<WingSimulationState>({} as WingSimulationState);
