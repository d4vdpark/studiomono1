import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/restaurant-project")({
  component: RestaurantProjectPage,
});

function RestaurantProjectPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" /> 메인으로
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Restaurant Project</p>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">내 식당 웹사이트</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            이 페이지는 임시로 연결된 식당 웹사이트 진입 화면입니다. 나중에 실제 식당 사이트로 바꿀 때는
            이 파일과 작업 카드의 to 경로를 함께 바꾸면 됩니다.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">변경 위치</p>
            <p className="mt-2">- 작업 카드 링크 경로: src/routes/index.tsx 의 WORK 배열의 to 값</p>
            <p className="mt-1">- 실제 페이지 파일: src/routes/restaurant-project.tsx</p>
          </div>
        </div>
      </div>
    </div>
  );
}
