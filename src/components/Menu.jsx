import React from 'react'

export default function Menu() {
  return (
    <div className='bg-[#DEAB4D] flex flex-col justify-between items-center rounded-[40px] text-inter text-[#ffffff] h-full gap-25 px-5 py-6'>
        <div>
            <img src="./avatar.png" alt="" className='h-[60px] w-[60px] rounded-[50%]'/>
        </div>
        <div className='flex flex-col gap-6 justify-between items-center'>
            <div className='flex flex-col items-center'>
            <img src="menu-icon-cloud.svg" alt="cloud-icon" className='h-[50px] w-[50px]' />
            <p className='text-[14px] font-semibold mt-[1px]'>weather</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src="menu-location.svg" alt="cloud-icon" className='h-[36.46px] w-[36.46px]' />
            <p className='text-[14px] font-semibold mt-[1px]'>explore</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src="menu-icon-location.svg" alt="cloud-icon" className='h-[42px] w-[30px]' />
            <p className='text-[14px] font-semibold mt-[1px]'>cities</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src="menu-icon-setting.svg" alt="cloud-icon" className='h-[45px] w-[45px]' />
            <p className='text-[14px] font-semibold mt-[1px]'>setting</p>
        </div>
        </div>
    </div>
  )
}
