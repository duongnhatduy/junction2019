import React, { useState, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Card, Box, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

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
    maintenance: 100,
    insurance: 60,
    taxes: 75,
    carwash: 10,
    garage: 10,
    fuel: 150,
  });
  const [variableCost, setVariableCost] = useState({
    down_payment: 0,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [plan, setPlan] = React.useState(null);

  const [category, setCategory] = useState('');
  const [timeAmount, setTimeAmount] = useState(1);
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
    console.log(newPlan, 'newPlan');
    setPlan(newPlan);
    setIsOpen(true);
  };

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
            {categories.map(({ value, label }) => (
              <option value={value} key={value}>
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
                <Input name="installment" onChange={handleFixCostInputChange} />
              </FormControl>
            </FormControl>

            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Car Usage Cost
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="maintenance">Maintenance and repair</InputLabel>
                <Input defaultValue="100" name="maintenance" onChange={handleFixCostInputChange} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="insurance">Insurance</InputLabel>
                <Input defaultValue="60" name="insurance" onChange={handleFixCostInputChange} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="taxes">Registration and taxes</InputLabel>
                <Input defaultValue="75" name="taxes" onChange={handleFixCostInputChange} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="carwash">Car wash</InputLabel>
                <Input defaultValue="10" name="carwash" onChange={handleFixCostInputChange} />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="garage">Garage expense</InputLabel>
                <Input defaultValue="10" name="garage" onChange={handleFixCostInputChange} />
              </FormControl>
            </FormControl>
            <FormControl fullWidth component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>
                Fuel Costs
              </FormLabel>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="fuel">Fuel Costs</InputLabel>
                <Input defaultValue="150" name="fuel" onChange={handleFixCostInputChange} />
              </FormControl>
            </FormControl>

            <FormControl>
              <Button variant="outlined" color="primary" className={classes.margin} onClick={submitPlan}>
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
