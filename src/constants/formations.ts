export type FormationType =
  | '4-3-3'
  | '4-4-2'
  | '3-5-2'
  | '4-1-4-1'
  | '4-2-3-1'
  | '4-1-2-3'
  | '5-3-2';

export interface FormationPosition {
  id: string; // 내부 고유 ID
  label: string; // ✅ 화면 표시용 (id와 동일)
  position: string; // ✅ API 전송용 (직접 채워주세요)
  x: number;
  y: number;
}

/**
 * 포메이션별 좌표 정의
 * position 값은 직접 채워주세요
 */
export const FORMATION_POSITIONS: Record<FormationType, FormationPosition[]> = {
  '4-3-3': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LB', label: 'LB', position: 'LB', x: 20, y: 70 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 38, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 62, y: 70 },
    { id: 'RB', label: 'RB', position: 'RB', x: 80, y: 70 },

    { id: 'LCM', label: 'LCM', position: 'CM', x: 30, y: 50 },
    { id: 'CM', label: 'CM', position: 'CM', x: 50, y: 40 },
    { id: 'RCM', label: 'RCM', position: 'CM', x: 70, y: 50 },

    { id: 'LW', label: 'LW', position: 'LW', x: 20, y: 25 },
    { id: 'ST', label: 'ST', position: 'ST', x: 50, y: 20 },
    { id: 'RW', label: 'RW', position: 'RW', x: 80, y: 25 },
  ],

  '4-4-2': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LB', label: 'LB', position: 'LB', x: 20, y: 70 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 38, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 62, y: 70 },
    { id: 'RB', label: 'RB', position: 'RB', x: 80, y: 70 },

    { id: 'LM', label: 'LM', position: 'LW', x: 20, y: 40 },
    { id: 'LCM', label: 'LCM', position: 'CM', x: 40, y: 50 },
    { id: 'RCM', label: 'RCM', position: 'CM', x: 60, y: 50 },
    { id: 'RM', label: 'RM', position: 'RW', x: 80, y: 40 },

    { id: 'LS', label: 'LS', position: 'ST', x: 40, y: 20 },
    { id: 'RS', label: 'RS', position: 'ST', x: 60, y: 20 },
  ],

  '3-5-2': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LCB', label: 'LCB', position: 'CB', x: 30, y: 70 },
    { id: 'CB', label: 'CB', position: 'CB', x: 50, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 70, y: 70 },

    { id: 'LM', label: 'LM', position: 'LW', x: 20, y: 40 },
    { id: 'LDM', label: 'LDM', position: 'DM', x: 40, y: 55 },
    { id: 'CAM', label: 'CAM', position: 'AM', x: 50, y: 35 },
    { id: 'RDM', label: 'RDM', position: 'DM', x: 60, y: 55 },
    { id: 'RM', label: 'RM', position: 'RW', x: 80, y: 40 },

    { id: 'LS', label: 'LS', position: 'ST', x: 40, y: 20 },
    { id: 'RS', label: 'RS', position: 'ST', x: 60, y: 20 },
  ],

  '4-1-4-1': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LB', label: 'LB', position: 'LB', x: 20, y: 70 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 38, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 62, y: 70 },
    { id: 'RB', label: 'RB', position: 'RB', x: 80, y: 70 },

    { id: 'CDM', label: 'CDM', position: 'DM', x: 50, y: 55 },

    { id: 'LM', label: 'LM', position: 'LW', x: 20, y: 37 },
    { id: 'LAM', label: 'LAM', position: 'AM', x: 40, y: 37 },
    { id: 'RAM', label: 'RAM', position: 'AM', x: 60, y: 37 },
    { id: 'RM', label: 'RM', position: 'RW', x: 80, y: 37 },

    { id: 'ST', label: 'ST', position: 'ST', x: 50, y: 20 },
  ],

  '4-2-3-1': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LB', label: 'LB', position: 'LB', x: 20, y: 70 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 38, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 62, y: 70 },
    { id: 'RB', label: 'RB', position: 'RB', x: 80, y: 70 },

    { id: 'LDM', label: 'LDM', position: 'DM', x: 40, y: 55 },
    { id: 'RDM', label: 'RDM', position: 'DM', x: 60, y: 55 },

    { id: 'LM', label: 'LM', position: 'LW', x: 20, y: 35 },
    { id: 'CAM', label: 'CAM', position: 'AM', x: 50, y: 35 },
    { id: 'RM', label: 'RM', position: 'RW', x: 80, y: 35 },

    { id: 'ST', label: 'ST', position: 'ST', x: 50, y: 20 },
  ],

  '4-1-2-3': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LB', label: 'LB', position: 'LB', x: 20, y: 70 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 38, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 62, y: 70 },
    { id: 'RB', label: 'RB', position: 'RB', x: 80, y: 70 },

    { id: 'CDM', label: 'CDM', position: 'DM', x: 50, y: 55 },
    { id: 'LAM', label: 'LAM', position: 'AM', x: 35, y: 40 },
    { id: 'RAM', label: 'RAM', position: 'AM', x: 65, y: 40 },

    { id: 'LW', label: 'LW', position: 'LW', x: 20, y: 25 },
    { id: 'ST', label: 'ST', position: 'ST', x: 50, y: 20 },
    { id: 'RW', label: 'RW', position: 'RW', x: 80, y: 25 },
  ],

  '5-3-2': [
    { id: 'GK', label: 'GK', position: 'GK', x: 50, y: 85 },

    { id: 'LWB', label: 'LWB', position: 'LB', x: 15, y: 60 },
    { id: 'LCB', label: 'LCB', position: 'CB', x: 33, y: 70 },
    { id: 'CB', label: 'CB', position: 'CB', x: 50, y: 70 },
    { id: 'RCB', label: 'RCB', position: 'CB', x: 67, y: 70 },
    { id: 'RWB', label: 'RWB', position: 'RB', x: 85, y: 60 },

    { id: 'LCM', label: 'LCM', position: 'CM', x: 30, y: 45 },
    { id: 'CM', label: 'CM', position: 'CM', x: 50, y: 50 },
    { id: 'RCM', label: 'RCM', position: 'CM', x: 70, y: 45 },

    { id: 'LS', label: 'LS', position: 'ST', x: 40, y: 20 },
    { id: 'RS', label: 'RS', position: 'ST', x: 60, y: 20 },
  ],
};
