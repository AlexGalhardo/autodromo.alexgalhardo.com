import { Schedule } from "../../Pages/Schedules";

export default function ScheduleTableRow({ schedule: { id, user_id, road_id, kart_id, starts_at, ends_at } }: Readonly<{ schedule: Schedule }>) {
  	return (
		<tr className="border-b dark:border-gray-700 hover:bg-gray-300">
			<th
				scope="row"
				className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{id}
			</th>
			<td className="px-4 py-3">{user_id}</td>
			<td className="px-4 py-3">{road_id}</td>
			<td className="px-4 py-3">{kart_id}</td>
			<td className="px-4 py-3">{starts_at}</td>
			<td className="px-4 py-3">{ends_at}</td>
		</tr>
  	);
};
