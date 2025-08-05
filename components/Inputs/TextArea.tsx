import { useField } from "formik";
import { Textarea } from "../ui/textarea";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}

const TextArea = (props: IProps) => {
  const [field, meta] = useField({ ...props, type: props.type ?? "text" });
  return (
    <div>
      {props.label ? (
        <label className="text-sm text-gray-700">{props.label}</label>
      ) : null}
      <Textarea
        className={`py-4 px-4 w-full mt-1 ${
          meta.touched && meta.error ? "text-red-500 border-red-500" : ""
        } ${
          props.readOnly ? "cursor-not-allowed" : ""
        } placeholder:text-gray-500`}
        {...field}
        {...props}
        placeholder={props.placeholder ?? `Enter ${props.label}`}
        readOnly={props.readOnly}
      />
      <div className="min-h-4">
        {meta.touched && meta.error ? (
          <p className="text-red-500 text-xs">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default TextArea;
