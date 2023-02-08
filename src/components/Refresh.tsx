import { authAPI } from "../store/api/authApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { authSlice } from "../store/slice/authSlice";

interface Props {
  children: JSX.Element
}

const Refresh = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [Refresh] = authAPI.useLazyRefreshQuery();
  const [isDone, setIsDone] = useState(false)

  const onLoad = async () => {
    try {
      const data = await Refresh().unwrap();
      if (data) {
        dispatch(authSlice.actions.setAccessToken(data.accessToken));
        dispatch(authSlice.actions.setIsAuth(true));
        dispatch(authSlice.actions.setData(data.user));
      }
    } catch (e) {
      // console.log(e)
    } finally {
      setIsDone(true)
    }
  };

  useEffect(() => {
    onLoad();
  }, []);// eslint-disable-line

  if (isDone) {
    return children;
  } else {
    return null;
  }
};

export default Refresh;
