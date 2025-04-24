import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type FoodItem = {
  _id: string;
  foodName: string;
  price: number;
};
type Category = {
  _id: string;
  categoryName: string;
  foods: FoodItem[];
};

type AdminAddCategoryProps = {
  foodCategories: Category[];
  setFoodCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export function AdminAddCategory({
  setFoodCategories,
  foodCategories,
}: AdminAddCategoryProps) {
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const handleAddCategory = async () => {
    toast("New category is being added to the menu.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/food-categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName: newCategory }),
      }
    );

    const addedCategory = await res.json();
    setFoodCategories([...foodCategories, addedCategory]);
    setNewCategory("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="./icons/plus3.svg" alt="plus" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" flex flex-col gap-4">
            <Label htmlFor="categoryName" className="text-right">
              Category name
            </Label>
            <Input
              id="categoryName"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddCategory}>Add category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
