
import axios from 'axios';
import Cookies from 'js-cookie'
import store from '../store';
import { setauthenticated, setloading, setuser } from '../Slices/userSlice';

const isauthenticatedd =async()=>{
  try {
    store.dispatch(setloading(true))
    const token = Cookies.get('login_token')
    if(token){
      const res =await axios.get('http://localhost:8000/isauthenticated',{headers:{Authorization:token}});
      if(res?.data?.success) {
        store.dispatch(setauthenticated(true))
        store.dispatch(setuser(res?.data?.user))
      }
      store.dispatch(setloading(false))
      return res
    }
    
    store.dispatch(setloading(false))
  } catch (error) {
    console.log(error.message)
  }
}

export default isauthenticatedd