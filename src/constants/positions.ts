export const POSITION_CODES = {
  GK: 'GK',
  DF: 'DF',
  MF: 'MF',
  FW: 'FW',
  CB: 'CB',
  LB: 'LB',
  RB: 'RB',
  DM: 'DM',
  CM: 'CM',
  AM: 'AM',
  ST: 'ST',
  LW: 'LW',
  RW: 'RW',
} as const;

export const POSITION_LABELS = {
  GK: '골키퍼',
  DF: '수비수',
  MF: '미드필더',
  FW: '공격수',
  CB: '센터백',
  LB: '레프트백',
  RB: '라이트백',
  DM: '수비형 미드필더',
  CM: '중앙 미드필더',
  AM: '공격형 미드필더',
  ST: '스트라이커',
  LW: '레프트 윙어',
  RW: '라이트 윙어',
} as const;

export const POSITION_OPTIONS = [
  '골키퍼',
  '수비수',
  '미드필더',
  '공격수',
  '센터백',
  '레프트백',
  '라이트백',
  '수비형 미드필더',
  '중앙 미드필더',
  '공격형 미드필더',
  '스트라이커',
  '레프트 윙어',
  '라이트 윙어',
] as const;

export const convertPositionToKorean = (position: string): string => {
  return POSITION_LABELS[position as keyof typeof POSITION_LABELS] || position;
};

export const convertKoreanToPosition = (korean: string): string => {
  const entry = Object.entries(POSITION_LABELS).find(
    ([_, label]) => label === korean
  );
  return entry ? entry[0] : korean;
};

export type PositionCode = keyof typeof POSITION_CODES;
export type PositionLabel = (typeof POSITION_LABELS)[PositionCode];
