import { Colors } from '@/constants/Colors';
import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, ModalProps } from 'react-native';

interface CustomAlertProps extends ModalProps {
  title: string;
  message: string;
  cancelText?: string;
  confirmtext?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onCancel, onConfirm, onClose, cancelText, confirmtext }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onCancel && <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>{cancelText ?? 'Cancel'}</Text>
            </TouchableOpacity>}
            {onConfirm && <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={[styles.buttonText, styles.confirmButtonText]}>{confirmtext ?? 'Confirm'}</Text>
            </TouchableOpacity>}
            {onClose && <TouchableOpacity onPress={onClose} style={[styles.button, styles.closeButton]}>
              <Text style={[styles.buttonText, styles.closeButtonText]}>close</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  cancelButton: {
    backgroundColor: Colors.alizarin.background,
  },
  cancelButtonText: {
    color: Colors.light.background,
  },
  confirmButton: {
    backgroundColor: Colors.green_darner_tail.background,
  },
  confirmButtonText: {
    color: Colors.light.background,
  },
  closeButtonText: {
    color: Colors.dark.background,
  },
  closeButton: {
    backgroundColor: Colors.light.background,
  },
});

export default CustomAlert;
