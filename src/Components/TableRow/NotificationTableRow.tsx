import { Notification } from "../../Pages/Notifications";

export default function NotificationTableRow({
    notification: { type, id,  message, send_to_users_ids },
}: Readonly<{ notification: Notification }>) {
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-300">
            <td className="px-4 py-3">{type}</td>
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-4 py-3">{message}</td>
            <td className="px-4 py-3">{send_to_users_ids}</td>
        </tr>
    );
}
