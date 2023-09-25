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
const AllTable = () => {
  const dispatch = useDispatch()
  const api = useSelector((state: RootState) => state.allapi)
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
  const [deletionAlias, setDeletionAlias] = useState<string>("")
  useEffect(() => {
    //@ts-ignore
    dispatch(getAll(pagination))
    console.log("thisone")
  }, [pagination, reload])


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
                              <td> <button className="btn btn-xs" onClick={() => document.getElementById('my_modal_1')?.showModal()}><FiEdit /></button></td>
                              <td> <button className="btn btn-xs" onClick={() => {
                                document.getElementById('my_modal_2')?.showModal()
                                setDeletionAlias(value.alias)
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
          <button className="join-item btn btn-sm" aria-label="refresh" onClick={() => setReload(!reload)}><RiRefreshLine height="10" /></button>
          <button className="join-item btn btn-sm" onClick={() => {
            dispatch(resetState())
            setTableEdit(!tableEdit)
          }}><FiEdit height="10" /></button>
        </div>
      </div>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <DeleteModal modalId="my_modal_2" uri={deletionAlias} />
    </div >
  )
}
export default AllTable
