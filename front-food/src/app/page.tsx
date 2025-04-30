import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { CategoriesContainer } from "@/components/CategoriesContainer";
import { Foodcontainer } from "@/components/FoodContainer";

export default function Home() {
  return (
    <div>
      <Header />
      <img src="/banner.svg" alt="banner" height={570} />
      <CategoriesContainer />
      <Foodcontainer />
      <Footer />
    </div>
  );
}
