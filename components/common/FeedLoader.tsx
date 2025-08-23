import { Icons } from "@/components/common/Icons";

type FeedLoaderProps = {
  message?: string;
};

const SkeletonCard = () => (
  <div className="w-full rounded-xl p-6 bg-[color:var(--color-card)]/80" style={{ borderColor: 'var(--color-border)' }}>
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-[color:var(--color-secondary)]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 rounded bg-[color:var(--color-muted)] w-1/3" />
        <div className="h-3 rounded bg-[color:var(--color-muted)] w-1/2" />
      </div>
    </div>

    <div className="mt-4 space-y-3">
      <div className="h-3 rounded bg-[color:var(--color-muted)] w-full" />
      <div className="h-3 rounded bg-[color:var(--color-muted)] w-5/6" />
      <div className="h-3 rounded bg-[color:var(--color-muted)] w-4/6" />
    </div>
  </div>
);

const FeedLoader = ({ message = "লোড হচ্ছে..." }: FeedLoaderProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-24">
      <div className="w-full max-w-4xl space-y-4 px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-heartbeat">
            <Icons.Shield className="h-10 w-10 text-[color:var(--color-secondary)]" />
          </div>
          <p className="font-bengali text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{message}</p>
        </div>

        {/* a few skeleton cards to indicate content */}
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default FeedLoader;
export { FeedLoader };
