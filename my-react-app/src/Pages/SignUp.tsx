import type { SignUpData } from "../types/AuthTypes";
import react from 'react'
import { useAuth } from "../hooks/AuthContext";



function SignUp() {
    const [SignUpData, setSignUpData] = react.useState<SignUpData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = react.useState<string | null>(null);
    const { user, setUser } = useAuth()!;

    

    async function handleSignUp() {
        

        let response = null;
        try {
            response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(SignUpData)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
        }
        const data = await response?.json();

        if (data?.user) {
            // Handle successful sign up

            localStorage.setItem("token", data.user.token);

            setUser(data.user);

            window.location.href = "/"; // Redirect to home or another page
        } else {
            setError("Sign up failed. Please try again.");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div>
            <h2>Sign Up Page</h2>
            <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <input type="text" name="name" placeholder="Name" style={{ marginBottom: '10px' }} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" style={{ marginBottom: '10px' }} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" style={{ marginBottom: '10px' }} onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" style={{ marginBottom: '10px' }} onChange={handleChange} />
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )

}

export default SignUp;