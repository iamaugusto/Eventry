export type TabType = 0 | 1 | 2 | 3 | 4 | 5;
export type RatingType = 0 | 1 | 2 | 3 | 4 | 5;

export interface EventItem {
  time: string;
  title: string;
  active: boolean;
}

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  tab: TabType;
}

export interface EventCardProps {
  title: string;
  date: string;
  status: string;
  statusColor: string;
  children: React.ReactNode;
  loading?: boolean;
}
