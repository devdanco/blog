import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Byte-Sized Insights
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Learn about coding with easy-to-read articles, how-to guides, and the
          latest tech news.
        </p>
        <Button asChild size="lg">
          <Link href="/posts">
            Explore Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
