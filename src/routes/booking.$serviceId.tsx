import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Nav from "@/components/Nav";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/booking/$serviceId")({
  component: Booking,
});

function Booking() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const STEPS = ["옵션 선택", "정보 입력"];

  const handleNext = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      alert("예약 신청이 완료되었습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" /> 메인으로
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold text-primary mb-2">Studio One</p>
          <h1 className="text-3xl font-bold tracking-tight mb-8">예약 신청하기</h1>

          {/* Stepper */}
          <div className="flex items-center gap-3 mb-10">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center gap-3 flex-1">
                <div className={`flex items-center gap-2.5 ${i > step ? "opacity-40" : ""}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <Check className="size-4" /> : i + 1}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="h-px bg-border flex-1" />}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="py-4">
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">서비스 옵션</h3>
                <p className="text-sm text-muted-foreground">희망하시는 서비스를 선택해주세요.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-foreground rounded-2xl bg-accent/30 cursor-pointer">
                    <p className="font-semibold text-sm">기본 패키지</p>
                    <p className="text-xs text-muted-foreground mt-1">기본 가이드 및 표준 템플릿 적용</p>
                  </div>
                  <div className="p-4 border border-border rounded-2xl hover:border-foreground/40 cursor-pointer">
                    <p className="font-semibold text-sm">프리미엄 커스텀</p>
                    <p className="text-xs text-muted-foreground mt-1">1:1 맞춤 제작 및 컨설팅</p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 max-w-md">
                <h3 className="font-semibold text-lg">담당자 정보 입력</h3>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">이름</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className="h-11 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">연락처</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" className="h-11 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">이메일</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className="h-11 rounded-xl" />
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="h-11 px-6 rounded-full border border-border text-sm font-semibold disabled:opacity-30 hover:bg-accent"
            >
              이전
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="h-11 px-7 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 inline-flex items-center gap-2"
            >
              {step === 1 ? "예약하기" : "다음"} <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}