import { Button } from "@uitripled/react-shadcn/ui/button";
import { Star } from "lucide-react";
import { Suspense, use, useMemo } from "react";

const GITHUB_REPO = "moumen-soliman/uitripled";

interface GitHubRepo {
  stargazers_count: number;
}

function StarCount({ promise }: { promise: Promise<number> }) {
  const count = use(promise);
  return (
    <span className="font-medium tabular-nums">{count.toLocaleString()}</span>
  );
}

function StarCountFallback({ digits = 3 }: { digits?: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-medium tabular-nums">
      <span className="sr-only">Loading star rating</span>
      {Array.from({ length: digits }).map((_, index) => (
        <span
          key={`star-skeleton-${index}`}
          className="inline-block h-[1em] w-[1ch] rounded-sm bg-muted animate-pulse"
          aria-hidden="true"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </span>
  );
}

function fetchStarCount(): Promise<number> {
  return fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
    next: { revalidate: 3600 },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<GitHubRepo>;
    })
    .then((data) => data.stargazers_count || 0)
    .catch((error) => {
      console.error("Error fetching GitHub stars:", error);
      return 0;
    });
}

export function GithubStarButton() {
  const starCountPromise = useMemo(() => fetchStarCount(), []);

  return (
    <div className="flex items-center justify-center">
      <a
        href={`https://github.com/${GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-background px-6 font-medium text-foreground transition-all duration-300 hover:bg-muted/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
      >
        <div className="flex items-center gap-2">
           <Star className="h-4 w-4 fill-current text-foreground transition-transform group-hover:scale-110 group-hover:text-yellow-400 group-hover:fill-yellow-400" />
           <span>Star on GitHub</span>
        </div>

        <div className="mx-2 h-4 w-[1px] bg-border" />

        <div className="flex items-center gap-1 text-muted-foreground transition-colors group-hover:text-foreground">
           <Suspense fallback={<StarCountFallback digits={3} />}>
            <StarCount promise={starCountPromise} />
           </Suspense>
        </div>
      </a>
    </div>
  );
}

export function StarButtonFallback() {
  return (
    <Button variant="outline" size="lg" className="min-w-[160px] h-12 rounded-full" disabled>
      <Star aria-hidden="true" className="mr-2 h-4 w-4" />
      <span>340</span>
    </Button>
  );
}
