"use client";
import Image from "next/image";
import { CartSheet } from "./CartSheet";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateAddress } from "./UpdateAdress";
type UserData = {
  _id: string;
  email: string;
  address: string;
};
export const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded: any = jwtDecode(token);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          console.error("Failed to fetch user", data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
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
    <div className="bg-black px-[88px] py-3 flex justify-between items-center">
      <div>
        <Image src="./nomNom.svg" alt="logo" height={44} width={146} />
      </div>
      <div className=" flex h-9 gap-[12.81px]">
        <UpdateAddress setUserData={setUserData} userData={userData} />
        <div>
          <CartSheet />
          {/* <span className="absolute -bottom-1 -right-1 bg-red-400 text-white px-1.5 rounded-full text-xs">
            1
          </span> */}
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
              {userData?.email && <h4>{userData?.email}</h4>}
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
