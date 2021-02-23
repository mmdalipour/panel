import { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';

import { SPACING_LEAST } from 'constants/spacing';

// components
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker,
} from '@material-ui/pickers';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

// icons
import CalendarIcon from 'components/shared/icons/Calendar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  inputPaper: {
    padding: theme.spacing(SPACING_LEAST),
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minWidth: 'auto',
  },
  inputIcon: {
    marginRight: theme.spacing(SPACING_LEAST),
  },
}));

export type DatePickerProps = {
  label?: string;
};
function DatePicker({ label }: DatePickerProps) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ width: '100%' }}>
        <MuiDatePicker
          DialogProps={{ disablePortal: true }}
          className={classes.root}
          margin="normal"
          id="date-picker-dialog"
          label={label}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          TextFieldComponent={({ value, onChange, label, onClick, ...rest }) => {
            return (
              <Paper className={classes.inputPaper} variant="outlined">
                <div className={classes.inputWrapper}>
                  <CalendarIcon
                    fontSize="small"
                    className={classes.inputIcon}
                    color="secondary"
                  />

                  <InputBase
                    className={classes.input}
                    readOnly
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                  />
                </div>
              </Paper>
            );
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
