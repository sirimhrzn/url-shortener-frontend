"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FadeLoader } from 'react-spinners'
import { RootState } from '../redux/store'
import { getAll } from '../redux/reducers/api'
import Link from 'next/link'
import { ShortenPayload, Shortened, shortenURL } from '../redux/reducers/createalias'
const Dashboard = () => {

  const dispatch = useDispatch()

  //getAll api status 
  const apiLoadingStatus = useSelector((state: RootState) => state.allapi.loading)
  const apiData = useSelector((state: RootState) => state.allapi.data)
  const apiErrorStatus = useSelector((state: RootState) => state.allapi.error)
  const apiErrorMessage = useSelector((state: RootState) => state.allapi.errorMessage)

  //shorten
  const shortener = useSelector((state: RootState) => state.shorten)

  const [shortenPayload, setShortenPayload] = useState<ShortenPayload>({
    url: "",
    alias: ""
  })

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...shortenPayload }
    // @ts-ignore
    data[e.target.id] = e.target.value
    setShortenPayload(data)
  }

  const [loading, setLoading] = useState<boolean>(false)

  const submitPayload = () => {
    setLoading(true)
    //@ts-ignore
    dispatch(shortenURL(shortenPayload))

  }
  useEffect(() => {
    //@ts-ignore
    dispatch(getAll())
  }, [])


  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col justify-center w-full '>
        <div className='w-full flex-row justify-center items-center space-x-4 p-4 m-4'>
          <input type="text" onChange={(e) => inputOnChange(e)} id="url" placeholder="Paste your link" className="input w-[50%]" />
          <input type="text" placeholder="Alias" onChange={(e) => inputOnChange(e)} id="alias" className="input w-[22%]" />
          <button className='btn btn-primary w-[25%]' onClick={() => submitPayload()}>Shorten</button>
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
                      {shortener.errorMessage}
                    </h2>
                  </div>
                </div>
                :
                <></>
            }
          </div>
        </div>
      </div>
      <div id='second-row' className=''>
        <div className='flex flex-row m-1 p-4'>
          <div id='table1' className='w-full max-w-xl'>
            <div className="overflow-x-auto">
              <table className="table bg-white shadow-3xl">
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
                              <Link href={value.original_url}><td>{value.original_url}</td></Link>
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
