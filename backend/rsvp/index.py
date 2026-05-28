import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает RSVP-ответ гостя и отправляет письмо на почту жениха и невесты. v3"""

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

    to_email = "lexa.fedorin@mail.ru"
    from_email = "lexa.fedorin@mail.ru"
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    attending_text = "Придёт ✅" if attending else "Не придёт ❌"
    drinks_text = ", ".join(drinks) if drinks else "—"
    restrictions_text = restrictions if has_restrictions and restrictions else "Нет"

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 32px; color: #2c2420;">
        <h2 style="color: #c9a89a; font-size: 24px; margin-bottom: 24px;">Новый ответ гостя 💌</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #9a8070; font-size: 13px;">Имя</td><td style="padding: 8px 0; font-size: 14px;"><b>{name}</b></td></tr>
            <tr><td style="padding: 8px 0; color: #9a8070; font-size: 13px;">Присутствие</td><td style="padding: 8px 0; font-size: 14px;">{attending_text}</td></tr>
            <tr><td style="padding: 8px 0; color: #9a8070; font-size: 13px;">Напитки</td><td style="padding: 8px 0; font-size: 14px;">{drinks_text}</td></tr>
            <tr><td style="padding: 8px 0; color: #9a8070; font-size: 13px;">Ограничения в еде</td><td style="padding: 8px 0; font-size: 14px;">{restrictions_text}</td></tr>
        </table>
        <p style="margin-top: 32px; font-size: 12px; color: #c9a89a; text-align: center;">Алексей & Арина · 22 августа 2026</p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Свадьба: ответ от {name}"
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }