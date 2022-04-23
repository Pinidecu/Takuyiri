import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../Reducer/Reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunk))
  );

//export default store;