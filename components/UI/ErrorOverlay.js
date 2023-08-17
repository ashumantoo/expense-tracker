import { View, StyleSheet, Text, Pressable } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Pressable onPress={onConfirm} style={styles.confirmButton}>
        <Text style={styles.text}>Done</Text>
      </Pressable>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: GlobalStyles.colors.accent500,
    paddingHorizontal: 8,
    paddingTop: 4,
    borderRadius: 4
  }
});