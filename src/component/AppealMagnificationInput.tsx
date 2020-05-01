import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

// アピール効果の倍率入力用フォーム
const AppealMagnificationInput: React.FC<{
  value: string,
  setValue: (v: string) => void
}> = ({ value, setValue }) => {
  const setValueImpl = (e: FormEvent<any>) => {
    setValue(e.currentTarget.value);
  };
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
    <Form.Control size="sm" value={value} as="select" onChange={setValueImpl}>
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

export default AppealMagnificationInput;
