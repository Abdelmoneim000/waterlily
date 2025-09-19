import react from 'react'
import { useAuth } from '../hooks/AuthContext'

function Login() {

    const [LoginData, setLoginData] = react.useState({
        email: "",
        password: ""
    });

    const [error, setError] = react.useState<string | null>(null);
    const { user, setUser } = useAuth()!;


    async function handleLogin() {
        // TODO: implement login logic
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(LoginData)
        });

        const data = await response.json();
        console.log(data);

        if (data?.user) {
            localStorage.setItem("token", data.user.token);
            setUser(data.user);

            window.location.href = "/"; // Redirect to home or another page
        } else {
            setError("Login failed. Please try again.");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

  return (
    <div>
        <h2>Login Page</h2>
        <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <input type="email" placeholder="Email"  style={{ marginBottom: '10px' }} onChange={handleChange} name="email" value={LoginData.email} />
            <input type="password" placeholder="Password" style={{ marginBottom: '10px' }} onChange={handleChange} name="password" value={LoginData.password} />
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default Login;