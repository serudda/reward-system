import { type FormFieldState } from '../constants';

export interface Input {
  /**
   * Specify an optional test ID to use on e2e tests.
   */
  dataTestId?: string;

  /**
   * Add extra styling and visual feedback.
   */
  isRequired?: boolean;

  /**
   * Disables the input, disallowing user interaction.
   */
  isDisabled?: boolean;

  /**
   * The input is read only.
   */
  isReadOnly?: boolean;

  /**
   * Extends the input to 100% width.
   */
  isFullWidth?: boolean;

  /**
   * If set to true, the input will be rounded.
   */
  isRounded?: boolean;

  /**
   * If set to true, the button will display a loading spinner.
   */
  isLoading?: boolean;

  /**
   * Set a label text
   */
  label?: string;

  /**
   * Set an assistive text
   */
  assistiveText?: string;

  /**
   * Set the Text Input state
   */
  fieldState?: FormFieldState;
}

export type SelectOption = {
  value: string;
  label: string;
};

export enum OptionItemType {
  parent = 'parent',
  child = 'child',
}

export interface NestedSelectOption {
  /**
   * Set the possible item type
   */
  type: OptionItemType.parent;

  /**
   * Set a label text
   */
  label: string;

  /**
   * Set a value
   */
  value: string;

  /**
   * Specify if it's checked or not
   */
  checked?: boolean;

  /**
   * Whether the Checkbox is Indeterminate or not.
   */
  indeterminate?: boolean;

  /**
   * Whether the Option is visible
   */
  isVisible: boolean;

  /**
   * Whether the Parent option is expanded or not
   */
  isOpen?: boolean;

  /**
   * Set a list of nested options (just for Parent options)
   */
  options?: Array<ChildNestedSelectOption>;
}

export interface ChildNestedSelectOption {
  /**
   * Set the possible item type
   */
  type: OptionItemType.child;

  /**
   * Set a label text
   */
  label: string;

  /**
   * Set a value
   */
  value: string;

  /**
   * Specify if it's checked or not
   */
  checked?: boolean;

  /**
   * Whether the Option is visible
   */
  isVisible: boolean;
}

export type NestedSelectOptionType = NestedSelectOption | ChildNestedSelectOption;
