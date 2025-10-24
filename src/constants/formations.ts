export type FormationType =
  | '4-3-3'
  | '4-4-2'
  | '3-5-2'
  | '4-1-4-1'
  | '4-2-3-1'
  | '3-4-2-1'
  | '5-3-2';

export interface FormationPosition {
  id: string;
  x: number; // 0~100 (%)
  y: number; // 0~100 (%)
}

/**
 * X축: 라인 내 인원수에 따라 좌우 대칭 균등 분배
 * 단, FW(공격수)는 약간 더 좁게 붙게 조정
 */
const getSymmetricXPositions = (count: number, isForward = false): number[] => {
  if (count === 1) return [50];

  // 전체 폭: 기본은 60%, 공격수는 약간 더 좁게
  const totalWidth = isForward
    ? count === 2
      ? 40 // 투톱이면 중앙쪽에 딱 붙음
      : 50 // 스리톱은 살짝 여유 있게
    : 60; // 기본 폭

  const gap = totalWidth / (count - 1);
  const start = 50 - totalWidth / 2;
  return Array.from({ length: count }, (_, i) => start + i * gap);
};

/**
 * Y축 기준 라인
 * 1선: FW 가까운 쪽(상단)   → 20
 * 2선: MF 전진(중앙 앞)     → 35
 * 3선: MF 후진(중앙 아래)   → 55
 * 4선: DF (GK 앞)           → 70
 * GK:  자기 골대 앞          → 90
 */
const LINE_Y = {
  L1: 20,
  L2: 35,
  L3: 55,
  L4: 70,
  GK: 90,
};

/**
 * 라인 개수에 따라 DF~FW 사이 Y값을 균등 분배
 */
const getYPositionsForLines = (lineCount: number): number[] => {
  if (lineCount <= 1) return [LINE_Y.L4]; // 방어 코드

  if (lineCount === 4) {
    return [LINE_Y.L4, LINE_Y.L3, LINE_Y.L2, LINE_Y.L1];
  }

  const top = LINE_Y.L4;
  const bottom = LINE_Y.L1;
  const step = (top - bottom) / (lineCount - 1);

  return Array.from({ length: lineCount }, (_, i) => top - i * step);
};

/**
 * 포메이션 문자열을 좌표로 변환
 * 예: '4-3-3' → [4,3,3] = [DF, MF, FW]
 */
export const generateFormation = (pattern: string): FormationPosition[] => {
  const lines = pattern.split('-').map(n => parseInt(n, 10));
  const lineCount = lines.length;

  const yPositions = getYPositionsForLines(lineCount);
  const positions: FormationPosition[] = [];

  // GK 고정
  positions.push({ id: 'GK', x: 50, y: LINE_Y.GK });

  // 앞이 수비, 뒤가 공격
  lines.forEach((count, idx) => {
    const y = yPositions[idx];
    const isLastLine = idx === lineCount - 1; // 마지막 줄 = 공격수
    const xPositions = getSymmetricXPositions(count, isLastLine);

    const prefix = idx === 0 ? 'DF' : isLastLine ? 'FW' : 'MF';

    xPositions.forEach((x, i) => {
      positions.push({ id: `${prefix}${i + 1}`, x, y });
    });
  });

  return positions;
};

/** 미리 정의된 포메이션 */
export const FORMATIONS: Record<FormationType, FormationPosition[]> = {
  '4-3-3': generateFormation('4-3-3'),
  '4-4-2': generateFormation('4-4-2'),
  '3-5-2': generateFormation('3-5-2'),
  '4-1-4-1': generateFormation('4-1-4-1'),
  '4-2-3-1': generateFormation('4-2-3-1'),
  '3-4-2-1': generateFormation('3-4-2-1'),
  '5-3-2': generateFormation('5-3-2'),
};
