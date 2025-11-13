import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalHeaderLeft: {
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    flex: 1,
    textAlign: 'center',
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.sub,
  },
  list: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing4,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: theme.colors.background.sub,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemActive: {
    backgroundColor: theme.colors.brand.main + '15',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '30',
    shadowColor: theme.colors.brand.main,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.main,
  },
  itemTextActive: {
    color: theme.colors.brand.main,
    fontWeight: '700',
  },
});
