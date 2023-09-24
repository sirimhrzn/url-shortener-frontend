'use client'
import { Provider } from "react-redux";
import { store } from "./store";
import Auth from "./auth";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Auth>
        {children}
      </Auth>
    </Provider>)
}

export default Providers;
