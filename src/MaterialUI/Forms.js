import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:'20vh',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Forms() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePwd = (event) => {
        setPassword(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                <OutlinedInput id="component-outlined" value={email} onChange={handleChange} label="Email" />
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                <OutlinedInput id="component-outlined" value={password} onChange={handleChangePwd} label="Password" />
            </FormControl>
            
        </form>
    );
}
