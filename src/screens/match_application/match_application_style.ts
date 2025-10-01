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
  cardContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  cardLocation: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111',
  },

  cardTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },

  requestButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },

  requestButtonDisabled: {
    backgroundColor: '#ccc',
  },

  requestButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  timeFilterRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  resetButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },

  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[700],
  },
});
