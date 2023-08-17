import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';

export const Input = ({ lable, style, textInputProps }) => {
  const inputStyles = [styles.input];
  if (textInputProps && textInputProps.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{lable}</Text>
      <TextInput style={inputStyles} {...textInputProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
});