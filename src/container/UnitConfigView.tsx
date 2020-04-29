import React, { useContext, FormEvent, useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';
import { UnitConfigContext } from 'state/UnitConfigState';

// ユニット編成入力用フォーム
const UnitConfigView: React.FC = () => {
  const { supportUnitList, selectedSupportUnit, dispatch } = useContext(UnitConfigContext);

  const [unitName, setUnitName] = useState('');

  useEffect(() => {
    if (supportUnitList.length > 0) {
      if (unitName === '' || !supportUnitList.map(r => r.unitName).includes(unitName)) {
        setUnitName(supportUnitList[0].unitName);
      }
    }
  // eslint-disable-next-line
  }, [supportUnitList]);

  const selectSupportUnit = (e: FormEvent<any>) => {
    setUnitName(e.currentTarget.value);
  }
  const onChangeUnitName = (e: FormEvent<any>) => {
    dispatch({type: 'setUnitName', message: e.currentTarget.value});
  };

  const setIdolName = (index: number, name: string) => {
    dispatch({type: 'setIdolName', message: `${index},${name}`});
  };

  const setIdolVocal = (index: number, vocal: number) => {
    dispatch({type: 'setIdolVocal', message: `${index},${vocal}`});
  };

  const setIdolDance = (index: number, dance: number) => {
    dispatch({type: 'setIdolDance', message: `${index},${dance}`});
  };

  const setIdolVisual= (index: number, visual: number) => {
    dispatch({type: 'setIdolVisual', message: `${index},${visual}`});
  };
  const addUnit = () => dispatch({ type: 'addUnit', message: '' });
  const loadUnit = () => dispatch({ type: 'loadUnit', message: unitName });
  const updateUnit = () => dispatch({ type: 'updateUnit', message: unitName });
  const deleteUnit = () => {
    if (window.confirm(`「${unitName}」を削除しても大丈夫ですか？`)) {
      dispatch({ type: 'deleteUnit', message: unitName });
    }
  };

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
          <Button className="mr-3" onClick={addUnit}
            disabled={supportUnitList.map(r => r.unitName).includes(selectedSupportUnit.unitName) || selectedSupportUnit.unitName === ''}>追加</Button>
          <Button className="mr-3" onClick={loadUnit} variant="warning"
            disabled={unitName === ''}>読込み</Button>
          <Button className="mr-3" onClick={updateUnit} variant="warning"
            disabled={(supportUnitList.map(r => r.unitName).includes(selectedSupportUnit.unitName) && selectedSupportUnit.unitName !== unitName) || selectedSupportUnit.unitName === ''}>上書き</Button>
          <Button  onClick={deleteUnit} variant="danger"
             disabled={unitName === '' || supportUnitList.length === 0}>削除</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default UnitConfigView;
