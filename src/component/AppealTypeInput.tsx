import React from 'react';
import { Form } from 'react-bootstrap';

// シミュレーションのアピール結果のフォーム
const AppealTypeInput: React.FC<{
  value: string,
  memorialFlg: boolean
}> = ({ value, memorialFlg }) => {
  if (memorialFlg) {
    return (
      <Form.Control size="sm" defaultValue={value} as="select">
        <option value="good">GOOD</option>
        <option value="bad">BAD</option>
      </Form.Control>
    );
  } else {
    return (
      <Form.Control size="sm" defaultValue={value} as="select">
        <option value="perfect">PERFECT</option>
        <option value="good">GOOD</option>
        <option value="normal">NORMAL</option>
        <option value="bad">BAD</option>
      </Form.Control>
    );
  }
};

export default AppealTypeInput;
