import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
	label: string;
	active?: boolean;
	onClick?: () => void;
	onRemove?: () => void;
	color?: string;
	size?: 'sm' | 'md';
}

export function Chip({
	label,
	active = false,
	onClick,
	onRemove,
	color,
	size = 'md',
}: ChipProps) {
	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
	};

	return (
		<button
			onClick={onClick}
			disabled={!onClick}
			className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        transition-all duration-200
        ${sizeClasses[size]}
        ${active
					? 'bg-teal-600/20 text-teal-400 border border-teal-500/30'
					: 'bg-[#0B1322] text-[#8FA3BF] border border-[#1A2637] hover:border-[#2A3647]'
				}
        ${onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        disabled:cursor-not-allowed
      `}
			style={
				color && active
					? { backgroundColor: `${color}20`, borderColor: `${color}30`, color }
					: undefined
			}
		>
			<span>{label}</span>
			{onRemove && (
				<X
					size={14}
					className="hover:text-red-400 transition-colors"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
				/>
			)}
		</button>
	);
}
