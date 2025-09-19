export interface FormData {
    name: string;
    email: string;
    age: number;
}


export interface FormContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}