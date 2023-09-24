
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FadeLoader } from 'react-spinners';
import { Session, login } from './reducers/session';

async function auther(): Promise<boolean> {
  const token = localStorage.getItem("authtoken_np") || "";
  try {
    const decoded: any = jwt_decode(token);
    console.log("Token decoded successfully");
    return true
  } catch (e) {
    console.log("Error decoding token:", e);
    return false
  }
};


const Auth = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.session.loggedIn)
  const [pageChanged, setPageChanged] = useState<boolean>(false)
  useEffect(() => {
    (async () => {
      const loggedInStatus = await auther();
      const data: Session = {
        email: "sirimhrzn@gmail.com",
        token: "zzz",
        loggedIn: true,
        tokenExpired: false,
        tokenValid: true
      }
      if (loggedInStatus) {
        dispatch(login(data))
      }
      if (!loggedInStatus && currentPath == "/login") {
        return
      }
      if (!loggedInStatus && currentPath != "/login") {
        router.push("/login")
      }
      if (loggedInStatus && currentPath == "/login") {
        router.push("/dashboard")
      }

    })()
  }, []);

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(false)

  }, [isLoggedIn])

  return (
    <>
      {
        loading ?
          <FadeLoader
            loading={true}
          /> :

          <>{children}</>

      }
    </>
  )
};

export default Auth;
