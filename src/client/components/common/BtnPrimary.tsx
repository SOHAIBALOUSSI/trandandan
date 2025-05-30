export function BtnPrimary({
  label,
  className = "",
  disabled = false,
}: {
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-2 w-full px-6 py-4 text-sm lg:text-base font-semibold text-white bg-pong-accent hover:bg-pong-secondary rounded-md capitalize cursor-pointer transform active:scale-[0.97] transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pong-primary focus:ring-offset-2 ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
