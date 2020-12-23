import React from 'react'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box, Text} from 'grommet'

const Navbar = () => (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant="h6" >
                Bull-Flagger
            </Typography>
        </Toolbar>
    </AppBar>
)
export default Navbar