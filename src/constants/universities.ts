export const UNIVERSITIES = [
  '강원대학교',
  '강원관광대학교',
  '강원도립대학교',
  '강릉원주대학교',
  '상지대학교',
  '춘천교육대학교',
  '연세대학교 원주캠퍼스',
  '한림대학교',
] as const;

export type University = (typeof UNIVERSITIES)[number];
