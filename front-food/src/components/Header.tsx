"use client";
import Image from "next/image";
import { CartSheet } from "./CartSheet";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userData, setUserData] = useState<string | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserData(decoded.email);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);
  const handleAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setUserData(null);
      toast("You have been signed out.");
      router.refresh();
      setIsClicked(!isClicked);
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  const toggleDropdown = () => setIsClicked((prev) => !prev);
  return (
    <div className="bg-black px-[88px] py-3 flex justify-between ">
      <div>
        <Image src="./nomNom.svg" alt="logo" height={44} width={146} />
      </div>
      <div className=" flex gap-[12.81px]">
        <div className="bg-white rounded-full px-3 py-2 flex gap-1">
          <div className="flex gap-1 items-center">
            <Image src="./icons/location.svg" alt="" width={20} height={20} />
            <span className="text-red-500 text-[12px]">Delivery address:</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[12px] text-gray-400">Add Location</span>
            <Image src="./icons/arrow.svg" alt="" width={20} height={20} />
          </div>
        </div>
        <div>
          <CartSheet />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown}>
            <Image
              src="/icons/user.svg"
              alt="User Icon"
              width={36}
              height={36}
            />
          </button>
          {isClicked && (
            <div className="absolute -left-30 top-12 w-[230px] bg-white p-4 rounded-xl shadow-md z-10 text-center flex flex-col gap-2">
              {userData && <h4>{userData}</h4>}
              <button
                onClick={handleAuth}
                className="rounded-full bg-gray-100 px-3 py-2 text-sm text-black"
              >
                {userData ? "Sign out" : "Login"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
