import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './index.less';

const FollowManagement: React.FC = () => {
  return (
    <PageHeaderWrapper className={styles.content}>
      <Card>跟随方管理</Card>
    </PageHeaderWrapper>
  );
};
export default FollowManagement;
