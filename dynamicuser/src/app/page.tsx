import Link from "next/link";

export default function Home() {
const users=[
  {
    id:1,
    name:"John Doe",
    email:"john.doe@example.com"
  },
  {
    id:2,
    name:"Jane Smith",
    email:"jane.smith@example.com"
  }
];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center text-black text-3xl bg-blue-200 mx-4 my-4 rounded-xl">User List</div>
      <div className="flex flex-col items-center">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-100 p-4 m-4 rounded-lg shadow-md">
            <Link href={`/users/${user.id}`} className="text-blue-500 hover:underline">
              {user.name}
            </Link>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}