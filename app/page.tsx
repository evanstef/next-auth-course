import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="space-y-6 text-center text-white">
        <h1 className=" text-9xl font-bold drop-shadow-lg">Auth</h1>
        <p>A Simple Authentication</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
       
      </div>
    </main>
  );
}
