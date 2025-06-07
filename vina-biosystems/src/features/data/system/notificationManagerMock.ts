import { NotificationManagerContract } from "./notificationManagerContract";

export class NotificationManagerMock implements NotificationManagerContract {
    async createNotificationsForAllUsers(message: string): Promise<void> {
        console.log("Notificação enviada para todos os usuários: ", message);
    }
}