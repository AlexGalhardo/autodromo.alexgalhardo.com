import { Kart } from "../../Pages/Karts";

export default function KartTableRow({
    kart: { status, _id, name, brand, model, power, tire_brand },
}: Readonly<{ kart: Kart }>) {
    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-300">
            <td className="px-4 py-3">{status}</td>
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {_id}
            </th>
            <td className="px-4 py-3">{name}</td>
            <td className="px-4 py-3">{brand}</td>
            <td className="px-4 py-3">{model}</td>
            <td className="px-4 py-3">{power}</td>
            <td className="px-4 py-3">{tire_brand}</td>
        </tr>
    );
}
