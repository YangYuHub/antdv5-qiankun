import React, { useState } from 'react';
import { PageContainer, PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, useRequest, history } from 'umi';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  List,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { approvalStatus, kycAuthStatus, kycCertType } from '../types';
import styles from './index.less';
import moment from 'moment';
import { formatTime } from '@/utils/utils';
import { getKycDetail } from '@/services/user/user';

const { Paragraph } = Typography;
const { Title } = Typography;
const AuthDetails: React.FC = () => {
  const userId = (history.location.state as any)?.id;
  const [loading, setLoading] = useState(true);
  const intl = useIntl();

  const { data } = useRequest(() => getKycDetail(userId!), {
    ready: !!userId,
    onSuccess: async (e) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  return (
    <PageHeaderWrapper className={styles.content}>
      <Card>
        <Descriptions title="Information" column={1}>
          <Descriptions.Item label="Status">
            <Badge
              status={kycAuthStatus[data?.kycAuthStatus!]?.status}
              text={kycAuthStatus[data?.kycAuthStatus!]?.text}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Submission">
            {data?.kycSubmissionTime ? moment(data?.kycSubmissionTime).format(formatTime) : '--'}
          </Descriptions.Item>
        </Descriptions>
        <div style={{ backgroundColor: '#fafafa', border: '1px dashed #e9e9e9' }}>
          <Descriptions title=" " column={1}>
            <Descriptions.Item label="Username">{data?.alias ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="Email">{data?.email ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="Name">
              {`${data?.kycFirstName ?? '-'} ${data?.kycLastName ?? '-'}`}
            </Descriptions.Item>
            <Descriptions.Item label="Document Details">
              <span style={{ marginRight: '5px' }}>{kycCertType[data?.kycCertType!]}</span>
              <Paragraph copyable>{data?.kycCertNumber ?? '--'}</Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Image.PreviewGroup>
            <Row gutter={[24, 24]}>
              {data?.kycCertType === 'PASSPORT' ? (
                <Col>
                  <Skeleton active loading={loading}>
                    <Image
                      width={300}
                      height={200}
                      src={`${data?.kycPassportAddr?.fileUrl}?${data?.kycPassportAddr?.token}`}
                    />
                  </Skeleton>
                </Col>
              ) : null}
              {data?.kycCertType === 'ID' ? (
                <>
                  <Col>
                    <Skeleton active loading={loading}>
                      <Image
                        width={300}
                        height={200}
                        src={`${data?.kycIdPostiveAddr?.fileUrl}?${data?.kycIdPostiveAddr?.token}`}
                      />
                    </Skeleton>
                  </Col>
                  <Col>
                    <Skeleton active loading={loading}>
                      <Image
                        width={300}
                        height={200}
                        src={`${data?.kycIdNegativeAddr?.fileUrl}?${data?.kycIdNegativeAddr?.token}`}
                      />
                    </Skeleton>
                  </Col>
                </>
              ) : null}
            </Row>
          </Image.PreviewGroup>
        </div>
        <Divider />

        <Title level={4}>Verification History</Title>
        <List
          header={
            <Row>
              <Col span={6}>Verify by</Col>
              <Col span={6}>Verification time</Col>
              <Col span={6}>Result</Col>
              <Col span={6}>Comment</Col>
            </Row>
          }
          bordered
          dataSource={data?.kycApprovalHistoryVOList}
          renderItem={(item) => (
            <List.Item>
              <Col span={6}>{item.approverName ?? '--'}</Col>
              <Col span={6}>
                {item.approvedTime ? moment(item.approvedTime).format(formatTime) : '--'}
              </Col>
              <Col span={6}>
                <Badge
                  status={approvalStatus[item?.approvalStatus!]?.status}
                  text={approvalStatus[item?.approvalStatus!]?.text}
                />
              </Col>
              <Col span={6}>{item.approvalNotes ? item.approvalNotes : '--'}</Col>
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
export default AuthDetails;
