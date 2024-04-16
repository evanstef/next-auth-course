import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "./ui/card"
import { BadgeIcon } from "@radix-ui/react-icons"
import { Badge } from "./ui/badge"

interface UserInfoProps {
    user? : ExtendedUser,
    label : string
}

export const UserInfo = ({user, label} : UserInfoProps) => {
    return (
       <Card className="w-[600px]">
        <CardHeader>
            <h1 className="font-bold text-xl text-center">{label}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex border-2 p-2 rounded-xl text-sm justify-between">
                <p className="font-bold">ID</p>
                <p className="bg-slate-200 px-1">{user?.id}</p>
            </div>
            <div className="flex border-2 p-2 rounded-xl text-sm justify-between">
                <p className="font-bold">Name</p>
                <p className="bg-slate-200 px-1">{user?.name}</p>
            </div>
            <div className="flex border-2 p-2 rounded-xl text-sm justify-between">
                <p className="font-bold">Email</p>
                <p className="bg-slate-200 px-1">{user?.email}</p>
            </div>
            <div className="flex border-2 p-2 rounded-xl text-sm justify-between">
                <p className="font-bold">Role</p>
                <p className="bg-slate-200 px-1">{user?.role}</p>
            </div>
            <div className="flex border-2 p-2 rounded-xl text-sm justify-between">
                <p className="font-bold">TwoFactorAuthenticaiton</p>
                <p className={`py-1 px-2 text-white rounded-lg ${user?.isTwoFactorEnabled ? "bg-green-500" : "bg-red-500"}`}>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</p>   
            </div>
        </CardContent>
       </Card>
    )
}