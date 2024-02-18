import {
  Chip,
  Input,
  Select,
  SelectItem,
  SelectedItems,
  Textarea,
} from "@nextui-org/react";

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
    <div className="py-3 w-full">
      <Input
        isDisabled={isDisabled}
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
    <div className="py-3 w-full">
      <Textarea
        isDisabled={isDisabled}
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
  isDisabled: boolean;
  value: string[];
  label: string;
  placeholder: string;
  name: string;
  languageOptions: string[];
}) => {
  return (
    <div className="py-3 w-full">
      <Select
        isDisabled={isDisabled}
        selectionMode="multiple"
        label={label}
        labelPlacement="outside"
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

export const FormSkillsetMultipleSelect = ({
  skillset,
  isDisabled,
  onChange,
  selectedKeys,
}: {
  isDisabled: boolean;
  onChange: Function;
  skillset: { industry: string; skill: string }[];
  selectedKeys: string[];
}) => {
  return (
    <Select
      onChange={(e) => {
        onChange(e);
      }}
      isDisabled={isDisabled}
      items={skillset}
      selectedKeys={selectedKeys}
      label="Skill"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Pick your skills"
      labelPlacement="outside"
      classNames={{
        base: "w-full",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(
        items: SelectedItems<{ industry: string; skill: string }>
      ) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip
                key={item.key}
                color={`${
                  item.data?.industry == "Mobile App Development"
                    ? "primary"
                    : item.data?.industry == "Web Development"
                    ? "secondary"
                    : item.data?.industry == "Marketing"
                    ? "success"
                    : item.data?.industry == "Tech Consulting"
                    ? "warning"
                    : item.data?.industry == "Photography & Creativity"
                    ? "danger"
                    : "default"
                }`}
              >
                {item.data?.skill}
              </Chip>
            ))}
          </div>
        );
      }}
    >
      {(skillset) => (
        <SelectItem key={skillset.skill} textValue={skillset.skill}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{skillset.skill}</span>
              <span className="text-tiny text-default-400">
                {skillset.industry}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
