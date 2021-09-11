import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Container, Typography,Grid,Card,CardMedia,CardContent,CardActions} from '@material-ui/core';
import insta from "./insta.png"
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20vh',
    
        
    },
    input: {
        display: 'none',
    },
    alignCenter: {
        justifyContent: "center"
    },
    centerDivs: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        width: "90vw",
        
        alignItems: "center",
    },
    centerElements: {
        display: "flex",
        flexDirection: "column",
    }, fullWidth: {
        width: "100%"
    },
    image: {
        width: '70%',
        paddingTop: '20%',
        marginLeft: '3.5rem',
        marginTop:'2rem'
    }

}));

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null);
    const [error, setError] = useState('')
    const { signup,currentUser } = useContext(AuthContext);
    const history = useHistory();
    console.log(signup);

    const classes = useStyles();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);


            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);  //image is stored in the storage 
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            //fn1-Progress tracking
            //fn2-Error
            //fn3-Success

            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('upload is' + progress + '%done')
            }

            function fn2(error) {
                setError(error)
                setTimeout(() => {
                    setError('');
                }, 200)
                setLoading(false)
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL()  //gets url od uploaded image to  be saved in users collection in respective user's document
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoading(false)
                alert(`${name} has signed Up`)
                history.push('/')   //simply sets url to default after successfull signup
            }

        } catch (err) {
            setError('Failed to Sign Up')
            setTimeout(() => setError(''), 2000);
            setLoading(false)
        }
    }

    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file != null) {
            setFile(file);
        }
    }
    useEffect(() => {
        if (currentUser) {
            history.push('/')    //cant go to signup route after signup is done
        }
    }, [])
    return (
        <div className={classes.centerDivs}>
                <Container>
                <Grid container className={classes.alignCenter} spacing={2}>
                    <Grid item sm={4}>
                        
                <form onSubmit={handleSignup}
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    
                            >
                            <Card variant="outlined">
                                <CardMedia
                                    image={insta}
                                    className={classes.image}
                                />
                                {error ? <Alert severity="error" style={{ marginBottom: '0.2rem' }}>{error}</Alert> : <></>}
                                <CardContent className={classes.centerElements}>
                    <Typography
                    style={{color:'gray',margin:'1rem',fontWeight:'bold',paddingLeft:'1.5rem'}}>Sign up to see photos and videos from your friends.</Typography>
                <FormControl variant="outlined">
                    {/* <InputLabel htmlFor="component-outlined">UserName</InputLabel> */}
                    <OutlinedInput type="text" id="component-outlined" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="UserName" />
                </FormControl>
                <FormControl variant="outlined">
                    {/* <InputLabel htmlFor="component-outlined">Email</InputLabel> */}
                    <OutlinedInput type="email" id="component-outlined" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                </FormControl>
                <FormControl variant="outlined">
                    {/* <InputLabel htmlFor="component-outlined">Password</InputLabel> */}
                    <OutlinedInput  type="password" id="component-outlined" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                </FormControl>
                <FormControl >
                        <OutlinedInput
                            style={{ maxWidth: "70%", margin: '2rem',padding:'0.2rem' }} variant="contained" type="file" accept="image/*" onChange={handleFileSubmit} placeholder="Password" >Upload</OutlinedInput>
                </FormControl>
                                    
                
                                </CardContent>
                                <CardActions>
                                <Button type="submit"
                                    disabled={loading} className={classes.fullWidth} variant="contained" color="primary">
                                    Sign Up
                                    </Button>
                                </CardActions>
                                
                            </Card>
                            <Card variant="outlined"  style={{marginTop:'1rem'}}>
                                <Typography style={{ textAlign: "center" }}>
                                    Have an account?
                                    <LinkButton
                                        content="Log in"
                                        route="/login"
                                    ></LinkButton>

                                </Typography>
                            </Card>

                            </form>
                       
                    </Grid>
                </Grid>
                </Container>
            {/* <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="">UserName</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="profile">Profile Image</label>
                    <input type="file"  accept="image/*" onChange={handleFileSubmit} />
                </div>
                <button type="submit" disabled={loading}>Sign Up</button>
            </form> */}
        </div>
    )
}
function LinkButton(prop) {
    return (
        <Button variant="text" style={{ color: "blue" }}>
            <Link to={prop.route} >
                {prop.content}
            </Link>
        </Button>
    )
}

export default Signup
