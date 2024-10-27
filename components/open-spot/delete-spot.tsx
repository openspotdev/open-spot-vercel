import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useDeleteSpot } from "@/lib/hooks/useSpotsRepository";

export default function DeleteSpot({ guid }: { guid: string }) {
  const router = useRouter();
  const { mutate: deleteSpot, isPending: isDeleting } = useDeleteSpot();

  const handleDelete = async () => {
    try {
      await deleteSpot(guid);
      router.push("/spots");
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDelete}
      disabled={isDeleting}
      className="w-fit"
    >
      <span className="icon-[entypo--trash] w-5 h-5 text-rose-500"></span>
      {isDeleting ? "Borrando..." : ""}
    </Button>
  );
}
