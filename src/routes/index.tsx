import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { Nav, MobileBottomBar } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/lib/services";
import { formatKRW } from "@/lib/orders";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Mono — 로컬 비즈니스를 위한 웹사이트 스튜디오" },
      {
        name: "description",
        content:
          "식당, 카페, 미용실, 부동산을 위한 한 땀 한 땀 만드는 웹사이트. 상담부터 결제, 진행 상황 추적까지 한 곳에서.",
      },
      { property: "og:title", content: "Studio Mono" },
      {
        property: "og:description",
        content: "로컬 비즈니스를 위한 웹사이트 스튜디오.",
      },
    ],
  }),
  component: Home,
});

const WORK: Array<{
  title: string;
  tag: string;
  year: string;
  tone: string;
  previewUrl?: string;
}> = [
  {
    title: "내 식당 웹사이트",
    tag: "임시 식당 소개 · 메뉴 · 예약",
    year: "2025",
    tone: "oklch(0.58 0.08 260)",
    previewUrl: "https://perthwithcoffee.lovable.app/",
  },
  { title: "안온 다이닝", tag: "한남 · 와인 다이닝", year: "2025", tone: "oklch(0.62 0.14 38)" },
  { title: "Salon Marée", tag: "성수 · 헤어살롱", year: "2025", tone: "oklch(0.42 0.06 240)" },
  { title: "고요 부동산", tag: "이태원 · 부동산", year: "2024", tone: "oklch(0.36 0.05 150)" },
  { title: "온스 베이커리", tag: "연남 · 카페", year: "2024", tone: "oklch(0.5 0.12 60)" },
];

const RESTAURANT_PREVIEW_URL = "https://perthwithcoffee.lovable.app";

