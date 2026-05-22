# models.py — table prefix: build_a_full_stack_application_for_a_sch
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class Item(Base):
    __tablename__ = "build_a_full_stack_application_for_a_sch_items"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, index=True)
    description = Column(String, nullable=True)
    status      = Column(String, default="active")
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

class Score(Base):
    __tablename__ = "build_a_full_stack_application_for_a_sch_scores"
    id         = Column(Integer, primary_key=True, index=True)
    player     = Column(String, index=True)
    score      = Column(Integer)
    iq_level   = Column(String)
    percentage = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
