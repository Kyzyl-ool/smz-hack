import React from 'react';
import './header.css';
import Box from "@material-ui/core/Box/Box";
import User from "../../resources/img/user.jpg"
import {makeStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    combo: {
        color: "white",
        marginRight: "8px"
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const Header = () => {
    const [role, setRole] = React.useState(localStorage.getItem("role"));
    const classes = useStyles();

    function logout() {
        localStorage.clear();
        window.location = '/login';
    }

    const handleChange = event => {
        setRole(event.target.value);
        localStorage.setItem("role", event.target.value);
        location.reload();
    };

    return (
        <div className="header">
            <Box fontSize="h6.fontSize">
                <NavLink to="/main" style={{textDecoration: "none"}}><div className="prod-name">Chain++</div></NavLink>
            </Box>
            <div className="user-info">
                <Select className={classes.combo}
                        id="demo-simple-select"
                        value={role}
                        classes={{
                            icon: "select__icon"
                        }}
                        onChange={handleChange}
                >
                    <MenuItem value={"developer"}>Разработчик</MenuItem>
                    <MenuItem value={"customer"}>Заказчик</MenuItem>
                    {/*<MenuItem value={"integrator"}>Заказчик</MenuItem>*/}
                </Select>
                <div className="user-name">Анна Чухнина</div>
                <img className="user-photo" src={User}/>
                <div className="logout-button"
                     onClick={() => logout()}
                >
                    Выйти
                </div>
            </div>
        </div>
    );
};

export default Header;
