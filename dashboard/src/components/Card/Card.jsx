import React from 'react'
import "./Card.scss"
import {useState} from 'react'
import {AnimateSharedLayout} from "framer-motion"

function Card(props) {
    const [ expanded, setExpanded] = useState(false)
  return (
    
    <AnimateSharedLayout>
        {
            expanded? "expanded" : <CompactCard param={props} set/>
        }
    </AnimateSharedLayout>
  )
}

//card states
function CompactCard ({param}){


return (
    <div className="compactCard">
        <div className="radialBar">
            Motor speed
        </div>
        <div className="detail">
            <span>{param.title}</span>
            <span>{param.speed} <span>rpm</span></span>

        </div>
    </div>
)

}


export default Card