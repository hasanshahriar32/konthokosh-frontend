import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { paths } from "@/constants";
import { POST_STRINGS } from "@/constants/post";
import { FileText, PenTool } from "lucide-react";
import Link from "next/link";

type Props = {
  searchTerm: string;
};

const NoPost: React.FC<Props> = ({ searchTerm }) => {
  return (
    <Card className="max-w-xl mx-auto rounded-lg border-0 shadow-none bg-transparent">
      <CardContent className="p-8 sm:p-10 flex flex-col items-center gap-6 text-center bg-transparent">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
          <FileText className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h3 className="font-kalpurush text-2xl sm:text-3xl font-semibold text-foreground">
            {POST_STRINGS.noPostsTitle ?? POST_STRINGS.noPostsAvailable}
          </h3>
          <p className="font-bengali text-sm sm:text-base text-muted-foreground max-w-[36rem] mx-auto">
            {searchTerm ? POST_STRINGS.noPostsSearch : POST_STRINGS.noPostsYet}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link href={paths.write} className="w-full sm:w-auto">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-bengali flex items-center justify-center">
              <PenTool className="w-4 h-4 mr-2" />
              {POST_STRINGS.writeButton}
            </Button>
          </Link>

          <Button variant={"ghost"} asChild>
            <Link
              href={paths.feed}
              className="text-sm text-primary hover:underline font-bengali"
            >
              {POST_STRINGS.browseCommunity}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoPost;
