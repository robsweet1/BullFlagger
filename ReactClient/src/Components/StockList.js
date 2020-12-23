import React, { useState, useEffect, useRef } from 'react'
import {Box, DataTable, Text, Grommet} from 'grommet'
import {theme} from '../theme'



const StockList = (props) => {
    const [list, setList] = useState(props.stockList)
    const [timeHeader, setTimeHeader] = useState('One Month Consolidation')
    const [timeframe, setTimeframe] = useState('One_Month_Consolidation')
    const prevStockList = useRef(0);

    const cleanList = (rawList) => {
        var cleanList = []
        setTimeframe(props.timeframe)
        for(let i = 0; i < rawList.length; i++){
            var data = rawList[i]
            data[props.timeframe] = parseFloat((data[props.timeframe] * 100).toFixed(2))
            cleanList[i] = data
        }
        setList(cleanList)
    } 

    useEffect(() => {
        if(prevStockList.current !== props.stockList){
            prevStockList.current = props.stockList
            cleanList(props.stockList)
        }
        if(props.timeframe === 'One_Month_Consolidation')
            setTimeHeader('One Month Consolidation')
        else if(props.timeframe === 'Three_Month_Consolidation')
            setTimeHeader('Three Month Consolidation')
        else if(props.timeframe === 'Six_Month_Consolidation')
            setTimeHeader('Six Month Consolidation')
    }, [props.stockList, props.timeframe])


    return(
        <Grommet theme={theme}>
        <Box pad={{bottom: 'xlarge'}}>
            <DataTable
            border={{
                header: "bottom",
                body: {
                  color: "dark-3",
                  side: "bottom"
                }}
            }
            columns={[
                {
                    property: 'name',
                    header: <Text>Symbol</Text>,
                    primary: true
                },
                {
                    property: 'currentValue',
                    header: <Text>Price</Text>,
                    render: datum => ( <Text>{'$' + datum.currentValue}</Text>)
                },
                {
                    property: props.timeframe,
                    header: <Text>{timeHeader}</Text>,
                    render: datum => ( <Text>{datum[timeframe] + '%'}</Text>)
                }
            ]}
            data={
                list
            }
            size='large'
            sortable={true}
            >
            </DataTable>
        </Box>
        </Grommet>
    )
}

export default StockList