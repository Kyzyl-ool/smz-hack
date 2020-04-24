import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import RightDrawer from "../../components/RightDrawer/RightDrawer";

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
    createImageButton: {
        height: "34px",
        marginLeft: "12px",
        marginTop: "14px"
    }
}))

const stubData = [
    {
        averageRate: 4,
        id: 1,
        price: 100000,
        avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
        description: 'Данный продукт представляет собой библиотеку для обработки звуковых файлов.',
        type: 'библиотека'
    },
    {
        averageRate: 5,
        id: 2,
        price: 100000,
        avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
        description: 'Эта библиотека генерирует лица несуществующих людей в хорошем качестве.',
        type: 'библиотека'
    },
    {
        averageRate: 1,
        id: 3,
        price: 100000,
        avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
        description: 'В этом проекте реализован мессенджер с высокой степенью шифрования.',
        type: 'продукт'
    },
    {
        averageRate: 5,
        id: 4,
        price: 100000,
        avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
        description: 'Этот проект является частью регулирующей системы электроэнергетической компании. Продается в связи с аварией на электростанции.',
        type: 'продукт'
    },
    {
        averageRate: 4,
        id: 4,
        price: 100000,
        avatarSrc: 'https://thefinanser.com/wp-content/uploads/2019/10/Product.png',
        description: 'Здесь реализована платорфма для заказа различных товаров в интернете.',
        type: 'продуки'
    }
]
import MainContent from "../../containers/MainContent";
import {products} from "../integrator-workshop/example";
import LeftDrawer from "../../components/LeftDrawer/LeftDrawer";

const MainPage = ({id}) => {
    const [rightDrawerContent, setRightDrawerContent] = useState({})
    const handleCallback = args => {
        console.log(args);
        if (args.selected) {
            setRightDrawerContent({
                ...rightDrawerContent,

                RAM:args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].RAM).reduce((prev, curr) => prev + curr, 0),

                memory: args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].memory).reduce((prev, curr) => prev + curr, 0),

                performance: args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].performance).sort().reverse()[0],

                cores: args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].cores).sort().reverse()[0],

                sum: args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].price).reduce((prev, curr) => prev + curr, 0),

                sum2: args.selected.map(value =>
                    +value.id.slice(5)
                ).map(value2 => products[value2].price2).reduce((prev, curr) => prev + curr, 0)
            })
        }
    }

    return (
        <Box display={'flex'} >
            <LeftDrawer id={id}/>
            <MainContent callback={handleCallback} />
            <RightDrawer content={rightDrawerContent} id={id}/>
        </Box>
    );
}

MainPage.propTypes = {
    id: PropTypes.number
}

export default MainPage;
