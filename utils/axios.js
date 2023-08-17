import axios from 'axios';

const FIREBASE_BASE_URL = "https://expense-tracker-eaae7-default-rtdb.firebaseio.com/";
const API_KEY = "AIzaSyAuuxSGbBOkuF5PhArjpgLiX9FPYINsD5M";
const FIREBASE_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const FIREBASE_SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export async function saveExpense(expenseData) {
  const respones = await axios.post(`${FIREBASE_BASE_URL}/expenses.json`, expenseData);
  const id = respones.data.name; //name is id incase of firebase
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${FIREBASE_BASE_URL}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(FIREBASE_BASE_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(FIREBASE_BASE_URL + `/expenses/${id}.json`);
}

export async function createUser(email, password) {
  const response = await axios.post(FIREBASE_SIGNUP_URL, {
    email,
    password,
    returnSecureToken: true
  })
  return response.data;
}

export async function logInUser(email, password) {
  const response = await axios.post(FIREBASE_SIGNIN_URL, {
    email,
    password,
    returnSecureToken: true
  });
  return response.data;
}