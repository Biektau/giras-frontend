import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useRouter } from 'preact-router';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-gray-950 mb-6">Профиль</h1>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700">Email</label>
            <p class="border border-gray-300 p-3 rounded w-full">{user.email}</p>
          </div>
          <div>
            <label class="block text-gray-700">Роль</label>
            <p class="border border-gray-300 p-3 rounded w-full">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;