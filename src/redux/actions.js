import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_ADDITIONAL = 'GET_ADDITIONAL';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const DATA_LOADED = 'DATA_LOADED';
export const CHANGE_PAGE = 'CHANGE_PAGE';

const axiosInstance = axios.create({
  baseURL: 'https://jlrc.dev.perx.ru/carstock/api/v1',
  headers: {
    'X-CS-Dealer-Id-Only': 1,
  }
});

export const loading = () => {
  return { type: LOADING }
};

export const throwError = () => {
  return { type: ERROR }
};

export const dataLoaded = () => {
  return { type: DATA_LOADED }
};

export const changePage = (payload) => {
  return { type: CHANGE_PAGE, payload}
};

export const getData = (payload) => {
  return { type: GET_DATA, payload }
};

export const getAdditional = (payload) => {
  return { type: GET_ADDITIONAL, payload }
};

export const fetchData = () => {
  return async (dispatch, getState) => {
    dispatch(loading());
    try {
      const page = getState().currentPage;
      const additional = getState().additional;
      const responseVehicles = await axiosInstance.get(
        `/vehicles/?state=active&hidden=false&group=new&per_page=10&page=${page}`
      );

      const payloadVehicles = {
        data: responseVehicles.data,
        total: responseVehicles.headers['x-total-count']
      };
      dispatch(getData(payloadVehicles))

      let ids = await responseVehicles.data.map(item => item.dealer);

      if (additional.length) {
        ids = ids.filter(item => {
          const dealer = additional.find(dealer => dealer.id === item);

          if (dealer && item === dealer.id) {
            return false;
          }
          return item !== null;
        })
      }

      if (ids.length) {

        const stringIDs = ids.join(',').replace(/^,*/, '').replace(/,*$/, '');
        const responseDealers = await axiosInstance.get(`/dealers/?id__in=${stringIDs}`);

        dispatch(getAdditional(responseDealers.data))
      } else {
        dispatch(getAdditional([]))
      }
    } catch(e) {
      dispatch(throwError());
    } finally {
      dispatch(dataLoaded());
    }
  }
}
