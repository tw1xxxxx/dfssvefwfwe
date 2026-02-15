"use client";

import { useLeadModal } from "@/components/site/LeadModalProvider";

export function OrderButton({
  serviceId,
  serviceName,
  className,
  children,
}: {
  serviceId: string;
  serviceName: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useLeadModal();

  return (
    <button
      onClick={() => open({ serviceId, serviceName })}
      className={className}
    >
      {children || "Заказать"}
    </button>
  );
}
