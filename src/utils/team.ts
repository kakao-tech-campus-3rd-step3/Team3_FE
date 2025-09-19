import type { TeamMemberRole } from '@/src/types/team';

export function getRoleDisplayName(role: TeamMemberRole): string {
  switch (role) {
    case 'LEADER':
      return '회장';
    case 'VICE_LEADER':
      return '부회장';
    case 'MEMBER':
      return '일반멤버';
    default:
      return '일반멤버';
  }
}
