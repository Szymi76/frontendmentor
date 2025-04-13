export type ListShowedItems = "all" | "active" | "inactive";
export type ListItem = {
  index: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};
