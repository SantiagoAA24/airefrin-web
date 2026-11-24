from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Airefrin API"
    app_env: str = "development"
    database_url: str = (
        "postgresql+psycopg://airefrin:airefrin@localhost:5432/airefrin"
    )
    cors_origins: str = "http://localhost:3000"

    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "soporte@aireacondicionadosas.com"
    smtp_to: str = "soporte@aireacondicionadosas.com"
    smtp_tls: bool = True

    @property
    def cors_origin_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

    @property
    def smtp_configured(self) -> bool:
        return bool(self.smtp_host.strip())


settings = Settings()
