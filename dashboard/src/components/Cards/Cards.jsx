import React from 'react'
import Card from '../Card/Card'
import "./Cards.scss"


function Cards({cardProp}) {
   // console.log(cardProp.posts)
  return (

    <div className='Cards'>
        {cardProp.posts.slice(0,1).map((data,index) => {
            return(
                <div className='Card' key = {index}>
                    <Card
                    title ="Motor a "
                    speed = {data.speed_a}
                    />
                </div>
            )
        })}
        {cardProp.posts.slice(0,1).map((data,index) => {
            return(
                <div className='Card' key = {index}>
                    <Card
                    title ="Motor b "
                    speed = {data.speed_b}
                    />
                </div>
            )
        })}
    </div>
  )
}

export default Cards