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
  selectedDateText: {
    marginTop: 8,
    fontSize: 15,
    color: colors.gray[700],
  },
  emptyText: {
    marginTop: 20,
    fontSize: 15,
    color: colors.gray[500],
    textAlign: 'center',
  },
  // ✅ DateFilter 버튼 스타일
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
  // ✅ 카드 스타일
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.gray[800],
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.blue[500],
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  timeFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  resetButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.gray[300],
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: colors.gray[800],
    fontSize: 13,
    fontWeight: '500',
  },
});
