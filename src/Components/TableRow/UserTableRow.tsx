import { UserRace } from "../../Pages/Users";


export default function UserTableRow({ user: { id, email, role, created_at, updated_at } }: Readonly<{ user: UserRace }>) {
  	return (
		<tr
			key={id}
			className="border-b dark:border-gray-700 hover:bg-gray-300"
		>
			<th
				scope="row"
				className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{id}
			</th>
			<td className="px-4 py-3">{email}</td>
			<td className="px-4 py-3">{role}</td>
			<td className="px-4 py-3">{created_at}</td>
			<td className="px-4 py-3">{updated_at}</td>
			<td className="px-4 py-3">
				<a href={`/users/${id}`} className="text-blue-500 hover:text-blue-700">Edit</a>
			</td>
			<td className="px-4 py-3">
				<a
					href={`/users/${id}`}
					className="text-red-500 hover:text-red-700"
					onClick={(event) => {
						const confirmed = window.confirm("Are you sure you want to delete this user?");
						if (!confirmed) {
							event.preventDefault();
						}
					}}
					>
					Delete
				</a>
			</td>
		</tr>
  	);
};
