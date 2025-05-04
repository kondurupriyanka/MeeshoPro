import { useState } from "react";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TryOnPreviewProps {
  productImages: string[];
  productName: string;
  category: string;
}

const TryOnPreview: React.FC<TryOnPreviewProps> = ({ productImages, productName, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(0);

  // Models for try-on preview (placeholder images)
  const models = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  ];

  // Only show try-on for certain categories
  const isTryOnSupported = ["sarees", "kurtis", "dresses"].includes(category.toLowerCase());

  if (!isTryOnSupported) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-neutral-dark py-3 rounded-md font-medium transition duration-200"
        >
          <Shirt className="mr-2 h-5 w-5" /> Try-On Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Try-On Preview: {productName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              This is a simulated try-on preview to give you an idea of how this item might look.
            </p>
            <div className="flex space-x-2 mb-4">
              <p className="text-sm font-medium">Choose a model:</p>
              <div className="flex space-x-2">
                {models.map((model, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedModel(index)}
                    className={`w-10 h-10 rounded-full overflow-hidden cursor-pointer ${
                      selectedModel === index ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  >
                    <img src={model} alt={`Model ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-md overflow-hidden aspect-[3/4] relative">
              <img
                src={models[selectedModel]}
                alt="Model"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-white font-medium">Base Model</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-md overflow-hidden aspect-[3/4] relative">
              {/* This would be a composite image in a real implementation */}
              <div className="absolute inset-0">
                <img
                  src={models[selectedModel]}
                  alt="Model"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={productImages[0]}
                  alt={productName}
                  className="w-3/4 h-auto object-contain mix-blend-multiply"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white text-sm bg-black bg-opacity-50 mx-auto inline-block px-4 py-1 rounded-full">
                  Try-on preview (simulated)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Note: This is a simulated preview. The actual appearance may vary. We're working on more
              accurate virtual try-on technology.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TryOnPreview;
