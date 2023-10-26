import { useRouter } from "next/router";
import { useEffect } from "react";
import {getUserById} from '../../components/context/actions/UserActions'

const UserDetails = () => {

  const router = useRouter()

  console.log(router.query.userId)

  useEffect(()=> {
    const getUser = async () => {
      const res = await getUserById(router.query.userId)
      if(res) {
        console.log(res.user)
      }
    }

    if(router)
      getUser()

  }, [router])

  return <div>UserDetails</div>;
};

export default UserDetails;
