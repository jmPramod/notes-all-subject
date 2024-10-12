"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const LaptopNav = () => {
  let router = useRouter();
  const logoutfn = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="min-h-14 border w-full flex items-center justify-between px-2  ">
      <h1 className="py-5">
        <Image src="/logo.png" alt="" width={80} height={80} />
      </h1>
      <ul className="min-h-14   flex items-center justify-between gap-5  ">
        <>
          <li>
            <Button
              variant={"outline"}
              onClick={() => router.push("/create-notes")}
            >
              Create Notes
            </Button>
          </li>

          <li>
            <Button
              variant={"outline"}
              onClick={() => router.push("/fetch-notes")}
            >
              Fetch Notes
            </Button>
          </li>
        </>

        <li>
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Home{" "}
          </Button>{" "}
        </li>
        <li>
          <>
            <Button variant={"outline"} onClick={logoutfn}>
              Logout
            </Button>
          </>

          <Button onClick={() => router.push("/login")}> Login</Button>
        </li>
      </ul>
    </div>
  );
};
