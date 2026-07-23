import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/restaurant-project")({
  component: RestaurantProjectPage,
});

function RestaurantProjectPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" /> 메인으로
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-6 sm:px-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Restaurant Project</p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl tracking-tight">내 식당 웹사이트</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Lovable로 만든 식당 프로젝트를 내부 페이지에서 바로 확인할 수 있도록 연결했습니다.
            </p>
          </div>

          <div className="h-[70vh] min-h-[640px] w-full bg-muted/40">
            <iframe
              src="https://perthwithcoffee.lovable.app/"
              title="내 식당 웹사이트 미리보기"
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
