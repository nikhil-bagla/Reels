import React, { useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
    
}));
function UploadFile(){
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const type = ['video/mp4', 'video/weabm', 'video/ogg'];
    const onChange = (e) => {
        
    }
    return (
        <>
            {
                
                error != null ? <Alert severity="error">{error}</Alert>:<>
                    <input
                        type='file'
                        onChange={onChange}
                        id='icon-button-file'
                        style={{ display: 'none' }}    
                    />
                    <label htmlFor='icon-button-file'>
                        <Button
                            disable={loading}
                            variant="contained"
                            component='span'
                            className={classes.button}
                            size='medium'
                            color='secondary'
                            >Upload</Button>
                    </label>
                    {loading ? <LinearProgress color='primary' style={{ marginTop:'6%' }}/>:<></>}
                </>
          }  

        </>
    )
}

export default UploadFile
