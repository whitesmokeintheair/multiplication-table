import { CellId, CellType, MatrixType } from '../types/types';

export const generateCellId = (
	rowIndex: number,
	colIndex: number,
	totalColumns: number
): number => {
	return rowIndex * totalColumns + colIndex + 1;
};

export const generateMultiplicationMatrix = (
	numberOfRows: number,
	numberOfColumns: number
): MatrixType => {
	const matrix: MatrixType = [];

	for (let i = 0; i < numberOfRows; i++) {
		const row: CellType[] = generateMatrixRow(numberOfColumns, i);
		matrix.push(row);
	}

	return matrix;
};

export const generateMatrixRow = (
	numberOfColumns: number,
	rowIndex: number
): CellType[] => {
	const row: CellType[] = [];
	for (let j = 0; j < numberOfColumns; j++) {
		row.push({
			id: generateCellId(rowIndex, j, numberOfColumns),
			value: (rowIndex + 1) * (j + 1),
		});
	}
	return row;
};

export const calculateRowSums = (matrix: MatrixType): number[] => {
	const rows: number[] = [];

	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];
		let rowSum = 0;

		for (let j = 0; j < row.length; j++) {
			rowSum += row[j].value;
		}
		rows.push(rowSum);
	}

	return rows;
};

export const calculateColumnAverages = (matrix: MatrixType): number[] => {
	const numberOfRows = matrix.length;
	const numberOfColumns = matrix[0]?.length || 0;

	const columnSums = Array(numberOfColumns).fill(0);
	matrix.forEach((row) => {
		row.forEach((cell, colIndex) => {
			columnSums[colIndex] += cell.value;
		});
	});

	return columnSums.map((sum) => sum / numberOfRows);
};

const calculateMinPercentageDifference = (
	hoveredCellValue: number,
	matrix: MatrixType,
	hoveredCellId: CellId
): number => {
	let minPercentageDifference = Infinity;

	for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
		const row = matrix[rowIndex];

		for (let colIndex = 0; colIndex < row.length; colIndex++) {
			const cell = row[colIndex];

			if (cell.id !== hoveredCellId) {
				const percentageDifference =
					Math.abs((hoveredCellValue - cell.value) / hoveredCellValue) * 100;

				if (percentageDifference < minPercentageDifference) {
					minPercentageDifference = percentageDifference;
				}
			}
		}
	}

	return minPercentageDifference;
};

const findCellsWithMinPercentageDifference = (
	hoveredCell: CellType,
	matrix: MatrixType,
	minPercentageDifference: number,
	tolerance: number
): CellId[] => {
	const { id: hoveredCellId, value: hoveredCellValue } = hoveredCell;
	const closestCells: CellId[] = [];

	for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
		const row = matrix[rowIndex];

		for (let colIndex = 0; colIndex < row.length; colIndex++) {
			const cell = row[colIndex];

			if (cell.id !== hoveredCellId) {
				const percentageDifference =
					Math.abs((hoveredCellValue - cell.value) / hoveredCellValue) * 100;
				if (
					Math.abs(percentageDifference - minPercentageDifference) <= tolerance
				) {
					closestCells.push(cell.id);
				}
			}
		}
	}

	return closestCells;
};

export const findClosestCellsByPercentage = (
	matrix: MatrixType,
	hoveredCell: CellType
): CellId[] => {
	const tolerance = 5;
	const { id: hoveredCellId, value: hoveredCellValue } = hoveredCell;

	if (!matrix.length || !matrix[0].length || hoveredCellValue === 0) {
		return [];
	}

	const minPercentageDifference = calculateMinPercentageDifference(
		hoveredCellValue,
		matrix,
		hoveredCellId
	);

	const closestCells = findCellsWithMinPercentageDifference(
		hoveredCell,
		matrix,
		minPercentageDifference,
		tolerance
	);

	return closestCells;
};

export const calculateCellPercentages = (
	rowSums: number[],
	matrix: MatrixType
): number[][] => {
	const percentages: number[][] = [];

	if (rowSums.length === 0) {
		calculateRowSums(matrix);
	}

	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];
		const rowSum = rowSums[i];

		const rowPercentages: number[] = [];
		for (let j = 0; j < row.length; j++) {
			const cell = row[j];
			const percentage = (cell.value / rowSum) * 100;
			rowPercentages.push(percentage);
		}

		percentages.push(rowPercentages);
	}

	return percentages;
};

export const incrementMatrixCell = (matrix: MatrixType, cellId: CellId) => {
	const newMatrix = [...matrix];

	for (let rowIndex = 0; rowIndex < newMatrix.length; rowIndex++) {
		const row = newMatrix[rowIndex];

		for (let colIndex = 0; colIndex < row.length; colIndex++) {
			const cell = row[colIndex];

			if (cell.id === cellId) {
				newMatrix[rowIndex] = [...newMatrix[rowIndex]];
				newMatrix[rowIndex][colIndex] = {
					...cell,
					value: cell.value + 1,
				};
				return newMatrix;
			}
		}
	}

	return newMatrix;
};
