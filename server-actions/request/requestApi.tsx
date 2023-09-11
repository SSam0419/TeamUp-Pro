import { CreateRequestFormDataType } from "@/app/user_portal/_components/CreateRequestForm";
import axios from "axios";

export const createRequestDetails = async (
  formData: CreateRequestFormDataType
) => {
  const result = await axios.post("/api/request", formData);
  return result;
};
