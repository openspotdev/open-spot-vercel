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
    const longUrl = `${window.location.origin}/spot/${guid}/${latitude}/${longitude}`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_SHORT_URL}${longUrl}`
      );

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
      const shortUrl = await response.text();
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Listo para compartir!",
        description:
          "El link corto del spot fue copiado, puedes compartirlo en cualquier red social.",
      });
    } catch (error) {
      console.error("Error shortening or copying link:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al generar o copiar el link corto.",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleCopy}
      disabled={isCopying}
      className="px-2"
    >
      <span className="icon-[charm--share] w-5 h-5 bg-blue-600"></span>
    </Button>
  );
}
