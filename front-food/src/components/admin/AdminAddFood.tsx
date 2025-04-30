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
  const token = localStorage.getItem("token");
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setNewFood({ ...newFood, image: file });
      } else {
        toast.error("Only image files are allowed.");
      }
    }
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
      setNewFood({
        foodName: "",
        price: 0,
        image: "",
        ingredients: "",
        category: categoryId,
      });
      setPreviewImage(null);
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between">
            <div className=" flex flex-col gap-2">
              <Label htmlFor="foodName" className="text-right">
                Food name
              </Label>
              <input
                placeholder="  Type food name"
                type="text"
                value={newFood.foodName}
                onChange={(e) => handleChange(e)}
                name="foodName"
                className="col-span-3 border rounded-md h-[38px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price" className="text-right">
                Food price
              </Label>
              <input
                placeholder="  Enter price"
                step="0.01"
                type="number"
                value={newFood.price}
                onChange={(e) => handleChange(e)}
                name="price"
                className="col-span-3 border rounded-md h-[38px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={newFood.ingredients}
              onChange={(e) => handleChange(e)}
              className="col-span-3 border rounded-md h-[90px] w-full"
              placeholder="  List ingredients..."
            />
          </div>
          <label className="text-[14px] font-medium" htmlFor="">
            Food image
          </label>
          <div
            className="border rounded-xs h-[138px] bg-blue-50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (!file) return;

              if (file.type.startsWith("image/")) {
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
                setNewFood((prev) => ({ ...prev, image: file }));
              } else {
                toast.error("Only image files are allowed.");
              }
            }}
          >
            {!previewImage && (
              <div className="flex flex-col h-[138px]">
                <Label
                  htmlFor="pictureUpload"
                  className="w-full h-[138px] flex justify-center"
                >
                  <img src="./icons/imageUpload.svg" alt="upload" />
                  Choose a file or drag & drop it here
                </Label>
                <input
                  id="pictureUpload"
                  type="file"
                  onChange={(e) => handleFile(e)}
                  name="image"
                  className="col-span-3 border rounded-md hidden"
                />
              </div>
            )}
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-[138px] w-full rounded-md mx-auto"
                />
                <img
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-1 right-1 "
                  src="./icons/cancel.svg"
                  alt="x"
                />
              </div>
            )}
          </div>
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
