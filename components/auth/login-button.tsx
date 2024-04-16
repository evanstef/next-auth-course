'use client';

import { useRouter } from 'next/navigation'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';


interface LoginButtonProps {
    children : React.ReactNode,
    mode? : "modal" | "redirect", 
    asChild? : boolean
}

const LoginButton = ({children, mode = "redirect", asChild} : LoginButtonProps) => {

const router = useRouter()

if (mode === "modal") {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-auto p-0 bg-transparent border-none">
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
}

function handleClick() {
    router.push("/auth/login")
}

  return (
    <span onClick={() => handleClick()} className="cursor-pointer">
        {children}
    </span>
  )
}

export default LoginButton