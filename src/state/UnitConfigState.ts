import { createContext, useState, useEffect } from "react";

// アイドルのパラメーター
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
type ActionType = 'setUnitName'
  | 'setIdolName'
  | 'setIdolVocal'
  | 'setIdolDance'
  | 'setIdolVisual'
  | 'addUnit'
  | 'loadUnit'
  | 'updateUnit'
  | 'deleteUnit';

// Action
interface Action {
  type: ActionType;
  message: string;
}

// 状態
interface UnitConfigState {
  supportUnitList: SupportUnit[];
  selectedSupportUnit: SupportUnit;
  dispatch: (action: Action) => void;
}

// データ読み込み
const loadDataFromLocalStrage = <T>(key: string, defaultValue: T): T => {
  const temp = window.localStorage.getItem(key);
  if (temp !== null) {
    return JSON.parse(temp) as T;
  } else {
    return defaultValue;
  }
};

// データの書き出し
const saveDataToLocalStrage = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// 状態の生成
export const useUnitConfigState = () => {
  // 状態定義
  const [selectedSupportUnit, setSelectedSupportUnit] = useState<SupportUnit>(
    loadDataFromLocalStrage('selectedSupportUnit', DEFAULT_SUPPORT)
  );
  const [supportUnitList, setSupportUnitList] = useState<SupportUnit[]>(
    loadDataFromLocalStrage('supportUnitList', [])
  );

  // データの自動保存
  useEffect(() => {
    saveDataToLocalStrage('selectedSupportUnit', selectedSupportUnit);
  }, [selectedSupportUnit]);
  useEffect(() => {
    saveDataToLocalStrage('supportUnitList', supportUnitList);
  }, [supportUnitList]);

  const dispatch = (action: Action) => {
    console.debug(action);
    switch (action.type) {
      case 'addUnit':
        setSupportUnitList([...supportUnitList, JSON.parse(JSON.stringify(selectedSupportUnit))]);
        break;
      case 'loadUnit':{
        const temp = supportUnitList.filter(r => r.unitName === action.message);
        if (temp.length > 0) {
          setSelectedSupportUnit(JSON.parse(JSON.stringify(temp[0])));
        }
        break;
      }
      case 'updateUnit': {
        const index = supportUnitList.findIndex(r => r.unitName === action.message);
        if (index >= 0) {
          const newList: SupportUnit[] = [];
          for (let i = 0; i < supportUnitList.length; i += 1) {
            if (i !== index) {
              newList.push(JSON.parse(JSON.stringify(supportUnitList[i])));
            } else {
              newList.push(JSON.parse(JSON.stringify(selectedSupportUnit)));
            }
          }
          setSupportUnitList(newList);
        }
        break;
      }
      case 'deleteUnit': {
        const index = supportUnitList.findIndex(r => r.unitName === action.message);
        if (index >= 0) {
          const newList: SupportUnit[] = [];
          for (let i = 0; i < supportUnitList.length; i += 1) {
            if (i !== index) {
              newList.push(JSON.parse(JSON.stringify(supportUnitList[i])));
            }
          }
          setSupportUnitList(newList);
        }
        break;
      }
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
    supportUnitList,
    selectedSupportUnit,
    dispatch
  };
}

// コンテキスト
export const UnitConfigContext = createContext<UnitConfigState>({} as UnitConfigState);
