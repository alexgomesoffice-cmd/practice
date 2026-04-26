const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Mock user data for two users
  const users: Record<string, { name: string; email: string; age: number }> = {
    '1': { name: 'A', email: 'john@example.com', age: 30 },
    '2': { name: 'Jane Smith', email: 'jane@example.com', age: 25 }
  };

  const user = users[id];

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
        <p>The user with ID {id} does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>User Profile: {user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
    </div>
  );
};

export default UserProfile;