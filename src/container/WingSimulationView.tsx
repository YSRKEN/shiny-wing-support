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

// オーディション設定
const AuditionWeekInput: React.FC = () => {
  const { auditionWeek, dispatch } = useContext(WingSimulationContext);

  const onChange = (e: FormEvent<any>) => {
    dispatch({ type: 'setAuditionWeek', message: `${e.currentTarget.value}` });
  };

  return (
    <Form.Group className="my-0">
      <Form.Label>
        オーディション設定
  </Form.Label>
      <Form.Control size="sm" value={auditionWeek} as="select" onChange={onChange}>
        <option value="1">準決勝　(霧子・結華・咲耶・灯織・真乃)</option>
        <option value="0">決勝　(真乃・千雪・夏葉・凛世・樹里)</option>
      </Form.Control>
    </Form.Group>
  );
};

// シミュレーション設定(VoDaVi補正)
const IdolBuffsInput: React.FC = () => {
  const { buffVocal, buffDance, buffVisual, dispatch } = useContext(WingSimulationContext);

  const setIdolVocal = (vocal: number) => dispatch({ type: 'setBuffVocal', message: `${vocal}` });
  const setIdolDance = (dance: number) => dispatch({ type: 'setBuffDance', message: `${dance}` });
  const setIdolVisual = (visual: number) => dispatch({ type: 'setBuffVisual', message: `${visual}` });

  return (
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
          <td><IdolBuffInput value={buffVocal} setValue={setIdolVocal} /></td>
          <td><IdolBuffInput value={buffDance} setValue={setIdolDance} /></td>
          <td><IdolBuffInput value={buffVisual} setValue={setIdolVisual} /></td>
        </tr>
      </tbody>
    </Table>
  );
};

// シミュレーション設定(ライバル設定)
const AuditionIdolInput: React.FC = () => {
  const { auditionIdolList, auditionIdolAppealRankList, dispatch } = useContext(WingSimulationContext);

  const setRank = (index: number, rank: string) => {
    dispatch({ type: 'setIdolAppealRank', message: `${index},${rank}` });
  };

  return (
    <Table bordered responsive size="sm" className="text-nowrap">
      <thead>
        <tr>
          {
            auditionIdolList.map(name => <th key={name}>{name}</th>)
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            auditionIdolAppealRankList.map((rank, index) => {
              return <td key={index}><IdolAppealInput value={rank} setValue={(r: string) => setRank(index, r)} /></td>;
            })
          }
        </tr>
      </tbody>
    </Table>
  );
};

// シミュレーション設定(ターン数・選択肢)
const TurnAndHandInput: React.FC = () => {
  const { auditionTurn, handIdolList, handPowerList, dispatch } = useContext(WingSimulationContext);

  const onChangeTurn = (e: FormEvent<any>) => {
    dispatch({ type: 'setAuditionTurn', message: e.currentTarget.value });
  };
  const setHandIdol = (index: number, hand: string) => {
    dispatch({ type: 'setHandIdol', message: `${index},${hand}` });
  };
  const setHandPower = (index: number, power: string) => {
    dispatch({ type: 'setHandPower', message: `${index},${power}` });
  };

  return (
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
            <Form.Control value={auditionTurn} as="select" onChange={onChangeTurn}>
              <option value="1">TURN 1</option>
              <option value="2">TURN 2</option>
              <option value="3">TURN 3</option>
              <option value="4">TURN 4</option>
              <option value="5">TURN 5</option>
              <option value="6">TURN 6</option>
            </Form.Control>
          </td>
          <td><IdolNameInput name={handIdolList[0]} setName={(v: string) => setHandIdol(0, v)} /></td>
          <td><IdolNameInput name={handIdolList[1]} setName={(v: string) => setHandIdol(1, v)} /></td>
          <td><IdolNameInput name={handIdolList[2]} setName={(v: string) => setHandIdol(2, v)} /></td>
        </tr>
        <tr>
          <td><AppealMagnificationInput value={handPowerList[0]} setValue={(v: string) => setHandPower(0, v)} /></td>
          <td><AppealMagnificationInput value={handPowerList[1]} setValue={(v: string) => setHandPower(1, v)} /></td>
          <td><AppealMagnificationInput value={handPowerList[2]} setValue={(v: string) => setHandPower(2, v)} /></td>
        </tr>
      </tbody>
    </Table>
  );
};

// シミュレーション結果
const SimulationResultView: React.FC = () => {
  const { appealTarget, appealResult, dispatch } = useContext(WingSimulationContext);

  const onChangeTarget = (e: FormEvent<any>) => {
    dispatch({ type: 'setAppealTarget', message: e.currentTarget.value });
  };

  const setResult = (v: string) => {
    dispatch({ type: 'setAppealResult', message: v });
  };

  return (
    <Form.Group className="my-0">
      <Form.Label>
        シミュレーション結果
  </Form.Label>
      <div className="d-flex mb-3">
        <Form.Control size="sm" className="mr-3" value={appealTarget} as="select" onChange={onChangeTarget}>
          <option value="vocal">Vocal</option>
          <option value="dance">Dance</option>
          <option value="visual">Visual</option>
          <option value="memorial">思い出アピール</option>
        </Form.Control>
        <AppealTypeInput value={appealResult} memorialFlg={appealTarget == 'memorial'} setValue={setResult} />
      </div>
      <Form.Control as="textarea" rows={10} readOnly disabled
        defaultValue="ここに計算結果が出る" />
    </Form.Group>
  );
};

// シミュレーション設定
const WingSimulationView: React.FC = () => {
  return (
    <Form>
      <ProduceIdolParameterInput />
      <MemorialParameterInput />
      <AuditionWeekInput />
      <hr style={{ borderWidth: 2, borderColor: 'black' }} />
      <Form.Group className="my-0">
        <Form.Label>
          シミュレーション設定
      </Form.Label>
        <IdolBuffsInput />
        <AuditionIdolInput />
        <TurnAndHandInput />
      </Form.Group>
      <hr style={{ borderWidth: 2, borderColor: 'black' }} />
      <SimulationResultView />
    </Form>
  );
};

export default WingSimulationView;
