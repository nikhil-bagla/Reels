import React from 'react'
import Navbar from "./Navbar";
import Buttons from "./Buttons"
import Cards from "./Cards"
import VidCard from "./VidCard"
function Main() {
    return (
        <div>
            <Navbar/>
            {/* <Buttons /> */}
            <Cards />
            <VidCard/>
        </div>
    )
}

export default Main

