import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

type LoadingOverlayProps = {
  visible: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
