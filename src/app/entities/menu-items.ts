export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  expanded?: boolean;
  children?: MenuItem[];
}