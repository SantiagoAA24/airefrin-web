"""add solicitudes table

Revision ID: 20261124_0002
Revises: 20261124_0001
Create Date: 2026-11-24

"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "20261124_0002"
down_revision: str | None = "20261124_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "solicitudes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("nombre", sa.String(length=120), nullable=False),
        sa.Column("telefono", sa.String(length=40), nullable=False),
        sa.Column("correo", sa.String(length=254), nullable=True),
        sa.Column("necesidad", sa.String(length=80), nullable=False),
        sa.Column("tipo_espacio", sa.String(length=80), nullable=False),
        sa.Column("mensaje", sa.Text(), nullable=False),
        sa.Column("autorizacion_datos", sa.Boolean(), nullable=False),
        sa.Column("canal_origen", sa.String(length=40), nullable=False),
        sa.Column("estado", sa.String(length=40), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("solicitudes")
