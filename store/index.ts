import {createStore, AnyAction, Store, applyMiddleware} from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper"
import { User } from '../type';
import { getValue, getValueAsObject, setValue } from '../utils/session';
import { isBrowser } from '../utils/util';
const ADMIN_NEXT_STORE = '__ADMIN_NEXT_STORE__'

export interface State {
  token: string;
  user: User | null;
  breadcrumb: { title:string, path: string }[];
}

let initState: State = {
  token: '',
  user: null,
  breadcrumb: []
}
// if (isBrowser()) {
//   const storeValue = getValueAsObject(ADMIN_NEXT_STORE)
//   initState = Object.keys(storeValue).length <= 0 ?  initState : storeValue
// }

// create your reducer
const reducer = (state = initState, action: AnyAction) => {
  let newState = initState
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      newState = {...state, ...action.payload}
      break;
    case 'SET_TOKEN':
      newState = {...state, token: action.payload}
      break;
    case 'SET_USER':
        newState = {...state, user: action.payload}
        break;
    case 'SET_BREADCRUMB':
      newState = {...state, breadcrumb: action.payload}
      break;
    case 'RESET':
      newState = {...initState}
      break;
    default:
      newState = state;
      break;
  }
  // 持久化
  // if (isBrowser()) {
  //   setValue(ADMIN_NEXT_STORE, newState)
  // }
  return newState
};

// - const makeStore = (context: Context) => createStore(reducer);
// 使用nextReduxCookieMiddleware将store中的subtrees数据存到cookie上
export const store = createStore(
  reducer,
  applyMiddleware(
    nextReduxCookieMiddleware({
      subtrees: ["token", "user"],
    })
  )
)
const makeStore = wrapMakeStore(() =>store);

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});

export const userSelector = (state: State) => state.user
export const stateSelector = (state: State) => state
export const tokenSelector = (state: State) => state.token
export const breadcrumbSelector = (state: State) => state.breadcrumb