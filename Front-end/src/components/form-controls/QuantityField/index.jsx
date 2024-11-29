
import { Box, Typography, makeStyles } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme)=> ({
    root:{},

    box: {
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        maxWidth:'200px',
    },
}))

function QuantityField(props) {
    const classes = useStyles();
    const { form, name, label, disabled } = props;
    const { errors, setValue } = form;
    const hasError = !!errors[name];

    return (
        <FormControl
            fullWidth
            margin='normal'
            variant='outlined'
            error={hasError}
            size='small'
        >
            <Controller
                name={name}
                control={form.control}
                render={({ onChange , onBlur ,value ,name }) => (
                    <Box 
                        className={classes.box}
                    >
                        <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1: 1)}>
                            <RemoveCircleOutline />
                        </IconButton>
                        <OutlinedInput
                            id={name}
                            type='number'
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        <IconButton onClick={() => setValue(name,Number.parseInt(value) ? Number.parseInt(value) + 1: 1)}>
                            <AddCircleOutline />
                        </IconButton>
                    </Box>
                )}
            />
        </FormControl>
    );
}

export default QuantityField;
