import React, {useEffect, useState} from 'react';
import {Dialog, Link, makeStyles, useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container/Container";
import {developers, products} from "../pages/integrator-workshop/example";
import Button from "@material-ui/core/Button";
import {useHotkeys} from 'react-hotkeys-hook';
import Paper from "@material-ui/core/Paper";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: "12px",
        marginBottom: '40px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    terminal: {
        width: '100vw',
        padding: 'none'
    },
    image: {
        maxHeight: '200px',
        objectFit: 'cover',
        mixBlendMode: 'hard-light',
    }
}));

const mapStatusToComponent = (status, id) => {
    const [dialog, setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState(false);


    useEffect(() => {
        setSnackbar(true);
    }, [status]);


    switch (status) {
        case 0: {
            return <Paper>
                <Box px={4} pt={3} pb={8}>
                    <Typography color={"textSecondary"}>
                        Вы пока не участвуете в выполнении этого проекта.
                    </Typography>
                </Box>
            </Paper>
        }
        case 1: {
            return <Paper>
                <Box px={4} pt={3} pb={8}>
                    <Typography variant={"h6"}>
                        Заказчик предалагет вам заняться этой задачей. Дополнительные условия от заказчника:
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        Добрый день. Я бы хотел предложить вам этот проект. Сроки по нему уменьшились, поэтому нужно
                        сделать
                        его быстро. Поэтому готов заплатить вам на 50% больше заявленной суммы. Если заинтересовало –
                        примите заявку.
                    </Typography>
                    <Box display={'flex'} justifyContent={'space-evenly'} mt={5}>
                        <Button color={'primary'} variant={"contained"} onClick={() => setDialog(true)}>
                            Принять заявку и начать работу над проектом
                        </Button>
                        <Button color={"secondary"} variant={"outlined"}>
                            Отказаться
                        </Button>
                    </Box>
                </Box>
                <Dialog
                    open={dialog}
                    onClose={() => setDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Подвтержите свое участие в разработке проекта"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Подтверждая свое участие в разработке проекта от Заказчика "{products[id].company}", вы
                            обязуетесь выполнить задание в срок и соблюдать <Link>правила</Link> нашей платформы.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialog(false)} color="primary">
                            Отказаться
                        </Button>
                        <Button onClick={() => setDialog(false)} color="primary" autoFocus variant={"contained"}>
                            Подтвердить
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    autoHideDuration={3000}
                    key={'new query'}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={snackbar}
                    onClose={() => setSnackbar(false)}
                >
                    <Alert variant={"filled"} severity={"info"}>
                        К вам новый запрос на выполнение проекта
                    </Alert>
                </Snackbar>
            </Paper>
        }
        case 2: {
            return <Paper>
                <Box px={4} pt={3} pb={8}>
                    <Typography variant={"h6"}>
                        Вы в данный момент работаете над проектом.
                    </Typography>
                    <br/>
                    <Button color="primary" autoFocus variant={"contained"}>
                        Связаться с заказчиком
                    </Button>
                </Box>
                <Snackbar
                    autoHideDuration={3000}
                    key={'new query'}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={snackbar}
                    onClose={() => setSnackbar(false)}
                >
                    <Alert variant={"filled"} severity={"success"}>
                        Вы приняли заявку на выполнение проекта
                    </Alert>
                </Snackbar>
            </Paper>
        }
        case 3: {
            return <Paper>
                <Box px={4} pt={3} pb={8}>
                    <Typography>
                        Проект завершен. Сумма вознаграждения начислена на ваш счет. Состояние платежа вы можете
                        проверить
                        на
                        сайте ФНС:
                    </Typography>
                    <br/>
                    <Button color={'primary'} variant={"contained"}>
                        Проверить платеж
                    </Button>
                    <br/>
                    <Typography>
                        Вознаграждение облагается налогом для самозанятых и взимается комиссия за обслуживание
                        согласно <Link>правилам</Link>.
                    </Typography>
                </Box>
            </Paper>
        }
    }
};

const TaskInfo = (props) => {
    const [interesting, setInteresting] = useState(false);

    const {id} = props;


    return <Container>
        <Box paddingLeft="16px" marginTop="16px">
            <Typography variant={"subtitle1"}>
                {products[id].description}
            </Typography>
            <Typography variant={"subtitle2"}>
                Если Вас заинтересовал этот проект, Вы можете ознакомиться с постановкой задачи более подробно.
            </Typography>
            <br/>
            {
                interesting ? <Box>
                    <Paper>
                        <Box mt={6} mb={8} mx={6}>
                            <Typography variant={"h4"}>
                                Поле деятельности
                            </Typography>
                            <Typography>
                                Поле деятельности организации обозначает характер услуг, предоставляемых потребителю,
                                включает в
                                себя алгоритм сотрудничества с партнерами и поставщиками.
                            </Typography>
                            <br/>
                            <Typography variant={'h4'}>
                                Круг потребителей
                            </Typography>
                            <Typography>
                                Круг потребителей услуг или продукции компании может быть широким (продукты питания) и
                                узким (ателье пошива одежды для собак). Обычно из слогана организации видно, на какие
                                слои населения ориентирована компания.
                            </Typography>
                            <br/>
                            <Typography variant={'h4'}>
                                Стратегические цели
                            </Typography>
                            <Typography>
                                Следующим шагом после определения миссии является разработка стратегических целей
                                организации.
                                По сравнению с миссией стратегические задачи более конкретны, более определенны. Миссия
                                мегамаркета, например, может быть озвучена следующим образом: «Вся наша деятельность
                                направлена
                                на удовлетворение потребностей покупателей», а одна из стратегических целей
                                формулируется
                                так:
                                «Высокий уровень комфорта и разнообразие услуг, предоставляемых покупателю». Последняя
                                формулировка обязывает определить и ввести в действие услуги, которые способствовали бы
                                максимальному комфорту пребывания покупателя в мегамаркете. Цели можно условно поделить
                                на
                                внешние и внутренние. На первый взгляд эти цели ничем не отличаются друг от друга, на
                                самом
                                же
                                деле формулировка внешней цели работает на потребителя, формулировка внутренней – на
                                саму
                                компанию.
                            </Typography>
                        </Box>
                    </Paper>
                    <Button color={'primary'} variant={'contained'}>
                        Скачать ТЗ в PDF
                    </Button>
                </Box> : <Button color={'primary'} variant={'contained'} onClick={() => setInteresting(true)}>
                    Мне это интересно
                </Button>
            }


        </Box>
    </Container>
}


function TabPanel(props) {
    const {children, value, index, id, status, ...other} = props;


    switch (index) {
        case 0:
            return value === index ? <Container>
                <Box p={2}>
                    <Typography variant={'h4'}>
                        Краткая биография
                    </Typography>
                    <Typography>
                        <b>ФИО: </b>{developers[id].name}
                    </Typography>
                    <Typography>
                        <b>Живет в: </b>{developers[id].lives}
                    </Typography>
                    <Typography>
                        <b>Возраст: </b>{developers[id].age}
                    </Typography>
                    <Typography>
                        <b>Образование: </b>{developers[id].education}
                    </Typography>
                    <Typography>
                        <b>О себе: </b>{developers[id].about.split('\n').join(', ')}
                    </Typography>
                </Box>
            </Container> : null;
        case 1:
            return value === index ? <Container>
                <Box p={2}>
                    <Typography>
                        <b>Навыки: </b>{developers[id].keywords.join(', ')}
                    </Typography>
                    <Typography>
                        <b>Опыт работы: </b>{developers[id].yearsOfExperience} лет
                    </Typography>
                    <Typography>
                        <b>Кем работает: </b>{developers[id].proffession}
                    </Typography>
                    <Typography>
                        <b>Ранее выполненные проекты: </b>
                        <List>
                            {developers[id].projects.map((value1, index1) => <ListItem key={index1}>
                                <ListItemText>
                                    <Link href={value1}>
                                        {value1}
                                    </Link>
                                </ListItemText>
                            </ListItem>)}
                        </List>
                    </Typography>
                </Box>
            </Container> : null;
        case 2: {
            return value === index ? <TaskInfo id={id}/> : null;
        }
        default:
            return <Box
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Box>
    }
}


export function Developer({id}) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const [projectState, setProjectState] = useState(0);
    useHotkeys('p', () => {
        projectState < 3 && setProjectState(projectState + 1);
    }, {}, [projectState]);


    return (
        <div className={classes.root}>
            <Box paddingLeft="16px" m={2} display={'flex'} justifyContent={'space-evenly'}>
                <img src={products[id].avatarSrc} alt={'Product avatar'} className={classes.image}/>
                <Box mb={2}>
                    <Typography variant="h5" paragraph={true}>{products[id].name}</Typography>
                    <Box>
                        <Typography display="inline"><b>Краткое описание: </b></Typography>
                        <Typography display="inline">{products[id].description}</Typography>
                    </Box>
                    <Box display="flex">
                        <Typography display="inline"><b>Рейтинг разработчика: </b></Typography>
                        <Typography display={"inline"}><b>{products[id].averageRate}</b></Typography>
                    </Box>
                </Box>
            </Box>
            <AppBar position="static" color="default">
                <Tabs
                    value={activeTab}
                    onChange={(event, value) => {
                        setActiveTab(value)
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Подробнее о разработчике " {...a11yProps(0)}/>
                    <Tab label="Профессиональный опыт " {...a11yProps(1)}/>
                    <Tab label="Взаимодействие " {...a11yProps(2)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={activeTab} index={0} id={id} dir={theme.direction}>
                Item One
            </TabPanel>
            <TabPanel value={activeTab} index={1} id={id} dir={theme.direction}>

            </TabPanel>
            <Box px={10}>
                <TabPanel value={activeTab} index={2} id={id} dir={theme.direction} status={projectState}>
                </TabPanel>
            </Box>
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
