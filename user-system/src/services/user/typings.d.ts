// @ts-ignore
/* eslint-disable */
declare namespace USER {
  type KycListParams = {
    count: boolean;
    pageNum: number;
    pageSize: number;
    searchData: {
      alias: string;
      email: string;
      kycAuthStatus: string;
    };
  };
  type KycList = {
    data?: KycItem[];
    success?: boolean;
    total?: number;
  };

  type KycItem = {
    email: string;
    id: number;
    kycAuthStatus: string;
    kycCertNumber: string;
    kycCertType: string;
    kycFirstName: string;
    kycLastName: string;
    kycMiddleName: string;
  };
  type kycApprovalHistoryVOList = {
    approvalNotes: string;
    approvalStatus: string;
    approvedTime: string;
    approverName: string;
  };

  type KycDetailsResult = {
    alias: string;
    email: string;
    id: number;
    kycApprovedTime: string;
    kycApprover: number;
    kycAuthStatus: string;
    kycCertHandAddr: string;
    kycCertNumber: string;
    kycCertType: string;
    kycFirstName: string;
    kycIdNegativeAddr: OImage;
    kycIdPostiveAddr: OImage;
    kycPassportAddr: OImage;
    kycLastName: string;
    kycMiddleName: string;
    kycNotes: string;
    kycSubmissionTime: string;
    kycApprovalHistoryVOList: kycApprovalHistoryVOList[];
  };

  type KycApprovalParams = {
    isPass: boolean;
    kycNotes?: string;
    userId: string;
  };

  type OImage = {
    fileUrl: string;
    type: string;
    token: string;
  };
}
