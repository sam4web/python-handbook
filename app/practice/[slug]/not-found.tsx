import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenge Not Found",
};

export default function ChallengeNotFoundPage() {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center">
      <div className="text-center">
        <p className="text-7xl font-bold text-foreground pb-3.5">
          4<span className="text-primary">0</span>4
        </p>
        <div className="space-y-1">
          <p className="text-foreground font-medium text-2xl">Challenge Not Found</p>
          <p className="max-w-sm text-muted-foreground mx-auto">
            We couldn't locate the requested challenge. Please check the URL.
          </p>
        </div>
      </div>
    </div>
  );
}
