import { CellId } from '../../types/types';

export const MAX_ROWS_NUMBER = 100;

export const getIsHeatmapVisible = (
	rowIndex: number,
	hoveredRowIndex: number | undefined,
	cellPercentages: number[][]
) => {
	return (
		hoveredRowIndex !== undefined &&
		rowIndex === hoveredRowIndex &&
		cellPercentages &&
		cellPercentages.length !== 0
	);
};

export const getCellPercentage = (
	rowIndex: number,
	columnIndex: number,
	hoveredRowIndex: number | undefined,
	cellPercentages: number[][]
) => {
	if (getIsHeatmapVisible(rowIndex, hoveredRowIndex, cellPercentages)) {
		return cellPercentages[rowIndex][columnIndex];
	}
};

export const getTableHeaders = (numberOfColumns: number) => {
	const generatedHeaders = Array.from({ length: numberOfColumns }).map(
		(_, index) => `M = ${index + 1}`
	);

	return ['', '', ...generatedHeaders];
};

export const getIsArrayIncludesCell = (cellId: CellId, cellsArray: CellId[]) =>
	cellsArray.includes(cellId);

const getHeatmapColor = (percentage: number) => {
	const intensity = Math.floor((255 * (100 - percentage)) / 100);
	return `rgb(${intensity}, ${intensity}, 255)`;
};

export const getCellStyle = (
	isShowRowPercentages: boolean,
	percentage: number
) => {
	return isShowRowPercentages
		? { backgroundColor: getHeatmapColor(percentage) }
		: {};
};

export const roundNumberWithOneNumAfterPoint = (number: number) =>
	Math.round(number * 10) / 10;
