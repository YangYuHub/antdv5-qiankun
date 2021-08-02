import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, Access, useAccess } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { goto, guid } from '@/utils/utils';
import { getKycList } from '@/services/user/user';

const List: React.FC = () => {
  const access = useAccess();
  const actionRef = useRef<ActionType>();

  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns<USER.KycItem>[] = [
    {
      title: 'Username',
      dataIndex: 'alias',
      fixed: 'left',
      width: 170,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'First name',
      dataIndex: 'kycFirstName',
      hideInSearch: true,
    },
    {
      title: 'Last name',
      dataIndex: 'kycLastName',
      hideInSearch: true,
    },
    {
      title: 'Document type',
      dataIndex: 'kycCertType',
      hideInSearch: true,
      width: 120,
    },
    {
      title: 'Document number',
      dataIndex: 'kycCertNumber',
      hideInSearch: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="状态" />,
      dataIndex: 'kycAuthStatus',
      width: 120,
      valueEnum: {
        INPROGRESS: {
          text: 'Pending',
          status: 'processing',
        },
        APPROVED: {
          text: 'Successful',
          status: 'success',
        },
        FAILED: {
          text: 'Failed',
          status: 'error',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 70,
      render: (_, record) => {
        if (record.kycAuthStatus !== 'INPROGRESS') {
          return [
            <a
              onClick={() => {
                goto('/auth/details', {}, { ...record });
              }}
            >
              Details
            </a>,
          ];
        } else {
          return [
            <a
              onClick={() => {
                goto('/auth/review', {}, { ...record });
              }}
            >
              Verify
            </a>,
          ];
        }
      },
    },
  ];
  return (
    <ProTable<USER.KycItem, USER.KycListParams>
      headerTitle={intl.formatMessage({
        id: 'pages.searchTable.title',
        defaultMessage: '查询表格',
      })}
      actionRef={actionRef}
      rowKey={guid}
      search={{
        labelWidth: 'auto',
      }}
      toolBarRender={() => []}
      pagination={{
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50'],
      }}
      scroll={{ x: 1500 }}
      // request={async (params: API.PageParams = {}, sort, filter) => {
      //   const res = await getKycList({
      //     count: true,
      //     pageNum: params.current,
      //     pageSize: params.pageSize,
      //     searchData: {
      //       alias: params['alias'],
      //       email: params['email'],
      //       kycAuthStatus: params['kycAuthStatus'],
      //     },
      //   } as USER.KycListParams);
      //   console.log(res);
      //   return res;
      // }}
      columns={columns}
    />
  );
};

export default List;
