import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import { getFormatedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

export const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation()
  const onItemPressHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: id
    });
  }
  return (
    <Pressable onPress={onItemPressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold"
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  }
})