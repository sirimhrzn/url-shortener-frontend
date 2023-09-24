"use client"

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FadeLoader } from 'react-spinners'
import { RootState } from '../redux/store'
import { getAll } from '../redux/reducers/api'
const Dashboard = () => {

  const dispatch = useDispatch()

  //getAll api status 
  const apiLoadingStatus = useSelector((state: RootState) => state.allapi.loading)
  const apiData = useSelector((state: RootState) => state.allapi.data)
  const apiErrorStatus = useSelector((state: RootState) => state.allapi.error)
  const apiErrorMessage = useSelector((state: RootState) => state.allapi.errorMessage)

  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    //@ts-ignore
    dispatch(getAll())
  }, [])


  return (
    <div className='min-h-full flex flex-col p-2 m-2 space-y-4'>
      <div className='flex flex-col justify-center w-full border border-dotted'>
        <div className='w-full flex-row justify-center items-center space-x-4 p-4 m-4'>
          <input type="text" placeholder="Paste your link" className="input w-[72%]" />
          <button className='btn btn-primary w-[25%]' onClick={() => setLoading(!loading)}>Shorten</button>
        </div>
        <div className='px-8'>
          <div className='w-full bg-[#3F2E3E] flex justify-center flex-col rounded-xl'>
            {
              loading ?
                <div className='h-[7rem] flex flex-col items-center justify-center '>
                  <div className='flex flex-row items-center'>
                    <FadeLoader
                      loading={loading}
                    />
                    <h2>
                      Generating short url
                    </h2>
                  </div>
                </div>
                :
                <></>
            }
          </div>
        </div>
      </div>
      <div id='second-row' className='  '>
        <div className='flex flex-row gap-3'>
          <div id='table1' className='w-full max-w-xl'>
            <div className="overflow-x-auto">
              <table className="table bg-white">
                {/* head */}
                <thead>
                  <tr>
                    <th>Alias</th>
                    <th>Original URL</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    apiLoadingStatus ?
                      <h1>Loading...</h1> :
                      <>
                        {
                          apiData.map((value, index) => (
                            <tr key={index}>
                              <td>{value.alias}</td>
                              <td>{value.original_url}</td>
                              <td>{value.clicks}</td>
                            </tr>
                          ))
                        }
                      </>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default Dashboard
