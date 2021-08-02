import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './index.less';

const SignalDetails: React.FC = () => {
  return (
    <PageHeaderWrapper className={styles.content}>
      <Card>查看跟随者</Card>
    </PageHeaderWrapper>
  );
};
export default SignalDetails;
