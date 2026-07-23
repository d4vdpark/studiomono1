import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { Nav } from "@/components/Nav";
import { loadOrders, saveOrders, ORDER_STAGES, stageProgress, formatKRW, type Order, type OrderStage } from "@/lib/orders";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "내 주문 — Studio One" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { setOrders(loadOrders()); }, []);

  const advance = (id: string) => {
    const next = orders.map((o) => {
      if (o.id !== id) return o;
      const idx = ORDER_STAGES.indexOf(o.stage);
      const ni = Math.min(idx + 1, ORDER_STAGES.length - 1);
      return { ...o, stage: ORDER_STAGES[ni] as OrderStage };
    });
    setOrders(next);
    saveOrders(next);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-semibold text-primary mb-2">MY ORDERS</p>
        <h1 className="text-4xl font-bold tracking-tight mb-2">주문 현황</h1>
        <p className="text-muted-foreground mb-10">모든 주문의 진행 단계를 실시간으로 확인하세요.</p>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
            <div className="mx-auto size-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Package className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">아직 주문이 없어요</h3>
            <p className="text-sm text-muted-foreground mb-6">필요한 서비스를 선택하고 첫 의뢰를 시작해보세요.</p>
            <Link to="/" className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground text-background px-6 text-sm font-semibold hover:opacity-90 transition-opacity">
              서비스 둘러보기 <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((o) => {
              const stageIdx = ORDER_STAGES.indexOf(o.stage);
              return (
                <div key={o.id} className="rounded-3xl border border-border bg-card p-7">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground mb-1">{o.id}</p>
                      <h3 className="text-xl font-bold">{o.serviceTitle}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {o.customerName} · 마감일 {format(new Date(o.deadline), "yyyy.M.d (EEE)", { locale: ko })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">결제 금액</p>
                      <p className="text-xl font-bold">{formatKRW(o.price)}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-muted rounded-full" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${stageProgress(o.stage)}%` }}
                    />
                    <div className="relative flex justify-between">
                      {ORDER_STAGES.map((s, i) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                          <div className={cn(
                            "size-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all bg-card",
                            i <= stageIdx ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                          )}>
                            {i + 1}
                          </div>
                          <span className={cn(
                            "text-xs font-semibold whitespace-nowrap",
                            i <= stageIdx ? "text-foreground" : "text-muted-foreground"
                          )}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {stageIdx < ORDER_STAGES.length - 1 && (
                    <div className="mt-6 pt-6 border-t border-border flex justify-end">
                      <button
                        onClick={() => advance(o.id)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        (데모) 다음 단계로 진행 →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
