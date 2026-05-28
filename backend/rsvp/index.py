import json
import os
import urllib.request


CHAT_ID = "869021370"


def handler(event: dict, context) -> dict:
    """Принимает RSVP-ответ гостя и отправляет сообщение в Telegram. v5"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "")
    attending = body.get("attending")
    drinks = body.get("drinks", [])
    has_restrictions = body.get("hasRestrictions")
    restrictions = body.get("restrictions", "")

    attending_text = "Придёт ✅" if attending else "Не придёт ❌"
    drinks_text = ", ".join(drinks) if drinks else "—"
    restrictions_text = restrictions if has_restrictions and restrictions else "Нет"

    text = (
        f"💌 *Новый ответ гостя*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📋 *Присутствие:* {attending_text}\n"
        f"🥂 *Напитки:* {drinks_text}\n"
        f"🍽 *Ограничения в еде:* {restrictions_text}\n\n"
        f"_Алексей & Арина · 22 августа 2026_"
    )

    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "Markdown"
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
