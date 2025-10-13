import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    padding: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing2,
  },

  headerTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    flex: 1,
  },

  placeholder: {
    width: theme.spacing.spacing10,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
  },

  matchCard: {
    marginBottom: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
  },

  positionCard: {
    marginBottom: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
  },

  messageCard: {
    marginBottom: theme.spacing.spacing6,
    padding: theme.spacing.spacing4,
  },

  cardTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
  },

  matchInfo: {
    gap: theme.spacing.spacing2,
  },

  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  matchLabel: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    width: theme.spacing.spacing15,
  },

  matchValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.medium,
  },

  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing2,
  },

  positionButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing5,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  positionButtonSelected: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },

  positionText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
  },

  positionTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.medium,
  },

  messageInput: {
    padding: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  messagePlaceholder: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.light,
    fontStyle: 'italic',
  },

  applyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
    marginBottom: theme.spacing.spacing8,
  },

  applyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
