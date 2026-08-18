import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
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
    title: "Brunch Cafe",
    tag: "임시 식당 소개 · 메뉴 · 예약",
    year: "2025",
    tone: "oklch(0.58 0.08 260)",
    previewUrl: "https://perthwithcoffee.lovable.app/",
  },
  {
    title: "방역 웹사이트",
    tag: "방역 웹사이트 · 예약 · QR 체크인",
    year: "2025",
    tone: "oklch(0.62 0.14 38)",
    previewUrl: "https://ourenvironment.lovable.app/",
  },
];

const RESTAURANT_PREVIEW_URL = "https://perthwithcoffee.lovable.app";

function Home() {
  const [previewWork, setPreviewWork] = useState<(typeof WORK)[number] | null>(null);

  const handleWorkPreviewClick = (event: MouseEvent<HTMLAnchorElement>, work: (typeof WORK)[number]) => {
    event.preventDefault();
    event.stopPropagation();
    setPreviewWork(work);
  };

  useEffect(() => {
    if (!previewWork) return;

    const originalOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewWork(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewWork]);

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
              hash="work"
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
              <div className="card-lift group block rounded-3xl border border-border bg-card p-7 sm:p-8 h-full pointer-events-none select-none">
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
                <div className="pt-6 border-t border-border flex items-end justify-between mt-auto">
                  {/* '베이직 패키지부터'는 그대로 작게 유지 */}
                  <span className="text-xs text-muted-foreground">베이직 패키지부터</span>
                  
                  <div className="text-right">
                    {/* 1. 원래 가격: 크기 키우고(text-lg), 진한 취소선 적용(decoration-gray-500) */}
                    <div className="text-lg text-muted-foreground line-through decoration-gray-500 decoration-1.5 mb-0.5">
                      500,000원
                    </div>
                    
                    {/* 2. 할인된 가격: 훨씬 크게 키우고(text-2xl), 굵게(font-bold) */}
                    <div className="text-2xl font-bold text-foreground leading-none">
                      250,000원
                    </div>
                    
                    {/* 3. 날짜: 크기 살짝 키움(text-xs) */}
                    <div className="text-xs text-muted-foreground mt-1.5">
                      8월 31일 까지
                    </div>
                  </div>
                </div>
              </div>
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
                {w.title === "Brunch Cafe" ? (
                  <a
                    href={w.previewUrl ?? RESTAURANT_PREVIEW_URL}
                    onClick={(event) => handleWorkPreviewClick(event, w)}
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
                ) : w.title === "방역 웹사이트" ? (
                  <a
                    href={w.previewUrl}
                    onClick={(event) => handleWorkPreviewClick(event, w)}
                    className="group block w-full cursor-pointer text-left"
                  >
                    <div
                      className="card-lift relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-8"
                      style={{ background: w.tone }}
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <iframe
                          src={w.previewUrl}
                          title="방역 웹사이트 카드 미리보기"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="absolute left-0 top-0 h-[160%] w-[160%] origin-top-left scale-[0.625] border-0 bg-white"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.2)_45%,rgba(15,23,42,0.74)_100%)]" />
                      </div>

                      <div className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-white/80 text-right">
                        {w.year}
                      </div>
                      <div className="relative z-10 text-white">
                        <p className="font-serif text-3xl sm:text-4xl">{w.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{w.tag}</p>
                  </a>
                ) : (
                  <div className="group">
                    <div
                      className="card-lift relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-8"
                      style={{ background: w.tone }}
                    >
                      <div className="text-[10px] tracking-[0.2em] uppercase text-white/80 text-right">
                        {w.year}
                      </div>
                      <div className="text-white">
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
          <p className="font-serif text-2xl sm:text-4xl leading-relaxed max-w-4xl">
            사장님의 니즈를 100% 반영하고 그 결을<br />
            보기 좋게 화면에 옮깁니다. 제작 후 수정부터<br />
            운영, 업데이트까지 전부 관리합니다.
            <span className="italic"> </span>
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

      {previewWork ? (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewWork.title} 미리보기`}
          onClick={() => setPreviewWork(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-2 sm:px-5 sm:py-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Live Preview</p>
                <h3 className="mt-1 text-sm font-semibold sm:text-base">{previewWork.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewWork(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="미리보기 닫기"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 bg-muted/30">
              <iframe
                src={previewWork.previewUrl ?? RESTAURANT_PREVIEW_URL}
                title={previewWork.title}
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

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (!name || !phone) {
      toast.error("이름과 전화번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mvkprdgj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSent(true);
        toast.success("상담 신청이 접수됐어요. 영업일 기준 1일 내 연락드릴게요.");
        form.reset();
      } else {
        toast.error("전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      toast.error("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <section id="contact" className="bg-foreground text-background py-20 sm:py-32 mt-10">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-background/60 mb-3">04 · Contact</p>
          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
            먼저, <span className="italic">이야기</span>부터.
          </h2>
          <p className="mt-5 text-background/70 max-w-md leading-relaxed">
            영업일 기준 1일 내로 직접 연락드립니다. 무료 상담은 부담 없이.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">이름</label>
              <input
                name="name"
                type="text"
                placeholder="홍길동"
                required
                className="w-full bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-base h-12 text-background placeholder:text-background/30 focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">전화번호</label>
              <input
                name="phone"
                type="tel"
                placeholder="010 0000 0000"
                required
                className="w-full bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-base h-12 text-background placeholder:text-background/30 focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">이메일</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-base h-12 text-background placeholder:text-background/30 focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-background/50 mb-3">
                간단한 소개 (선택)
              </label>
              <textarea
                name="message"
                placeholder="어떤 가게인가요? 어떤 기능이 필요하신가요?"
                className="w-full min-h-32 bg-transparent border-0 border-b border-background/20 rounded-none px-0 text-base text-background placeholder:text-background/30 focus:outline-none focus:border-accent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-background text-foreground px-8 text-base font-medium hover:bg-background/90 transition-colors w-full sm:w-auto disabled:opacity-60 cursor-pointer"
            >
              {sent ? "접수 완료" : <>상담 신청하기 <ArrowUpRight className="size-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}