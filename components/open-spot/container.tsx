import { cn } from "@/lib/utils";

interface Props {
  className?;
  children: React.ReactNode;
}

export default function Container({ className, children }: Props) {
  return (
    <main className={cn("h-[100vh] grid grid-rows-[10vh_1fr_10vh]", className)}>
      {children}
    </main>
  );
}
