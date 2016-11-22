import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Root} from './components';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {blue500 ,indigo500 ,red900} from 'material-ui/styles/colors';


const {store } = configureStore();


injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#368ee0',
        primary2Color: indigo500,
        accent1Color: '#f43',
        borderColor:'#f4f4f4',
        borderColor:'#dadada',
        textColor:'#666'
    },
});


render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Root />
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('teacher'));