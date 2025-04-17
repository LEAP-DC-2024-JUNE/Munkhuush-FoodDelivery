import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
type AdminAddFoodProps = {
  categoryId: string;
  categoryName: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type NewFood = {
  foodName: string;
  price: number;
  category: string;
  ingredients: string;
  image: string | File;
};

export function AdminAddFood({
  categoryId,
  categoryName,
  isOpen,
  setIsOpen,
}: AdminAddFoodProps) {
  const [newFood, setNewFood] = useState<NewFood>({
    foodName: "",
    price: 0,
    image: "",
    ingredients: "",
    category: categoryId,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setNewFood({ ...newFood, image: file });
    }

    // setNewFood({ ...newFood, image: e.target.files[0] });
  };

  const uploadImage = async () => {
    const UPLOAD_PRESET = "food_preset";
    const CLOUD_NAME = "dyih7skpb";
    const newFormData = new FormData();
    newFormData.append("file", newFood.image);
    newFormData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: newFormData }
    );
    const result = await response.json();
    return result.secure_url;
  };

  const handleAddFood = async (categoryId: string) => {
    if (isSubmitting) return; // Prevent multiple rapid submissions
    setIsSubmitting(true);
    const imageUrl = await uploadImage();
    if (!newFood?.foodName || !newFood.price || !newFood.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    console.log(imageUrl);

    console.log("daragdlaa");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newFood,
        category: categoryId,
        image: imageUrl,
      }),
    });
    if (res.ok) {
      toast("New dish is being added to the menu");
      setOpen(false);
      setIsOpen(!isOpen);
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || "" : value,
    }));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <img src="./icons/admin/adminAddFood.svg" alt="addButton" />
          <p className="absolute bottom-[68.5px] left-[58.38px] w-[154px] text-center bg-white font-medium">
            Add new Dish to {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="foodName" className="text-right">
              Dish name
            </Label>
            <input
              type="text"
              value={newFood.foodName}
              onChange={(e) => handleChange(e)}
              name="foodName"
              className="col-span-3 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <input
              type="text"
              value={newFood.price}
              onChange={(e) => handleChange(e)}
              name="price"
              className="col-span-3 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <input
              type="text"
              name="ingredients"
              value={newFood.ingredients}
              onChange={(e) => handleChange(e)}
              className="col-span-3 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Image
            </Label>
            <input
              type="file"
              onChange={(e) => handleFile(e)}
              name="image"
              className="col-span-3 border rounded-md"
            />
          </div>
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-48 rounded-md mx-auto"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => handleAddFood(categoryId)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Food"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
