import React from 'react'
import {BottomLink} from './Design.styled'

function Footer() {
  return (
    <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            <div>
                <div className="text-white text-2xl font-bold">SHARK LABS</div>
                <div className="mt-3 text-fifth text-sm">
                   &copy; Copyright by Shark Labs 2022, All rights reserved
                </div>       
            </div>
            <div className="text-left sm:text-left md:text-left lg:text-right xl:text-right">
                <BottomLink>Homepage</BottomLink>
                <BottomLink>Trade $SHARKTEETH</BottomLink>
                <BottomLink>Staking</BottomLink>
                <div className="text-left mt-3 sm:text-left md:text-left lg:text-right xl:text-right">
                    <i className="fab fa-twitter mr-7 text-white text-sm"></i>
                    <i className="fab fa-facebook mr-7 text-white text-sm"></i>
                    <i className="fab fa-discord mr-2 text-white text-sm"></i>
                </div>
            </div>
    </div>
    
  )
}

export default Footer