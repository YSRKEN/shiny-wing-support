import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import 'App.css';
import UnitConfigView from 'container/UnitConfigView';
import WingSimulationView from 'container/WingSimulationView';
import { UnitConfigContext, useUnitConfigState } from 'state/UnitConfigState';
import { WingSimulationContext, useWingSimulationState } from 'state/WingSimulationState';

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
        <Tabs defaultActiveKey="unit" id="application-mode" transition={false}>
          <Tab eventKey="unit" title="ユニット編成">
            <UnitConfigContext.Provider value={useUnitConfigState()}>
              <UnitConfigView />
            </UnitConfigContext.Provider>
          </Tab>
          <Tab eventKey="wing" title="WINGシミュレーション">
            <WingSimulationContext.Provider value={useWingSimulationState()}>
              <WingSimulationView />
            </WingSimulationContext.Provider>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </Container>
);

export default App;
