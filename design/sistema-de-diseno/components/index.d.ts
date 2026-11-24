export type IconName = 'wrench'|'snow'|'gear'|'therm'|'cal'|'shield'|'hand'|'build'|'home'|'shop'|'fact'|'clip'|'tool'|'check'|'phone'|'whatsapp'|'mail'|'pin'|'arrow';
export interface IconProps { name: IconName; size?: number; stroke?: number }
export interface ButtonProps { variant?: 'primary'|'outline'|'outline-light'|'whatsapp'|'accent'; size?: 'md'|'sm'; href?: string; arrow?: boolean; icon?: IconName; onClick?: () => void; children: React.ReactNode }
export interface ChipProps { pressed?: boolean; onClick?: () => void; children: React.ReactNode }
export interface BadgeProps { tone?: 'accent'|'ok'; children: React.ReactNode }
export interface EyebrowProps { onDark?: boolean; children: React.ReactNode }
export interface PillarItemProps { icon: IconName; title: string; description: string }
export interface StatItemProps { icon: IconName; value: string; label: string }
export interface SectorCardProps { icon: IconName; label: string; from?: string; to?: string; href?: string }
export interface EquipmentCardProps { brand: string; name: string; btu: string; model: string; image?: string; href?: string; cta?: string }
export interface FieldProps { id: string; label?: string; placeholder: string; type?: string; options?: string[]; onLight?: boolean; onChange?: (e: any) => void }
export interface FaqItemProps { question: string; open?: boolean; onToggle?: () => void; children: React.ReactNode }
export interface ProcessStepProps { icon: IconName; label: string }
