import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core';
import theme from "./theme/theme";
import {BrowserRouter as Router} from 'react-router-dom';
import {TreeRootRouter} from "./routes/TreeRouter/TreeRootRouter";
import Header from "./components/header/header";
import {searchReducer} from "../store/reducer";

export const ReduxContent = React.createContext();

function App() {
    if (!localStorage.getItem("role")) {
        localStorage.setItem("role", "developer");
    }
    const [store, dispatch] = useReducer(searchReducer, {result: []});

    return <Router>
        <ReduxContent.Provider value={ [store, dispatch] }>
            <Header/>
            <TreeRootRouter>
            </TreeRootRouter>
        </ReduxContent.Provider>
    </Router>
}


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
    </MuiThemeProvider>,
    document.getElementById('app')
);