function Home() {
  const featuredWork = useMemo(() => WORK.find((item) => item.title === "내 식당 웹사이트"), []);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleRestaurantPreviewClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    if (!isPreviewOpen) return;

    const originalOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isPreviewOpen]);

  return (
    <div className="min-h-screen grain pb-24 md:pb-0">
      <Nav />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 sm:pt-24 pb-20 sm:pb-32">
          <Reveal className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 sm:mb-10">
            Design · Est · 2025
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif text-[44px] leading-[1.05] sm:text-7xl md:text-[88px] tracking-tight">
              공간의 결을 담는 웹사이트,<br />
              <span className="italic text-accent">STUDIO MONO.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 sm:mt-10 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              오프라인 브랜드가 가진 고유한 무드와 철학의 비즈니스를 위해
              한 땀 한 땀 만드는 디자인 스튜디오.
            </p>
          </Reveal>
          <Reveal delay={320} className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 text-base font-medium hover:bg-foreground/85 transition-colors"
            >
              무료 상담 신청 <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/"
              hash="services"
              className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/15 px-7 text-base font-medium hover:bg-foreground/[0.04] transition-colors"
            >
              작업 둘러보기
            </Link>
          </Reveal>
        </div>

        {/* Marquee strip */}
        <div className="border-y border-border bg-foreground/[0.02] overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex items-center gap-8 sm:gap-14 text-xs sm:text-sm text-muted-foreground whitespace-nowrap overflow-x-auto scrollbar-none">
            {["식당 · 카페", "뷰티 · 미용실", "부동산", "공방 · 클리닉", "학원", "꽃집 · 공방"].map((t) => (
              <span key={t} className="shrink-0">— {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-32">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">01 · Services</p>
          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight max-w-2xl">
            업종에 꼭 맞게,<br />
            <span className="italic">디테일까지.</span>
          </h2>
        </Reveal>

        <div className="mt-12 sm:mt-20 grid md:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <Link
                to="/booking/$serviceId"
                params={{ serviceId: s.id }}
                className="card-lift group block rounded-3xl border border-border bg-card p-7 sm:p-8 h-full"
              >
                <div className="flex items-start justify-between mb-8 sm:mb-10">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="size-9 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">{s.tagline}</p>
                <h3 className="font-serif text-3xl sm:text-4xl mb-4">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[3rem]">
                  {s.description}
                </p>
                <div className="pt-6 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">{s.basePriceLabel}</span>
                  <span className="font-serif text-2xl">{formatKRW(s.basePrice)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="bg-foreground/[0.025] border-y border-border py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">02 · Selected Work</p>
            <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
              최근 만든 <span className="italic">자리.</span>
            </h2>
          </Reveal>

          <div className="mt-12 sm:mt-20 grid sm:grid-cols-2 gap-5 sm:gap-8">
            {WORK.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                {w.title === "내 식당 웹사이트" ? (
                  <a
                    href={featuredWork?.previewUrl ?? RESTAURANT_PREVIEW_URL}
                    onClick={handleRestaurantPreviewClick}
                    className="group block w-full cursor-pointer text-left"
                  >
                    <div
                      className="card-lift relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden"
                      style={{ background: w.tone }}
                    >
                      {w.previewUrl ? (
                        <iframe
                          src={w.previewUrl}
                          title={w.title}
                          loading="lazy"
                          scrolling="no"
                          className="absolute inset-0 h-full w-full border-0 z-0 pointer-events-none overflow-hidden"
                        />
                      ) : null}
                      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/15 via-transparent to-black/70" />
                      <div className="absolute top-5 right-5 z-10 text-[10px] tracking-[0.2em] uppercase text-white/80">
                        {w.year}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                        <p className="font-serif text-3xl sm:text-4xl">{w.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{w.tag}</p>
                  </a>
                ) : (
                  <div className="group">
                    <div
                      className="card-lift relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden"
                      style={{ background: w.tone }}
                    >
                      {w.previewUrl ? (
                        <iframe
                          src={w.previewUrl}
                          title={w.title}
                          loading="lazy"
                          scrolling="no"
                          className="absolute inset-0 h-full w-full border-0 z-0 pointer-events-none overflow-hidden"
                        />
                      ) : null}
                      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/15 via-transparent to-black/70" />
                      <div className="absolute top-5 right-5 z-10 text-[10px] tracking-[0.2em] uppercase text-white/80">
                        {w.year}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                        <p className="font-serif text-3xl sm:text-4xl">{w.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{w.tag}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio philosophy */}
      <section id="studio" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-32">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">03 · Studio</p>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-serif text-3xl sm:text-5xl leading-[1.25] max-w-4xl">
            템플릿이 만든 사이트는 멀리서도 티가 납니다. 우리는 가게 안에 직접 앉아
            메뉴를 먹고, 손님의 동선을 보고, 사장님의 말투를 듣고 — 그 결을 그대로
            <span className="italic"> 화면에 옮깁니다.</span>
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-14 sm:mt-20 grid sm:grid-cols-3 gap-10">
          {[
            { n: "01", t: "온사이트 리서치", d: "공간을 직접 방문하고, 브랜드 톤을 읽습니다." },
            { n: "02", t: "한 땀 한 땀 디자인", d: "템플릿 없이, 매장 결에 맞춘 오리지널 디자인." },
            { n: "03", t: "운영까지 책임", d: "납품 후에도 콘텐츠 업데이트와 유지보수." },
          ].map((b) => (
            <div key={b.n}>
              <p className="text-xs tracking-[0.3em] text-accent mb-3">{b.n}</p>
              <h4 className="font-serif text-2xl mb-3">{b.t}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Contact form */}
      <ContactSection />

      <footer className="border-t border-border py-10 mt-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:justify-between">
          <p>© 2025 Studio mono —</p>
          <p>d4vdpark@gmail.com · 010-7331-2134</p>
        </div>
      </footer>

      <MobileBottomBar />

      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="내 식당 웹사이트 미리보기"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-2 sm:px-5 sm:py-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Live Preview</p>
                <h3 className="mt-1 text-sm font-semibold sm:text-base">내 식당 웹사이트</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="미리보기 닫기"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 bg-muted/30">
              <iframe
                src={featuredWork?.previewUrl ?? RESTAURANT_PREVIEW_URL}
                title="내 식당 웹사이트"
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ContactSection() {
  const [data, setData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) {
      toast.error("이름과 전화번호를 입력해주세요.");
      return;
    }
    setSent(true);
    toast.success("상담 신청이 접수됐어요. 영업일 기준 1일 내 연락드릴게요.");
    setTimeout(() => {
      setData({ name: "", phone: "", email: "", message: "" });
      setSent(false);
    }, 2500);
  };

  return (
    <section id="contact" className="bg-foreground text-background py-20 sm:py-32 mt-10">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-background/60 mb-3">04 · Contact</p>
          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
            먼저, <span className="italic">이야기</span>부터.
          </h2>
          <p className="mt-5 text-background/70 max-w-md leading-relaxed">
            영업일 기준 1일 내로 직접 연락드립니다. 무료 상담은 부담 없이.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="mt-12 sm:mt-16 space-y-7">
            <Field
              label="이름"
              value={data.name}
              onChange={(v) => setData({ ...data, name: v })}
              placeholder="홍길동"
              autoComplete="name"
            />
            <Field
              label="전화번호"
              value={data.phone}
              onChange={(v) => setData({ ...data, phone: v })}
              placeholder="010 0000 0000"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
            />
            <Field
              label="이메일"
              value={data.email}
              onChange={(v) => setData({ ...data, email: v })}
              placeholder="you@example.com"
              type="email"
              inputMode="email"
              autoComplete="email"
            />
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">
                간단한 소개 (선택)
              </label>
              <Textarea
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="어떤 가게인가요? 어떤 기능이 필요하신가요?"
                className="min-h-32 bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-lg placeholder:text-background/30 focus-visible:border-accent focus-visible:ring-0 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-background text-foreground px-8 text-base font-medium hover:bg-background/90 transition-colors w-full sm:w-auto disabled:opacity-60"
            >
              {sent ? <><Check className="size-4" /> 접수 완료</> : <>상담 신청하기 <ArrowUpRight className="size-4" /></>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "numeric" | "email" | "text" | "tel";
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-lg h-12 placeholder:text-background/30 focus-visible:border-accent focus-visible:ring-0"
      />
    </div>
  );
}
