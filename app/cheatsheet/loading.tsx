import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="w-full h-[40vh] flex justify-center items-center">
      <Spinner />
    </div>
  );
}
