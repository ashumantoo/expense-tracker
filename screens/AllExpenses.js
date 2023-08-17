import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context'

export const AllExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensePeriod={'Total'}
      fallbackText={"No expense found!"}
    />
  )
}

const styles = StyleSheet.create({})