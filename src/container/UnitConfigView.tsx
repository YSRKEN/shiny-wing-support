import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';

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

// 既存のユニット一覧
const UNIT_LIST = [
  'ユニット1',
  'ユニット2',
  'ユニット3'
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

// アピール効果の倍率入力用フォーム
const AppealMagnificationInput: React.FC<{
  value: string
}> = ({ value }) => {
  const temp: {value: string, label: string}[] = [];
  for (let i = 0; i <= 5; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      if (i === 5 && j !== 0) {
        continue;
      }
      const temp2 = `${i}.${j}`;
      temp.push({value: temp2, label: `${temp2}倍`});
    }
  }
  return (
    <Form.Control defaultValue={value} as="select">
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

// ユニット編成入力用フォーム
const UnitConfigView: React.FC = () => (
  <Form className="my-3">
    <Form.Group>
      <Form.Label>
        ユニット名
      </Form.Label>
      <Form.Control defaultValue="Vocal編成" placeholder="ユニット名" />
    </Form.Group>
    <Form.Group>
      <Form.Label>
        パラメーター
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <th>アイドル名</th>
          <th>Vo</th>
          <th>Da</th>
          <th>Vi</th>
        </thead>
        <tbody>
          <IdolParameterInput name="甜花" vocal="600" dance="233" visual="216" />
          <IdolParameterInput name="真乃" vocal="195" dance="195" visual="178" />
          <IdolParameterInput name="霧子" vocal="202" dance="146" visual="146" />
          <IdolParameterInput name="咲耶" vocal="175" dance="124" visual="150" />
          <IdolParameterInput name="甘奈" vocal="191" dance="155" visual="174" />
        </tbody>
      </Table>
    </Form.Group>
    <Form.Group>
      <Form.Label>
        思い出アピールの追加効果
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <th>Voアピール</th>
          <th>Daアピール</th>
          <th>Viアピール</th>
        </thead>
        <tbody>
          <tr>
            <td><AppealMagnificationInput value="0.0" /></td>
            <td><AppealMagnificationInput value="0.0" /></td>
            <td><AppealMagnificationInput value="0.6" /></td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
    <Form.Group>
      <Form.Label>
        保存済みユニット
      </Form.Label>
      <Form.Control defaultValue="ユニット1" as="select">
        {UNIT_LIST.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
      </Form.Control>
      <div className="my-3">
        <Button className="mr-3">追加</Button>
        <Button className="mr-3" variant="warning">読込み</Button>
        <Button className="mr-3" variant="warning">上書き</Button>
        <Button variant="danger">削除</Button>
      </div>
    </Form.Group>
  </Form>
);

export default UnitConfigView;
