import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import Image from "next/image";

import { CategoriesContainer } from "@/components/CategoriesContainer";
import { Foodcontainer } from "@/components/FoodContainer";

export default function Home() {
  return (
    <div>
      <Header />
      <Image src="/banner.svg" alt="" width={1440} height={570} />
      <CategoriesContainer />
      <Foodcontainer />
      <Footer />
    </div>
  );
}
