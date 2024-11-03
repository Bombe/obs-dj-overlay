import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'

import Viewer from './components/Viewer'
import Admin from './components/Admin'

const defaultTheme = createTheme()
const theme = createTheme(defaultTheme, {
    palette: {
        greys: defaultTheme.palette.augmentColor({
            color: {
                main: '#f0f0f0'
            },
            name: 'greys'
        })
    }
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/*" element={<Admin/>}/>
                    <Route path="/preview" element={<Viewer/>}/>
                    <Route path="/" element={<a href={'/admin'}><Viewer/></a>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
