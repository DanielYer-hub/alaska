import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label} {required && "*"}
      </label>
      <Field id={name} name={name} type={type} className="form-control" />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default InputField;
