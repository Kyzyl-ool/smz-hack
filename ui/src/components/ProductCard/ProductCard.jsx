import React from 'react';
import PropTypes from 'prop-types';
import {Box, makeStyles, Paper, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    productCard: {
        border: '1px solid rgba(0,0,0,0.5)',
        padding: '16px',
    },
    grid: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '4fr 1fr'
    },
    avatar: {
        height: '100px',
        width: '100px',
        objectFit: 'cover',
        borderRadius: '4px',
        boxShadow: '1px 1px 4px 1px rgba(0,0,0,0.5)'
    },
    item1: {
        gridArea: '0/0/0/0',
        display: 'flex',
        alignItems: 'center'
    },
    item2: {
        gridArea: '0/1/1/2'
    },
}))


const ProductCard = ({avatarSrc, description, price: cost, averageRate, type, keywords, company}) => {
    const classes = useStyles();

    return (
        <Box m={1}>
            <Paper elevation={4} className={classes.productCard}>
                <Box className={classes.grid}>
                    <Box display={'flex'} className={classes.item1}>
                        <img src={avatarSrc} alt={'Product image'} className={classes.avatar}/>
                        <Box mx={1}>
                            <Box mx={1} mb={1}>
                                <Typography>
                                    <b>Краткое резюме:</b>
                                </Typography>
                                <Box>
                                    <Typography variant={"body2"}>
                                        {description}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box mx={1}>
                                <Typography>
                                    <b>Компания:</b>&nbsp;{company}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.item2}>
                        <Box mb={1}>
                            <Typography>
                                <b>Стоимость:</b>
                            </Typography>
                            <Typography variant={"h5"}>
                                {cost} ₽/час
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>
                                <b>Рейтинг:</b>
                            </Typography>
                            <Typography variant={"h5"}>
                                {averageRate}/5
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography>
                        Навыки:
                    </Typography>
                    <Box p={1} display={'flex'} flexWrap={'wrap'} >
                        {
                            keywords.map((value, index) => (<Box key={index} mr={1}><Chip
                                label={value}
                            /></Box>))
                        }
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number,
    avatarSrc: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    averageRate: PropTypes.number,
    type: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string)
};

export default ProductCard;
