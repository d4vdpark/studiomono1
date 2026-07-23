export type ServiceId = "restaurant" | "beauty" | "general";

export interface ServiceOption {
  id: string;
  label: string;
  type: "slider" | "select" | "checkbox";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  basePrice?: number;
  options?: { value: string; label: string; price: number }[];
  default?: number | string;
}

export interface Service {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  basePrice: number;
  basePriceLabel: string;
  options: ServiceOption[];
}

export const SERVICES: readonly Service[] = [
  {
    id: "restaurant",
    title: "식당 · 카페",
    tagline: "Restaurant & Café",
    description:
      "메뉴판 · 예약 · 위치까지. 손님이 머무는 시간이 길어지는, 브랜드의 결을 담은 사이트.",
    basePrice: 59000,
    basePriceLabel: "베이직 패키지부터",
    options: [
      {
        id: "pages",
        label: "페이지 구성",
        type: "slider",
        min: 3,
        max: 12,
        step: 1,
        unit: "페이지",
        basePrice: 90000,
        default: 5,
      },
      {
        id: "plan",
        label: "디자인 결",
        type: "select",
        options: [
          { value: "essential", label: "에센셜", price: 0 },
          { value: "signature", label: "시그니처", price: 350000 },
          { value: "couture", label: "꾸뛰르", price: 900000 },
        ],
        default: "signature",
      },
      {
        id: "features",
        label: "필요한 기능",
        type: "checkbox",
        options: [
          { value: "menu", label: "디지털 메뉴판", price: 180000 },
          { value: "reservation", label: "예약 달력", price: 280000 },
          { value: "delivery", label: "배달앱 연동", price: 220000 },
          { value: "multilang", label: "한·영·일 다국어", price: 200000 },
        ],
      },
    ],
  },
  {
    id: "beauty",
    title: "뷰티 · 미용실",
    tagline: "Beauty & Salon",
    description:
      "디자이너 · 시술 · 예약을 한 흐름에. 첫 방문을 단골로 만드는 우아한 예약 사이트.",
    basePrice: 59000,
    basePriceLabel: "베이직 패키지부터",
    options: [
      {
        id: "pages",
        label: "페이지 구성",
        type: "slider",
        min: 4,
        max: 15,
        step: 1,
        unit: "페이지",
        basePrice: 95000,
        default: 6,
      },
      {
        id: "plan",
        label: "디자인 결",
        type: "select",
        options: [
          { value: "essential", label: "에센셜", price: 0 },
          { value: "signature", label: "시그니처", price: 400000 },
          { value: "couture", label: "꾸뛰르", price: 1000000 },
        ],
        default: "signature",
      },
      {
        id: "features",
        label: "필요한 기능",
        type: "checkbox",
        options: [
          { value: "booking", label: "디자이너별 예약 시스템", price: 350000 },
          { value: "portfolio", label: "스타일 포트폴리오", price: 180000 },
          { value: "membership", label: "멤버십 관리", price: 280000 },
          { value: "reviews", label: "후기 · 별점", price: 150000 },
        ],
      },
    ],
  },
  {
    id: "general",
    title: "일반 서비스업",
    tagline: "Local Business",
    description:
      "부동산, 학원, 클리닉, 공방 — 신뢰감 있는 브랜드 사이트와 상담 신청 시스템.",
    basePrice: 59000,
    basePriceLabel: "베이직 패키지부터",
    options: [
      {
        id: "pages",
        label: "페이지 구성",
        type: "slider",
        min: 5,
        max: 20,
        step: 1,
        unit: "페이지",
        basePrice: 110000,
        default: 7,
      },
      {
        id: "plan",
        label: "디자인 결",
        type: "select",
        options: [
          { value: "essential", label: "에센셜", price: 0 },
          { value: "signature", label: "시그니처", price: 450000 },
          { value: "couture", label: "꾸뛰르", price: 1100000 },
        ],
        default: "signature",
      },
      {
        id: "features",
        label: "필요한 기능",
        type: "checkbox",
        options: [
          { value: "consult", label: "상담 신청 폼 + 알림", price: 200000 },
          { value: "listing", label: "매물 · 상품 리스팅", price: 450000 },
          { value: "cms", label: "관리자 CMS", price: 380000 },
          { value: "seo", label: "로컬 SEO 패키지", price: 250000 },
        ],
      },
    ],
  },
];

export const getService = (id: string) => SERVICES.find((s) => s.id === id);

export type SelectedOptions = Record<string, number | string | string[]>;

export function calculatePrice(service: Service, selected: SelectedOptions): number {
  let total = service.basePrice;
  for (const opt of service.options) {
    const val = selected[opt.id];
    if (opt.type === "slider" && typeof val === "number" && opt.basePrice) {
      total += val * opt.basePrice;
    } else if (opt.type === "select" && typeof val === "string") {
      const o = opt.options?.find((x) => x.value === val);
      if (o) total += o.price;
    } else if (opt.type === "checkbox" && Array.isArray(val)) {
      for (const v of val) {
        const o = opt.options?.find((x) => x.value === v);
        if (o) total += o.price;
      }
    }
  }
  return total;
}

export function defaultSelection(service: Service): SelectedOptions {
  const sel: SelectedOptions = {};
  for (const opt of service.options) {
    if (opt.type === "checkbox") sel[opt.id] = [];
    else if (opt.default !== undefined) sel[opt.id] = opt.default;
  }
  return sel;
}
