import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const titleVariants = cva('font-semibold tracking-tight mb-6', {
  variants: {
    size: {
      1: 'text-4xl lg:text-5xl',
      2: 'text-3xl lg:text-4xl',
      3: 'text-2xl lg:text-3xl',
      4: 'text-xl lg:text-2xl',
      5: 'text-lg lg:text-xl',
      6: 'text-base lg:text-lg',
    },
  },
  defaultVariants: {
    size: 3,
  },
});

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, as, ...props }, ref) => {
    const Comp = as || (`h${size || 3}` as const);

    return (
      <Comp
        ref={ref}
        className={cn(titleVariants({ size, className }))}
        {...props}
      />
    );
  }
);

Title.displayName = 'Title';

export { Title, titleVariants };
