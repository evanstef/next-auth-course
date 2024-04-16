import { UserInfo } from '@/components/user-info'
import React from 'react'
import { useUserInfo } from '@/hooks/user-info'

const Server = async () => {
    const user = await useUserInfo()
    console.log(user);
    

  return (
    <UserInfo label='Server Component' user={user} />
  )
}

export default Server