import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'App.css';

const App: React.FC = () => (
  <Container>
    <Row className="my-3">
      <Col>
        <h1 className="text-center">シャニマス WING 計算機</h1>
      </Col>
    </Row>
  </Container>
);

export default App;
