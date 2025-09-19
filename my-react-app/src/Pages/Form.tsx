import { useState } from "react";
import { useForm } from "../hooks/FormContext";
import type { FormData } from "../types/FormTypes";
import { useAuth } from "../hooks/AuthContext";


function Form() {
    const [step, setStep] = useState(1);

    const FormHook = useForm()!;
    const { user, logOut } = useAuth()!;

    const { formData, setFormData } = FormHook;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: FormData) => ({
            ...prevData,
            [name]: value
        }));
    };

    console.log("Current User in Form:", user);


    async function handleSubmit() {
        // Submit form data to the back-end
        try {
            const response = await fetch("http://localhost:3000/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Form submission response:", data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
        console.log(formData);
    }

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <div>{user?.name}</div>
                <button onClick={logOut}>Log Out</button>
            </nav>
            <div style={{ marginBottom: '20px' }}>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
                    <li onClick={() => setStep(1)}>Step 1</li>
                    <li onClick={() => setStep(2)}>Step 2</li>
                    <li onClick={() => setStep(3)}>Step 3</li>
                    <li onClick={() => setStep(4)}>Review</li>
                </ul>
            </div>
            <div>
                {step === 1 && (
                    <div>
                        <h1>Provide your Name</h1>
                        <p>Enter your name as it will be saved and displayed.</p>
                        <input type="text" placeholder="Enter your name" onChange={handleChange} name="name" value={formData.name} />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h1>Provide your Email</h1>
                        <p>Enter your email as it will be saved and displayed.</p>
                        <input type="email" placeholder="Enter your email" onChange={handleChange} name="email" value={formData.email} />
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h1>Provide your Age</h1>
                        <p>Enter your age as it will be saved and displayed.</p>
                        <input type="number" min={0} placeholder="Enter your age" onChange={handleChange} name="age" value={formData.age} />
                    </div>
                )}
            </div>
            {step === 4 ? (
                <button onClick={handleSubmit}>Submit</button>
            ) : (
                <button onClick={() => setStep(step + 1)}>Next</button>
            )}
            {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        </div>
    )
}

export default Form