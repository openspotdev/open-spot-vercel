"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  guid: string;
  latitude: number;
  longitude: number;
}

export function ShareButton({ guid, latitude, longitude }: ShareButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    setIsCopying(true);
    const shareUrl = `${window.location.origin}/spot/${guid}/${latitude}/${longitude}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Listo para compartir!",
        description:
          "El link del spot fue copiado, puedes compartirlo en cualquier red social.",
      });
    } catch (error) {
      console.error("Error copying link:", error);
      toast({
        title: "Copying failed",
        description: "There was an error while trying to copy the link.",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Button variant="link" onClick={handleCopy} disabled={isCopying}>
      <span className="icon-[charm--share] w-5 h-5 bg-teal-600"></span>
      {/* {isCopying ? "Copying..." : "Copy Link"} */}
    </Button>
  );
}
