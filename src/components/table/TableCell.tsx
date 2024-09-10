import React from 'react';
import { CellId, CellType } from '../../types/types';
import { getCellStyle, roundNumberWithOneNumAfterPoint } from './utils';

type TableCellProps = {
	cell: CellType;
	percentage: number;
	isHighlighted: boolean;
	isHeatmapVisible: boolean;
	onClick?: (id: CellId) => void;
	onMouseEnter?: (cell: CellType) => void;
	onMouseLeave?: () => void;
};

export const TableCell = ({
	cell,
	isHighlighted,
	percentage,
	isHeatmapVisible,
	onClick,
	onMouseEnter,
	onMouseLeave,
}: TableCellProps) => {
	const handleClick = () => {
		if (onClick) {
			onClick(cell.id);
		}
	};

	const handleMouseEnter = () => {
		if (onMouseEnter) {
			onMouseEnter(cell);
		}
	};

	const handleMouseLeave = () => {
		if (onMouseLeave) {
			onMouseLeave();
		}
	};

	return (
		<td
			style={getCellStyle(isHeatmapVisible, percentage)}
			className={`table-data-cell ${isHighlighted ? 'highlighted-cell' : ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			{isHeatmapVisible
				? `${roundNumberWithOneNumAfterPoint(percentage)}%`
				: cell.value}
		</td>
	);
};
