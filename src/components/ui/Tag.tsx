import React from 'react';

interface TagProps {
	children: React.ReactNode;
	color?: string;
	variant?: 'default' | 'outlined';
	size?: 'sm' | 'md';
}

export function Tag({
	children,
	color = '#389088',
	variant = 'default',
	size = 'sm',
}: TagProps) {
	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm',
	};

	return (
		<span
			className={`
        inline-flex items-center rounded font-medium
        ${sizeClasses[size]}
        ${variant === 'outlined'
					? 'bg-transparent border'
					: 'border border-transparent'
				}
      `}
			style={
				variant === 'outlined'
					? { borderColor: `${color}50`, color }
					: { backgroundColor: `${color}20`, color }
			}
		>
			{children}
		</span>
	);
}
