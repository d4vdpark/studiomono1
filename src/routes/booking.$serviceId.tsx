import { createFileRoute, useNavigate, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getService,
  calculatePrice,
  defaultSelection,
  type Service,
  type SelectedOptions,
} from "@/lib/services";
import { formatKRW } from "@/lib/orders";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const Route = createFileRoute("/booking/$serviceId")({
  loader: ({ params }) => {
    const service = getService(params.serviceId);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.title} 예약 — Studio One` },
      { name: "description", content: `${loaderData?.service.title} 옵션을 선택하고 견적을 확인하세요.` },
    ],
  }),
  component: Booking,
});

function Booking() {
  const { service } = Route.useLoaderData() as { service: Service };
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const isProjectView = useMemo(() => {
    if (typeof window === "undefined") return false;

    const hash = window.location.hash.replace(/^#/, "");
    const [path, queryString = ""] = hash.split("?");

    return path === "/booking/restaurant" && new URLSearchParams(queryString).get("view") === "project";
  }, []);
  const [selected, setSelected] = useState<SelectedOptions>(() => defaultSelection(service));
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const price = useMemo(() => calculatePrice(service, selected), [service, selected]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const STEPS = ["옵션 선택", "마감일", "정보 입력"];

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return !!deadline;
    if (step === 2) return name.trim() && email.trim();
    return false;
  };

  const shouldRedirectToProjectPreview = isProjectView && service.id === "restaurant";

 

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      const params = new URLSearchParams({
        s: service.id,
        sel: JSON.stringify(selected),
        d: deadline!.toISOString(),
        n: name,
        e: email,
      });
      navigate({ to: "/checkout", search: { q: params.toString() } });
    }
  };

  if (shouldRedirectToProjectPreview) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" /> 메인으로
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Main */}
          <div>
            <p className="text-sm font-semibold text-primary mb-2">{service.tagline}</p>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{service.title}</h1>
            <p className="text-muted-foreground mb-10">{service.description}</p>

            {/* Stepper */}
            <div className="flex items-center gap-3 mb-10">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center gap-3 flex-1">
                  <div className={cn(
                    "flex items-center gap-2.5 transition-opacity",
                    i > step && "opacity-40"
                  )}>
                    <div className={cn(
                      "size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      i < step ? "bg-primary text-primary-foreground" :
                      i === step ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    )}>
                      {i < step ? <Check className="size-4" /> : i + 1}
                    </div>
                    <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="h-px bg-border flex-1" />}
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 animate-fade-in" key={step}>
              {step === 0 && (
                <div className="space-y-8">
                  {service.options.map((opt) => (
                    <div key={opt.id}>
                      <label className="text-sm font-semibold mb-4 block">{opt.label}</label>
                      {opt.type === "slider" && (
                        <div>
                          <div className="flex items-baseline justify-between mb-4">
                            <span className="text-3xl font-bold">
                              {selected[opt.id] as number}<span className="text-base font-medium text-muted-foreground ml-1">{opt.unit}</span>
                            </span>
                            <span className="text-sm text-muted-foreground">+{formatKRW((selected[opt.id] as number) * (opt.basePrice || 0))}</span>
                          </div>
                          <Slider
                            min={opt.min}
                            max={opt.max}
                            step={opt.step}
                            value={[selected[opt.id] as number]}
                            onValueChange={(v) => setSelected({ ...selected, [opt.id]: v[0] })}
                          />
                        </div>
                      )}
                      {opt.type === "select" && (
                        <div className="grid sm:grid-cols-3 gap-3">
                          {opt.options!.map((o) => (
                            <button
                              key={o.value}
                              onClick={() => setSelected({ ...selected, [opt.id]: o.value })}
                              className={cn(
                                "rounded-2xl border-2 p-4 text-left transition-all",
                                selected[opt.id] === o.value
                                  ? "border-foreground bg-accent/40"
                                  : "border-border hover:border-foreground/30"
                              )}
                            >
                              <p className="font-semibold text-sm">{o.label}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {o.price === 0 ? "기본" : `+${formatKRW(o.price)}`}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                      {opt.type === "checkbox" && (
                        <div className="space-y-2">
                          {opt.options!.map((o) => {
                            const arr = (selected[opt.id] as string[]) || [];
                            const checked = arr.includes(o.value);
                            return (
                              <button
                                key={o.value}
                                onClick={() => {
                                  const next = checked ? arr.filter((x) => x !== o.value) : [...arr, o.value];
                                  setSelected({ ...selected, [opt.id]: next });
                                }}
                                className={cn(
                                  "w-full flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all",
                                  checked ? "border-foreground bg-accent/40" : "border-border hover:border-foreground/30"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "size-5 rounded-md border-2 flex items-center justify-center transition-colors",
                                    checked ? "bg-foreground border-foreground" : "border-border"
                                  )}>
                                    {checked && <Check className="size-3.5 text-background" />}
                                  </div>
                                  <span className="font-semibold text-sm">{o.label}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">+{formatKRW(o.price)}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-semibold mb-2">희망 마감일을 선택하세요</h3>
                  <p className="text-sm text-muted-foreground mb-6">오늘 이전 날짜는 선택할 수 없습니다.</p>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      disabled={(d) => d < today}
                      locale={ko}
                      modifiers={{ weekend: (d) => d.getDay() === 0 || d.getDay() === 6 }}
                      modifiersClassNames={{ weekend: "text-[var(--color-weekend)] font-semibold" }}
                      className="pointer-events-auto rounded-2xl border border-border p-4"
                    />
                  </div>
                  {deadline && (
                    <p className="text-center mt-6 text-sm">
                      선택한 마감일: <span className="font-semibold">{format(deadline, "yyyy년 M월 d일 (EEE)", { locale: ko })}</span>
                    </p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 max-w-md mx-auto">
                  <h3 className="font-semibold mb-2">담당자 정보</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">이름</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">이메일</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 rounded-xl" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold disabled:opacity-40 hover:bg-accent transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground text-background px-7 text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {step === 2 ? "결제하기" : "다음"} <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Price summary */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">예상 견적</p>
              <p className="text-4xl font-bold tracking-tight">{formatKRW(price)}</p>
              <div className="my-6 h-px bg-border" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>기본 가격</span><span>{formatKRW(service.basePrice)}</span>
                </div>
                {service.options.map((opt) => {
                  const val = selected[opt.id];
                  if (opt.type === "slider" && typeof val === "number" && opt.basePrice) {
                    return (
                      <div key={opt.id} className="flex justify-between">
                        <span className="text-muted-foreground">{opt.label} ({val}{opt.unit})</span>
                        <span>+{formatKRW(val * opt.basePrice)}</span>
                      </div>
                    );
                  }
                  if (opt.type === "select" && typeof val === "string") {
                    const o = opt.options?.find((x) => x.value === val);
                    if (!o || o.price === 0) return null;
                    return (
                      <div key={opt.id} className="flex justify-between">
                        <span className="text-muted-foreground">{o.label}</span>
                        <span>+{formatKRW(o.price)}</span>
                      </div>
                    );
                  }
                  if (opt.type === "checkbox" && Array.isArray(val)) {
                    return val.map((v) => {
                      const o = opt.options?.find((x) => x.value === v);
                      if (!o) return null;
                      return (
                        <div key={v} className="flex justify-between">
                          <span className="text-muted-foreground">{o.label}</span>
                          <span>+{formatKRW(o.price)}</span>
                        </div>
                      );
                    });
                  }
                  return null;
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
