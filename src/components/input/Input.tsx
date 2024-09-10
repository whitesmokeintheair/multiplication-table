import { ChangeEvent, useState, forwardRef, useEffect } from 'react';
import './Input.css';
import { MAX_ROWS_NUMBER } from '../table/utils';

type InputType = {
	label: string;
	placeholder?: string;
	maxValue?: number;
	minValue?: number;
	onChange?: (value: string) => void;
};

export const Input = forwardRef<HTMLInputElement, InputType>(
	(
		{
			label,
			placeholder = 'Enter value',
			maxValue = MAX_ROWS_NUMBER,
			minValue = 0,
			onChange,
		},
		ref
	) => {
		const [value, setValue] = useState('');
		const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			if (error) {
				const timeout = setTimeout(() => {
					setError(null);
				}, 3000);

				return () => clearTimeout(timeout);
			}
		}, [error]);

		const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const inputValueNumber = Number(inputValue);

			if (isNaN(inputValueNumber)) {
				setError('Please enter a valid number.');
			} else if (inputValueNumber > maxValue) {
				setError(`Value should be less than or equal to ${maxValue}.`);
			} else if (inputValueNumber < minValue) {
				setError(`Value should be more than or equal to ${minValue}.`);
			} else {
				setError(null);
				setValue(inputValue);

				if (onChange) {
					onChange(inputValue);
				}
			}
		};

		return (
			<div className='input-container'>
				{label && <label className='input-label'>{label}</label>}
				<input
					ref={ref}
					type='text'
					value={value}
					className='input'
					placeholder={placeholder}
					onChange={handleInputChange}
				/>
				<span className='input-error'>{error}</span>
			</div>
		);
	}
);
