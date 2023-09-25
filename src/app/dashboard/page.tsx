"use client"

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AllTable from '../dtc/allTable'
import Shortener from '@/components/shortener'
const Dashboard = () => {

  const dispatch = useDispatch()

  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col justify-center w-full '>
        <Shortener />
      </div>
      <div id='second-row' className=''>
        <div className='flex flex-row m-1 p-4'>
          <AllTable />
        </div>
      </div>
    </div >
  )
}
export default Dashboard
