import {
  GET_ADDITIONAL,
  GET_DATA,
  LOADING,
  ERROR,
  DATA_LOADED,
  CHANGE_PAGE
} from "./actions";

const initialState = {
  counter: 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
  data: [],
  total: 0,
  additional: []
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload}
    case LOADING:
      return { ...state, isLoading: true }
    case ERROR:
      return { ...state, isLoading: false, isError: true }
    case DATA_LOADED:
      return { ...state, isLoading: false }
    case GET_DATA:
      return { ...state, isError: false, data: action.payload.data, total: action.payload.total }
    case GET_ADDITIONAL:
      return {
        ...state,
        additional: [...state.additional, ...action.payload],
        data: state.data.map(item => {
          const dealer = state.additional.find(dealer => dealer.id === item.dealer)
            || action.payload.find(dealer => dealer.id === item.dealer)
            || {title: 'Ошибка - Нет наименования дилера', address: 'Ошибка - Нет адреса дилера'}
          return {
            ...item,
            isError: false,
            dealer_title: dealer.title || dealer.name,
            dealer_address: dealer.address || dealer.offices[0].address
          }
        })
      }
    default:
      return state
  }
}

export default reducer;
