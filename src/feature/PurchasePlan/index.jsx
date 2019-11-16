import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const categories = [{ label: "House", value: "house" }, { label: "Vehicle", value: "vehicle" }, { label: "Pet", value: "pet" }]

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  fab: {

  },
}));

export function PurchasePlan() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');
  const [timeAmount, setTimeAmount] = React.useState(1);
  const [purchaseValue, setPurchaseValue] = React.useState(0)
  const handleChange = event => {
    setCategory(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Category</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {categories.map(({ value, label }) => <option value={value} key={value} >{label}</option>)}
          <option value="other" >Other</option>
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Monthly payment</InputLabel>
        <BootstrapInput
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={purchaseValue}
          onChange={(event) => setPurchaseValue(event.target.value)}
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Duration (month)</InputLabel>
        <BootstrapInput id="demo-customized-textbox" value={timeAmount} onChange={(event) => setTimeAmount(event.target.value)} />
      </FormControl>
      <div>
        <FormControl>
          <Button variant="outlined" color="primary" className={classes.margin}>
            Submit
      </Button>

        </FormControl>

      </div>

    </div>
  );
}
