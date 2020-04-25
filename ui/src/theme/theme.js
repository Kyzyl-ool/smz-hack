import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0b3954',
        },
        secondary: {
            main: '#427aa1',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fffcfd',
        },
    },
});

export default theme;
