import { createContext, useContext, useState, type ReactNode } from 'react';
import { type FormData, type FormContextType } from '../types/FormTypes';


const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        age: 0,
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
}

export function useForm() {
    return useContext(FormContext);
}