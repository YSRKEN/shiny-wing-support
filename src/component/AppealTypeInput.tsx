import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

// シミュレーションのアピール結果のフォーム
const AppealTypeInput: React.FC<{
  value: string,
  memorialFlg: boolean,
  setValue: (v: string) => void,
}> = ({ value, memorialFlg, setValue }) => {
  const setValueImpl = (e: FormEvent<any>) => {
    setValue(e.currentTarget.value);
  };

  if (memorialFlg) {
    return (
      <Form.Control size="sm" value={value} as="select" onChange={setValueImpl}>
        <option value="good">GOOD</option>
        <option value="bad">BAD</option>
      </Form.Control>
    );
  } else {
    return (
      <Form.Control size="sm" value={value} as="select" onChange={setValueImpl}>
        <option value="perfect">PERFECT</option>
        <option value="good">GOOD</option>
        <option value="normal">NORMAL</option>
        <option value="bad">BAD</option>
      </Form.Control>
    );
  }
};

export default AppealTypeInput;
