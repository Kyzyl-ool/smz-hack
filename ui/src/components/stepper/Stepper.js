import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import {LinearDeterminate} from "../LinearDeterminate/LinearDeterminate";
import axios from 'axios';
import {PAYMENT_SERVER} from "../../config/config";
import CircularIndeterminate from "../CirculatIndeterminate/CircularIndeterminate";
import LinearIndeterminate from "../LinearIndeterminate/LinearIndeterminate";
import {HandlingButton} from "../HandlingButton/HandlingButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Ввод реквизитов самозанятого', 'Проверка', 'Завершение оплаты'];
}

const confirmationProgress = (progress, inn) => {
    switch (progress) {
        case 'not confirmed': {
            return <Typography color={'error'}>
                <b>ИНН ({inn}) самозанятого не найден в ФНС</b>
            </Typography>
        }
        case 'confirmed': {
            return <Typography>
                <b>ИНН ({inn}) самозанятого подтвержден</b>
            </Typography>
        }
        case '': {
            return <>
                <Typography>
                    Идет подтверждение статуса самозанятого...
                </Typography>
                <LinearIndeterminate/>
            </>
        }
    }
};

function getStepContent(step, props) {
    const {innValue, handleChange, amount, paymentDescription} = props;
    const [smzInnConfirmed, setSmzInnConfirmed] = useState('');

    useEffect(() => {
        if (step === 2) {
            axios.post(`${PAYMENT_SERVER}/create_payment_link`, {
                price: +amount,
                pageParams: {
                    ["description"]: paymentDescription,
                    ["urlOnDecline"]: "http://35.223.43.55/main?checkPayment=0",
                    ["urlOnSuccess"]: "http://35.223.43.55/main?checkPayment=1"
                }
            })
                .then(value => {
                    window.open(value.data)
                })
        }
        if (step === 1) {
            axios.post(`${PAYMENT_SERVER}/get_status`, {
                inn: innValue
            })
                .then(value => {
                    if (value.data) {
                        setSmzInnConfirmed('confirmed');
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    setSmzInnConfirmed('not confirmed');
                })
        }
    }, [step]);

    switch (step) {
        case 0:
            return <>
                <Box display={'flex'} flexDirection={'column'}>
                    <Box mt={1}/>
                    <TextField id="inn" label="ИНН" variant="outlined" value={innValue} onChange={handleChange}/>
                    <Box mt={1}/>
                    <TextField id="amount" label="Сумма оплаты" variant="outlined" value={amount}
                               onChange={handleChange}/>
                    <Box mt={1}/>
                    <TextField id="description" label="Описание платежа" variant="outlined" value={paymentDescription}
                               onChange={handleChange}/>
                </Box>
                <br/>
                <Typography>
                    Согласно законодательству, самозанятые облагаются налогом в 6% от зароботной платы. Кроме того,
                    предусмотрена комиссия за сервисное обслуживание.
                </Typography>
            </>;
        case 1:
            return <Box>
                <Box my={1}>
                    {
                        confirmationProgress(smzInnConfirmed, innValue)
                    }
                    <Typography>
                        <b>Договор и счет сформирован</b>
                    </Typography>
                </Box>
                <Divider/>
                <Box my={1}>
                    <Typography>
                        <b>ИНН компании подтвержден</b>
                    </Typography>
                    <Typography>
                        <b>Реквизиты компании подтверждены</b>
                    </Typography>
                </Box>
                <Divider/>
                <Box my={1}>
                    <HandlingButton
                        handlingLabel={'Синхронизация...'}
                        doneLabel={'Синхронизовано со Сбербанк-Онлайн'}
                        label={'Синхронизовать со Сбербанк-Онлайн'}
                    />
                </Box>
            </Box>;
        case 2:
            return <Box>
                <Typography>
                    Сейчас вы будете перенаправлены на страницу платежа...
                </Typography>
            </Box>;
        default:
            return 'Unknown step';
    }
}

export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            {getStepContent(activeStep, props)}
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Оплата успешно прошла
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Сбросить
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div>
                            {activeStep !== steps.length - 1 ?
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Назад
                                </Button> : null}
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classes.button}
                                >
                                    Пропустить
                                </Button>
                            )}

                            {activeStep !== steps.length - 1 ? <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                            </Button> : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
