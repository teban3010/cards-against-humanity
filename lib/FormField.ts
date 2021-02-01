import * as yup from 'yup';

export interface FormFieldOptions {
  disabled?: boolean;
  helperText?: string;
  keyPropName?: string;
  displayPropName?: string;
  options?: any[];
  row?: boolean;
  onChangeListener?: (_e, _field, _form) => void;
  elementType?: string;
  initialValue?: any;
  validationType?: any;
  required?: boolean;
  requiredMessage?: string;
}

export interface TextInputOptions {
  disabled?: boolean;
  helperText?: string;
  onChangeListener?: (_e, _field, _form) => void;
  initialValue?: any;
  required?: boolean;
  requiredMessage?: string;
}

export interface RadioOptions {
  disabled?: boolean;
  helperText?: string;
  keyPropName?: string;
  displayPropName?: string;
  options?: any[];
  row?: boolean;
  onChangeListener?: (_e, _field, _form) => void;
  initialValue?: any;
  required?: boolean;
  requiredMessage?: string;
}

export interface SelectOptions {
  disabled?: boolean;
  helperText?: string;
  keyPropName?: string;
  displayPropName?: string;
  options?: any[];
  onChangeListener?: (_e, _field, _form) => void;
  initialValue?: any;
  required?: boolean;
  requiredMessage?: string;
}

export class FormField {
  name: string;
  label: string;

  disabled?: boolean;
  helperText?: string;
  keyPropName?: string;
  displayPropName?: string;
  options?: any[];
  row?: boolean;
  onChangeListener?: (_e, _field, _form) => void;

  elementType?: string;
  initialValue?: any;
  required?: boolean;
  requiredMessage?: string;

  validation?: any;

  constructor(name: string, label: string, fieldOptions: FormFieldOptions) {
    this.name = name;
    this.label = label;

    const {
      disabled,
      helperText,
      keyPropName,
      displayPropName,
      options,
      row,
      onChangeListener,
      elementType,
      initialValue,
      validationType,
      required,
      requiredMessage,
    } = fieldOptions;

    this.disabled = disabled;
    this.helperText = helperText;
    this.keyPropName = keyPropName;
    this.displayPropName = displayPropName;
    this.options = options;
    this.row = row;
    this.onChangeListener = onChangeListener;
    this.elementType = elementType;
    this.initialValue = initialValue;
    this.required = required;
    this.requiredMessage = requiredMessage;

    this.generateValidation(validationType);
  }

  generateValidation = (validationType?: string) => {
    if (!this.required) {
      this.validation = null;
      return;
    }

    const message = this.requiredMessage
      ? this.requiredMessage
      : `${this.label} is a required value`;

    switch (validationType) {
      case 'object':
        this.validation = yup.object().typeError(message).required(message);
        break;
      case 'array':
        this.validation = yup
          .array()
          .typeError(message)
          .min(1, message)
          .required(message);
        break;
      case 'string':
        this.validation = yup.string().required(message);
        break;
      case 'number':
        this.validation = yup.number().required(message);
        break;
      case 'boolean':
        this.validation = yup.boolean().required(message);
        break;
      default:
        this.validation = null;
        break;
    }
  };

  static TextInput = (
    name: string,
    label: string,
    options?: TextInputOptions
  ) =>
    new FormField(name, label, {
      elementType: 'input',
      initialValue: '',
      helperText: undefined,
      disabled: false,
      onChangeListener: () => {},
      validationType: 'string',
      required: false,
      requiredMessage: undefined,
      ...(options || {}),
    });

  static Radio = (name: string, label: string, options?: RadioOptions) =>
    new FormField(name, label, {
      elementType: 'radio',
      initialValue: '',
      helperText: undefined,
      disabled: false,
      keyPropName: 'id',
      displayPropName: 'name',
      options: [],
      row: false,
      onChangeListener: () => {},
      validationType: 'string',
      required: false,
      requiredMessage: undefined,
      ...(options || {}),
    });

  static Select = (name: string, label: string, options?: SelectOptions) =>
    new FormField(name, label, {
      elementType: 'select',
      initialValue: '',
      helperText: undefined,
      disabled: false,
      keyPropName: 'id',
      displayPropName: 'name',
      options: [],
      onChangeListener: () => {},
      validationType: 'object',
      required: false,
      requiredMessage: undefined,
      ...(options || {}),
    });
}
