import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


export const PaymentBlock = (props) => {
    const {innValue, handleChange, amount, paymentDescription} = props;
    return <Box p={2}>
        <Box display={'flex'} flexDirection={'column'}>
            <TextField id="inn" label="ИНН" variant="outlined" value={innValue} onChange={handleChange}/>
            <TextField id="amount" label="Сумма оплаты" variant="outlined" value={amount} onChange={handleChange}/>
            <TextField id="description" label="Описание платежа" variant="outlined" value={paymentDescription}
                       onChange={handleChange}/>
        </Box>
        <br/>
        <Typography>
            Согласно законодательству, самозанятые облагаются налогом в 6% от зароботной платы. Кроме того,
            предусмотрена комиссия за сервисное обслуживание.
        </Typography>
    </Box>
};
