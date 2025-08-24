import { Icons } from "@/components/common/Icons";
import { Skeleton } from "@/components/ui/skeleton";

type FeedLoaderProps = {
  message?: string;
  skeletons?: number;
};

const SkeletonCard: React.FC<FeedLoaderProps> = () => (
  <div className="w-full rounded-xl p-6 bg-card/80">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full bg-secondary" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3 rounded bg-muted" />
        <Skeleton className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>

    <div className="mt-4 space-y-3">
      <Skeleton className="h-3 w-full rounded bg-muted" />
      <Skeleton className="h-3 w-5/6 rounded bg-muted" />
      <Skeleton className="h-3 w-4/6 rounded bg-muted" />
    </div>
  </div>
);

const FeedLoader: React.FC<FeedLoaderProps> = ({
  message = "লোড হচ্ছে...",
  skeletons = 3,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-start py-8">
      <div className="w-full max-w-4xl space-y-4 px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-heartbeat">
            <Icons.Shield className="h-10 w-10 text-secondary" />
          </div>
          <p className="font-bengali text-sm text-muted-foreground">
            {message}
          </p>
        </div>

        {Array.from({ length: skeletons }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default FeedLoader;
export { FeedLoader };
