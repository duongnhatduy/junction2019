import React, { useState, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  InputAdornment,
  Input,
  InputLabel,
  FormControl,
  NativeSelect,
  InputBase,
  Button,
  FormLabel
} from '@material-ui/core';

import { purchasePredict } from './purchase_predict';
import { CostList } from '../Overview/CostList';
import { ProjectedSavingGoal } from './ProjectedSavingGoal';

const categories = [
  { label: 'House', value: 'house' },
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Pet', value: 'pet' },
];

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
    marginTop: '10px',
    marginBottom: '10px',
  },
  formLabel: {
    textAlign: 'center',
    color: '#3e98c7',
  },
  formControl: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  formRow: {
    // margin: theme.spacing(1),
  },
  fab: {},
}));

export function PurchasePlan() {
  const classes = useStyles();
  const [fixCost, setFixCost] = useState({
    installment: 0,
    maintenance: 20,
    insurance: 25,
    taxes: 5,
    carwash: 10,
    garage: 10,
    fuel: 150,
  });
  const [variableCost, setVariableCost] = useState({
    down_payment: 0,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [plan, setPlan] = React.useState(null);

  const [category, setCategory] = useState('vehicle');
  const [timeAmount, setTimeAmount] = useState(12);
  const handleChange = event => {
    setCategory(event.target.value);
  };
  const handleFixCostInputChange = event => {
    const { name, value } = event.target;
    setFixCost(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleFixCostPerYearInputChange = event => {
    const { name, value } = event.target;
    setFixCost(prev => {
      return {
        ...prev,
        [name]: value / 12,
      };
    });
  };
  const handleVariableCostInputChange = event => {
    const { name, value } = event.target;
    setVariableCost(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitPlan = () => {
    const newPlan = purchasePredict(fixCost, variableCost);
    setPlan(newPlan);
    setIsOpen(true);
  };
  const endInput = <InputAdornment position="end">€/year</InputAdornment>
  const endInputPerMonth = <InputAdornment position="end">€/month</InputAdornment>

  return (
    <div>
      <Box p={1}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-customized-select-native">Category</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={category}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {categories.map(({ value, label }, index) => (
              <option value={value} key={value} disalbed>
                {label}
              </option>
            ))}
            <option value="other">Other</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-customized-textbox">Duration (month)</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            value={timeAmount}
            onChange={event => setTimeAmount(event.target.value)}
          />
        </FormControl>
        {category === 'vehicle' && (
          <Fragment>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Purchase Cost
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="down_payment">Down payment</InputLabel>
                <Input name="down_payment" onChange={handleVariableCostInputChange} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="installment">Installment</InputLabel>
                <Input name="installment" onChange={handleFixCostInputChange} endAdornment={endInputPerMonth} />
              </FormControl>
            </FormControl>

            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Car Usage Cost
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="maintenance">Maintenance and repair</InputLabel>
                <Input defaultValue="240" name="maintenance" onChange={handleFixCostPerYearInputChange} endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="insurance">Insurance</InputLabel>
                <Input defaultValue="300" name="insurance" onChange={handleFixCostPerYearInputChange} endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="taxes">Registration and taxes</InputLabel>
                <Input defaultValue="60" name="taxes" onChange={handleFixCostPerYearInputChange} endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="carwash">Car wash</InputLabel>
                <Input defaultValue="120" name="carwash" onChange={handleFixCostPerYearInputChange} endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="garage">Garage expense</InputLabel>
                <Input defaultValue="120" name="garage" onChange={handleFixCostPerYearInputChange} endAdornment={endInput} />
              </FormControl>
            </FormControl>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Fuel Costs
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="fuel">Fuel Costs</InputLabel>
                <Input defaultValue="150" name="fuel" onChange={handleFixCostInputChange} endAdornment={endInputPerMonth} />
              </FormControl>
            </FormControl>

            <FormControl>
              <Button variant="outlined" color="primary" className={classes.margin} onClick={submitPlan}>
                Submit
              </Button>
            </FormControl>
          </Fragment>
        )}
        {category === 'house' && (
          <Fragment>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Purchase Cost
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="down_payment">Down payment</InputLabel>
                <Input name="down_payment" />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="installment">Installment</InputLabel>
                <Input name="installment" endAdornment={endInputPerMonth} />
              </FormControl>
            </FormControl>

            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Maintenance and repair
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="maintenance">Plumbing</InputLabel>
                <Input defaultValue="240" name="maintenance" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="insurance">Insurance</InputLabel>
                <Input defaultValue="300" name="insurance" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="interior">Interior</InputLabel>
                <Input defaultValue="120" name="interior" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="exterior">Exterior</InputLabel>
                <Input defaultValue="60" name="exterior" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="service">Maintainace service</InputLabel>
                <Input defaultValue="120" name="service" endAdornment={endInput} />
              </FormControl>
            </FormControl>

            <FormControl>
              <Button variant="outlined" color="primary" className={classes.margin}>
                Submit
              </Button>
            </FormControl>
          </Fragment>
        )}
        {category === 'pet' && (
          <Fragment>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Purchase Cost
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="down_payment">Payment</InputLabel>
                <Input name="down_payment" />
              </FormControl>
            </FormControl>

            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Lifetime Expense
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="food">Food</InputLabel>
                <Input defaultValue="600" name="food" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="grooming">Grooming</InputLabel>
                <Input defaultValue="200" name="grooming" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="medical">Medical</InputLabel>
                <Input defaultValue="500" name="medical" endAdornment={endInput} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="toy">Toy</InputLabel>
                <Input defaultValue="200" name="toy" endAdornment={endInput} />
              </FormControl>
            </FormControl>

            <FormControl>
              <Button variant="outlined" color="primary" className={classes.margin}>
                Submit
              </Button>
            </FormControl>
          </Fragment>
        )}
        {category === 'other' && (
          <Fragment>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Other purchase on credit
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="monthly_payment">Monthly payment</InputLabel>
                <Input name="monthly_payment" />
              </FormControl>
            </FormControl>

            <FormControl>
              <Button variant="outlined" color="primary" className={classes.margin}>
                Submit
              </Button>
            </FormControl>
          </Fragment>
        )}
      </Box>
      <CostPredictionModal open={isOpen} onClose={() => setIsOpen(false)} series={plan} />
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CostPredictionModal = ({ series, open, onClose }) => {
  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Projection for next 12 months</DialogTitle>
      <DialogContent>
        {!!series && (
          <>
            <ProjectedSavingGoal goal={12000} series={series} /> <CostList series={series} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
