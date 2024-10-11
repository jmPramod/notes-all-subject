export interface subjectType {
  answer: { ans: string[]; format: string };
  ansQuery: { ans: string[]; format?: string };
  table: { heading: string[]; body: string[][] };
  serialNumber: { subject: string; SlNumber: number };
  subject: string;
  question: string;
  favorite: boolean;
  questionNumber: number;
  links: string[];
  important: string;
  screenshort: string[];
}
