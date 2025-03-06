import { Field, ErrorMessage } from "formik";
import { FunctionComponent } from "react";

interface CheckboxFieldProps {
  label: string;
  name: string;
}

const CheckboxField: FunctionComponent<CheckboxFieldProps> = ({ label, name }) => {
  return (
    <div className="form-check">
      <Field type="checkbox" name={name} id={name} className="form-check-input" />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default CheckboxField;
