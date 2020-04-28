import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import IdolNameInput from 'component/IdolNameInput';

// アイドルのパラメーター設定用のフォーム
const IdolParameterInput: React.FC<{
  name: string,
  vocal: number,
  dance: number,
  visual: number,
  setName: (v: string) => void,
  setVocal: (v: number) => void,
  setDance: (v: number) => void,
  setVisual: (v: number) => void
}> = ({ name, vocal, dance, visual, setName, setVocal, setDance, setVisual }) => {
  const setVocalImpl = (e: FormEvent<any>) => {
    try {
      const temp = parseInt(e.currentTarget.value, 10);
      if (!isNaN(temp)) {
        setVocal(temp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setDanceImpl = (e: FormEvent<any>) => {
    try {
      const temp = parseInt(e.currentTarget.value, 10);
      if (!isNaN(temp)) {
        setDance(temp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setVisualImpl = (e: FormEvent<any>) => {
    try {
      const temp = parseInt(e.currentTarget.value, 10);
      if (!isNaN(temp)) {
        setVisual(temp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td><IdolNameInput name={name} setName={setName} /></td>
      <td><Form.Control size="sm" value={vocal} placeholder="Vo" onChange={setVocalImpl} /></td>
      <td><Form.Control size="sm" value={dance} placeholder="Da" onChange={setDanceImpl} /></td>
      <td><Form.Control size="sm" value={visual} placeholder="Vi" onChange={setVisualImpl} /></td>
    </tr>
  );
};

export default IdolParameterInput;
