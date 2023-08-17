import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { GlobalStyles } from '../constants/styles'
import { AuthContext } from '../store/auth-context'

export const Profile = () => {
  const authCtx = useContext(AuthContext);

  function onPressHandler() {
    authCtx.logout();
  }
  
  return (
    <View style={styles.profileContainer}>
      <Pressable style={styles.buttonContainer} onPress={onPressHandler}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  logoutButtonText: {
    color: "white"
  }
})