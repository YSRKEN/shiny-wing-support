import React from 'react';
import { Form, Table } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';
import IdolNameInput from 'component/IdolNameInput';
import AppealMagnificationInput from 'component/AppealMagnificationInput';
import IdolBuffInput from 'component/IdolBuffInput';
import IdolAppealInput from 'component/IdolAppealInput';
import AppealTypeInput from 'component/AppealTypeInput';

// シミュレーション設定
const WingSimulationView: React.FC = () => (
  <Form>
    <Form.Group className="mt-3 mb-0">
      <Form.Label>アイドル設定</Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            <th>アイドル名</th>
            <th>Vo</th>
            <th>Da</th>
            <th>Vi</th>
          </tr>
        </thead>
        <tbody>
          <IdolParameterInput name="甜花" vocal={600} dance={233} visual={216}
              setName={(v: string) => {}}
              setVocal={(v: number) => {}}
              setDance={(v: number) => {}}
              setVisual={(v: number) => {}} />
        </tbody>
      </Table>
    </Form.Group>
    <Form.Group className="my-0">
      <Form.Label>
        思い出アピール
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            <th>レベル</th>
            <th>Voアピール</th>
            <th>Daアピール</th>
            <th>Viアピール</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control size="sm" defaultValue="3" as="select">
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
      <Form.Control size="sm" defaultValue="1" as="select">
        <option value="0">準決勝　(真乃・灯織・咲耶・結華・霧子)</option>
        <option value="1">決勝　(樹里・凛世・夏葉・千雪・真乃)</option>
      </Form.Control>
    </Form.Group>
    <hr style={{ borderWidth: 2, borderColor: 'black' }} />
    <Form.Group className="my-0">
      <Form.Label>
        シミュレーション設定
      </Form.Label>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            <th>Vo補正</th>
            <th>Da補正</th>
            <th>Vi補正</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><IdolBuffInput value="20" /></td>
            <td><IdolBuffInput value="0" /></td>
            <td><IdolBuffInput value="0" /></td>
          </tr>
        </tbody>
      </Table>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            <th>樹里</th>
            <th>凛世</th>
            <th>夏葉</th>
            <th>千雪</th>
            <th>真乃</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><IdolAppealInput value="good" /></td>
            <td><IdolAppealInput value="perfect" /></td>
            <td><IdolAppealInput value="good" /></td>
            <td><IdolAppealInput value="normal" /></td>
            <td><IdolAppealInput value="normal" /></td>
          </tr>
        </tbody>
      </Table>
      <Table bordered responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            <th>ターン</th>
            <th>選択1</th>
            <th>選択2</th>
            <th>選択3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle" rowSpan={2}>
              <Form.Control defaultValue="3" as="select">
                <option value="1">TURN 1</option>
                <option value="2">TURN 2</option>
                <option value="3">TURN 3</option>
                <option value="4">TURN 4</option>
                <option value="5">TURN 5</option>
                <option value="6">TURN 6</option>
              </Form.Control>
            </td>
            <td><IdolNameInput name="霧子" setName={(v: string) => {}} /></td>
            <td><IdolNameInput name="真乃" setName={(v: string) => {}} /></td>
            <td><IdolNameInput name="甘奈" setName={(v: string) => {}} /></td>
          </tr>
          <tr>
            <td><AppealMagnificationInput value="3.0" /></td>
            <td><AppealMagnificationInput value="2.0" /></td>
            <td><AppealMagnificationInput value="2.5" /></td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
    <hr style={{ borderWidth: 2, borderColor: 'black' }} />
    <Form.Group className="my-0">
      <Form.Label>
        シミュレーション結果
      </Form.Label>
      <div className="d-flex mb-3">
        <Form.Control size="sm" className="mr-3" defaultValue="Vo" as="select">
          <option value="Vo">Vocal</option>
          <option value="Da">Dance</option>
          <option value="Vi">Visual</option>
          <option value="Me">思い出アピール</option>
        </Form.Control>
        <AppealTypeInput value="good" memorialFlg={false} />
      </div>
      <Form.Control as="textarea" rows={10} readOnly disabled
        defaultValue="ここに計算結果が出る" />
    </Form.Group>
  </Form>
);

export default WingSimulationView;
