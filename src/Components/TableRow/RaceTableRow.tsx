import { Race } from "../../Pages/Races";

export default function RaceTableRow({ race: { id, user_id, status, starts_at, ends_at } }: Readonly<{ race: Race }>) {
    return (
        <tr key={id} className="border-b dark:border-gray-700 hover:bg-gray-300">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-4 py-3">{user_id}</td>
            <td className="px-4 py-3">{status}</td>
            <td className="px-4 py-3">{starts_at}</td>
            <td className="px-4 py-3">{ends_at ?? "TO BE DEFINED"}</td>
        </tr>
    );
}
