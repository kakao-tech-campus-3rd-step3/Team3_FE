import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },

  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  chipOn: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  chipText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextOn: {
    color: '#2563eb',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  rowOn: {
    backgroundColor: '#f0f9ff',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9ca3af',
    backgroundColor: '#ffffff',
  },
  checkboxOn: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  name: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  pick: {
    color: '#6b7280',
    fontSize: 12,
  },

  empty: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#6b7280',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  cta: {
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
  },
  ctaDisabled: {
    backgroundColor: '#d1d5db',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
