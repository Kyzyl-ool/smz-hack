import React, {useEffect, useState} from 'react';
import {CircularProgress} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Loader() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 5000)
    }, [])

    return (
        <Box display={'flex'} height={'100px'} width={'30vw'} justifyContent={'center'} >
            <Typography display={"inline"}>
                Оценка&nbsp;поддержки&nbsp;проекта:&nbsp;
            </Typography>
            {loaded ? <Box>
                <Typography display={"inline"}>
                    <b>10000&nbsp;₽&nbsp;/&nbsp;мес.</b>
                </Typography>
            </Box> : <CircularProgress />}
        </Box>
    );
}

export default Loader;
