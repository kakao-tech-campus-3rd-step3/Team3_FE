import React from 'react';
import { Text } from 'react-native';
import { styles } from '../../team_guide_styles';

const Header = () => {
  return (
    <Text style={styles.headerText}>
      함께 뛰는 즐거움을 경험해보세요{'\n'}
      <Text style={styles.highlightedText}>축구팀의 새로운 시작</Text>
    </Text>
  );
};

export default Header;
