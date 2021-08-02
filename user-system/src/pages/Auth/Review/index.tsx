import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl, useRequest, history } from 'umi';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  message,
  Modal,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { kycAuthStatus, kycCertType } from '../types';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';

import styles from './index.less';
import moment from 'moment';
import { formatTime } from '@/utils/utils';
import { getKycDetail, kycApproval } from '@/services/user/user';
const { Paragraph } = Typography;
const { confirm } = Modal;
const AuthReview: React.FC = () => {
  const intl = useIntl();
  const userId = (history.location.state as any).id;
  const [declineModalVisible, setDeclineModalVisible] = useState<boolean>(false);

  const {
    loading,
    data,
    run: onGetKycDetail,
  } = useRequest(() => getKycDetail(userId!), {
    ready: !!userId,
    onSuccess: async (e) => {},
  });

  const onApprove = () => {
    confirm({
      title: `Are you sure you want to approve?`,
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk: async () => {
        try {
          await kycApproval({ userId, isPass: true } as USER.KycApprovalParams);
          await onGetKycDetail();
          message.success('Approve success');
        } catch (e) {}
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <PageHeaderWrapper className={styles.content}>
      <Card loading={loading}>
        <Descriptions title="Information" column={5}>
          <Descriptions.Item label="Status">
            <Badge
              status={kycAuthStatus[data?.kycAuthStatus!]?.status}
              text={kycAuthStatus[data?.kycAuthStatus!]?.text}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Submission time">
            {data?.kycSubmissionTime ? moment(data?.kycSubmissionTime).format(formatTime) : '--'}
          </Descriptions.Item>
        </Descriptions>
        <div
          style={{
            backgroundColor: '#fafafa',
            border: '1px dashed #e9e9e9',
            padding: '0  0 12px 18px',
          }}
        >
          <Descriptions title=" " column={1}>
            <Descriptions.Item label="Username">{data?.alias}</Descriptions.Item>
            <Descriptions.Item label="Account ID">{data?.email}</Descriptions.Item>
            <Descriptions.Item label="Name">
              {`${data?.kycFirstName ?? '-'} ${data?.kycLastName ?? '-'}`}
            </Descriptions.Item>
            <Descriptions.Item label="Document details">
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
        {data?.kycAuthStatus === 'INPROGRESS' ? (
          <Row gutter={[24, 24]}>
            <Col>
              <Button type="primary" onClick={onApprove}>
                Approve
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setDeclineModalVisible(true)}>Decline</Button>
            </Col>
          </Row>
        ) : null}
      </Card>
      <ModalForm
        title={'Are you sure you want to decline?'}
        width="400px"
        visible={declineModalVisible}
        onVisibleChange={setDeclineModalVisible}
        onFinish={async (value) => {
          const success = await kycApproval({
            userId,
            isPass: false,
            kycNotes: value['kycNotes'],
          } as USER.KycApprovalParams);
          if (success) {
            setDeclineModalVisible(false);
            await onGetKycDetail();
          }
        }}
      >
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '实名认证说明不能为空',
            },
          ]}
          width="md"
          name="kycNotes"
          fieldProps={{ showCount: true, maxLength: 100 }}
        />
      </ModalForm>
    </PageHeaderWrapper>
  );
};
export default AuthReview;
