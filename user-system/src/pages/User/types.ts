export const kycCertType = {
  ID: 'ID card',
  DRIVING: 'Driving',
  PASSPORT: 'Passport',
};

export const kycAuthStatus = {
  '': { text: '--', status: 'default' },
  NONE: { text: 'NONE', status: 'warning' },
  APPROVED: { text: 'Successful', status: 'success' },
  INPROGRESS: { text: 'Pending', status: 'processing' },
  FAILED: { text: 'Failed', status: 'error' },
  REJECT: { text: 'Reject', status: 'error' },
};

export const approvalStatus = {
  NONE: { text: 'NONE', status: 'warning' },
  APPROVE: { text: 'Successful', status: 'success' },
  INPROGRESS: { text: 'Pending', status: 'processing' },
  FAILED: { text: 'Failed', status: 'error' },
  REJECT: { text: 'Reject', status: 'error' },
};
