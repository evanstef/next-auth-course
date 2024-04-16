

import { UserInfo } from '@/components/user-info'
import React from 'react'
import { useUserInfo } from '@/hooks/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

const Server = async  () => {
    const user = await useUserInfo()

  return (
    <UserInfo label='Client Component' user={user} />
  )
}

export default Server
