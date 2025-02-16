interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const FilterIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="23"
      height="24"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5751 9.75C17.0509 9.75 21.49 7.73528 21.49 5.25C21.49 2.76472 17.0509 0.75 11.5751 0.75C6.09922 0.75 1.66016 2.76472 1.66016 5.25C1.66016 7.73528 6.09922 9.75 11.5751 9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66016 5.25C1.66273 9.76548 4.81884 13.688 9.28702 14.729V21C9.28702 22.2426 10.3114 23.25 11.5751 23.25C12.8387 23.25 13.8631 22.2426 13.8631 21V14.729C18.3313 13.688 21.4874 9.76548 21.49 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
