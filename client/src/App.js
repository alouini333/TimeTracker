import React from 'react';
import './App.css';
import { Row, Col, Layout } from "antd";
import Timer from './components/Timer';
import Tasks from './components/Tasks';

function App() {
  const { Content } = Layout;
  return (
    <Content>
    <Row gutter={16}>
      <Col className="gutter-row" span={16}><Tasks /></Col>
      <Col className="gutter-row" span={8}><Timer /></Col>
    </Row>
    </Content>
  );
}

export default App;
