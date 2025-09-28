export const EXTERNAL_LINKS = {
  PRIVACY_POLICY:
    'https://clammy-broccoli-598.notion.site/276231257d878012b090ed7fc023b1af?source=copy_link',
  TERMS_OF_SERVICE:
    'https://clammy-broccoli-598.notion.site/276231257d8780a0a25aee9dd1da8f7f?source=copy_link',
} as const;

export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;
