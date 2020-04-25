import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function InvalidMessage() {
    return (
        <Typography variant="body2" color="error" align="center">
            {'Invalid email or password try again'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const [verifyData, setVerifyData] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);

    function updateEmail(email) {
        setVerifyData({
            email: email,
            password: verifyData.password
        });
        setIsValid(true);
    }

    function updatePassword(password) {
        setVerifyData({
            email: verifyData.email,
            password: password
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Chain++
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        onChange={(event) => updateEmail(event.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        onChange={(event) => updatePassword(event.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {verifyAccess(verifyData)}}
                    >
                        Войти
                    </Button>
                </form>
                {!isValid ? <InvalidMessage/> : <div/> }

            </div>
        </Container>
    );

    function verifyAccess(data) {
        if (data.email === 'm0016@hooligans.com' && data.password === '12345') {
            window.location = 'wizard';
            localStorage.setItem("isLogin", "true");
        }
        else {
            setIsValid(false);
        }
    }
}
