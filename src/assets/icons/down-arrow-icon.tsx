interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const DownArrowIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1.415 0.584991L6 5.16999L10.585 0.584991L12 1.99999L6 7.99999L0 1.99999L1.415 0.584991Z"
        fill="currentColor"
      />
    </svg>
  );
};
