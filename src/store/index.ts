import { createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
const composedEnhancers: any =
    process.env.NODE_ENV !== "production"
        ? composeWithDevTools({})
        : compose();
export default createStore(rootReducer, {}, composedEnhancers());
