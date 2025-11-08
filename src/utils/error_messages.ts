export const ERROR_MESSAGES = {
  TEAM_NOT_FOUND: '팀을 찾을 수 없습니다.',
  TEAM_MEMBER_NOT_FOUND: '팀원을 찾을 수 없습니다.',
  USER_INFO_NOT_FOUND: '현재 사용자 정보를 찾을 수 없습니다.',
  PERMISSION_DENIED: '이 작업을 수행할 권한이 없습니다.',
  ROLE_CHANGE_PERMISSION_DENIED: '역할 변경 권한이 없습니다.',
  ROLE_CHANGE_PERMISSION_DENIED_DETAIL:
    '역할 변경 권한이 없습니다. 회장과 부회장만 변경할 수 있습니다.',
  MEMBER_REMOVE_PERMISSION_DENIED:
    '팀원 강퇴 권한이 없습니다. 회장과 부회장만 강퇴할 수 있습니다.',
  LEADERSHIP_DELEGATE_PERMISSION_DENIED:
    '리더십 위임 권한이 없습니다. 회장만 위임할 수 있습니다.',
  ITEM_NOT_FOUND: '요청한 항목을 찾을 수 없습니다.',
  INVALID_ROLE: '유효하지 않은 역할입니다.',
  DEFAULT_ERROR: '오류가 발생했습니다. 다시 시도해주세요.',
} as const;

export const getErrorMessageByStatus = (
  status: number,
  message?: string
): string | null => {
  if (status === 403) {
    return message || ERROR_MESSAGES.PERMISSION_DENIED;
  }
  if (status === 404) {
    if (message?.includes('TEAM_NOT_FOUND')) {
      return ERROR_MESSAGES.TEAM_NOT_FOUND;
    }
    if (message?.includes('TEAM_MEMBER_NOT_FOUND')) {
      return ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND;
    }
    return ERROR_MESSAGES.ITEM_NOT_FOUND;
  }
  if (status === 400) {
    if (message?.includes('역할') || message?.includes('role')) {
      return ERROR_MESSAGES.INVALID_ROLE;
    }
  }
  return null;
};

export const translateErrorMessage = (
  errorMessage: string,
  context?: { endpoint?: string; method?: string }
): string => {
  const message = errorMessage.trim();

  if (message === 'INVALID_ARGUMENT' || message.includes('INVALID_ARGUMENT')) {
    if (
      context?.endpoint?.includes('mercenaries/recruitments') ||
      context?.method === 'PUT' ||
      context?.method === 'POST'
    ) {
      return '경기 날짜와 시간이 올바른지 확인해주세요.';
    }
    return '유효하지 않은 입력값입니다.';
  }

  if (
    message.includes('경기 시간은 현재 시간 이후여야 합니다') ||
    message.includes('경기 날짜가 과거') ||
    message.includes('경기 시간이 과거') ||
    message.includes('시간은 현재 시간 이후여야')
  ) {
    return '경기 날짜와 시간이 올바른지 확인해주세요.';
  }

  if (
    message.includes('경기 날짜는 필수입니다') ||
    message.includes('경기 시간은 필수입니다')
  ) {
    return '경기 날짜와 시간을 선택해주세요.';
  }

  if (message.includes('모집 메세지는 100자를 초과할 수 없습니다')) {
    return '모집 메시지는 100자를 초과할 수 없습니다.';
  }

  if (message.includes('Unknown') && message.includes('position')) {
    return '유효하지 않은 포지션입니다.';
  }

  if (message.includes('Unknown') && message.includes('Recruitment status')) {
    return '유효하지 않은 모집 상태입니다.';
  }

  if (message.includes('Unknown') && message.includes('SkillLevel')) {
    return '유효하지 않은 실력 레벨입니다.';
  }

  if (message.includes('팀 정보는 필수입니다')) {
    return '팀 정보가 필요합니다.';
  }

  if (message.includes('포지션 정보는 필수입니다')) {
    return '포지션을 선택해주세요.';
  }

  if (message.includes('요구 실력 정보는 필수입니다')) {
    return '실력 레벨을 선택해주세요.';
  }

  if (message.includes('NoPermissionException') || message.includes('권한')) {
    return ERROR_MESSAGES.PERMISSION_DENIED;
  }

  if (message.includes('CAPTAIN_ONLY_OPERATION')) {
    return '팀장만 수행할 수 있는 작업입니다.';
  }

  if (message.includes('NOT_FOUND') || message.includes('찾을 수 없')) {
    if (message.includes('TEAM')) {
      return ERROR_MESSAGES.TEAM_NOT_FOUND;
    }
    if (message.includes('TEAM_MEMBER')) {
      return ERROR_MESSAGES.TEAM_MEMBER_NOT_FOUND;
    }
    if (message.includes('RECRUITMENT')) {
      return '용병 모집 게시글을 찾을 수 없습니다.';
    }
    return ERROR_MESSAGES.ITEM_NOT_FOUND;
  }

  if (
    message.includes('FAIL_LOGIN') ||
    message.includes('로그인 실패') ||
    (context?.endpoint?.includes('/api/auth/login') &&
      (message.includes('UNAUTHORIZED') ||
        message.includes('인증') ||
        message.includes('credentials')))
  ) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }

  if (/[가-힣]/.test(message)) {
    return message;
  }

  const errorCodeMap: { [key: string]: string } = {
    INVALID_ARGUMENT: '유효하지 않은 입력값입니다.',
    UNAUTHORIZED: '인증이 필요합니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    NOT_FOUND: ERROR_MESSAGES.ITEM_NOT_FOUND,
    INTERNAL_SERVER_ERROR: '서버 오류가 발생했습니다.',
    BAD_REQUEST: '잘못된 요청입니다.',
  };

  const upperMessage = message.toUpperCase();
  for (const [code, koreanMessage] of Object.entries(errorCodeMap)) {
    if (upperMessage.includes(code)) {
      return koreanMessage;
    }
  }

  return ERROR_MESSAGES.DEFAULT_ERROR;
};
