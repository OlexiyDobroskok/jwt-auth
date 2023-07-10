export interface IconProps {
  href: string;
  className?: string;
}

export const Icon = ({ href, className }: IconProps) => {
  return (
    <svg className={className}>
      <use href={href} />
    </svg>
  );
};
