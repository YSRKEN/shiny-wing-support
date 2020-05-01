import React, { useContext, FormEvent } from 'react';
import { Form, Table } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';
import IdolNameInput from 'component/IdolNameInput';
import AppealMagnificationInput from 'component/AppealMagnificationInput';
import IdolBuffInput from 'component/IdolBuffInput';
import IdolAppealInput from 'component/IdolAppealInput';
import AppealTypeInput from 'component/AppealTypeInput';
import { WingSimulationContext } from 'state/WingSimulationState';

// プロデュースアイドルに関するフォーム
const ProduceIdolParameterInput: React.FC = () => {
  const { produceIdol, dispatch } = useContext(WingSimulationContext);

  // プロデュースアイドルの情報が変更された際の処理
  const setIdolName = (name: string) => dispatch({ type: 'setIdolName', message: `${name}` });
  const setIdolVocal = (vocal: number) => dispatch({ type: 'setIdolVocal', message: `${vocal}` });
  const setIdolDance = (dance: number) => dispatch({ type: 'setIdolDance', message: `${dance}` });
  const setIdolVisual = (visual: number) => dispatch({ type: 'setIdolVisual', message: `${visual}` });

  return (
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
          <IdolParameterInput
            name={produceIdol.name}
            vocal={produceIdol.vocal}
            dance={produceIdol.dance}
            visual={produceIdol.visual}
            setName={setIdolName}
            setVocal={setIdolVocal}
            setDance={setIdolDance}
            setVisual={setIdolVisual} />
        </tbody>
      </Table>
    </Form.Group>
  );
};

// 思い出アピールに関するフォーム
const MemorialParameterInput: React.FC = () => {
  const { memorialLevel, memorialVocal, memorialDance, memorialVisual, dispatch } = useContext(WingSimulationContext);

  // 思い出アピールの情報が変更された際の処理
  const onChangeMemorialLevel = (e: FormEvent<any>) => {
    dispatch({ type: 'setMemorialLevel', message: e.currentTarget.value });
  };
  const setMemorialVocal = (vocal: string) => dispatch({ type: 'setMemorialVocal', message: `${vocal}` });
  const setMemorialDance = (dance: string) => dispatch({ type: 'setMemorialDance', message: `${dance}` });
  const setMemorialVisual = (visual: string) => dispatch({ type: 'setMemorialVisual', message: `${visual}` });

  return (
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
              <Form.Control size="sm" value={memorialLevel} as="select" onChange={onChangeMemorialLevel}>
                <option value="0">Lv.0</option>
                <option value="1">Lv.1</option>
                <option value="2">Lv.2</option>
                <option value="3">Lv.3</option>
                <option value="4">Lv.4</option>
                <option value="5">Lv.5</option>
              </Form.Control>
            </td>
            <td><AppealMagnificationInput value={memorialVocal} setValue={setMemorialVocal} /></td>
            <td><AppealMagnificationInput value={memorialDance} setValue={setMemorialDance} /></td>
            <td><AppealMagnificationInput value={memorialVisual} setValue={setMemorialVisual} /></td>
          </tr>
        </tbody>
      </Table>
    </Form.Group>
  );
};

// シミュレーション設定
const WingSimulationView: React.FC = () => {
  return (
    <Form>
      <ProduceIdolParameterInput />
      <MemorialParameterInput />
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
              <td><IdolNameInput name="霧子" setName={(v: string) => { }} /></td>
              <td><IdolNameInput name="真乃" setName={(v: string) => { }} /></td>
              <td><IdolNameInput name="甘奈" setName={(v: string) => { }} /></td>
            </tr>
            <tr>
              <td><AppealMagnificationInput value="3.0" setValue={(v: string) => { }} /></td>
              <td><AppealMagnificationInput value="2.0" setValue={(v: string) => { }} /></td>
              <td><AppealMagnificationInput value="2.5" setValue={(v: string) => { }} /></td>
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
};

export default WingSimulationView;
