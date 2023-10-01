"use client"

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AllTable from '../dtc/allTable'
import Shortener from '@/components/shortener'
import URLDetail from '@/components/urldetails'
import StatBox from '@/components/statbox'
const Dashboard = () => {

  const dispatch = useDispatch()

  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col justify-center w-full '>
        <Shortener />
      </div>

      <div id='second-row' className='flex  flex-col'>
        <StatBox />
      </div>
      <div id='second-row' className='flex flex-col'>
        <div className='flex flex-row px-4'>
          <AllTable />
        </div>
        <div id="details" className='px-4'>
          <URLDetail />
        </div>
      </div>
    </div >
  )
}
export default Dashboard
