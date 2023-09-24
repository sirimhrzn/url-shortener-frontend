"use client"
import axios, { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import { Session, login } from '../redux/reducers/session';
import { redirect, useRouter } from 'next/navigation';
interface LoginInfo {
  email: string,
  password: string
}
const Login = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const [toast, setToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const [loginPayload, setLoginPayload] = useState<LoginInfo>({
    email: "",
    password: ""
  })
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...loginPayload }
    // @ts-ignore
    data[e.target.id] = e.target.value
    setLoginPayload(data)
  }
  const loginApi = async () => {
    try {
      const response = await axios.post("http://localhost:9000/v1/login", JSON.stringify(loginPayload), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.data
      const dispatchData: Session = {
        email: loginPayload.email,
        token: data.token,
        loggedIn: true,
        tokenValid: true,
        tokenExpired: false
      }
      dispatch(login(dispatchData))
      localStorage.setItem("authtoken_np", response.data.token)
      router.push("/dashboard")

    } catch (e) {
      setToast(true)
      setToastText(e.response.data.message)
    }
  }
  useEffect(() => {
    if (toast) {
      setToast(false)
    }
  }, [loginPayload.email, loginPayload.password])
  return (
    <>
      < div className="w-full min-h-screen bg-white flex justify-center items-center" >
        <div className={`bg-red-200 rounded-2xl p-6`}>
          <div className="flex flex-col space-y-4">
            {
              toast ?
                <div className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{toastText}</span>
                </div>
                :
                <>
                </>
            }
            <input id="email" type="email" onChange={(e) => inputOnChange(e)} placeholder="Email" required className="input input-bordered  w-full max-w-xs" />
            <input id="password" type="password" onChange={(e) => inputOnChange(e)} placeholder="Password" required className="input input-bordered  w-full max-w-xs" />
            <button type="submit" onClick={() => loginApi()} className="btn w-full">Login</button>
          </div>
        </div>
      </div>
    </>

  )
}
export default Login
