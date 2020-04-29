import React, { useContext, FormEvent, useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';
import { UnitConfigContext } from 'state/UnitConfigState';

// ユニット編成入力用フォーム
const UnitConfigView: React.FC = () => {
  // ユニット一覧、入力しているユニットの情報、dispatch
  const { supportUnitList, selectedSupportUnit, dispatch } = useContext(UnitConfigContext);
  // 現在選択しているユニット名
  const [unitName, setUnitName] = useState('');

  // unitNameの自動更新
  useEffect(() => {
    // ユニット一覧が更新され、その中にunitNameが該当しない場合、unitNameを自動で修正する
    if (supportUnitList.length > 0) {
      if (unitName === '' || !supportUnitList.map(r => r.unitName).includes(unitName)) {
        setUnitName(supportUnitList[0].unitName);
      }
    }
  // eslint-disable-next-line
  }, [supportUnitList]);

  // unitNameを変更
  const selectSupportUnit = (e: FormEvent<any>) => {
    setUnitName(e.currentTarget.value);
  }

  // 入力しているユニットの情報が変更された際の処理
  const onChangeUnitName = (e: FormEvent<any>) => dispatch({type: 'setUnitName', message: e.currentTarget.value});
  const setIdolName = (index: number, name: string) => dispatch({type: 'setIdolName', message: `${index},${name}`});
  const setIdolVocal = (index: number, vocal: number) => dispatch({type: 'setIdolVocal', message: `${index},${vocal}`});
  const setIdolDance = (index: number, dance: number) => dispatch({type: 'setIdolDance', message: `${index},${dance}`});
  const setIdolVisual= (index: number, visual: number) => dispatch({type: 'setIdolVisual', message: `${index},${visual}`});

  // 保存済みユニットを追加・読込み・上書き・削除する処理
  const addUnit = () => dispatch({ type: 'addUnit', message: '' });
  const loadUnit = () => dispatch({ type: 'loadUnit', message: unitName });
  const updateUnit = () => dispatch({ type: 'updateUnit', message: unitName });
  const deleteUnit = () => {
    if (window.confirm(`「${unitName}」を削除しても大丈夫ですか？`)) {
      dispatch({ type: 'deleteUnit', message: unitName });
    }
  };

  // 各ボタンの無効化フラグ
  // flg1：保存済みユニットの名前と、入力しているユニットの名前が被っている
  const flg1 = supportUnitList.map(r => r.unitName).includes(selectedSupportUnit.unitName);
  // flg2：入力しているユニットの名前が空
  const flg2 = selectedSupportUnit.unitName === ''
  // flg3：選択している保存済みユニットの名前が空
  const flg3 = unitName === '';

  // 追加ボタン：flg1 or flg2
  const disabledAdd = flg1 || flg2;
  // 読込みボタン：flg3
  const disabledLoad = flg3;
  // 追加ボタン：(flg1 and 選択している保存済みユニットの名前≠入力しているユニットの名前) or flg2
  const disabledUpdate = (flg1 && selectedSupportUnit.unitName !== unitName) || flg2;
  // 削除ボタン：flg3 or 保存済みユニットが空
  const disabledDelete = flg3 || supportUnitList.length === 0;

  return (
    <Form>
      <Form.Group className="my-3">
        <Form.Label>
          ユニット名
      </Form.Label>
        <Form.Control size="sm" placeholder="ユニット名" value={selectedSupportUnit.unitName}
          onChange={onChangeUnitName}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          パラメーター
      </Form.Label>
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
            {selectedSupportUnit.idol.map((idol, index) => {
              return <IdolParameterInput key={index}
                name={idol.name}
                vocal={idol.vocal}
                dance={idol.dance}
                visual={idol.visual}
                setName={(v: string) => setIdolName(index, v)}
                setVocal={(v: number) => setIdolVocal(index, v)}
                setDance={(v: number) => setIdolDance(index, v)}
                setVisual={(v: number) => setIdolVisual(index, v)} />;
            }) }
          </tbody>
        </Table>
      </Form.Group>
      <hr style={{ borderWidth: 2, borderColor: 'black' }} />
      <Form.Group>
        <Form.Label>
          保存済みユニット
      </Form.Label>
        <Form.Control size="sm" value={unitName} as="select"
          onChange={selectSupportUnit}>
          {supportUnitList.map((unit) => <option key={unit.unitName} value={unit.unitName}>{unit.unitName}</option>)}
        </Form.Control>
        <div className="my-3">
          <Button onClick={addUnit} disabled={disabledAdd} className="mr-3">追加</Button>
          <Button onClick={loadUnit} disabled={disabledLoad} className="mr-3" variant="warning">読込み</Button>
          <Button onClick={updateUnit} disabled={disabledUpdate} className="mr-3" variant="warning">上書き</Button>
          <Button onClick={deleteUnit} disabled={disabledDelete} variant="danger">削除</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default UnitConfigView;
