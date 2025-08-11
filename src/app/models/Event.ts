export interface Event {
  id?: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  banner: string | null;
  featured?: boolean;
}
