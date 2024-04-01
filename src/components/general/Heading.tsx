type MainHeadingProps = {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
};
type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ level, children, className }: MainHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const classes = {
    1: 'text-5xl mb-4 mt-4',
    2: 'text-2xl mb-2',
    3: 'text-base mb-4',
    4: 'text-sm',
  };
  return (
    <Tag className={`font-display  ${classes[level]} ${className}`}>
      {children}
    </Tag>
  );
};

const Heading1 = ({ children, className }: HeadingProps) => {
  return (
    <Heading level={1} className={className}>
      {children}
    </Heading>
  );
};
const Heading2 = ({ children, className }: HeadingProps) => {
  return (
    <Heading level={2} className={className}>
      {children}
    </Heading>
  );
};
const Heading3 = ({ children, className }: HeadingProps) => {
  return (
    <Heading level={3} className={className}>
      {children}
    </Heading>
  );
};
const Heading4 = ({ children, className }: HeadingProps) => {
  return (
    <Heading level={4} className={className}>
      {children}
    </Heading>
  );
};

export { Heading1, Heading2, Heading3, Heading4 };
