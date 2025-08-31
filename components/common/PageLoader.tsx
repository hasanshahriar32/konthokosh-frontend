import { Icons } from "@/components/common/Icons";
import { RESTRICT } from "@/constants/restrict";

type PageLoaderProps = {
  message?: string;
  compact?: boolean;
};

const PageLoader = ({
  message = RESTRICT.loading,
  compact = false,
}: PageLoaderProps) => {
  if (compact) {
    return (
      <div className="flex items-center justify-center py-3">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="animate-heartbeat">
              <Icons.Shield className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="animate-heartbeat">
            <Icons.Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export { PageLoader };
export default PageLoader;
