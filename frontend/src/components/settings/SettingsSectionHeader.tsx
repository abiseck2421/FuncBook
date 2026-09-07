type SettingsSectionHeaderProps = {
  title: string
  description?: string
}

export default function SettingsSectionHeader({ title, description }: SettingsSectionHeaderProps) {
  return (
    <div className="mb-4 sm:mb-5">
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-royal">{title}</h2>
      {description && <p className="mt-1 sm:mt-1.5 text-sm text-secondary-text">{description}</p>}
    </div>
  )
}