import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/axios';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Something went wrong while fetching the expenses")
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => {
      setError(null);
    }} />;
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod={'Last 7 Days'}
      fallbackText={"No expenses registred in last 7 days"}
    />
  )
}


const styles = StyleSheet.create({})