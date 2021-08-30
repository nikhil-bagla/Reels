import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Box from "@material-ui/core/Box";
import { Container, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20vh',
    
        
    },
    input: {
        display: 'none',
    },
    form: {
        flexDirection: "column",
        display: "flex",
        alignItems:"center",
        justifyContent: "center",
        flexWrap: "nowrap",
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
            setError(err)
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
        <div>
            <Box
                className={classes.root}
                
                
                
            >
                
                <form onSubmit={handleSignup}
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    
                >
                    <Typography
                        variant="h4"
                    style={{fontFamily:"cursive"}}>Instagram</Typography>
                    <Typography
                    style={{color:'grey',margin:'2rem'}}>Sign up to see photos and videos from your friends.</Typography>
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
                            style={{ maxWidth: "70%", margin: '2rem' }} variant="contained" type="file" accept="image/*" onChange={handleFileSubmit}>Upload</OutlinedInput>
                </FormControl>
                
                <Button type="submit" disabled={loading} variant="contained" color="primary">
                    Sign Up
</Button>
                

                    </form>
                
            </Box>
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

export default Signup
