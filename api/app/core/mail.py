from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger(__name__)


def send_email(*, subject: str, body: str) -> None:
    """Send email via SMTP, or log to console when SMTP is not configured."""
    if not settings.smtp_configured:
        logger.info(
            "Correo (consola · SMTP no configurado)\nPara: %s\nAsunto: %s\n\n%s",
            settings.smtp_to,
            subject,
            body,
        )
        print(
            f"\n===== CORREO (desarrollo) =====\n"
            f"Para: {settings.smtp_to}\n"
            f"Asunto: {subject}\n\n{body}\n"
            f"===============================\n",
            flush=True,
        )
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.smtp_from
    message["To"] = settings.smtp_to
    message.set_content(body)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as smtp:
        if settings.smtp_tls:
            smtp.starttls()
        if settings.smtp_user:
            smtp.login(settings.smtp_user, settings.smtp_password)
        smtp.send_message(message)
