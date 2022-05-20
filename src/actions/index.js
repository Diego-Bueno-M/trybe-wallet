export const ADD_EMAIL = 'ADD_EMAIL';
export const FECTH_COINS = 'FETCH_COINS';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addEmail = (email) => ({ type: ADD_EMAIL, payload: email });

export const fetchCoins = (data) => ({ type: FECTH_COINS, payload: data });

export const fetchCoinsThunk = () => async (dispatch) => {
  const apiData = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await apiData.json();
  // transformo os dados em array e filtro o código
  const filterData = Object.keys(data)
    .filter((coinCode) => coinCode !== 'USDT');
  dispatch(fetchCoins(filterData));
};

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const addExpenseThunk = (state) => async (dispatch) => {
  const apiData = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await apiData.json();
  const dataToAction = { ...state, exchangeRates: { ...data } };
  dispatch(addExpense(dataToAction));
};
