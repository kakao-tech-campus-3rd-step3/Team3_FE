import type { AllowedPosition, CreateLineupRequest } from '@/src/types/lineup';

export const buildPositionMap = (
  formationPreset: { id: string; position: string }[]
) => {
  return Object.fromEntries(formationPreset.map(p => [p.id, p.position]));
};

export const createLineupPayload = (
  formationAssignments: Record<string, number | null>, // 슬롯ID -> teamMemberId
  benchPlayers: { id: number; preferredPosition?: AllowedPosition }[],
  positionMap: Record<string, string> // 슬롯ID -> 서버 허용 포지션
): CreateLineupRequest => {
  const starters = Object.entries(formationAssignments)
    .filter(([, memberId]) => memberId !== null)
    .map(([slotId, memberId]) => ({
      teamMemberId: Number(memberId),
      position: positionMap[slotId] as AllowedPosition,
      isStarter: true,
    }));

  const substitutes = benchPlayers.map(b => ({
    teamMemberId: b.id,
    position:
      (b.preferredPosition as AllowedPosition) ?? ('FW' as AllowedPosition),
    isStarter: false,
  }));

  return [...starters, ...substitutes];
};
