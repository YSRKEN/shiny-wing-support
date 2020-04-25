import React from 'react';
import { Form } from 'react-bootstrap';
import IdolNameInput from 'component/IdolNameInput';

// アイドルのパラメーター設定用のフォーム
const IdolParameterInput: React.FC<{
  name: string,
  vocal: string,
  dance: string,
  visual: string
}> = ({ name, vocal, dance, visual }) => (
  <tr>
    <td><IdolNameInput name={name}/></td>
    <td><Form.Control size="sm" defaultValue={vocal} placeholder="Vo" /></td>
    <td><Form.Control size="sm" defaultValue={dance} placeholder="Vi" /></td>
    <td><Form.Control size="sm" defaultValue={visual} placeholder="Da" /></td>
  </tr>
);

export default IdolParameterInput;
