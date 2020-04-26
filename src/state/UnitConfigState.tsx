import { createContext, useState } from "react";

// サポートユニット情報
interface SupportUnit {
  unitName: string;
  idol: {
    name: string,
    vocal: number,
    dance: number,
    visual: number
  }[];
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
type ActionType = 'test' | 'setUnitName';

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

  const dispatch = (action: Action) => {
    console.debug(action);
    switch (action.type) {
      case 'test':
        window.alert('test');
        break;
      case 'setUnitName':
        setSelectedSupportUnit({...selectedSupportUnit, unitName: action.message});
        break;
    }
  };

  return {
    selectedSupportUnit,
    dispatch
  };
}

// コンテキスト
export const UnitConfigContext = createContext<UnitConfigState>({} as UnitConfigState);
