import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';

// 既存のユニット一覧
const UNIT_LIST = [
  'ユニット1',
  'ユニット2',
  'ユニット3'
];

// ユニット編成入力用フォーム
const UnitConfigView: React.FC = () => (
  <Form>
    <Form.Group className="my-3">
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
          <IdolParameterInput name="真乃" vocal="195" dance="195" visual="178" />
          <IdolParameterInput name="霧子" vocal="202" dance="146" visual="146" />
          <IdolParameterInput name="咲耶" vocal="175" dance="124" visual="150" />
          <IdolParameterInput name="甘奈" vocal="191" dance="155" visual="174" />
        </tbody>
      </Table>
    </Form.Group>
    <hr style={{borderWidth: 2, borderColor: 'black'}}/>
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
