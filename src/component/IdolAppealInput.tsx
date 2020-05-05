import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

// ライバルアイドルの設定フォーム
const IdolAppealInput: React.FC<{
  value: string,
  setValue: (v: string) => void
}> = ({ value, setValue }) => {
  const setValueImpl = (e: FormEvent<any>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Form.Control size="sm" value={value} as="select" onChange={setValueImpl}>
      <option value="perfect">PERFECT</option>
      <option value="good">GOOD</option>
      <option value="normal">NORMAL</option>
      <option value="bad">BAD</option>
      <option value="memorial">思い出</option>
    </Form.Control>
  );
};

export default IdolAppealInput;
