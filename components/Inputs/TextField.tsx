import { useField } from "formik";
import { Input } from "../ui/input";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}

const TextField = (props: IProps) => {
  const [field, meta] = useField({ ...props, type: props.type ?? "text" });
  return (
    <div className="">
      {props.label ? (
        <label className="text-sm text-white">{props.label}</label>
      ) : null}
      <Input
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

export default TextField;
