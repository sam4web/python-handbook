import { Metadata } from "next";

export const metadata: Metadata = {
  title: "not found",
};

export default function TutorialNotFoundPage() {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center">
      <div className="text-center">
        <p className="text-7xl font-bold text-foreground pb-3.5">
          4<span className="text-primary">0</span>4
        </p>
        <div className="space-y-1">
          <p className="text-foreground font-medium text-2xl">Tutorial Not Found</p>
          <p className="max-w-xs text-muted-foreground mx-auto">
            We couldn't locate the requested tutorial. Please check the URL.
          </p>
        </div>
      </div>
    </div>
  );
}
