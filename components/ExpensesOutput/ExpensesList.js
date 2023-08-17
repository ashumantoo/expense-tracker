import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { ExpenseItem } from './ExpenseItem'

export const ExpensesList = ({ expenses }) => {

  function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />
  }

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({})