import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import {searchReducer, useSearchResult} from "../../../store/reducer";
import {ReduxContent} from "../../index";

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
    const [searchString, setSearchString] = useState('');
    const [searchingString, setSearchingString] = useState('');
    const [store, dispatch] = useContext(ReduxContent);

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
                           value={searchString}
                           onChange={event => setSearchString(event.target.value)}
                    />
                </FormControl>
                <Box ml={1}>
                    <Button styles={{marginLeft: "8px"}}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => setSearchingString(searchString)}>
                        Найти
                    </Button>
                </Box>
            </Box>
            {
                (
                    store.result.length > 0 ?
                        stubData.filter(value =>  store.result.some( value1 => value1.split(/[,.\s\t;!?%]/).filter(v => v.length>0).some(v => value.keywords.join(' ').concat(value.description).concat(value.about).toUpperCase().includes(v.toUpperCase()) ) )  )
                        :
                        stubData.filter(value => value.keywords.join(' ').concat(value.description).concat(value.about).toUpperCase().includes(searchingString.toUpperCase()))
                ).map((value, index) => (
                    <NavLink to={`developer/${value.id}`} key={index} style={{textDecoration: 'none'}}>
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
