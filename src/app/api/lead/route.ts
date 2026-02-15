import { NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  contact?: unknown;
  project?: unknown;
  budget?: unknown;
  service?: unknown;
};

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as LeadPayload | null;
  if (!json) {
    return NextResponse.json({ error: "Некорректные данные." }, { status: 400 });
  }

  const name = asString(json.name);
  const contact = asString(json.contact);
  const project = asString(json.project);
  const budget = asString(json.budget);
  const service = asString(json.service);

  if (!name || !contact || !project || !budget) {
    return NextResponse.json(
      { error: "Заполните имя, контакт, описание и бюджет." },
      { status: 400 },
    );
  }

  const lead = {
    name,
    contact,
    project,
    budget,
    service,
    receivedAt: new Date().toISOString(),
  };

  try {
    const BOT_TOKEN = "8455902996:AAHKH6cocodHUFXXrzH7mrA8Yc0FuKetFng";
    const CHAT_ID = "868522391";
    
    const message = `
<b>🔥 Новая заявка!</b>

<b>Имя:</b> ${lead.name}
<b>Контакт:</b> <code>${lead.contact}</code>
<b>Бюджет:</b> ${lead.budget}
<b>Источник:</b> ${lead.service || "Не указан"}

<b>Проект:</b>
${lead.project}
    `.trim();

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    // Don't fail the request if TG fails, just log it
  }

  return NextResponse.json({ ok: true });
}

