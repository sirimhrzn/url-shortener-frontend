import { ShortenPayload, resetState, shortenURL } from "@/app/redux/reducers/createalias"
import { RootState } from "@/app/redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FadeLoader } from "react-spinners"
import Toast from "./toast"
import Link from "next/link"
import { reset } from "@/app/redux/reducers/deleteURL"
import { getAll } from "@/app/redux/reducers/api"

const Shortener = () => {
  const dispatch = useDispatch()
  const shortener = useSelector((state: RootState) => state.shorten)
  const deleteState = useSelector((state: RootState) => state.deleteURL)

  const [shortenPayload, setShortenPayload] = useState<ShortenPayload>({
    url: "",
    alias: ""
  })
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...shortenPayload }
    // @ts-ignore
    data[e.target.id] = e.target.value
    dispatch(resetState())
    setShortenPayload(data)
  }
  const [loading, setLoading] = useState<boolean>(false)

  const submitPayload = () => {
    setLoading(true)
    //@ts-ignore
    dispatch(shortenURL(shortenPayload))

  }
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      dispatch(getAll({ limit: 5, page: 1 }))
    }, 500);
    setTimeout(() => {
      dispatch(reset())
    }, 2500);

  }, [deleteState.deleted])

  return (
    <>

      <div className='w-full flex-row justify-center items-center space-x-4 p-4 '>
        <div className="join w-full">
          <input type="text" onChange={(e) => inputOnChange(e)} id="url" placeholder="Paste your link" className="join-item input w-[60%]" />
          <input type="text" placeholder="Alias" onChange={(e) => inputOnChange(e)} id="alias" className="input w-[22%] join-item" />
          <button className='btn btn-primary w-[25%] join-item' onClick={() => submitPayload()}>Shorten</button>
        </div>
      </div>
      <div className="px-4">
        {
          shortener.error ?
            <Toast alertType="error" alertMessage={shortener.errorMessage} /> :
            <></>
        }
        {
          !shortener.error && shortener.data.shortened_url !== "" ?
            <>
              <Toast alertType="success" alertMessage={` Link has been generated: ${shortener.data.shortened_url}`} />
            </> :
            <></>
        }
        <div>
          {
            deleteState.deleted ?
              <Toast alertType="success" alertMessage={deleteState.data.message} />
              :
              <></>
          }
        </div>
      </div>
      {
        shortener.loading ?
          <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-xs"></span>
          </div>
          :
          <></>
      }
    </>
  )
}

export default Shortener
