"use client";

import { useLeadModal } from "@/components/site/LeadModalProvider";

interface CaseOrderButtonProps {
  serviceType: string;
  clientName: string;
}

export function CaseOrderButton({ serviceType, clientName }: CaseOrderButtonProps) {
  const { open } = useLeadModal();

  return (
    <button
      onClick={() => open({ serviceId: serviceType, serviceName: `По мотивам кейса: ${clientName}`, skipStep2: true })}
      className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl bg-[color:var(--color-accent)] px-6 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      Хочу так же →
    </button>
  );
}
