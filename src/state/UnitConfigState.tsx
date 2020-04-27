import { createContext, useState, useEffect } from "react";

interface IdolParameter {
  name: string;
  vocal: number;
  dance: number;
  visual: number;
}

// サポートユニット情報
interface SupportUnit {
  unitName: string;
  idol: IdolParameter[];
}

const DEFAULT_SUPPORT: SupportUnit = {
  unitName: 'サンプルユニット',
  idol: [
    {name: '透', vocal: 0, dance: 0, visual: 0},
    {name: '円香', vocal: 0, dance: 0, visual: 0},
    {name: '小糸', vocal: 0, dance: 0, visual: 0},
    {name: '雛菜', vocal: 0, dance: 0, visual: 0},
  ]
};

// Actionの種類
type ActionType = 'test'
  | 'setUnitName'
  | 'setIdolName'
  | 'setIdolVocal'
  | 'setIdolDance'
  | 'setIdolVisual';

// Action
interface Action {
  type: ActionType;
  message: string;
}

// 状態
interface UnitConfigState {
  selectedSupportUnit: SupportUnit;
  dispatch: (action: Action) => void;
}

// 状態の生成
export const useUnitConfigState = () => {
  const [selectedSupportUnit, setSelectedSupportUnit] = useState<SupportUnit>(DEFAULT_SUPPORT);

  useEffect(() => {
    console.debug(selectedSupportUnit);
  }, [selectedSupportUnit]);

  const dispatch = (action: Action) => {
    console.debug(action);
    switch (action.type) {
      case 'test':
        window.alert('test');
        break;
      case 'setUnitName':
        setSelectedSupportUnit({...selectedSupportUnit, unitName: action.message});
        break;
      case 'setIdolName':{
        const index = parseInt(action.message.split(',')[0], 10);
        const value = action.message.split(',')[1];
        const temp: IdolParameter[] = JSON.parse(JSON.stringify(selectedSupportUnit.idol));
        temp[index].name = value;
        setSelectedSupportUnit({...selectedSupportUnit, idol: temp});
        break;
      }
      case 'setIdolVocal':{
        const index = parseInt(action.message.split(',')[0], 10);
        const value = parseInt(action.message.split(',')[1], 10);
        const temp: IdolParameter[] = JSON.parse(JSON.stringify(selectedSupportUnit.idol));
        temp[index].vocal = value;
        setSelectedSupportUnit({...selectedSupportUnit, idol: temp});
        break;
      }
      case 'setIdolDance':{
        const index = parseInt(action.message.split(',')[0], 10);
        const value = parseInt(action.message.split(',')[1], 10);
        const temp: IdolParameter[] = JSON.parse(JSON.stringify(selectedSupportUnit.idol));
        temp[index].dance = value;
        setSelectedSupportUnit({...selectedSupportUnit, idol: temp});
        break;
      }
      case 'setIdolVisual':{
        const index = parseInt(action.message.split(',')[0], 10);
        const value = parseInt(action.message.split(',')[1], 10);
        const temp: IdolParameter[] = JSON.parse(JSON.stringify(selectedSupportUnit.idol));
        temp[index].visual = value;
        setSelectedSupportUnit({...selectedSupportUnit, idol: temp});
        break;
      }
    }
  };

  return {
    selectedSupportUnit,
    dispatch
  };
}

// コンテキスト
export const UnitConfigContext = createContext<UnitConfigState>({} as UnitConfigState);
