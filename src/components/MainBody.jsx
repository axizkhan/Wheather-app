import React from 'react'
import Menu from './Menu'
import ActivityArea from './ActivityArea'
import Information from './Information'

export default function MainBody({infoData}) {

  
  return (
    <div className=' flex mt-[10px] justify-between'>
     
           <div>
             <Menu/>
           </div>
    
        <div className='flex flex-col'>
            <div><ActivityArea/></div>
            <div></div>
        </div>
        <div>
            <Information Propdata={infoData}/>
        </div>
    </div>
  )
}
