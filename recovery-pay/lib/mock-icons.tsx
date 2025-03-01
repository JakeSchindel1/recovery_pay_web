'use client';

import * as React from 'react';

// Mock implementation of lucide-react icons
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
}

const createIcon = (displayName: string) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, strokeWidth = 2, ...props }, ref) => (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    )
  );
  
  Icon.displayName = displayName;
  return Icon;
};

export const PlusIcon = createIcon('PlusIcon');
export const TrashIcon = createIcon('TrashIcon');
export const DownloadIcon = createIcon('DownloadIcon');
export const UploadIcon = createIcon('UploadIcon');
export const SaveIcon = createIcon('SaveIcon');
export const CheckIcon = createIcon('CheckIcon'); 