import { RootState } from "@/app/redux/store"
import { useDispatch, useSelector } from "react-redux"
import Link from 'next/link'
import { useState, useEffect } from "react"
import { getAll } from "@/app/redux/reducers/api"
import { RiRefreshLine } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import DeleteModal from "@/components/modal/deleteModal"
import { resetState } from "../redux/reducers/createalias"
import EditModal from "@/components/modal/editModal"
import { resetUpdateURL, updateURL } from "../redux/reducers/updateURL"
const AllTable = () => {
  const dispatch = useDispatch()

  const api = useSelector((state: RootState) => state.allapi)

  // updating alias api 
  const updateState = useSelector((state: RootState) => state.updateURL)

  type Paginate = {
    limit: number;
    page: number;
  }

  const [pagination, setPagination] = useState<Paginate>({
    limit: 5,
    page: 1
  })
  const paginate = (index: number) => {
    const data = { ...pagination }
    data.page = pagination.page + index
    if (api.data.length < 5 && index == 1) {
      return
    }
    if (api.data == null && index == 1) {
      return
    }
    if (pagination.page <= 1 && index == -1) {
      return
    }
    setPagination(data)
  }

  const [tableEdit, setTableEdit] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)

  const [currentAlias, setCurrentAlias] = useState<string>("")
  const [alias, setAlias] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  type UpdatePayload = {
    alias: string | undefined;
    url: string | undefined;
    current_alias: string;

  }

  const [updatePayload, setUpdatePayload] = useState<UpdatePayload>({
    alias: "",
    url: "",
    current_alias: currentAlias
  })

  const updateURLData = () => {
    //@ts-ignore
    dispatch(updateURL(alias, updatePayload))
  }
  useEffect(() => {
    setUpdatePayload({
      alias: alias,
      url: url,
      current_alias: currentAlias
    })
    console.log(updatePayload)
  }, [url, alias])
  useEffect(() => {
    //@ts-ignore
    dispatch(getAll(pagination))
  }, [pagination, reload])
  useEffect(() => {
    if (!updateState.loading) {
      document.getElementById('my_modal_1')?.close()
      setTimeout(() => {
        dispatch(resetUpdateURL())
      }, 3000)
    }
  }, [updateState.loading])

  return (
    <div id='table1' className='w-full space-y-2'>
      <div className="overflow-x-auto">
        <table className="table bg-white  shadow-3xl">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Original URL</th>
              <th>Clicks</th>
              {
                tableEdit ?
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                  :
                  <></>
              }
            </tr>
          </thead>
          <tbody>
            {
              api.loading ?
                <div className="w-full flex justify-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
                : <></>}
            {
              !api.error ?
                <>
                  {
                    api.data.map((value, index) => (
                      <tr key={index}>
                        <td title={value.shortened_url}> <Link href={value.shortened_url}>{value.alias}</Link></td>
                        <td><Link href={value.original_url}>{value.original_url}</Link></td>
                        <td>{value.clicks}</td>
                        {
                          tableEdit ?
                            <>
                              <td> <button className="btn btn-xs" onClick={() => {
                                document.getElementById('my_modal_1')?.showModal()

                                setCurrentAlias(value.alias)
                                setAlias(value.alias)
                                setUrl(value.original_url)
                              }
                              }>
                                <FiEdit />
                              </button></td>
                              <td> <button className="btn btn-xs" onClick={() => {
                                document.getElementById('my_modal_2')?.showModal()
                                setAlias(value.alias)
                              }
                              }><RiDeleteBin5Fill /></button></td>
                            </> : <></>
                        }
                      </tr>
                    ))
                  }
                </> :
                <h1> No data</h1>
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-row flex-start">
        <div className="join">
          <button className="join-item btn btn-sm" onClick={() => paginate(-1)}>«</button>
          <button className="join-item btn btn-sm" > {pagination.page}</button>
          <button className="join-item btn btn-sm" onClick={() => paginate(1)}>»</button>
          <button className="join-item btn btn-sm" aria-label="refresh"
            onClick={() => setReload(!reload)}>
            <RiRefreshLine height="10" />
          </button>
          <button className="join-item btn btn-sm" onClick={() => {
            dispatch(resetState())
            setTableEdit(!tableEdit)
          }}>
            <FiEdit height="10" />
          </button>
        </div>
      </div>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            {
              updateState.loading ?
                <div className="w-full flex justify-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
                :
                <>
                  <h3 className="font-bold text-md">Edit</h3>
                  <div className="m-2 space-y-2">
                    <input type="text" onChange={(e) => setAlias(e.target.value)}
                      placeholder="Alias" className="input input-bordered w-full " value={alias} />
                    <input type="text" placeholder="URL" onChange={(e) =>
                      setUrl(e.target.value)}
                      value={url}
                      className="input input-bordered w-full" />
                  </div>
                  <div className="modal-action">
                    <button className="btn" onClick={() => {
                      console.log(updatePayload)
                      //@ts-ignore
                      dispatch(updateURL(updatePayload))
                    }
                    }>Update</button>
                    <button className="btn" onClick={() =>
                      document.getElementById("my_modal_1")?.close()
                    }>Cancel</button>
                  </div>
                </>
            }
          </div>
        </dialog >
      </div >

      {
        updateState.data.message !== "" ?
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>{updateState.data.message}</span>
            </div>
          </div>
          : <></>
      }
      {
        !updateState.loading && updateState.error ?
          <div className="toast toast-end">
            <div className="alert alert-error">
              <span>{updateState.errorMessage}</span>
            </div>
          </div>
          : <></>
      }
      < DeleteModal modalId="my_modal_2" uri={alias} />
    </div >
  )
}
export default AllTable
