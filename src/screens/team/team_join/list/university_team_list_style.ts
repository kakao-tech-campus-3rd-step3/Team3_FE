import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  headerSection: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.line6,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
  },
  teamList: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing10,
  },
  teamCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  teamName: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    flex: 1,
  },
  teamTypeBadge: {
    backgroundColor: theme.colors.blue[50],
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  teamTypeText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  teamDescription: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line6,
    marginBottom: theme.spacing.spacing4,
  },
  teamInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing4,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.spacing1,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
  joinButton: {
    backgroundColor: theme.colors.blue[500],
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing3,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
  filterButton: {
    backgroundColor: theme.colors.blue[500],
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
  },
  filterButtonText: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  filterModal: {
    backgroundColor: theme.colors.background.main,
    borderTopLeftRadius: theme.spacing.spacing4,
    borderTopRightRadius: theme.spacing.spacing4,
    maxHeight: '67%',
    minHeight: '50%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  filterTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
  },
  closeButton: {
    fontSize: theme.typography.fontSize.font5,
    color: theme.colors.text.sub,
    padding: theme.spacing.spacing1,
  },
  filterContent: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
  },
  filterSection: {
    marginBottom: theme.spacing.spacing6,
  },
  filterSectionTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing2,
  },
  filterOption: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.background.sub,
  },
  filterOptionSelected: {
    backgroundColor: theme.colors.blue[500],
    borderColor: theme.colors.blue[500],
  },
  filterOptionText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
  },
  filterOptionTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.medium,
  },
  sliderSection: {
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
  },
  memberCountSlider: {
    width: '100%',
    marginBottom: theme.spacing.spacing3,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing1,
    position: 'relative',
    marginBottom: theme.spacing.spacing3,
  },
  sliderTrackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing1,
  },
  sliderActiveTrack: {
    position: 'absolute',
    top: 0,
    height: 4,
    backgroundColor: theme.colors.blue[500],
    borderRadius: theme.spacing.spacing1,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    paddingHorizontal: theme.spacing.spacing1,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing1,
  },
  sliderLabelActive: {
    backgroundColor: theme.colors.blue[50],
  },
  sliderLabelText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
  sliderLabelTextActive: {
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  rangeText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    textAlign: 'center',
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing6,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    gap: theme.spacing.spacing3,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.background.sub,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  resetButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.main,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.blue[500],
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
});
