type ButtonProps = {
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  color = 'primary',
  children,
  onClick,
  className,
}: ButtonProps) => {
  const buttonColor = color === 'primary' ? ` btn-primary` : `btn-secondary`;
  return (
    <button
      className={`${className} ${buttonColor} btn gap-2 font-body bg-blue-300 px-2 py-1 rounded-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
