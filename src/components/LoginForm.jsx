import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useRouter } from 'preact-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http:localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      router.push('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div class="flex items-center justify-center h-full">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-gray-950 mb-6">Вход</h1>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label for="email" class="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              class="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваш email"
              required
              autocomplete="off"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label for="password" class="block text-gray-700">Пароль</label>
            <input
              type="password"
              id="password"
              class="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваш пароль"
              required
              autocomplete="off"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Войти
          </button>
        </form>
        <p class="text-center text-gray-600 mt-4">
          У вас нет аккаунта? <a href="/register" class="text-blue-600 hover:underline">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;