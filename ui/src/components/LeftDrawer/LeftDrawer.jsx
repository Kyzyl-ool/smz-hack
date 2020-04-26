import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import TextField from "@material-ui/core/TextField";
import {TextRecognition} from "../../api/TextRecognition";
import CircularIndeterminate from "../CirculatIndeterminate/CircularIndeterminate";
import {searchAction, searchReducer, useSearchResult} from "../../../store/reducer";
import {ReduxContent} from "../../index";

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
    const [amount, setAmount] = useState(0);
    const [paymentDescription, setPaymentDescription] = useState('');
    const [recognizeResult, setRecognizeResult] = useState([]);
    const [recognizing, setRecognizing] = useState(false);
    const [store, dispatch] = useContext(ReduxContent);


    const handleChange = (event) => {
        switch (event.target.id) {
            case 'inn': {
                if (event.target.value.match(/\d*/) && event.target.value.length <= 12) {
                    setInnValue(event.target.value);
                    setValid(event.target.value.match(/\d*/) && event.target.value.length === 12);
                }
                break;
            }
            case 'amount': {
                if (event.target.value.match(/\d*/)) {
                    setAmount(event.target.value);
                }
                break;
            }
            case 'description': {
                setPaymentDescription(event.target.value);
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleCloseDialog = () => {
        setDialog(false)
    };
    const handleForm = () => {
        if (valid) {
            console.log(innValue);
            console.log(amount);
            console.log(paymentDescription);
        }
    };

    const handleMLDescription = () => {
        setRecognizing(true);
        TextRecognition.recognize(description)
            .then(value => {
                setRecognizing(false);
                setRecognizeResult(value);
            });
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
                    <br/>
                    <Divider/>
                    <br/>
                    <Button variant={'contained'} color={'primary'}>
                        Мои заказы
                    </Button>
                    <Dialog onClose={() => setMlDialog(false)} open={mlDialog}>
                        <DialogTitle>
                            {recognizeResult.length > 0 ? 'Предложенные специалисты' : 'Подбор специалистов'}
                        </DialogTitle>
                        <DialogContent>
                            {recognizeResult.length > 0 ? <Box>
                                <Typography variant={'h5'}>
                                    Возможно, специалисты со следующими навыками будут Вам полезны:
                                </Typography>
                                {recognizeResult.map((value, index) => <Typography key={index}>
                                    {value}
                                </Typography>)}
                            </Box> : <Box>
                                <Typography>
                                    Введите в текстовое поле ниже техническое описание своего проекта <strong>на
                                    английском</strong>. Мы автоматически
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
                                    Программа, распознающая в тексте ключевые слова, обучена на выборе данных из сайта
                                    StackOverflow.
                                </Typography>
                                {recognizing ? <CircularIndeterminate/> : null}
                            </Box>}

                        </DialogContent>
                        <DialogActions>
                            <Button variant={"outlined"} color={"primary"} onClick={() => setMlDialog(false)}>
                                Отмена
                            </Button>
                            {recognizeResult.length === 0 ?
                                <Button variant={'contained'} color={'primary'} onClick={() => handleMLDescription()}>
                                    Подтвердить
                                </Button> :
                                <Button variant={'contained'} color={'primary'} onClick={() => {setMlDialog(false); dispatch(searchAction(recognizeResult))}}>
                                    Перейти к выбору специалистов
                                </Button>}
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
                        amount={amount}
                        paymentDescription={paymentDescription}
                        handleChange={handleChange}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default LeftDrawer;
