import { useMatrix } from '../../providers/MatrixContextProvider';
import React, { useEffect, useState } from 'react';
import { CellId, CellType } from '../../types/types';
import { Table } from './Table';
import {
	getIsArrayIncludesCell,
	getTableHeaders,
	MAX_ROWS_NUMBER,
} from './utils';

export const TableContainer = () => {
	const {
		averagesByColumn,
		removedRows,
		cellPercentages,
		setCalculatedCellPercentages,
		matrix,
		rowSums,
		incrementCellValue,
		setClosestByValueCells,
		closestCellsIds,
		clearClosestCellsIds,
		removeRow,
		addRow,
	} = useMatrix();
	const [rowLabels, setRowLabels] = useState([]);
	const [hoveredRowIndex, setHoveredRowIndex] = useState<number | undefined>();

	useEffect(() => {
		if (
			matrix &&
			matrix.length &&
			(rowLabels.length === 0 || matrix.length !== rowLabels.length)
		) {
			const numberOfRows = matrix.length;

			setRowLabels(() =>
				Array.from({ length: numberOfRows }).map(
					(_, rowIndex) => `N = ${rowIndex + 1}`
				)
			);
		}
	}, [matrix]);

	if (!matrix || !matrix.length) return;

	const removeLabel = (rowIndex: number) => {
		setRowLabels((prevState) =>
			prevState.filter((_, index) => index !== rowIndex)
		);
	};

	const handleRemoveBtnClick = (rowIndex: number) => {
		removeRow(rowIndex);
		removeLabel(rowIndex);
	};

	const handleAddRowBtnClick = () => {
		if (matrix.length === MAX_ROWS_NUMBER) {
			alert(`Max number of rows is ${MAX_ROWS_NUMBER}`);
			return;
		}
		addRow();
		setRowLabels((prevLabels) => [
			...prevLabels,
			`N = ${prevLabels.length + removedRows + 1}`,
		]);
	};

	const handleSumCellMouseEnter = (hoveredRowIndex: number) => {
		setHoveredRowIndex(hoveredRowIndex);
		setCalculatedCellPercentages();
	};

	const handleSumCellMouseLeave = () => {
		setHoveredRowIndex(undefined);
	};

	const handleCellClick = (id: CellId) => incrementCellValue(id);

	const handleCellMouseEnter = (cell: CellType) => {
		setClosestByValueCells(cell);
	};

	const handleCellMouseLeave = () => {
		clearClosestCellsIds();
	};

	const getShouldHighlightCell = (cellId: CellId) =>
		getIsArrayIncludesCell(cellId, closestCellsIds);

	const headers = getTableHeaders(matrix[0].length);

	return (
		<Table
			tableData={matrix}
			cellPercentages={cellPercentages}
			hoveredRowIndex={hoveredRowIndex}
			rowLabels={rowLabels}
			headers={headers}
			averagesByColumn={averagesByColumn}
			rowSums={rowSums}
			getShouldHighlightCell={getShouldHighlightCell}
			onRowRemove={handleRemoveBtnClick}
			onRowAddClick={handleAddRowBtnClick}
			onCellClick={handleCellClick}
			onCellMouseEnter={handleCellMouseEnter}
			onCellMouseLeave={handleCellMouseLeave}
			onSumCellMouseEnter={handleSumCellMouseEnter}
			onSumCellMouseLeave={handleSumCellMouseLeave}
		></Table>
	);
};
