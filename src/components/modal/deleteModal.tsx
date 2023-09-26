import { getAll } from "@/app/redux/reducers/api";
import { deleteURL, reset } from "@/app/redux/reducers/deleteURL";
import { RootState } from "@/app/redux/store";
import { FC, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



type DeleteModal = {
  modalId: string;
  uri: string;
}

const DeleteModal: FC<DeleteModal> = ({ modalId, uri }) => {
  const dispatch = useDispatch()
  const deleteState = useSelector((state: RootState) => state.deleteURL)

  async function dis(): Promise<void> {
    //@ts-ignore
    dispatch(deleteURL(uri))
  }
  const dispatcher = async () => {
    document.getElementById(modalId)?.close()
    await dis()
    //@ts-ignore
    dispatch(getAll({ limit: 5, page: 1 }))
  }

  useEffect(() => {
    setTimeout(() => {
      if (!deleteState.loading) {
        dispatch(reset())
      }
    }, 3000)
  }, [deleteState.loading])
  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          {
            deleteState.loading ?
              <div className="w-full flex justify-center">
                <span className="loading loading-spinner loading-xs"></span>
              </div>
              :
              <>
                <h3 className="font-bold text-lg">Delete</h3>
                <p className="py-4"></p>
                <div className="modal-action">
                  <button className="btn" onClick={() => dispatcher()}>Yes</button>
                  <button className="btn" onClick={() =>
                    document.getElementById(modalId)?.close()
                  }>No</button>
                </div>
              </>
          }
        </div>
      </dialog >
      {
        deleteState.deleted ?
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>{deleteState.data.message}</span>
            </div>
          </div>
          :
          <></>
      }
      {
        deleteState.error ?
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>{deleteState.errorMessage}</span>
            </div>
          </div>
          :
          <></>
      }

    </>

  )
}

export default DeleteModal
