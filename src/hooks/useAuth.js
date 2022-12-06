import { useSelector } from "react-redux";

export default function useAuth () {
    const auth = useSelector((state)=>state.auth);
    if(auth?.user && auth?.accessToken){
        return true;
    }else{
        return false;
    }
}