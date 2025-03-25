
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductImageUrl, setNewProductImageUrl] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from local storage on component mount
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    // Save products to local storage whenever the products state changes
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Modified handler to accept boolean directly from the Switch component
  const handleSwitchChange = (checked: boolean) => {
    setIsEnabled(checked);
  };

  const handleAddProduct = () => {
    if (
      !newProductName ||
      !newProductDescription ||
      !newProductPrice ||
      !newProductCategory ||
      !newProductImageUrl
    ) {
      toast({
        title: "Error",
        description: "Please fill in all product details.",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newProductPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price.",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: newProductName,
      description: newProductDescription,
      price: price,
      category: newProductCategory,
      imageUrl: newProductImageUrl,
      discount: discountPercentage ? parseInt(discountPercentage) : null,
    };

    setProducts([...products, newProduct]);
    setNewProductName("");
    setNewProductDescription("");
    setNewProductPrice("");
    setNewProductCategory("");
    setNewProductImageUrl("");
    setDiscountPercentage("");

    toast({
      title: "Success",
      description: `${newProductName} added successfully.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add new products to the store</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Product name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Product description"
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Product price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              placeholder="Product category"
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="text"
              id="imageUrl"
              placeholder="Product image URL"
              value={newProductImageUrl}
              onChange={(e) => setNewProductImageUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              type="number"
              id="discount"
              placeholder="Discount percentage"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage store settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="enable" checked={isEnabled} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="enable">Enable Store</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
