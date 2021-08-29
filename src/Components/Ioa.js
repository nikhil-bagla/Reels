import React,{useState,useEffect} from 'react'
import vid1 from "./vid1.mp4"
import vid2 from "./vid.mp4"
import vid3 from "./vid3.mp4"
import vid4 from "./vid4.mp4"
import Video from "./Video"
function Ioa() {
    const [sources, setSources] = useState([{ url: vid1 }, { url: vid2 }, { url: vid3 },{url:vid4}])
    const callback = entries => {
        entries.forEach(element => {
            console.log(element)
            let el = element.target.childNodes[0];
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })

            //play is async while pause is sync so at we first we play all the videos and when a video comes 
            //into viewport,it can be paused easily at that time
        })

        
    }
    
    const observer = new IntersectionObserver(callback,
        {
        threshold:0.9    //90% ate hi viewport mai play ho jaegi video
        })
    useEffect(() => {
        console.log('Effect');
        let elements = document.querySelectorAll('.videos')
        elements.forEach(el => {
            observer.observe(el)   //observer is attached to videos,then callback function is called in line 9
        })
    }, [])
    
    return (
        <div className='video-container'>
            <div className='videos'>
                <Video source={sources[0].url}/>
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />
            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />
            </div>
        </div>
    )
}

export default Ioa
