import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";

export const FormInput = ({
  onChange,
  value,
  label,
  placeholder,
  name,
  isDisabled,
}: {
  onChange: Function;
  value: string;
  label: string;
  placeholder: string;
  name: string;
  isDisabled: boolean;
}) => {
  return (
    <div className="p-3 w-full">
      <Input
        disabled={isDisabled}
        labelPlacement="outside"
        type="text"
        label={label}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
        name={name}
      />
    </div>
  );
};
export const FormTextarea = ({
  onChange,
  value,
  label,
  placeholder,
  name,
  isDisabled,
}: {
  onChange: Function;
  value: string;
  label: string;
  placeholder: string;
  name: string;
  isDisabled: boolean;
}) => {
  return (
    <div className="p-3 w-full">
      <Textarea
        disabled={isDisabled}
        labelPlacement="outside"
        type="text"
        label={label}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
        name={name}
      />
    </div>
  );
};

export const FormLanguageMultipleSelect = ({
  onChange,
  value,
  label,
  placeholder,
  name,
  languageOptions,
  isDisabled,
}: {
  onChange: Function;
  value: string[];
  label: string;
  placeholder: string;
  name: string;
  languageOptions: string[];
  isDisabled: boolean;
}) => {
  return (
    <div className="p-3 w-full">
      <Select
        isDisabled={isDisabled}
        labelPlacement="outside"
        selectionMode="multiple"
        label={label}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
        name={name}
      >
        {languageOptions.map((languageOptions) => (
          <SelectItem key={languageOptions} value={languageOptions}>
            {languageOptions}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
