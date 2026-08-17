import { PleatLoader } from "@/components/ui/PleatLoader";

export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <PleatLoader />
    </div>
  );
}
