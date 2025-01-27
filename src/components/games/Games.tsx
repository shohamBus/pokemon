import React from 'react'
import { NameToPicture } from './nameToPicture/NameToPicture'
import './games.scss'

export const Games = () => {
  return (
    <div>
        <div className='go-back-section'>
        <a
                className='arrow-back'
                onClick={ () => window.history.back() }
            />
            <span className='go-back'>Go Back</span>
            </div>
            <NameToPicture type='ice'/>
    </div>
  )
}
