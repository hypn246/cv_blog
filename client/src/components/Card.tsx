import React from 'react'
import { FC } from 'react';
interface CardProps {
  title: string;
  author: string;
  time: string;
}
const Card: FC<CardProps> = (props) => {
  return (
        <div className='p-4 card'>
            <h1>{props.title}</h1>
            <p>{props.author}</p>
            <i>--{props.time}--</i>
        </div>
  )
}

export default Card