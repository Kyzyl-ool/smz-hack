import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    progress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export function LinearDeterminate({onComplete}) {
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
