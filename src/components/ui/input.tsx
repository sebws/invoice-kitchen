import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm print:[appearance:textfield] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
