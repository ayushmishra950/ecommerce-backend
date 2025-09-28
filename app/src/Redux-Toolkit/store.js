import counter from './mySlice';
import  {configureStore} from '@reduxjs/toolkit';


 export const store = configureStore({
    reducer : {
        all : counter,
    }
 })