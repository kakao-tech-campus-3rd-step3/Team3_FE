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
  universityList: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing10,
  },
  universityCard: {
    flex: 1,
    margin: theme.spacing.spacing1,
    padding: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    minHeight: theme.spacing.spacing15,
    justifyContent: 'center',
  },
  universityCardSelected: {
    backgroundColor: theme.colors.blue[50],
    borderColor: theme.colors.blue[500],
  },
  universityLogo: {
    width: theme.spacing.spacing10,
    height: theme.spacing.spacing10,
    borderRadius: theme.spacing.spacing5,
    backgroundColor: theme.colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  universityLogoText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
  },
  universityName: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.medium,
  },
  universityNameSelected: {
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.semibold,
  },
  selectedIndicator: {
    position: 'absolute',
    top: theme.spacing.spacing1,
    right: theme.spacing.spacing1,
    width: theme.spacing.spacing4,
    height: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicatorText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.bold,
  },
  bottomButtonContainer: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing10,
  },
  connectButton: {
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonActive: {
    backgroundColor: theme.colors.blue[500],
  },
  connectButtonText: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.light,
  },
  connectButtonTextActive: {
    color: theme.colors.white,
  },
});
