import React, {useState} from 'react';
import Button from "@material-ui/core/Button";

export const HandlingButton = (props) => {
    const [handling, setHandling] = useState(false);
    const [handled, setHandled] = useState(false);
    const {handlingLabel, doneLabel, label} = props;

    const handle = () => {
        setHandling(true);
        setTimeout(() => {
            setHandled(true);
            setHandling(false);
        }, 3000)
    };

    return <Button color={'primary'} variant={"contained"} disabled={handled ? true : (handling)} onClick={handle}>
        {handled ? doneLabel : (handling ? handlingLabel : label)}
    </Button>
};
