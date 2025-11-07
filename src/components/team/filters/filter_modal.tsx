import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';

import { styles } from '@/src/components/team/filters/filter_modal_styles';
import MemberCountSlider from '@/src/components/team/filters/member_count_slider';
import {
  SkillLevel,
  TeamType,
  SKILL_LEVELS,
  TEAM_TYPES,
} from '@/src/types/team';

interface FilterOptions {
  skillLevel: SkillLevel[];
  teamType: TeamType[];
  maxMemberCount: number;
}

interface FilterModalProps {
  visible: boolean;
  filterOptions: FilterOptions;
  slideAnim: Animated.Value;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  onToggleSkillLevel: (level: SkillLevel) => void;
  onToggleTeamType: (type: TeamType) => void;
  onMemberCountChange: (value: number) => void;
}

export default function FilterModal({
  visible,
  filterOptions,
  slideAnim,
  onClose,
  onApply,
  onReset,
  onToggleSkillLevel,
  onToggleTeamType,
  onMemberCountChange,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.filterModal,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.filterHeader}>
            <View style={styles.dragHandle} />
            <Text style={styles.filterTitle}>필터</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>실력 수준</Text>
              <View style={styles.filterOptions}>
                {SKILL_LEVELS.map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.filterOption,
                      filterOptions.skillLevel.includes(level) &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => onToggleSkillLevel(level)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filterOptions.skillLevel.includes(level) &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>팀 유형</Text>
              <View style={styles.filterOptions}>
                {TEAM_TYPES.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterOption,
                      filterOptions.teamType.includes(type) &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => onToggleTeamType(type)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filterOptions.teamType.includes(type) &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>멤버 수</Text>
              <View style={styles.sliderSection}>
                <MemberCountSlider
                  value={filterOptions.maxMemberCount}
                  onValueChange={onMemberCountChange}
                />
              </View>
            </View>
          </View>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Text style={styles.resetButtonText}>초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                onApply();
                onClose();
              }}
            >
              <Text style={styles.applyButtonText}>적용</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
