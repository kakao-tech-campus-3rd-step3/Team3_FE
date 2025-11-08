import type { AllowedPosition, CreateLineupRequest } from '@/src/types/lineup';

export const buildPositionMap = (
  formationPreset: { id: string; position: string }[]
) => {
  return Object.fromEntries(formationPreset.map(p => [p.id, p.position]));
};

export const createLineupPayload = (
  formationAssignments: Record<string, number | null>,
  benchPlayers: { id: number; preferredPosition?: AllowedPosition }[],
  positionMap: Record<string, string>
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
