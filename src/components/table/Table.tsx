import { TableCell } from '../table/TableCell';

import { CellId, CellType, MatrixType } from '../../types/types';
import { TableHeader } from '../table/TableHeader';
import {
	getCellPercentage,
	getIsHeatmapVisible,
	roundNumberWithOneNumAfterPoint,
} from './utils';

type TableProps = {
	tableData: MatrixType;
	rowSums: number[];
	hoveredRowIndex?: number;
	headers: string[];
	rowLabels: string[];
	averagesByColumn: number[];
	cellPercentages: number[][];
	getShouldHighlightCell: (cellId: CellId) => boolean;
	onCellClick: (id: CellId) => void;
	onCellMouseEnter: (cell: CellType) => void;
	onCellMouseLeave: () => void;
	onSumCellMouseEnter: (hoveredRowIndex: number) => void;
	onSumCellMouseLeave: () => void;
	onRowRemove: (index: number) => void;
	onRowAddClick: () => void;
};

const renderAveragesCells = (averagesByColumn: number[]) => (
	<>
		<td className='table-header-cell sticky-cell-bottom'>Average</td>
		{averagesByColumn.map((averageValue, index) => (
			<td
				className='table-data-cell sticky-cell-bottom'
				key={`avg-${index}`}
			>
				{roundNumberWithOneNumAfterPoint(averageValue)}
			</td>
		))}
	</>
);

export const Table = ({
	tableData,
	cellPercentages,
	rowSums,
	hoveredRowIndex,
	rowLabels,
	headers,
	averagesByColumn,
	getShouldHighlightCell,
	onCellClick,
	onCellMouseEnter,
	onCellMouseLeave,
	onSumCellMouseEnter,
	onSumCellMouseLeave,
	onRowRemove,
	onRowAddClick,
}: TableProps) => {
	return (
		<>
			<div className='table-container'>
				<table className='table'>
					<TableHeader headers={headers} />
					<tbody>
						{tableData.map((row, rowIndex) => (
							<tr key={`cell-${rowIndex}`}>
								<td
									className='remove-row-button'
									onClick={() => onRowRemove(rowIndex)}
								>
									Remove row
								</td>
								<td className='table-header-cell'>{rowLabels[rowIndex]}</td>
								{row.map((cell, columnIndex) => (
									<TableCell
										key={cell.id}
										cell={cell}
										isHeatmapVisible={getIsHeatmapVisible(
											rowIndex,
											hoveredRowIndex,
											cellPercentages
										)}
										percentage={getCellPercentage(
											hoveredRowIndex,
											columnIndex,
											hoveredRowIndex,
											cellPercentages
										)}
										onClick={onCellClick}
										onMouseEnter={onCellMouseEnter}
										onMouseLeave={onCellMouseLeave}
										isHighlighted={getShouldHighlightCell(cell.id)}
									/>
								))}
								<td
									className='table-data-cell sum-cell sticky-cell-right'
									onMouseEnter={() => onSumCellMouseEnter(rowIndex)}
									onMouseLeave={onSumCellMouseLeave}
								>
									{rowSums[rowIndex]}
								</td>
							</tr>
						))}
						<tr>
							<td
								className='sticky-cell-bottom add-row-button'
								onClick={onRowAddClick}
							>
								Add row
							</td>
							{renderAveragesCells(averagesByColumn)}
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
