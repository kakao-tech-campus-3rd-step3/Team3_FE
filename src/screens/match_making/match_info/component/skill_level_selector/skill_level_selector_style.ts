import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  selectedText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#374151',
  },
  sliderContainer: {
    alignSelf: 'center',
  },
  selectedTrack: {
    backgroundColor: '#2563eb',
  },
  unselectedTrack: {
    backgroundColor: '#d1d5db',
  },
  marker: {
    backgroundColor: '#2563eb',
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  levelLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  levelLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
});
