"use client";
import React from "react";
import { LaptopNav } from "./LaptopNav";
import MobNav from "./MobNav";

const NavBar = () => {
  return (
    <div>
      <div className="md:hidden flex">
        <MobNav />
      </div>
      <div className="md:flex hidden">
        <LaptopNav />{" "}
      </div>
    </div>
  );
};

export default NavBar;
