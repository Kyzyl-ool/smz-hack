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
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

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
    },
    progress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export const MOCK_LINK = 'http://npchk.nalog.ru/';

function LinearDeterminate({onComplete}) {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        function progress() {
            setCompleted((oldCompleted) => {
                if (oldCompleted === 100) {
                    onComplete();
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <div className={classes.progress}>
            <LinearProgress variant="determinate" value={completed} color="secondary"/>
        </div>
    );
}


const DeveloperInteraction = (props) => {
    const {step, id, next} = props;
    const [dialog, setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [paying, setPaying] = useState(false);
    const [payingDialog, setPayingDialog] = useState(false);

    const onComplete = () => {
        setPayingDialog(false);
        setPaying(false);
        next();
    };


    useEffect(() => {
        setSnackbar(true);
    }, [props.step]);


    switch (step) {
        case 0: {
            return <Box p={4} m={4}>
                <Card>
                    <CardContent>
                        <Typography variant={'h5'}>
                            Похоже, {developers[id].name} никогда не работал с вами. Вы можете ему предложить одну из
                            своих
                            задач.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} color={"primary"} onClick={() => setDialog(true)}>
                            Предложить задачу
                        </Button>
                    </CardActions>
                </Card>
                <Dialog onClose={() => setDialog(false)} aria-labelledby="simple-dialog-title" open={dialog}>
                    <DialogTitle id="simple-dialog-title">Ваши проекты</DialogTitle>
                    <List>
                        {products.map((value) => (
                            <ListItem key={value.id} onClick={() => next()}>
                                <ListItemAvatar>
                                    <Avatar src={value.avatarSrc}/>
                                </ListItemAvatar>
                                <ListItemText>
                                    {value.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            </Box>
        }
        case 1: {
            return <Box p={4} m={4}>
                <Paper>
                    <Box p={2}>
                        <Typography variant={'h5'}>
                            Ваш запрос на проект "{products[0].name}" был отправлен. Дождитесь ответа.
                        </Typography>
                    </Box>
                </Paper>
                <Snackbar
                    autoHideDuration={3000}
                    key={'new query'}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={snackbar}
                    onClose={() => {
                        setSnackbar(false);
                        next();
                    }}
                >
                    <Alert variant={"filled"} severity={"info"}>
                        Запрос на проект "{products[0].name}" отправлен пользователю {developers[id].name}.
                    </Alert>
                </Snackbar>
            </Box>
        }
        case 2: {
            return <Box p={4} m={4}>
                <Card>
                    <CardContent>
                        <Typography>
                            Ваш запрос на эту задачу принят пользователем {developers[id].name}. Ниже вы можете открыть
                            чат
                            для
                            взаимодействия с разработчиком.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} color={"primary"}>
                            Открыть чат
                        </Button>
                    </CardActions>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>
                            В случае, если разработчик успешно выполнил свою задачу, Вы должны закрыть проект и
                            выплатить
                            ему вознаграждение как самозанятому.
                        </Typography>
                        <Typography>
                            ИНН пользователя {developers[id].name}: <b>275394527317</b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} color={"primary"} onClick={() => setPayingDialog(true)}>
                            Закрыть проект и выплатить вознаграждение
                        </Button>
                    </CardActions>
                </Card>
                <Snackbar
                    autoHideDuration={3000}
                    key={'new query'}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={snackbar}
                    onClose={() => setSnackbar(false)}
                >
                    <Alert variant={"filled"} severity={"success"}>
                        Ваш запрос на проект "{products[0].name}" принят!
                    </Alert>
                </Snackbar>
                <Dialog open={payingDialog}>
                    <DialogTitle>
                        Закрытие проекта
                    </DialogTitle>
                    <DialogContent>
                        {
                            paying ? <Box>
                                Закрытие проекта, выплата вознаграждения и оформление чека на самозанятого через ФНС...
                                <LinearDeterminate onComplete={onComplete}/>
                            </Box> : <Box>
                                Вы уверены, что хотите закрыть проект? После Вашего подтверждения начнется
                                автоматическая обработка закрытия проекты по установленному регламенту. Отменить
                                действите будет невозможно.
                            </Box>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={paying} variant={"contained"} color={"primary"}
                                onClick={() => setPaying(true)}>
                            Подтвердить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        }
        case 3: {
            return <Box p={4} m={4}>
                <Paper>
                    <Box p={2}>
                        <Typography variant={"h5"}>
                            Процедура закрытия проекта успешно завершена. Проверить результат выплаты вознаграждения
                            можете по ссылке ниже:
                        </Typography>
                        <Link href={MOCK_LINK}>
                            <Typography variant={'h4'}>
                                Чек о выплате вознаграждения
                            </Typography>
                        </Link>
                    </Box>
                </Paper>
            </Box>
        }
    }
};


function TabPanel(props) {
    const {children, value, index, id, step, next, ...other} = props;

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
                    </Typography>
                    <List>
                        {developers[id].projects.map((value1, index1) => <ListItem key={index1}>
                            <Link href={value1}>
                                {value1}
                            </Link>
                        </ListItem>)}
                    </List>
                </Box>
            </Container> : null;
        case 2: {
            return value === index ? <DeveloperInteraction step={step} id={id} next={next}/> : null;
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
    const [developerState, setDeveloperState] = useState(0);
    useHotkeys('p', () => {
        developerState < 3 && setDeveloperState(developerState + 1);
    }, {}, [developerState]);


    return (
        <div className={classes.root}>
            <Box paddingLeft="16px" m={2} display={'flex'} justifyContent={'space-evenly'}>
                <img src={developers[id].avatarSrc} alt={'Product avatar'} className={classes.image}/>
                <Box mb={2}>
                    <Typography variant="h5" paragraph={true}>{developers[id].name}</Typography>
                    <Box>
                        <Typography display="inline"><b>Краткое описание: </b></Typography>
                        <Typography display="inline">{developers[id].description}</Typography>
                    </Box>
                    <Box display="flex">
                        <Typography display="inline"><b>Рейтинг разработчика: </b></Typography>
                        <Typography display={"inline"}><b>{developers[id].averageRate}</b></Typography>
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
                <TabPanel value={activeTab} index={2} id={id} dir={theme.direction} step={developerState}
                          next={() => setDeveloperState(developerState + 1)}>
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
