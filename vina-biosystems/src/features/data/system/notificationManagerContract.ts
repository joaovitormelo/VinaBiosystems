export interface NotificationManagerContract {
    createNotificationsForAllUsers(message: string): Promise<void>;
}