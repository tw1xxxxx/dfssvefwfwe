"use client";

import { FormEvent, useId, useMemo, useState } from "react";

type LeadPayload = {
  name: string;
  contact: string;
  project: string;
  budget: string;
  service: string;
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LeadForm({
  initialService,
  compact = false,
  onSubmitted,
}: {
  initialService?: string;
  compact?: boolean;
  onSubmitted?: () => void;
}) {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState<string | null>(null);
  
  // Budget state
  const [budget, setBudget] = useState("");
  const budgetOptions = useMemo(() => [
    { label: "Эконом", value: "до 100 000 ₽", min: 0, max: 100000 },
    { label: "Стартап", value: "100 000 - 300 000 ₽", min: 100000, max: 300000 },
    { label: "Значительный", value: "300 000 - 1 000 000 ₽", min: 300000, max: 1000000 },
    { label: "Крупный", value: "от 1 000 000 ₽", min: 1000000, max: 10000000 },
  ], []);

  const [budgetIndex, setBudgetIndex] = useState(0);

  const handleBudgetChange = (idx: number) => {
    setBudgetIndex(idx);
    setBudget(budgetOptions[idx].value);
  };

  // Contact field state for masking
  const [contact, setContact] = useState("");

  const formatPhoneNumber = (value: string) => {
    // Keep only digits
    const digits = value.replace(/\D/g, "");
    
    // If empty or just starting, return as is (allow user to delete)
    if (!digits) return "";

    // If user explicitly types letters, return original (allow Telegram)
    if (/[a-zA-Z]/.test(value)) return value;

    // Format as +7 (XXX) XXX-XX-XX
    // Assuming Russian numbers for now based on request
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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // If typing text (Telegram), allow it
    if (/[a-zA-Z]/.test(val) && !val.startsWith("+7")) {
      setContact(val);
      return;
    }

    // Otherwise apply phone mask
    // Only apply if we are adding characters or it looks like a phone number
    if (val.length < contact.length) {
      // Deleting
      setContact(val);
    } else {
      setContact(formatPhoneNumber(val));
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorText(null);

    const form = e.currentTarget;
    const payload: LeadPayload = {
      name: String(new FormData(form).get("name") ?? "").trim(),
      contact: contact, // Use state value
      project: String(new FormData(form).get("project") ?? "").trim(),
      budget: budget, // Use state value
      service: String(new FormData(form).get("service") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Не удалось отправить заявку.");
      }

      setStatus("success");
      form.reset();
      setContact("");
      setBudget("");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "Ошибка отправки.");
    }
  }

  const inputBase =
    "w-full rounded-[1.25rem] border border-white/5 bg-white/5 px-4 py-3 sm:px-5 sm:py-4 text-base text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-2)] transition-all focus:bg-white/[0.08]";

  return (
    <form
      aria-labelledby={`${formId}-title`}
      onSubmit={onSubmit}
      className={cn(
        "grid gap-4 sm:gap-6",
        compact ? "sm:grid-cols-2" : "sm:grid-cols-2",
      )}
    >
      <div className="sm:col-span-2">
        <div
          id={`${formId}-title`}
          className="text-xl font-semibold text-white/90"
        >
          Короткий бриф
        </div>
        <div className="mt-2 text-sm text-white/50">
          Описание + бюджет = быстрее и точнее оценка.
        </div>
      </div>

      <input type="hidden" name="service" defaultValue={initialService ?? ""} />

      <div className="grid gap-2">
        <label htmlFor={`${formId}-name`} className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
          Имя
        </label>
        <input 
          id={`${formId}-name`}
          name="name" 
          required 
          className={inputBase} 
          placeholder="Иван" 
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${formId}-contact`} className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
          Контакт
        </label>
        <input
          id={`${formId}-contact`}
          name="contact"
          required
          value={contact}
          onChange={handleContactChange}
          className={inputBase}
          placeholder="+7 (999) 919-62-61"
        />
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor={`${formId}-project`} className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
          О проекте
        </label>
        <textarea
          id={`${formId}-project`}
          name="project"
          required
          rows={3}
          className={cn(inputBase, "resize-none")}
          placeholder="Расскажите о задаче на простом языке"
        />
      </div>

      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor={`${formId}-budget`} className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
          Бюджет
        </label>
        
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-2">
          {budgetOptions.map((opt, idx) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => handleBudgetChange(idx)}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all",
                budgetIndex === idx
                  ? "border-[color:var(--color-accent-2)] bg-[color:var(--color-accent-2)]/10 text-[color:var(--color-accent-2)]"
                  : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-0.5">
                {opt.label}
              </div>
              <div className="text-[10px] sm:text-xs font-medium">
                {idx === 3 ? "> 1 млн ₽" : opt.value.replace(" - ", "-").replace(" ₽", "") + " ₽"}
              </div>
            </button>
          ))}
        </div>

        <div className="relative h-12 px-2 mb-2">
          {/* Custom Range Slider */}
          <input
            type="range"
            min={0}
            max={budgetOptions.length - 1}
            step={1}
            value={budgetIndex}
            onChange={(e) => handleBudgetChange(Number(e.target.value))}
            className="w-full absolute top-1/2 -translate-y-1/2 z-20 opacity-0 cursor-pointer h-full"
          />
          
          {/* Visual Track */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white/10 rounded-full -translate-y-1/2 overflow-hidden pointer-events-none">
            <div 
              className="h-full bg-[color:var(--color-accent-2)]"
              style={{ width: `${(budgetIndex / (budgetOptions.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Visual Thumb */}
          <div 
            className="absolute top-1/2 h-6 w-6 bg-[color:var(--color-accent-2)] rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)] border-2 border-[#030712] pointer-events-none z-10"
            style={{ 
              left: `${(budgetIndex / (budgetOptions.length - 1)) * 100}%`,
              transform: `translate(-50%, -50%)`
            }}
          />
        </div>

        <input
          id={`${formId}-budget`}
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={inputBase}
          placeholder="Например, 100 000 ₽"
        />
      </div>

      <div className="sm:col-span-2 mt-2">
        <button
          disabled={status === "sending"}
          type="submit"
          className="group relative w-full overflow-hidden rounded-[1.25rem] bg-[color:var(--color-accent-2)] px-8 py-6 text-lg font-bold uppercase tracking-wider text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98] disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {status === "sending" ? "Отправка..." : "Отправить заявку"}
            <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>

      {status === "success" && (
        <div className="sm:col-span-2 rounded-2xl bg-emerald-500/10 p-4 text-center text-sm font-medium text-emerald-400 border border-emerald-500/20">
          Заявка успешно отправлена! Мы скоро свяжемся с вами.
        </div>
      )}

      {status === "error" && (
        <div className="sm:col-span-2 rounded-2xl bg-red-500/10 p-4 text-center text-sm font-medium text-red-400 border border-red-500/20">
          {errorText ?? "Произошла ошибка. Попробуйте позже."}
        </div>
      )}
    </form>
  );
}
