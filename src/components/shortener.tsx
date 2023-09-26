import { ShortenPayload, resetState, shortenURL } from "@/app/redux/reducers/createalias"
import { RootState } from "@/app/redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


const Shortener = () => {
  const dispatch = useDispatch()
  const shortener = useSelector((state: RootState) => state.shorten)

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
    if (!shortener.loading) {
      setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
  }, [shortener.loading])


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
            <div className="toast toast-end">
              <div className="alert alert-error">
                <span>{shortener.errorMessage}</span>
              </div>
            </div> :
            <></>
        }
        {
          !shortener.error && shortener.data.shortened_url !== "" ?
            <>
              <div className="toast toast-end">
                <div className="alert alert-success">
                  <span>Link has been generated: {shortener.data.shortened_url}</span>
                </div>
              </div>
            </> :
            <></>
        }
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
