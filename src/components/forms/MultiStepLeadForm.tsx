"use client";

import { useState } from "react";

type MultiStepLeadFormProps = {
  serviceId?: string;
  serviceName?: string;
  skipStep2?: boolean;
  onSubmitted?: () => void;
};

export function MultiStepLeadForm({
  serviceId = "web",
  serviceName,
  skipStep2 = false,
  onSubmitted,
}: MultiStepLeadFormProps) {
  const [contactData, setContactData] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const formatPhoneNumber = (value: string) => {
    // Keep only digits
    const digits = value.replace(/\D/g, "");
    
    // If empty or just starting, return as is (allow user to delete)
    if (!digits) return "";

    // Format as +7 (XXX) XXX-XX-XX
    let formatted = "";
    
    // If it starts with 7 or 8, we treat it as 7
    const cleanDigits = (digits.startsWith("7") || digits.startsWith("8")) ? digits.slice(1) : digits;
    
    formatted = "+7";
    if (cleanDigits.length > 0) formatted += " (" + cleanDigits.substring(0, 3);
    if (cleanDigits.length >= 3) formatted += ") " + cleanDigits.substring(3, 6);
    if (cleanDigits.length >= 6) formatted += "-" + cleanDigits.substring(6, 8);
    if (cleanDigits.length >= 8) formatted += "-" + cleanDigits.substring(8, 10);
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Only apply if we are adding characters or it looks like a phone number
    if (val.length < contactData.phone.length) {
      // Deleting
      setContactData(prev => ({ ...prev, phone: val }));
    } else {
      setContactData(prev => ({ ...prev, phone: formatPhoneNumber(val) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...contactData,
      service: serviceName || "Заказ из модального окна",
      project: "Быстрый заказ",
      budget: "Не указан",
    };
    
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          contact: payload.phone,
          project: payload.project,
          budget: payload.budget,
          service: payload.service,
        }),
      });
      
      setStatus("success");
      setTimeout(() => {
        onSubmitted?.();
      }, 3000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Спасибо за заявку!</h3>
        <p className="mt-2 text-white/60">Мы не подведем. Наш эксперт свяжется с вами в течение 15 минут.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="mb-6">
            <h3 className="mt-1 text-2xl font-bold text-white">Оставьте заявку</h3>
            <p className="mt-2 text-white/50">Мы свяжемся с вами для обсуждения деталей.</p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Имя</label>
              <input
                required
                type="text"
                placeholder="Иван"
                value={contactData.name}
                onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Номер телефона</label>
              <input
                required
                type="tel"
                inputMode="tel"
                placeholder="+7 (999) 919-62-61"
                value={contactData.phone}
                onChange={handlePhoneChange}
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={status === "sending" || !contactData.name || !contactData.phone}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Отправка..." : "Отправить"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
