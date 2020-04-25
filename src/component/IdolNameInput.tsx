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
const IdolNameInput: React.FC<{
  name: string
}> = ({ name }) => (
  <Form.Control defaultValue={name} as="select">
    {IDOL_LIST.map((record) => <option key={record}>{record}</option>)}
  </Form.Control>
);

export default IdolNameInput;
