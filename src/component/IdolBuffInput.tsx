import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

// 補正効果入力用フォーム
const IdolBuffInput: React.FC<{
  value: number,
  setValue: (v: number) => void,
}> = ({ value, setValue }) => {
  const setValueImpl = (e: FormEvent<any>) => {
    try {
      const temp = parseInt(e.currentTarget.value, 10);
      if (!isNaN(temp)) {
        setValue(temp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const temp: { value: string, label: string }[] = [];
  for (let i = -100; i <= 100; i += 1) {
    temp.push({ value: `${i}`, label: `${i}％` });
  }
  return (
    <Form.Control size="sm" value={value} as="select" onChange={setValueImpl}>
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

export default IdolBuffInput;
