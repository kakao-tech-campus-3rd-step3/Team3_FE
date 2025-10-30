export type BasicStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
export type ExtendedStatus = BasicStatus | 'ACCEPTED';

export const BASIC_STATUS_LABELS: Record<BasicStatus, string> = {
  PENDING: '대기중',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
  CANCELED: '취소됨',
};

export function getBasicStatusLabel(status: BasicStatus): string {
  return BASIC_STATUS_LABELS[status] ?? status;
}

export const EXTENDED_STATUS_LABELS: Record<ExtendedStatus, string> = {
  ...BASIC_STATUS_LABELS,
  ACCEPTED: '수락됨',
};

export function getExtendedStatusLabel(status: ExtendedStatus): string {
  return EXTENDED_STATUS_LABELS[status] ?? status;
}

export function toBasicStatus(input: string | undefined | null): BasicStatus {
  switch ((input || '').toUpperCase()) {
    case 'APPROVED':
      return 'APPROVED';
    case 'REJECTED':
      return 'REJECTED';
    case 'CANCELED':
      return 'CANCELED';
    case 'PENDING':
    default:
      return 'PENDING';
  }
}
