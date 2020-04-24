import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import {developers, products} from "../../pages/integrator-workshop/example";
import Button from "@material-ui/core/Button/Button";

// const stubData = [
//     {
//         averageRate: 4,
//         id: 1,
//         cost: 100000,
//         avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
//         description: 'Данный продукт представляет собой библиотеку для обработки звуковых файлов.',
//         type: 'библиотека'
//     },
//     {
//         averageRate: 4,
//         id: 2,
//         cost: 100000,
//         avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
//         description: 'Данный продукт представляет собой библиотеку для обработки звуковых файлов.',
//         type: 'библиотека'
//     },
//     {
//         averageRate: 4,
//         id: 3,
//         cost: 100000,
//         avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
//         description: 'Данный продукт представляет собой библиотеку для обработки звуковых файлов.',
//         type: 'библиотека'
//     },
//     {
//         averageRate: 4,
//         id: 4,
//         cost: 100000,
//         avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
//         description: 'Данный продукт представляет собой библиотеку для обработки звуковых файлов.',
//         type: 'библиотека'
//     }
// ]

const stubData = developers;


const ListOfProducts = () => {
    return (
        <>
            <Box display="flex" m={1}>
                <FormControl fullWidth={true}>
                    <InputLabel htmlFor="input-with-icon-adornment">Поиск исполнителей:</InputLabel>
                    <Input style={{marginTop: "8px"}}
                           id="input-with-icon-adornment"
                           startAdornment={
                               <InputAdornment position="start">
                                   <Search/>
                               </InputAdornment>
                           }
                    />
                </FormControl>
                <Box ml={1}>
                    <Button styles={{marginLeft: "8px"}}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => window.open('http://localhost:5000')}>
                        Подобрать
                    </Button>
                </Box>
            </Box>
            {
                stubData.map((value, index) => (
                    <NavLink to={`product/${value.id}`} key={index} style={{textDecoration: 'none'}}>
                        <ProductCard
                            {...value}
                        />
                    </NavLink>))
            }
        </>
    )
};

ListOfProducts.propTypes = {};

export default ListOfProducts;
