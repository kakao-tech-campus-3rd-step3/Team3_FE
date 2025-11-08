export class FormatError extends SyntaxError {
  constructor(message: string) {
    super(message);
    this.name = 'FormatError';
  }
}

export class TeamMemberError extends Error {
  constructor(message: string = '팀 멤버 정보를 찾을 수 없습니다.') {
    super(message);
    this.name = 'TeamMemberError';
  }
}
