import { getAll } from "@/app/redux/reducers/api";
import { deleteURL } from "@/app/redux/reducers/deleteURL";
import { RootState } from "@/app/redux/store";
import { FC, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../toast";

type EditModal = {
  modalId: string;
  uri: string | undefined;
  alias: string
}

const EditModal: FC<EditModal> = ({ modalId, uri, alias }) => {

  const dispatch = useDispatch()
  const updateState = useSelector((state: RootState) => state.updateURL)

  async function dis(): Promise<void> {
    //@ts-ignore
    dispatch(deleteURL(uri))
  }
  const [new_alias, setNew_Alias] = useState(alias)
  const dispatcher = async () => {
    document.getElementById(modalId)?.close()
    await dis()
    //@ts-ignore
    //dispatch(getAll({ limit: 5, page: 1 }))
  }
  const handleOnchange = (e) => {
    setNew_Alias(e.target.value)
  }

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          {
            updateState.loading ?
              <div className="w-full flex justify-center">
                <span className="loading loading-spinner loading-xs"></span>
              </div>
              :
              <>
                <h3 className="font-bold text-lg">Edit URL data</h3>
                <div className="m-2 space-y-2">
                  <input type="text" onChange={(e) => handleOnchange(e)}
                    placeholder="Alias" className="input input-bordered w-full max-w-xs" value={new_alias} />
                  <input type="text" placeholder="URL" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => dispatcher()}>Update</button>
                  <button className="btn" onClick={() =>
                    document.getElementById(modalId)?.close()
                  }>Cancel</button>
                </div>
              </>
          }
        </div>
      </dialog >
    </>

  )
}

export default EditModal
