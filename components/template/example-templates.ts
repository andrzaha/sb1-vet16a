export interface Template {
  id: string;
  name: string;
  description: string;
  fields: string[];
  documentCount: number;
  lastUsed: string;
  type: 'default' | 'user';
}

export const exampleTemplates: Template[] = [
  {
    id: "1",
    name: "Invoice Template",
    description: "Extract data from invoice documents",
    fields: ["Invoice Number", "Date", "Amount", "Vendor"],
    documentCount: 156,
    lastUsed: "2024-03-20",
    type: "default",
  },
  {
    id: "2",
    name: "Contract Template",
    description: "Process legal contracts and agreements",
    fields: ["Parties", "Terms", "Effective Date", "Signatures"],
    documentCount: 89,
    lastUsed: "2024-03-19",
    type: "default",
  },
  {
    id: "3",
    name: "Resume Template",
    description: "Parse resume and CV documents",
    fields: ["Name", "Experience", "Education", "Skills"],
    documentCount: 234,
    lastUsed: "2024-03-18",
    type: "default",
  },
  {
    id: "4",
    name: "Custom Template",
    description: "User-defined template for specific needs",
    fields: ["Custom Field 1", "Custom Field 2"],
    documentCount: 10,
    lastUsed: "2024-03-21",
    type: "user",
  },
];
