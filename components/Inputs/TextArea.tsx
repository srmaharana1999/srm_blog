import { useField } from "formik";

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
      <textarea
        className={`p-4 mt-1 text-sm w-full border-[1px] outline-none rounded-lg placeholder:text-gray-500 ${
          meta.touched && meta.error ? "text-red-500 border-red-500" : ""
        } `}
        {...field}
        {...props}
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
