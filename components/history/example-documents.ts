import { ProcessingFile } from "@/components/document-processor/types";

export interface Document extends ProcessingFile {
  type: string;
  date: string;
  size: string;
  error?: string;
}

export const exampleDocuments: Document[] = [
  {
    id: "1",
    name: "Financial Report Q4.pdf",
    status: "completed", 
    type: "PDF",
    date: "2024-03-20",
    size: "2.4 MB",
    source: 'local',
    progress: 100,
    output: {
      markdown: "# Financial Report Q4\n\n## Key Highlights\n- Revenue: $1.2M\n- Expenses: $800K\n- Net Profit: $400K",
      structured: {
        revenue: 1200000,
        expenses: 800000,
        netProfit: 400000
      }
    }
  },
  {
    id: "2", 
    name: "Product Brochure.jpg",
    status: "completed",
    type: "JPG",
    date: "2024-03-19",
    size: "3.1 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "3",
    name: "Marketing Presentation.pdf",
    status: "failed",
    type: "PDF", 
    date: "2024-03-18",
    size: "5.2 MB",
    source: 'local',
    progress: 30,
    error: "Failed to parse document"
  },
  {
    id: "4",
    name: "Company Logo.png",
    status: "completed",
    type: "PNG",
    date: "2024-03-17",
    size: "256 KB",
    source: 'local',
    progress: 100
  },
  {
    id: "5",
    name: "Annual Report.pdf",
    status: "processing",
    type: "PDF",
    date: "2024-03-16",
    size: "8.4 MB",
    source: 'local',
    progress: 45
  },
  {
    id: "6", 
    name: "Team Photo.jpeg",
    status: "completed",
    type: "JPEG",
    date: "2024-03-15",
    size: "4.2 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "7",
    name: "Contract Draft.pdf",
    status: "failed",
    type: "PDF",
    date: "2024-03-14", 
    size: "892 KB",
    source: 'local',
    progress: 30,
    error: "Invalid format"
  },
  {
    id: "8",
    name: "Product Photos.gif",
    status: "processing",
    type: "GIF",
    date: "2024-03-13",
    size: "1.8 MB",
    source: 'local',
    progress: 60
  },
  {
    id: "9",
    name: "User Manual.pdf",
    status: "completed",
    type: "PDF",
    date: "2024-03-12",
    size: "3.4 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "10",
    name: "Banner Design.webp",
    status: "completed", 
    type: "WEBP",
    date: "2024-03-11",
    size: "567 KB",
    source: 'local',
    progress: 100
  }
];
