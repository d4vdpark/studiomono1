import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const PREVIEW_URL = "https://perthwithcoffee.lovable.app/";

export const Route = createFileRoute("/restaurant-project")({
  component: RestaurantProjectPage,
});

function RestaurantProjectPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.07),_transparent_55%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between rounded-full border border-border bg-background/85 px-4 py-3 shadow-sm backdrop-blur">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> 메인으로
          </Link>
          <div className="text-sm font-medium text-foreground">미리보기 · 내 식당 웹사이트</div>
        </div>

        <div className="flex-1 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
          <div className="border-b border-border/80 bg-[#f7f4ee] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-3 flex items-center rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <span className="mr-2 text-[10px] uppercase tracking-[0.3em] text-foreground/70">Preview</span>
              <span className="truncate">{PREVIEW_URL}</span>
            </div>
          </div>

          <div className="h-[calc(100vh-180px)] min-h-[640px] w-full bg-muted/30">
            <iframe
              src={PREVIEW_URL}
              title="내 식당 웹사이트 미리보기"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
