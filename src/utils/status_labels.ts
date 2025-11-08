export type BasicStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
export type ExtendedStatus = BasicStatus | 'ACCEPTED';

export const BASIC_STATUS_LABELS: Record<BasicStatus, string> = {
  PENDING: '대기중',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
  CANCELED: '취소됨',
};

export const EXTENDED_STATUS_LABELS: Record<ExtendedStatus, string> = {
  ...BASIC_STATUS_LABELS,
  ACCEPTED: '수락됨',
};

export const KOREAN_TO_ENGLISH_STATUS_MAPPING: Record<string, BasicStatus> = {
  대기중: 'PENDING',
  승인: 'APPROVED',
  승인됨: 'APPROVED',
  거절: 'REJECTED',
  거절됨: 'REJECTED',
  취소: 'CANCELED',
  취소됨: 'CANCELED',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
};

export function toBasicStatus(input: string | undefined | null): BasicStatus {
  switch ((input || '').toUpperCase()) {
    case 'APPROVED':
    case 'ACCEPTED':
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
