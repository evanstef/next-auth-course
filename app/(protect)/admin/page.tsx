"use client"

import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card,CardContent,CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';    
import React from 'react'

const AdminPage = () => {

    function onClickServerAction() {
        fetch('/api/admin')
            .then((res) => {
                if(res.ok) {
                    toast.success("Server Action Allowed!")
                } else {
                    toast.error("Server Action Denied!")
                }
            })
    }

    function onClickApiRoute() {
        fetch('/api/admin')
            .then((res) => {
                if(res.ok) {
                    toast.success("Api Route Allowed!")
                } else {
                    toast.error("Api Route Denied!")
                }
            })
    }


  return (
    <Card className='w-[600px]'>
        <CardHeader>
            <p className='text-2xl text-center font-bold'>🔑 Admin</p>
        </CardHeader>
        <CardContent>
            <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message='You have permission to access this content' />
            </RoleGate>
            <div className='flex border flex-row p-3 rounded-lg shadow-md items-center justify-between mt-4'>
                <p className='font-semibold'>Admin-only API Route</p>
                <Button onClick={onClickApiRoute}>Click to test</Button>
            </div>

            <div className='flex border p-3 rounded-lg shadow-md items-center justify-between mt-4'>
                <p className='font-semibold'>Admin-only Server Action</p>
                <Button onClick={onClickServerAction}>Click to test</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage