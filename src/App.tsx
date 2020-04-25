import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import 'App.css';
import UnitConfigView from 'container/UnitConfigView';
import WingSimulationView from 'container/WingSimulationView';

const App: React.FC = () => (
  <Container>
    <Row className="my-3">
      <Col>
        <h1 className="text-center d-none d-sm-block">シャニマス WING 計算機</h1>
        <h1 className="text-center d-block d-sm-none">WING 計算機</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <Tabs defaultActiveKey="wing" id="application-mode" transition={false}>
          <Tab eventKey="unit" title="ユニット編成">
            <UnitConfigView />
          </Tab>
          <Tab eventKey="wing" title="WINGシミュレーション">
            <WingSimulationView />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </Container>
);

export default App;
