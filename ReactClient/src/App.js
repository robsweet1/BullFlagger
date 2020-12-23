import React, {useState} from 'react'
import Navbar from './Components/Navbar'
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Container} from '@material-ui/core'
import InputField from './Components/InputField'
import StockList from './Components/StockList'
import { theme } from './theme'
import './App.css'


const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c'
    },
  },
})

const App = () => {
  const [returnList, setReturnList] = useState({})
  const [timeframe, setTimeframe] = useState()

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Navbar />
        <div style={{ paddingLeft: 40, paddingRight: 40}}>
          <InputField stocksCallBack={setReturnList} timeframeCallBack={setTimeframe} theme={theme}/>
          <StockList stockList={returnList} timeframe={timeframe}/>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
