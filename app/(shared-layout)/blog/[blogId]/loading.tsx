import { Skeleton } from "@/components/ui/skeleton";

export default function BlogIdLoading() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Skeleton className="w-24 h-10 mb-6" />
      <Skeleton className="w-full h-100 mb-8 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-12" />
        <Skeleton className="w-32 h-4" />
      </div>
      <div className="mt-8 space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  );
}
