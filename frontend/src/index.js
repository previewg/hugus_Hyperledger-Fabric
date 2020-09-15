import React from 'react';
import ReactDOM from 'react-dom';
import {App, Home, Login, Register} from './containers';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers/index";
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
);