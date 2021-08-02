import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, useRequest, history } from 'umi';
import { Card } from 'antd';

import styles from './index.less';

const SignalReview: React.FC = () => {
  return (
    <PageHeaderWrapper className={styles.content}>
      <Card>审核页</Card>
    </PageHeaderWrapper>
  );
};
export default SignalReview;
