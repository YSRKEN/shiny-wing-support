import React, { useContext, FormEvent } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import IdolParameterInput from 'component/IdolParameterInput';
import { UnitConfigContext } from 'state/UnitConfigState';

// 既存のユニット一覧
const UNIT_LIST = [
  'ユニット1',
  'ユニット2',
  'ユニット3'
];

// ユニット編成入力用フォーム
const UnitConfigView: React.FC = () => {
  const { selectedSupportUnit, dispatch } = useContext(UnitConfigContext);

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

  return (
    <Form>
      <Form.Group className="my-3">
        <Form.Label>
          ユニット名
      </Form.Label>
        <Form.Control size="sm" placeholder="ユニット名" defaultValue={selectedSupportUnit.unitName}
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
        <Form.Control size="sm" defaultValue="ユニット1" as="select">
          {UNIT_LIST.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
        </Form.Control>
        <div className="my-3">
          <Button className="mr-3"
            onClick={() => dispatch({ type: 'test', message: '' })}>追加</Button>
          <Button className="mr-3" variant="warning">読込み</Button>
          <Button className="mr-3" variant="warning">上書き</Button>
          <Button variant="danger">削除</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default UnitConfigView;
