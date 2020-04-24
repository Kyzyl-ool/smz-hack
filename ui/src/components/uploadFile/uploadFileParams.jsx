import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function UploadFileParams() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Параметры проекта
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Название"
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Описание проекта"
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="dop"
                        name="dop"
                        label="Дополнительная информация"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}