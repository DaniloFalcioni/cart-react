import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import {
   AUMENTA_QTY,
   COSTO_TOTALE,
   DATA_FETCHING_FAILED,
   DATA_FETCHING_STARTED,
   DATA_FETCHING_SUCCESS,
   DELETE_ITEM,
   DIMINUISCI_QTY,
   SVUOTA_CARRELLO,
   CONTATORE,
} from "./actions";
import axios from "axios";
const url = "https://react--course-api.herokuapp.com/api/v1/data/cart";

const AppContext = createContext();

const initialState = {
   products: [],
   isLoading: true,
   isError: false,
   total: 0,
   itemCounter: 0,
};

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const deleteItem = (_id) => {
      dispatch({ type: DELETE_ITEM, payload: _id });
   };

   const deleteAll = () => {
      dispatch({ type: SVUOTA_CARRELLO });
   };

   const addQty = (_id) => {
      dispatch({ type: AUMENTA_QTY, payload: _id });
   };

   const dimQty = (_id) => {
      dispatch({ type: DIMINUISCI_QTY, payload: _id });
   };

   useEffect(() => {
      (async () => {
         dispatch({ type: DATA_FETCHING_STARTED });
         try {
            const response = await axios.get(url);
            dispatch({
               type: DATA_FETCHING_SUCCESS,
               payload: response.data.data,
            });
         } catch (error) {
            dispatch({ type: DATA_FETCHING_FAILED });
         }
      })();
   }, []);

   useEffect(() => {
      dispatch({ type: COSTO_TOTALE });
      dispatch({ type: CONTATORE });
   }, [state.products]);

   return (
      <AppContext.Provider
         value={{ ...state, deleteAll, deleteItem, addQty, dimQty }}
      >
         {children}
      </AppContext.Provider>
   );
};

const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
