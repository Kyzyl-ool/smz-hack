import Typography from "@material-ui/core/Typography";
import {LinearDeterminate} from "../LinearDeterminate/LinearDeterminate";
import Box from "@material-ui/core/Box";
import React, {useState} from "react";

export const PaymentLoader = (props) => {
    const [complete, setComplete] = useState(false);
    const {status} = props;

    return <Box p={3}>
                {
                    complete ? <>
                    {
                        status === 1 ? <Typography variant={'h5'}>
                            Оплата успешно выполнена. Благодарим вас за использование сервиса!
                        </Typography> : <Typography variant={'h5'} color={'error'}>
                            Оплата не выполнена.
                        </Typography>
                    }

                    </> : <>
                        <Typography>
                            Проверка платежа...
                        </Typography>
                        <LinearDeterminate onComplete={() => setComplete(true)}/>
                    </>
                }
            </Box>
}
