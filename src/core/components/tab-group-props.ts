export interface TabGroupProps {
    activeTab: string;
    tabs: string[];
    onTabSelection: (tab: string) => void;
}
