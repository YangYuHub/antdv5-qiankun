// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

const ADMIN_SERVICE = '/admin/v1';

/** 身份认证管理列表 GET*/
export async function getKycList(data: USER.KycListParams) {
  return request<USER.KycList>(`${ADMIN_SERVICE}/kyc/list`, {
    method: 'POST',
    data,
  });
}

/** 获取身份认证明细 POST*/
export async function getKycDetail(userId: string) {
  return request<API.AppResponse<USER.KycDetailsResult>>(`${ADMIN_SERVICE}/kyc/detail`, {
    method: 'POST',
    data: { userId },
  });
}

/** 身份认证审批 POST*/
export async function kycApproval(data: USER.KycApprovalParams) {
  return request<API.AppResponse<boolean>>(`${ADMIN_SERVICE}/kyc/approval`, {
    method: 'POST',
    data,
  });
}
