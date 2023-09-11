type RequestDetailsDbType = {
  id: string;
  createdBy: string;
  createdAt: Date;
  title: string;
  content: string;
  industry: string;
  duration: string;
  budget: number;
  disclose_contact: boolean;
  status: "Active" | "Expired" | "Cancelled" | "Hired";
};
