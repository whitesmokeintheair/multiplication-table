export type CellId = number;
export type CellValue = number;

export type CellType = {
	id: CellId;
	value: CellValue;
};

export type MatrixType = CellType[][];
