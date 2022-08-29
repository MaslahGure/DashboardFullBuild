import React, { useState } from 'react'
import "./sidebar.scss"
import Logo from "../../img/CarioLog.png"

import { SidebarData } from '../../Resources/Resources'


function Sidebar() {
    const [selected,setSelected]=useState(0);
  return (
    <div className='Sidebar'>
        <div className="logo">
            <img src={Logo} alt="" />
            <span>Cairo Lab</span>
        </div>
        <div className="menu">
            {SidebarData.map((item,index) =>{
                return (
                    <div className={selected === index? "menuItem active":"menuItem"}
                     key = {index}
                     onClick = {()=>{setSelected(index)}}>

                       <span>icon</span> 
                        <span>
                            {item.heading}
                        </span>
                    </div>

                     )
                })}

        </div>
    </div>
  )
}

export default Sidebar