import { UserRace } from "../../Pages/Users";
import { API_URL } from "../../Utils/Envs";

export default function UserTableRow({
    user: { id, email, role, created_at, updated_at },
}: Readonly<{ user: UserRace }>) {
    return (
        <tr key={id} className="border-b dark:border-gray-700 hover:bg-gray-300">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id}
            </th>
            <td className="px-4 py-3">{email}</td>
            <td className="px-4 py-3">{role}</td>
            <td className="px-4 py-3">{created_at}</td>
            <td className="px-4 py-3">{updated_at}</td>
            {/* <td className="px-4 py-3">
                <a href={`/users/${id}`} className="text-blue-500 hover:text-blue-700">
                    Edit
                </a>
            </td> */}
            <td className="px-4 py-3">
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                        const confirmed = window.confirm("Are you sure you want to delete this user?");
                        if (confirmed) {
                            fetch(`${API_URL}/user/${id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                                },
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        alert("User deleted!");
                                        window.location.reload();
                                    }
                                    if (!response.ok) alert("Failed to delete user");
                                })
                                .catch((error) => {
                                    alert("Failed to delete user");
                                });
                        }
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
