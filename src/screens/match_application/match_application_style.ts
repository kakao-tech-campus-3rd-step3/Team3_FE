// src/screens/match_application/match_application_style.ts
import { StyleSheet } from 'react-native';

import { colors } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    padding: 16,
  },
  filterContainer: {
    marginBottom: 20,
    width: '100%',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: colors.blue[500],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 15,
    color: colors.gray[700],
  },
});
