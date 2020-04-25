import React, {useState} from 'react';
import {Box, Divider, makeStyles, Typography, Chip, Button} from "@material-ui/core";
import {Avatar} from "../Avatar/Avatar";
import PropTypes from "prop-types";
import './styles.css';
import User from "../../resources/img/user.jpg";
import Dialog from "@material-ui/core/Dialog";
import {PaymentBlock} from "../PaymentBlock/PaymentBlock";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {ML_SERVER} from "../../config/config";
import TextField from "@material-ui/core/TextField";

LeftDrawer.propTypes = {
    id: PropTypes.number
};

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
    const classes = useStyles();
    const [dialog, setDialog] = useState(false);
    const [valid, setValid] = useState(false);
    const [innValue, setInnValue] = useState('');
    const [mlDialog, setMlDialog] = useState(false);
    const [description, setDescription] = useState('');

    const handleChange = (event) => {
        if (event.target.value.match(/\d*/) && event.target.value.length <= 12) {
            setInnValue(event.target.value);
            setValid(event.target.value.match(/\d*/) && event.target.value.length === 12);
        }
    };

    const handleCloseDialog = () => {
        setDialog(false)
    };
    const handleForm = () => {
        if (valid) {
            console.log('So what next?');
        }
    };

    const handleMLDescription = () => {
        console.log('confirmed');
    };

    const handleTextFieldChange = (event) => {
        setDescription(event.target.value.replace(/[а-яА-Я]/, ''));
    };

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
            {localStorage.getItem('role') === 'developer' && <Box p={2}>
                <Typography>
                    Ваш стек технологий:
                </Typography>
                <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} mt={1}>
                    {
                        ['Blockchain', 'AI', 'ML'].map((value, index) => (
                            <Box key={index} mr={1}><Chip label={value}/></Box>))
                    }
                </Box>
            </Box>}
            {
                localStorage.getItem('role') === 'integrator' && <Box p={2}>
                    <Typography variant={"h6"}>
                        Мои клиенты:
                    </Typography>

                    <div className="user-info-1">
                        <img
                            src={'https://c.pxhere.com/photos/e1/41/man_person_portrait_face_passport_photograph-1238378.jpg!s'}
                            alt={'user'} className='user-photo-1'/>
                        <div className="user-name-1">
                            <b>Александр Гончаров</b>
                            <br/>
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>4</b>
                            </Typography>
                        </div>
                    </div>
                    <div className="user-info-1">
                        <img src={'https://itgifts.ru/assets/new/images/sumka/eblo2.jpg'} alt={'user'}
                             className='user-photo-1'/>
                        <div className="user-name-1">
                            <b>Евгений Иванов</b>
                            <br/>
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>1</b>
                            </Typography>
                        </div>
                    </div>
                    <div className="user-info-1">
                        <img src={'http://smilesecret.ru/img/vredno-li-otbelivanie-zubov-2.jpg'} alt={'user'}
                             className='user-photo-1'/>
                        <div className="user-name-1">
                            <b>Дарья Полева</b>
                            <br/>
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>41</b>
                            </Typography></div>
                    </div>
                    <div className="user-info-1">
                        <img
                            src={'https://i.pinimg.com/236x/81/01/9e/81019e40d0e697d994c9848ae7d0df87--woman-portrait-tag.jpg'}
                            alt={'user'} className='user-photo-1'/>
                        <div className="user-name-1">
                            <b>Анастасия Соболева</b>
                            <br/>
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>40</b>
                            </Typography></div>
                    </div>
                    <div className="user-info-1">
                        <img src={'https://evakyator-spb.ru/img/comments/img2.jpg'} alt={'user'}
                             className='user-photo-1'/>
                        <div className="user-name-1">
                            <b>Андрей Филатов</b>
                            <br/>
                            <Typography variant={"caption"}>
                                Приобрел(-a) ваших продуктов: <b>13</b>
                            </Typography></div>
                    </div>

                </Box>
            }
            {
                localStorage.getItem('role') === 'customer' && <Box p={2}>
                    <Button variant={'contained'} color={'primary'} onClick={() => setDialog(true)}>
                        Оплатить самозанятому по ИНН
                    </Button>
                    <br/>
                    <Divider/>
                    <br/>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => setMlDialog(true)}>
                        Подобрать специалистов по описанию технического задания
                    </Button>
                    <Dialog onClose={() => setMlDialog(false)} open={mlDialog}>
                        <DialogTitle>
                            Подбор специалистов
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Введите в текстовое поле ниже техническое описание своего проекта <strong>на английском</strong>. Мы автоматически
                                подберем для Вас специалистов, которые вам нужны
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание вашего проекта..."
                                multiline
                                rows={10}
                                variant="outlined"
                                value={description}
                                onChange={handleTextFieldChange}
                                fullWidth
                            />
                            <Typography variant={"subtitle2"}>
                                Программа, распознающая в тексте ключевые слова, обучена на выборе данных из сайта StackOverflow.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"outlined"} color={"primary"} onClick={() => setMlDialog(false)}>
                                Отмена
                            </Button>
                            <Button variant={'contained'} color={'primary'} onClick={() => handleMLDescription()}>
                                Подтвердить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            }
            <Divider/>
            <Dialog open={dialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Оплата самозанятому</DialogTitle>
                <DialogContent>
                    <PaymentBlock
                        innValue={innValue}
                        handleChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleForm} color="primary" disabled={!valid}>
                        Далее
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default LeftDrawer;
