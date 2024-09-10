import { createContext, useState, useContext, useEffect } from 'react';
import { CellType, MatrixType } from '../types/types';
import {
	calculateCellPercentages,
	calculateColumnAverages,
	calculateRowSums,
	findClosestCellsByPercentage,
	generateMatrixRow,
	generateMultiplicationMatrix,
	incrementMatrixCell,
} from './matrixUtils';

interface MatrixContextReturnType {
	matrix: MatrixType;
	averagesByColumn: number[];
	rowSums: number[];
	closestCellsIds: number[];
	incrementCellValue: (cellId: number) => void;
	generateMatrix: (rows: number, cols: number) => void;
	setClosestByValueCells: (cell: CellType) => void;
	clearClosestCellsIds: () => void;
	cellPercentages: number[][];
	setCalculatedCellPercentages: () => void;
	removedRows: number;
	removeRow: (index: number) => void;
	addRow: () => void;
}

const MatrixContext = createContext<MatrixContextReturnType>(null);

type MatrixProviderProps = {
	children: React.ReactNode;
};

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
	const [matrix, setMatrix] = useState<MatrixType>();
	const [averagesByColumn, setAveragesByColumn] = useState<number[]>([]);
	const [rowSums, setRowSums] = useState<number[]>([]);
	const [closestCellsIds, setClosestCellsIds] = useState<number[]>([]);
	const [removedRows, setRemovedRows] = useState(0);
	const [cellPercentages, setCellPercentages] = useState<number[][]>([]);

	const generateMatrix = (numberOfRows: number, numberOfColumns: number) => {
		setMatrix(generateMultiplicationMatrix(numberOfRows, numberOfColumns));
	};

	const calculateSumsAndAverages = () => {
		if (matrix && matrix.length !== 0) {
			setRowSums(calculateRowSums(matrix));
			setAveragesByColumn(calculateColumnAverages(matrix));
		}
	};

	useEffect(() => {
		if (matrix) {
			calculateSumsAndAverages();
		}
	}, [matrix]);

	const incrementCellValue = (cellId: number) => {
		setMatrix((prevMatrix) => incrementMatrixCell(prevMatrix, cellId));
	};

	const setClosestByValueCells = (hoveredCell: CellType) => {
		setClosestCellsIds(findClosestCellsByPercentage(matrix, hoveredCell));
	};

	const clearClosestCellsIds = () => setClosestCellsIds([]);

	const removeRow = (rowIndex: number) => {
		const newMatrix = matrix.filter((_, index) => index !== rowIndex);
		setRemovedRows((prevValue) => prevValue + 1);
		setMatrix(newMatrix);
	};

	const addRow = () => {
		const newRow = generateMatrixRow(
			matrix[0].length,
			matrix.length + removedRows
		);
		setMatrix([...matrix, newRow]);
	};

	const setCalculatedCellPercentages = () => {
		setCellPercentages(calculateCellPercentages(rowSums, matrix));
	};

	return (
		<MatrixContext.Provider
			value={{
				generateMatrix,
				matrix,
				averagesByColumn,
				rowSums,
				incrementCellValue,
				setClosestByValueCells,
				closestCellsIds,
				clearClosestCellsIds,
				setCalculatedCellPercentages,
				cellPercentages,
				removedRows,
				removeRow,
				addRow,
			}}
		>
			{children}
		</MatrixContext.Provider>
	);
};

export const useMatrix = () => {
	const context = useContext(MatrixContext);
	if (!context) {
		throw new Error('useMatrix must be used within a MatrixProvider');
	}
	return context;
};
