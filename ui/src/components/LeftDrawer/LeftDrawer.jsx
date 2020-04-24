import React from 'react';
import {Box, Divider, makeStyles, Typography, Chip} from "@material-ui/core";
import {Avatar} from "../Avatar/Avatar";
import PropTypes from "prop-types";
import './styles.css';
import User from "../../resources/img/user.jpg";

LeftDrawer.propTypes = {
    id: PropTypes.number
}

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '20vw',
        border: '1px solid rgba(0,0,0,0.5)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        paddingBottom: '100px',
        position: 'fixed',
        left: 0,
        overflowY: 'scroll'
    }
}))

const mapRoleToString = {
    'developer': 'Разработчик',
    'integrator': 'Интегратор',
    'customer': 'Заказчик',
    'admin': 'Администратор'
}

function LeftDrawer({id}) {
    const classes = useStyles()

    return (
        <Box className={classes.drawer}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Avatar src={User}/>
                <Typography>
                    <b>Анна Чухнина</b>
                </Typography>
                <Typography variant={"caption"}>
                        ({mapRoleToString[localStorage.getItem('role')]})
                </Typography>
            </Box>
            <Divider/>
            <Box p={2}>
                <Typography>
                    Стек технологий
                </Typography>
                <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} mt={1} >
                    {
                        ['Blockchain', 'AI', 'ML'].map((value, index) => (<Box key={index} mr={1}><Chip label={value} /></Box>))
                    }
                </Box>
            </Box>
            {
                localStorage.getItem('role') === 'integrator' && <Box p={2}>
                    <Typography variant={"h6"}>
                        Мои клиенты:
                    </Typography>

                    <div className="user-info-1">
                        <img src={'https://c.pxhere.com/photos/e1/41/man_person_portrait_face_passport_photograph-1238378.jpg!s'} alt={'user'} className='user-photo-1' />
                        <div className="user-name-1">
                            <b>Александр Гончаров</b>
                            <br />
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>4</b>
                            </Typography>
                        </div>
                    </div>
                    <div className="user-info-1">
                        <img src={'https://itgifts.ru/assets/new/images/sumka/eblo2.jpg'} alt={'user'} className='user-photo-1' />
                        <div className="user-name-1">
                            <b>Евгений Иванов</b>
                            <br />
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>1</b>
                            </Typography>
                        </div>
                    </div>
                    <div className="user-info-1">
                        <img src={'http://smilesecret.ru/img/vredno-li-otbelivanie-zubov-2.jpg'} alt={'user'} className='user-photo-1' />
                        <div className="user-name-1">
                            <b>Дарья Полева</b>
                            <br />
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>41</b>
                            </Typography></div>
                    </div>
                    <div className="user-info-1">
                        <img src={'https://i.pinimg.com/236x/81/01/9e/81019e40d0e697d994c9848ae7d0df87--woman-portrait-tag.jpg'} alt={'user'} className='user-photo-1' />
                        <div className="user-name-1">
                            <b>Анастасия Соболева</b>
                            <br />
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>40</b>
                            </Typography></div>
                    </div>
                    <div className="user-info-1">
                        <img src={'https://evakyator-spb.ru/img/comments/img2.jpg'} alt={'user'} className='user-photo-1' />
                        <div className="user-name-1">
                            <b>Андрей Филатов</b>
                            <br />
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>13</b>
                            </Typography></div>
                    </div>

                </Box>
            }
            <Divider/>
        </Box>
    );
}

export default LeftDrawer;
