import { StyleSheet, Platform } from 'react-native';
import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing2,
  },
  title: {
    ...theme.typography.text.card.title,
    color: theme.colors.text.main,
  },
  moreButton: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
  },
  moreText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  card: {
    width: 150,
    marginRight: theme.spacing.spacing2,
    minHeight: 92,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    justifyContent: 'space-between',
    shadowColor: Platform.OS === 'ios' ? theme.colors.black : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.05 : 0,
    shadowRadius: Platform.OS === 'ios' ? theme.spacing.spacing2 : 0,
    elevation: 1,
  },
  location: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  time: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
    gap: theme.spacing.spacing2,
  },
  smallBadge: {
    paddingHorizontal: theme.spacing.spacing1,
    paddingVertical: 2,
    borderRadius: theme.spacing.spacing1,
  },
  smallBadgeText: {
    fontSize: theme.typography.fontSize.font1,
    fontWeight: theme.typography.fontWeight.medium,
  },
  playerCountSmall: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
  carouselContent: {
    paddingHorizontal: theme.spacing.spacing2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.sub,
    paddingTop:
      Platform.OS === 'ios' ? theme.spacing.spacing11 : theme.spacing.spacing5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  modalTitle: {
    ...theme.typography.text.card.title,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
  },
  modalClose: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  flatListContent: {
    padding: theme.spacing.spacing4,
  },
  fullItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing2,
  },
  fullItemLeft: {
    flex: 1,
    marginRight: theme.spacing.spacing3,
  },
  fullItemRight: {
    alignItems: 'flex-end',
  },
  separator: {
    height: theme.spacing.spacing3,
  },
});
