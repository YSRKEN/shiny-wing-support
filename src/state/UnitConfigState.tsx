import { createContext } from "react";

// Actionの種類
type ActionType = 'test';

// Action
interface Action {
  type: ActionType;
  message: string;
}

// 状態
interface UnitConfigState {
  dispatch: (action: Action) => void;
}

// 状態の生成
export const useUnitConfigState = () => {
  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'test':
        window.alert('test');
        break;
    }
  };

  return {
    dispatch
  };
}

// コンテキスト
export const UnitConfigContext = createContext<UnitConfigState>({} as UnitConfigState);
