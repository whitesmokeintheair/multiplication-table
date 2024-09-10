import React, { useRef } from 'react';
import { Input } from '../components/input/Input';
import { useMatrix } from '../providers/MatrixContextProvider';
import { TableContainer } from '../components/table/TableContainer';
import './TablePage.css';

export const TablePage = () => {
	const { generateMatrix } = useMatrix();
	const numberOfRowsRef = useRef(null);
	const numberOfColumnsRef = useRef(null);

	const handleOnGenerateBtnClick = () =>
		generateMatrix(
			numberOfRowsRef.current.value,
			numberOfColumnsRef.current.value
		);

	return (
		<>
			<div className='inputs-container'>
				<Input
					ref={numberOfRowsRef}
					label='Number of rows (N):'
				></Input>
				<Input
					ref={numberOfColumnsRef}
					label='Number of columns (M): '
				></Input>
			</div>
			<div className='button-container'>
				<button
					className='generate-button'
					onClick={handleOnGenerateBtnClick}
				>
					Generate table
				</button>
			</div>
			<div className='table-page-table-container'>
				<TableContainer></TableContainer>
			</div>
		</>
	);
};
