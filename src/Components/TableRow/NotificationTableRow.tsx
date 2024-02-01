import { Notification, NotificationType } from "../../Pages/Notifications";

export default function NotificationTableRow({
    notification: { type, race_id, message, created_at },
}: Readonly<{ notification: Notification }>) {
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-300">
            <td className={`px-4 py-3 text-lg ${type === NotificationType.RACE_ACCIDENT ? 'text-red-600' : 'text-green-600'} font-bold`}>{type}</td>
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {race_id}
            </th>
            <td className="px-4 py-3">{message}</td>
            <td className="px-4 py-3">{created_at}</td>
        </tr>
    );
}
