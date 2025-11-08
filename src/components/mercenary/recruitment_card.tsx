import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { convertPositionToKorean } from '@/src/constants/positions';
import { theme } from '@/src/theme';
import { RecruitmentResponse } from '@/src/types/mercenary';

interface RecruitmentCardProps {
  recruitment: RecruitmentResponse;
  onPress?: () => void;
  onApply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showApplyButton?: boolean;
  isApplyButtonDisabled?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

export function RecruitmentCard({
  recruitment,
  onPress,
  onApply,
  onEdit,
  onDelete,
  showApplyButton = true,
  isApplyButtonDisabled = false,
  showEditButton = false,
  showDeleteButton = false,
}: RecruitmentCardProps) {
  const screenWidth = Dimensions.get('window').width;

  const buttonStyles = useMemo(() => {
    if (screenWidth < 360) {
      return {
        paddingHorizontal: theme.spacing.spacing2,
        paddingVertical: theme.spacing.spacing1,
        fontSize: 12,
        iconSize: 14,
      };
    } else if (screenWidth < 400) {
      return {
        paddingHorizontal: theme.spacing.spacing2,
        paddingVertical: theme.spacing.spacing2,
        fontSize: 13,
        iconSize: 15,
      };
    }
    return {
      paddingHorizontal: theme.spacing.spacing3,
      paddingVertical: theme.spacing.spacing2,
      fontSize: 14,
      iconSize: 16,
    };
  }, [screenWidth]);

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getSkillLevelBadgeStyle = (skillLevel: string) => {
    switch (skillLevel) {
      case 'PRO':
        return {
          backgroundColor: '#F4E4BC',
          textColor: theme.colors.text.main,
        };
      case 'SEMI_PRO':
        return {
          backgroundColor: '#E8E8E8',
          textColor: theme.colors.text.main,
        };
      case 'AMATEUR':
        return {
          backgroundColor: '#E6D2B8',
          textColor: theme.colors.text.main,
        };
      default:
        return {
          backgroundColor: '#E6D2B8',
          textColor: theme.colors.text.main,
        };
    }
  };

  const skillLevelStyle = getSkillLevelBadgeStyle(recruitment.skillLevel);

  return (
    <TouchableOpacity
      style={styles.recruitmentCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View style={styles.recruitmentHeader}>
          <View style={styles.positionSection}>
            <Text style={styles.positionLabel}>선호 포지션</Text>
            <Text style={styles.recruitmentTitle}>
              {convertPositionToKorean(recruitment.position)}
            </Text>
          </View>
          <View style={styles.recruitmentHeaderBadges}>
            <View
              style={[
                styles.recruitmentSkillBadge,
                {
                  backgroundColor: skillLevelStyle.backgroundColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.recruitmentSkillText,
                  { color: skillLevelStyle.textColor },
                ]}
              >
                {recruitment.skillLevel}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {recruitment.recruitmentStatus}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recruitmentInfo}>
          <View style={styles.teamInfoSection}>
            <View style={styles.teamInfoRow}>
              <Ionicons
                name="people-outline"
                size={14}
                color={theme.colors.text.sub}
              />
              <Text style={styles.teamNameText}>{recruitment.teamName}</Text>
            </View>
            <View style={styles.teamInfoRow}>
              <Ionicons
                name="school-outline"
                size={14}
                color={theme.colors.text.sub}
              />
              <Text style={styles.universityNameText}>
                {recruitment.universityName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recruitmentFooter}>
          <View style={[styles.teamInfoRow, { flex: 1, flexShrink: 1 }]}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={theme.colors.text.sub}
            />
            <Text
              style={styles.matchDateTime}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              {recruitment.matchDate} {formatTime(recruitment.matchTime)}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            {showEditButton && onEdit && (
              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    paddingHorizontal: buttonStyles.paddingHorizontal,
                    paddingVertical: buttonStyles.paddingVertical,
                  },
                ]}
                onPress={e => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Ionicons
                  name="create-outline"
                  size={buttonStyles.iconSize}
                  color="white"
                />
                <Text
                  style={[
                    styles.editButtonText,
                    { fontSize: buttonStyles.fontSize },
                  ]}
                >
                  수정
                </Text>
              </TouchableOpacity>
            )}
            {showDeleteButton && onDelete && (
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  {
                    paddingHorizontal: buttonStyles.paddingHorizontal,
                    paddingVertical: buttonStyles.paddingVertical,
                  },
                ]}
                onPress={e => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={buttonStyles.iconSize}
                  color="white"
                />
                <Text
                  style={[
                    styles.deleteButtonText,
                    { fontSize: buttonStyles.fontSize },
                  ]}
                >
                  삭제
                </Text>
              </TouchableOpacity>
            )}
            {showApplyButton && onApply && (
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  isApplyButtonDisabled && styles.applyButtonDisabled,
                ]}
                onPress={e => {
                  e.stopPropagation();
                  if (!isApplyButtonDisabled) {
                    onApply();
                  }
                }}
                disabled={isApplyButtonDisabled}
              >
                <Text
                  style={[
                    styles.applyButtonText,
                    isApplyButtonDisabled && styles.applyButtonTextDisabled,
                  ]}
                >
                  {isApplyButtonDisabled ? '신청됨' : '신청하기'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recruitmentCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  recruitmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  positionSection: {
    flex: 1,
  },
  positionLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
    fontWeight: '500',
  },
  recruitmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  recruitmentHeaderBadges: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  recruitmentSkillBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  recruitmentSkillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  recruitmentInfo: {
    marginBottom: theme.spacing.spacing2,
  },
  teamInfoSection: {
    marginBottom: theme.spacing.spacing3,
    gap: theme.spacing.spacing1,
  },
  teamInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
  },
  teamNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  universityNameText: {
    fontSize: 13,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  recruitmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    gap: theme.spacing.spacing2,
  },
  matchDateTime: {
    fontSize: 13,
    color: theme.colors.text.main,
    fontWeight: '500',
    marginLeft: theme.spacing.spacing1,
  },
  applyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  applyButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
    opacity: 0.6,
  },
  applyButtonTextDisabled: {
    color: theme.colors.text.sub,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    alignItems: 'center',
    flexShrink: 1,
  },
  editButton: {
    backgroundColor: theme.colors.brand.main,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
    flexShrink: 1,
  },
  editButtonText: {
    fontWeight: '600',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
    flexShrink: 1,
  },
  deleteButtonText: {
    fontWeight: '600',
    color: 'white',
  },
});
