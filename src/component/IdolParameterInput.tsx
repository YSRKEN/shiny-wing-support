import React from 'react';
import { Form } from 'react-bootstrap';

// アイドル一覧
const IDOL_LIST = [
  '真乃',
  '灯織',
  'めぐる',
  '恋鐘',
  '摩美々',
  '咲耶',
  '結華',
  '霧子',
  '果穂',
  '智代子',
  '樹里',
  '凛世',
  '夏葉',
  '甘奈',
  '甜花',
  '千雪',
  'あさひ',
  '冬優子',
  '愛依',
  '透',
  '円香',
  '小糸',
  '雛菜'
];

// アイドルのパラメーター設定用のフォーム
const IdolParameterInput: React.FC<{
  name: string,
  vocal: string,
  dance: string,
  visual: string
}> = ({ name, vocal, dance, visual }) => (
  <tr>
    <td><Form.Control defaultValue={name} as="select">
      {IDOL_LIST.map((record) => <option key={record}>{record}</option>)}
    </Form.Control></td>
    <td><Form.Control defaultValue={vocal} placeholder="Vo" /></td>
    <td><Form.Control defaultValue={dance} placeholder="Vi" /></td>
    <td><Form.Control defaultValue={visual} placeholder="Da" /></td>
  </tr>
);

export default IdolParameterInput;
