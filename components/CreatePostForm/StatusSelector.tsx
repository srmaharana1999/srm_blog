import { useField } from "formik";
import { STATUS_OPTIONS } from "@/lib/constants";
import CheckBoxWithLabel from "../Inputs/CheckBoxWithLabel";

const StatusSelector = (props: { name: string }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
  };
  return (
    <div>
      <h3 className="text-xl">Status:</h3>
      <p className="text-xs text-gray-500 mb-2">
        Select one option. “Draft” is the default status.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {STATUS_OPTIONS.map(({ value, title, description }) => (
          <CheckBoxWithLabel
            key={value}
            id={value}
            title={title}
            description={description}
            // Only set when checkbox becomes checked
            onChange={(checked: boolean) => {
              if (checked) handleChange(value);
            }}
            isChecked={field.value === value}
          />
        ))}
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default StatusSelector;
