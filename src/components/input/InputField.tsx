import { Field, ErrorMessage } from "formik";
import { FunctionComponent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
}) => {
  return (
    <div className="col-md-4">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <Field type={type} name={name} id={name} className="form-control" />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default InputField;

