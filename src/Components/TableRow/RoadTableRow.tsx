import { Road } from "../../Pages/Roads";

export default function RoadTableRow({
    road: { _id, name, kilometers, quantity_boxes, quantity_places, address },
}: Readonly<{ road: Road }>) {
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-300">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {_id}
            </th>
            <td className="px-4 py-3">{name}</td>
            <td className="px-4 py-3">{kilometers}</td>
            <td className="px-4 py-3">{quantity_boxes}</td>
            <td className="px-4 py-3">{quantity_places}</td>
            <td className="px-4 py-3">{address}</td>
        </tr>
    );
}
