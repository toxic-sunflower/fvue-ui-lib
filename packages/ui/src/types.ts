export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'brand'
  | 'destructive'
  | 'ai'
  | 'white'
  | 'alwaysBlack'
  | 'link'
  | 'tertiaryDestructive'
  | 'text'

export type ButtonSize = '24' | '32' | '40' | '48'

export type TextFieldSize = '32' | '40' | '48'

export type SelectSize = '32' | '40' | '48'
export type SelectVariant = 'default' | 'filled'
export type SelectItemSize = '32' | '40'

export type DialogSize = 'sm' | 'md' | 'lg'
export type DialogMobilePresentation = 'sheet' | 'card'

export type DrawerSide = 'right' | 'left'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md'

export type ChatMessageUser = 'sender' | 'receiver'
export type ChatMessageVariant = 'audio' | 'text' | 'typing' | 'deleted'
export type ChatMessageStatus = 'delivered' | 'read'

export type IconSize = 16 | 24 | 32

export interface IconPath {
  d: string
  sw?: number
  eo?: boolean
}

export type IconVariants = Partial<Record<IconSize, { outlined: IconPath[]; filled?: IconPath[] }>>

export type CountryFlagSize = 16 | 20 | 24 | 32

export type IconButtonVariant = 'default' | 'field' | 'ghost'
export type IconButtonSize = '24' | '32' | '40'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'

export type ChipVariant = 'default' | 'outlined' | 'dotted'

export type DatePickerMode = 'single' | 'range'
export interface DateRangeValue {
  from?: string
  to?: string
}

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentedControlOption {
  value: string
  label?: string
  icon?: boolean
  disabled?: boolean
}

export interface StepperStep {
  value: string
  label: string
}

export type ChartConfig = Record<string, { label?: string; color?: string; theme?: { light: string; dark: string } }>
