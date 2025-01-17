from pydantic import BaseModel

class HttpResponseModel(BaseModel):
  """
    Represents the standard HTTP response model for API responses.

    Attributes:
        is_successful (bool): Indicates whether the operation was successful.
        message (str): A descriptive message providing additional information about the response.
        status_code (int): The HTTP status code representing the outcome of the request.
  """
  is_successful: bool
  data: dict
  status_code: int