import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, Container, Button, Tooltip, FormControl, InputLabel, MenuItem, Grid } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
      minHeight: 56,
    },
    selectEmpty: {
      marginTop: 0,
    },
  }));
  


const InputField = (props) => {
    const classes = useStyles();
    const [consolidation, setConsolidation] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const [timeframe, setTimeframe] = useState('One')
    const [listing, setListing] = useState('SP500')

    const screenStocks = () => {
        const consPercent = (parseInt(consolidation) / 100)
        const hilo_time   = hiloSwitch(timeframe)
        axios.get('api/getdata', {
                params: {
                    percentage: consPercent,
                    timePeriod: hilo_time,
                    stockListing: listing,
                    minPrice: parseInt(minPrice)
                }
            })
            .then(res =>
                {handleCallBacks(res)})
    }

    const hiloSwitch = (timeframe) =>{
        switch(timeframe){
            case 'One':
                return 'One_Month_Consolidation'
            case 'Three':
                return 'Three_Month_Consolidation'
            case 'Six':
                return 'Six_Month_Consolidation'
        }
    }


    const handleCallBacks = (res) =>{
        props.timeframeCallBack(hiloSwitch(timeframe))
        props.stocksCallBack(res.data)
    }

    const handleTimeChange = (event) =>{
        setTimeframe(event.target.value)
    }

    const handleListingChange = (event) => {
        setListing(event.target.value)
    }

    const cleanTextInput = (value, setFunction) => {
        setFunction(value.replace(/[^0-9]/g, ''))
        if(setFunction === setConsolidation){
            if (value.length > 3){
                setFunction(value.substring(0,3))
            }
            if (parseInt(value) > 100){
                setFunction('' + (Math.floor(parseInt(value) / 10)))
            }
        }
    }


    return (
        <div style={{ padding: 20 }}>
            <Grid 
                container
                spacing={1}
                direction="row"
                justify='flex-start'
                alignItems="center"
            >
                <Grid item >
                    <Tooltip title='A percentage range relative to the current value'>
                        <TextField
                            id="outlined-required"
                            label="Max Consolidation"
                            variant="outlined"
                            value={consolidation}
                            onChange={({ target: { value } }) => cleanTextInput(value, setConsolidation)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item >
                    <TextField
                        id="outlined-required"
                        label="Minimum Price"
                        variant="outlined"
                        value={minPrice}
                        onChange={({ target: { value } }) => cleanTextInput(value, setMinPrice)}
                    />
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">TimeFrame (Months)</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={timeframe}
                            onChange={handleTimeChange}
                        >
                            <MenuItem value={'One'}>One</MenuItem>
                            <MenuItem value={'Three'}>Three</MenuItem>
                            <MenuItem value={'Six'}>Six</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Listing</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={listing}
                            onChange={handleListingChange}
                        >
                            <MenuItem value={'SP500'}>SP500</MenuItem>
                            <MenuItem value={'NYSE'}>NYSE</MenuItem>
                            <MenuItem value={'NASDAQ'}>NASDAQ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => screenStocks()}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
export default InputField

