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

/** X축: 라인 내 인원수에 따라 좌우 대칭 균등 분배 */
const getSymmetricXPositions = (count: number): number[] => {
  if (count === 1) return [50];
  const totalWidth = 60; // 필드 중앙 기준으로 60% 폭 안에서 분배
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
 * 라인 개수에 따라 4선~1선 사이를 적절히 채워주는 함수
 * - 3줄: [DF=70, MF=50, FW=30] 비슷한 감각으로 등분
 * - 4줄: [70, 55, 35, 20] 정확히 4등분
 * - 5줄 이상: 70~20 구간을 균등 분할
 */
const getYPositionsForLines = (lineCount: number): number[] => {
  if (lineCount <= 1) return [LINE_Y.L4]; // 이상한 포메이션 방어

  if (lineCount === 4) {
    // 정확히 의도한 4등분
    return [LINE_Y.L4, LINE_Y.L3, LINE_Y.L2, LINE_Y.L1];
  }

  // 그 외: DF(70) ~ FW(20) 범위를 균등 분할
  const top = LINE_Y.L4; // 70
  const bottom = LINE_Y.L1; // 20
  const step = (top - bottom) / (lineCount - 1);
  // DF부터 위로 갈수록 값이 작아지도록
  return Array.from({ length: lineCount }, (_, i) => top - i * step);
};

/**
 * 포메이션 문자열을 좌표로 변환
 * 입력: '4-3-3' → [4,3,3] = [DF, MF, FW]
 * 출력: GK는 항상 추가, DF → MF → FW 순서로 y에 매핑
 */
export const generateFormation = (pattern: string): FormationPosition[] => {
  const lines = pattern.split('-').map(n => parseInt(n, 10));
  const lineCount = lines.length;

  // DF ~ FW 라인의 y값
  const yPositions = getYPositionsForLines(lineCount);
  const positions: FormationPosition[] = [];

  // GK 고정
  positions.push({ id: 'GK', x: 50, y: LINE_Y.GK });

  // 앞이 수비, 뒤가 공격
  lines.forEach((count, idx) => {
    const y = yPositions[idx]; // idx=0 → DF, 마지막 → FW
    const xPositions = getSymmetricXPositions(count);

    // 라벨링: 첫 줄 DF, 마지막 FW, 그 사이는 MF
    const prefix = idx === 0 ? 'DF' : idx === lineCount - 1 ? 'FW' : 'MF';

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
