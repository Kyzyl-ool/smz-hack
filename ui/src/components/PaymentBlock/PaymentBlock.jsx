import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


export const PaymentBlock = (props) => {
    const {innValue, handleChange} = props;
    return <Box p={2}>
        <TextField id="inn-value" label="ИНН" variant="outlined" value={innValue} onChange={handleChange}/>
        <br/>
        <Typography>
            Согласно законодательству, самозанятые облагаются налогом в 6% от зароботной платы. Кроме того,
            предусмотрена комиссия за сервисное обслуживание.
        </Typography>
    </Box>
};
