import React from 'react';
import { Form } from 'react-bootstrap';

// 補正効果入力用フォーム
const IdolBuffInput: React.FC<{
  value: string
}> = ({ value }) => {
  const temp: { value: string, label: string }[] = [];
  for (let i = -100; i <= 100; i += 1) {
    temp.push({ value: `${i}`, label: `${i}％` });
  }
  return (
    <Form.Control size="sm" defaultValue={value} as="select">
      {temp.map((record) => <option key={record.value} value={record.value}>{record.label}</option>)}
    </Form.Control>
  );
};

export default IdolBuffInput;
