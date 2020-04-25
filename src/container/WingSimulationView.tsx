import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';

// アピール効果の倍率入力用フォーム
const AppealMagnificationInput: React.FC<{
  value: string
}> = ({ value }) => {
  const temp: { value: string, label: string }[] = [];
  for (let i = 0; i <= 5; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      if (i === 5 && j !== 0) {
        continue;
      }
      const temp2 = `${i}.${j}`;
      temp.push({ value: temp2, label: `${temp2}倍` });
    }
  }
  return (
    <Form.Control defaultValue={value} as="select">
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

// 補正効果入力用フォーム
const IdolBuffInput: React.FC<{
  value: string
}> = ({ value }) => {
  const temp: { value: string, label: string }[] = [];
  for (let i = -100; i <= 100; i += 1) {
      temp.push({ value: `${i}`, label: `${i}％` });
  }
  return (
    <Form.Control defaultValue={value} as="select">
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

// シミュレーション設定
const WingSimulationView: React.FC = () => (
  <Form>
    <Form.Group className="mt-3 mb-0">
      <Form.Label>アイドル設定</Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <th>アイドル名</th>
          <th>Vo</th>
          <th>Da</th>
          <th>Vi</th>
        </thead>
        <tbody>
          <IdolParameterInput name="甜花" vocal="600" dance="233" visual="216" />
        </tbody>
      </Table>
    </Form.Group>
    <Form.Group className="my-0">
      <Form.Label>
        思い出アピール
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <th>レベル</th>
          <th>Voアピール</th>
          <th>Daアピール</th>
          <th>Viアピール</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control defaultValue="3" as="select">
                <option value="0">Lv.0</option>
                <option value="1">Lv.1</option>
                <option value="2">Lv.2</option>
                <option value="3">Lv.3</option>
                <option value="4">Lv.4</option>
                <option value="5">Lv.5</option>
              </Form.Control>
            </td>
            <td><AppealMagnificationInput value="0.0" /></td>
            <td><AppealMagnificationInput value="0.0" /></td>
            <td><AppealMagnificationInput value="0.6" /></td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
    <Form.Group className="my-0">
      <Form.Label>
        オーディション設定
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <th>オーデ週</th>
          <th>Vo補正</th>
          <th>Da補正</th>
          <th>Vi補正</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control defaultValue="1" as="select">
                <option value="0">準決勝</option>
                <option value="1">決勝</option>
              </Form.Control>
            </td>
            <td><IdolBuffInput value="20" /></td>
            <td><IdolBuffInput value="0" /></td>
            <td><IdolBuffInput value="0" /></td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
    <hr style={{borderWidth: 2, borderColor: 'black'}}/>
  </Form>
);

export default WingSimulationView;
