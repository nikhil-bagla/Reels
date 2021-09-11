import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Context/AuthProvider"
import { database } from "../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles'
function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [post, setPost] = useState(null);
    const history = useHistory();
    useEffect(() => {
        let parr=[];
        const unsub = database.users.doc(currentUser.uid).get().then((doc) => {
            // console.log(doc.data());
            setUserData(doc.data())
            parr = [];
            doc.data().postIds.map((pid) => {
                database.posts.doc(pid).get().then((doc1) => {
                    let purl = doc1.data().pUrl;
                    let data = { purl, postId: doc1.id }
                    parr.push(data)
                    
                })

                setTimeout(() => {
                    setPost(parr)
                },1000)
                
                // console.log(parr,'just bahar');
                
            })
            
            // console.log(parr,'bahar');
            
        })
        return unsub;

    }, [currentUser])
    

    useEffect(() => {

        if (currentUser) {
            history.push(`/profile/${currentUser.uid}`)    //if logged in then /profile route DOENOT WORKS
        }

    }, [])


    return (
        <>
            {
                userData == null ? <CircularProgress /> : <>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem' }}>
                        <img src={userData.profileUrl}
                            style={{ height: '30vh', borderRadius: '50%' }} />
                        <div style={{ fontWeight: 'bold' }}>{userData.username}
                            <div>{userData.email}</div></div>

                    </div>
                    {/* {console.log(post)} */}

                    <hr style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: 2,
                        borderColor: '#000000',
                        margin: '2rem',
                        marginTop:'2rem'
                    }} />
                    <div className='place'
                        style={{ height: '5vh' }}>
                    </div>
                    <div className="video-container" style={{ display: 'flex' }}>
                        { 
                            post?.map((pdata) => (
                                <React.Fragment key={pdata.postId}>
                                    {/* {console.log(pdata)} */}
                                    <div style={{display:'flex',justifyContent:'center',margin:'0rem'}}>
                                        <video className='video-styles2'
                                            autoPlay={false}
                                            id={pdata.postId}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(e.target.paused)
                                                    e.target.play()
                                                else
                                                    e.target.pause()
                                            console.log(e.target)}}
                                            type="video/mp4"
                                            style={{ width: '30vw', height: '60vh', padding:'0vw' }}>
                                            <source src={pdata.purl} type="video/webm" />
                                        </video>
                                        
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Profile
