import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Loader2, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getService, calculatePrice, type SelectedOptions } from "@/lib/services";
import { addOrder, formatKRW, type Order } from "@/lib/orders";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || "" }),
  head: () => ({ meta: [{ title: "결제 — Studio One" }] }),
  component: Checkout,
});

function Checkout() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const params = new URLSearchParams(q);
  const serviceId = params.get("s") || "";
  const selected: SelectedOptions = JSON.parse(params.get("sel") || "{}");
  const deadline = params.get("d") || "";
  const name = params.get("n") || "";
  const email = params.get("e") || "";

  const service = getService(serviceId);
  const price = useMemo(() => (service ? calculatePrice(service, selected) : 0), [service, selected]);

  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-muted-foreground">잘못된 접근입니다.</p>
          <Link to="/" className="text-primary underline">메인으로</Link>
        </div>
      </div>
    );
  }

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const id = "ORD-" + Date.now().toString(36).toUpperCase();
      const order: Order = {
        id,
        serviceId: service.id,
        serviceTitle: service.title,
        selected,
        price,
        deadline,
        createdAt: new Date().toISOString(),
        stage: "기획 중",
        customerName: name,
        customerEmail: email,
      };
      addOrder(order);
      setOrderId(id);
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link to="/booking/$serviceId" params={{ serviceId: service.id }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" /> 옵션 다시 선택
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-2">결제</h1>
        <p className="text-muted-foreground mb-10">안전한 결제 환경에서 진행됩니다.</p>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="rounded-3xl border border-border bg-card p-8 space-y-6">
            <h2 className="font-semibold">카드 정보</h2>
            <div>
              <label className="text-sm font-medium mb-2 block">카드 번호</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">만료일</label>
                <Input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">CVC</label>
                <Input placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="size-4" /> 모든 거래는 SSL로 암호화되어 보호됩니다.
            </div>
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-foreground text-background font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="size-5 animate-spin" /> 결제 처리 중...</> : `${formatKRW(price)} 결제하기`}
            </button>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 h-fit">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">주문 요약</p>
            <p className="font-bold text-lg">{service.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{name} · {email}</p>
            {deadline && (
              <p className="text-sm mt-3">
                마감일 <span className="font-semibold">{format(new Date(deadline), "yyyy.M.d (EEE)", { locale: ko })}</span>
              </p>
            )}
            <div className="my-5 h-px bg-border" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">총 결제 금액</span>
              <span className="text-2xl font-bold">{formatKRW(price)}</span>
            </div>
          </aside>
        </div>
      </div>

      <Dialog open={done} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md rounded-3xl p-10 text-center [&>button]:hidden">
          <div className="mx-auto size-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 animate-scale-in">
            <Check className="size-8 text-primary" strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">결제가 안전하게 완료되었습니다</h3>
          <p className="text-muted-foreground text-sm">
            주문번호 <span className="font-semibold text-foreground">{orderId}</span><br />
            진행 상황은 마이페이지에서 확인하실 수 있어요.
          </p>
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="mt-4 h-12 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
          >
            주문 현황 보기
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
