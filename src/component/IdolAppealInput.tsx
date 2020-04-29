import React from 'react';
import { Form } from 'react-bootstrap';

// ライバルアイドルの設定フォーム
const IdolAppealInput: React.FC<{
  value: string
}> = ({ value }) => {
  return (
    <Form.Control size="sm" defaultValue={value} as="select">
      <option value="perfect">PERFECT</option>
      <option value="good">GOOD</option>
      <option value="normal">NORMAL</option>
      <option value="bad">BAD</option>
      <option value="memorial">思い出</option>
    </Form.Control>
  );
};

export default IdolAppealInput;
