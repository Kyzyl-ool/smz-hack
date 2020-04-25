import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import FullScreenDialog from "../dialog/Dialog";
import Button from "@material-ui/core/Button/Button";
import {products} from "../../pages/integrator-workshop/example";
import ProductCardForDeveloper from "../ProductCardForDeveloper/ProductCardForDeveloper";

const stubData = products

const useStyles = makeStyles(theme => ({
    content: {
        width: '60vw',
        height: '100vh',
        overflowY: 'scroll',
        position: 'fixed',
        left: '20vw',
        borderTop: '1px solid rgba(0,0,0,0.5)'
    },
    toolbar: {
        display: "flex"
    },
    searchField: {
        flexGrow: 1
    },
    createImageButton: {
        height: "34px",
        marginLeft: "12px",
        marginTop: "14px",
        width: "180px"
    }
}));

const ListOfProductsForDeveloper = () => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return (
        <>
            <Box display="flex" m={1}>
                <FormControl className={classes.searchField}>
                    <InputLabel htmlFor="input-with-icon-adornment">Поиск задач от заказчиков по ключевым словам:</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        }
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                    />
                </FormControl>
                <Button className={classes.createImageButton}
                        variant={"contained"}
                        color={"secondary"}
                >
                    Поиск
                </Button>
            </Box>
            {
                stubData.map((value, index) => (
                    <NavLink to={`product/${value.id}`} key={index} style={{textDecoration: 'none'}}>
                        <ProductCardForDeveloper
                            {...value}
                        />
                    </NavLink>))
            }
            <FullScreenDialog open={openDialog} handleClose={() => setOpenDialog(false)}/>
        </>
    )
};


export default ListOfProductsForDeveloper;
