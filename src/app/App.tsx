import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

// import React, { useCallback, useEffect } from 'react';
// import './App.css';
// import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar } from '@material-ui/core';
// import { TodolistsList } from '../features/TodolistsList/TodolistsList';
// import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
// import { useSelector } from 'react-redux';
// import { appActions } from '../features/Application';
// import { Route } from 'react-router-dom';
// import { authActions, authSelectors, Login } from '../features/Auth';
// import { selectIsInitialized, selectStatus } from '../features/Application/selectors';
// import { useActions } from '../utils/redux-utils';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
}
// function App({demo = false}: PropsType) {
//     const status = useSelector(selectStatus)
//     const isInitialized = useSelector(selectIsInitialized)
//     const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
//
//     const {logout} = useActions(authActions)
//     const {initializeApp} = useActions(appActions)
//
//     useEffect(() => {
//         if (!demo) {
//             initializeApp()
//         }
//     }, [demo, initializeApp])
//
//     const logoutHandler = useCallback(() => {
//         logout()
//     }, [logout])
//
//     if (!isInitialized) {
//         return <div
//             style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
//             <CircularProgress/>
//         </div>
//     }
//
//     return (
//         <div className="App">
//             <ErrorSnackbar/>
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: 'flex-end'}}>
//                     {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
//                 </Toolbar>
//                 {status === 'loading' && <LinearProgress/>}
//             </AppBar>
//             <Container fixed>
//                 <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
//                 <Route path={'/login'} render={() => <Login/>}/>
//             </Container>
//         </div>
//     )
// }
export default App
