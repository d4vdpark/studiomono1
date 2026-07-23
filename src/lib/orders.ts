import type { ServiceId, SelectedOptions } from "./services";

export const ORDER_STAGES = ["기획 중", "제작 중", "1차 시안 완료", "최종 납품"] as const;
export type OrderStage = (typeof ORDER_STAGES)[number];

export interface Order {
  id: string;
  serviceId: ServiceId;
  serviceTitle: string;
  selected: SelectedOptions;
  price: number;
  deadline: string; // ISO
  createdAt: string;
  stage: OrderStage;
  customerName: string;
  customerEmail: string;
}

const KEY = "agency.orders.v1";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function stageProgress(stage: OrderStage): number {
  return ((ORDER_STAGES.indexOf(stage) + 1) / ORDER_STAGES.length) * 100;
}

export function formatKRW(n: number): string {
  return new Intl.NumberFormat("ko-KR").format(n) + "원";
}
