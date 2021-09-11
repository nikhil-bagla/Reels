import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import insta from "./insta.png"
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AuthContext } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';
import Profile from './Profile';
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "black",
        fontFamily: 'Cursive'
    },
    appb: {
        backgroundColor: "white"
    },
    icon: {
        color: "black",
        // backgroundImage: `url(${car})`

    },
    iconbtn: {
        marginRight:'0.8rem'
    }
    
}));

export default function Header(props) {
    const classes = useStyles();
    let url=(props.userData.profileUrl);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { logout } = React.useContext(AuthContext);
    const history = useHistory();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        <Profile/>
    };

    const handleLogout =async () => {
        await logout();
        history.push('/login')
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appb} position="fixed">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        <img src={insta} alt="image" 
                            style={{width:'9vw',marginTop:'1rem'} }/>
                    </Typography>
                    {(
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                
                            >
                                {/* <img src={url} alt="ProfileImg"
                                    style={ {height:'6vh',width:'100%',borderRadius:'50%'}}/> */}
                                <Avatar src={url}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}
                                ><AccountCircleOutlinedIcon className={classes.iconbtn}/><LinkButton
                                    content="Profile"
                                    route="/profile"
                                    
                                ></LinkButton></MenuItem>
                                <MenuItem onClick={handleLogout}><ExitToAppOutlinedIcon className={classes.iconbtn}/>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

function LinkButton(prop) {
    return (
        
        <Link to={prop.route}
            style={{ color: 'black' }}>
            {prop.content}
            </Link>
        
    )
}