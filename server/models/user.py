# from server.database.database import Base
# from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text
from pydantic import BaseModel

class User(BaseModel):
    __tablename__ = "posts"

    # id = Column(Integer,primary_key=True,nullable=False)
    # name = Column(String,nullable=False)
    # email = Column(String,nullable=False)
    # created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    id: int
    name: str
    email: str
    role: str
    permissions: list[str]
