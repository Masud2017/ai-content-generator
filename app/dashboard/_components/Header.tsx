import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Link href = {"/"}><Image src={"/logo.svg"} alt="logo" width={150} height={100} priority  /></Link>
      <UserButton />
    </div>
  );
};

export default Header;
