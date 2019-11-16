import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

import { purchasePredict } from './purchase_predict';
import { CostList } from '../Overview/CostList';
import { OverviewDumb } from '../Overview';

const categories = [
  { label: 'House', value: 'house' },
  { label: 'Vehicle', value: 'vehicle' },
  { label: 'Pet', value: 'pet' }
];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {}
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    // margin: theme.spacing(1),
  },
  formControl: {
    // margin: theme.spacing(3),
  },
  formRow: {
    // margin: theme.spacing(1),
  },
  fab: {}
}));

export function PurchasePlan() {
  const classes = useStyles();
  const [fixCost, setFixCost] = useState({
    installment: 0,
    maintenance: 0,
    insurance: 0,
    taxes: 0,
    carwash: 0,
    garage: 0,
    fuel: 0
  });
  const [variableCost, setVariableCost] = useState({
    down_payment: 0
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [plan, setPlan] = React.useState(null);

  const [category, setCategory] = useState('');
  const [timeAmount, setTimeAmount] = useState(1);
  const [purchaseValue, setPurchaseValue] = useState(0);
  const handleChange = event => {
    setCategory(event.target.value);
  };
  const handleFixCostInputChange = event => {
    const { name, value } = event.target;
    setFixCost(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleVariableCostInputChange = event => {
    const { name, value } = event.target;
    setVariableCost(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const submitPlan = () => {
    const newPlan = purchasePredict('CAR', fixCost, variableCost);
    console.log(newPlan, 'newPlan');
    setPlan(newPlan);
    setIsOpen(true);
  };

  return (
    <Card>
      <Box p={1}>
        {/* <FormControl className={classes.margin}>
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
          <InputLabel htmlFor="demo-customized-textbox">Duration (month)</InputLabel>
          <BootstrapInput id="demo-customized-textbox" value={timeAmount} onChange={(event) => setTimeAmount(event.target.value)} />
        </FormControl> */}
        <FormControl
          fullWidth
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Purchase Cost</FormLabel>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="down_payment">Down payment</InputLabel>
            <Input
              name="down_payment"
              onChange={handleVariableCostInputChange}
            />
          </FormControl>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="installment">Installment</InputLabel>
            <Input name="installment" onChange={handleFixCostInputChange} />
          </FormControl>
        </FormControl>

        <FormControl
          fullWidth
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Car Usage Cost</FormLabel>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="maintenance">
              Maintenance and repair
            </InputLabel>
            <Input
              defaultValue="100"
              name="maintenance"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="insurance">Insurance</InputLabel>
            <Input
              defaultValue="60"
              name="insurance"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="taxes">Registration and taxes</InputLabel>
            <Input
              defaultValue="75"
              name="taxes"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="carwash">Car wash</InputLabel>
            <Input
              defaultValue="10"
              name="carwash"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="garage">Garage expense</InputLabel>
            <Input
              defaultValue="10"
              name="garage"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
        </FormControl>
        <FormControl
          fullWidth
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Fuel Costs</FormLabel>
          <FormControl className={classes.formRow}>
            <InputLabel htmlFor="fuel">Fuel Costs</InputLabel>
            <Input
              defaultValue="150"
              name="fuel"
              onChange={handleFixCostInputChange}
            />
          </FormControl>
        </FormControl>

        <FormControl>
          <Button
            variant="outlined"
            color="primary"
            className={classes.margin}
            onClick={submitPlan}
          >
            Submit
          </Button>
        </FormControl>
      </Box>

      <CostPredictionModal
        series={plan}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Card>
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
      <DialogTitle id="alert-dialog-slide-title">
        Projection for next 12 months
      </DialogTitle>
      <DialogContent>
        {!!series && (
          <OverviewDumb series={series} overview={{ goal: 12000 }} />
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
