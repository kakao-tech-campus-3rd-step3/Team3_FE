export type AllowedPosition =
  | 'GK'
  | 'DF'
  | 'MF'
  | 'FW'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'DM'
  | 'CM'
  | 'AM'
  | 'ST'
  | 'LW'
  | 'RW';

export interface CreateLineupItem {
  teamMemberId: number;
  position: AllowedPosition;
  isStarter: boolean;
}

export type CreateLineupRequest = CreateLineupItem[];

export interface ApiCreatedLineupItem {
  id: number;
  lineupId: number;
  teamMemberId: number;
  position: AllowedPosition;
  isStarter: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ApiCreateLineupResponse = ApiCreatedLineupItem[];

export interface CreatedLineupItem {
  id: number;
  lineupId: number;
  teamMemberId: number;
  position: AllowedPosition;
  isStarter: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateLineupResponse = CreatedLineupItem[];
