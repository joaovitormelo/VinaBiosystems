export interface HeaderProps {
    title: string;
    subtitle?: string; 
    buttonName?: string;
    showButton?: boolean;
    actionButton?: () => void;
}