import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '@/src/theme';

import { styles } from './detail_modal_styles';

export interface DetailInfoItem {
  label: string;
  value: string | ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export interface DetailBadge {
  content: string | ReactNode;
  style?: object;
  textStyle?: object;
}

interface DetailModalProps {
  visible: boolean;
  title?: string;
  isLoading?: boolean;
  loadingText?: string;
  error?: Error | null;
  errorText?: string;
  headerTitle?: string | ReactNode;
  headerBadges?: DetailBadge[];
  infoItems?: DetailInfoItem[];
  messageLabel?: string;
  messageText?: string;
  onClose: () => void;
}

export default function DetailModal({
  visible,
  title = '상세 정보',
  isLoading = false,
  loadingText = '로딩 중...',
  error = null,
  errorText = '상세 정보를 불러올 수 없습니다.',
  headerTitle,
  headerBadges,
  infoItems = [],
  messageLabel,
  messageText,
  onClose,
}: DetailModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.detailModalOverlay}>
        <View style={styles.detailModalContainer}>
          <View style={styles.detailModalHeader}>
            <Text style={styles.detailModalTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.detailModalCloseButton}
            >
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.detailModalContent}
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              <View style={styles.detailLoadingContainer}>
                <Text style={styles.detailLoadingText}>{loadingText}</Text>
              </View>
            ) : error ? (
              <View style={styles.detailErrorContainer}>
                <Text style={styles.detailErrorText}>{errorText}</Text>
              </View>
            ) : (
              <View style={styles.detailInfoCard}>
                {(headerTitle || headerBadges) && (
                  <View style={styles.detailInfoHeader}>
                    {headerTitle && (
                      <Text style={styles.detailInfoTitle}>{headerTitle}</Text>
                    )}
                    {headerBadges && headerBadges.length > 0 && (
                      <View style={styles.detailHeaderBadges}>
                        {headerBadges.map((badge, index) => (
                          <View
                            key={index}
                            style={[styles.detailStatusBadge, badge.style]}
                          >
                            {typeof badge.content === 'string' ? (
                              <Text
                                style={[
                                  styles.detailStatusText,
                                  badge.textStyle,
                                ]}
                              >
                                {badge.content}
                              </Text>
                            ) : (
                              badge.content
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                {infoItems.length > 0 && (
                  <View style={styles.detailInfoList}>
                    {infoItems.map((item, index) => (
                      <View key={index} style={styles.detailInfoItem}>
                        {item.iconName && (
                          <Ionicons
                            name={item.iconName}
                            size={20}
                            color={theme.colors.text.sub}
                          />
                        )}
                        <Text style={styles.detailInfoLabel}>{item.label}</Text>
                        {typeof item.value === 'string' ? (
                          <Text style={styles.detailInfoValue}>
                            {item.value}
                          </Text>
                        ) : (
                          item.value
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {messageLabel && messageText && (
                  <View style={styles.detailMessageSection}>
                    <Text style={styles.detailMessageLabel}>
                      {messageLabel}
                    </Text>
                    <Text style={styles.detailMessageText}>{messageText}</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
