import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
import List from './List';

const { TabPane } = Tabs;

const Signal: React.FC = () => {
  const callback = (key: any) => {
    console.log(key);
  };
  return (
    <PageHeaderWrapper>
      <Card>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="信号方列表" key="1">
            <List />
          </TabPane>
          <TabPane tab="待审核列表" key="2">
            <List />
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};
export default Signal;
