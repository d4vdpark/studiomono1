import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "서비스", to: "/", hash: "services" },
    { label: "작업", to: "/", hash: "work" },
    { label: "스튜디오", to: "/", hash: "studio" },
    { label: "상담 신청", to: "/", hash: "contact" },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
            <span className="inline-block size-2 rounded-full bg-accent" />
            Studio Mono
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-sm text-muted-foreground">
            {links.map((l) => (
              <Link key={l.label} to={l.to} hash={l.hash} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/dashboard"
            className="hidden md:inline-flex h-10 items-center rounded-full bg-foreground text-background px-5 text-sm font-medium hover:bg-foreground/85 transition-colors"
          >
            내 주문
          </Link>
          <button
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
            className="md:hidden -mr-2 p-2 text-foreground"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="h-16 px-5 flex items-center justify-between border-b border-border">
            <span className="font-serif text-xl">메뉴</span>
            <button aria-label="메뉴 닫기" onClick={() => setOpen(false)} className="-mr-2 p-2">
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex-1 px-5 py-6 space-y-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="block py-4 font-serif text-3xl tracking-tight border-b border-border/60"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block py-4 font-serif text-3xl tracking-tight"
            >
              내 주문
            </Link>
          </nav>
          <div className="p-5">
            <Link
              to="/"
              hash="contact"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-full bg-foreground text-background text-base font-medium"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

/** Sticky bottom CTA bar — visible on mobile only */
export function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="px-4 py-3 flex gap-2">
        <Link
          to="/"
          hash="services"
          className="flex-1 h-12 rounded-full border border-border bg-background flex items-center justify-center text-sm font-medium"
        >
          서비스 보기
        </Link>
        <Link
          to="/"
          hash="contact"
          className="flex-[1.4] h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold"
        >
          무료 상담 신청
        </Link>
      </div>
    </div>
  );
}
