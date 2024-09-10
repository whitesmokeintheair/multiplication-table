import React from 'react';
import './Table.css';

type TableHeaderProps = {
	headers: string[];
};

export const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
	return (
		<thead>
			<tr>
				{headers.map((header, index) => (
					<th
						key={`header-${index}`}
						className='table-header-cell sticky-cell-top'
					>
						{header}
					</th>
				))}
				<th className='table-header-cell sticky-cell-right'>Sum</th>
			</tr>
		</thead>
	);
};
