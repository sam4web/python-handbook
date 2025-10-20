import { Metadata } from "next";
import Button from "../components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};
export default function NotFound() {
  return (
    <main className="w-full h-[85vh] flex justify-center items-center">
      <div className="text-center">
        <div className="mb-5 md:mb-10">
          <p className="text-7xl md:text-9xl font-bold text-foreground">
            4<span className="text-primary">0</span>4
          </p>
          <p className="text-foreground font-medium text-xl md:text-3xl">Page Not Found</p>
        </div>
        <Link href={"/"}>
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </main>
  );
}
