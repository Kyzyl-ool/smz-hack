import React from 'react';
import Slider from "@material-ui/core/Slider";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 10,
        label: '10',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
];

const useStyles = makeStyles(theme => ({
    valueLabel: {
        fontSize: '8px'
    }
}))

function valuetext(value) {
    return value
}

function IntervalPicker(props) {
    const classes = useStyles()

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box p={2}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
                max={100}
                min={0}
                marks={marks}
                classes={{
                    valueLabel: classes.valueLabel,
                    markLabel: classes.valueLabel,
                }}
            />
        </Box>
    );
}

export default IntervalPicker;
