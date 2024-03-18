'use client'

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import styles from "./index.module.scss";


export default function RangePicker({ originalRows, rows, setRows }) {
	const defaultMinDate = dayjs(originalRows[0].date);
	const defaultMaxDate = dayjs(originalRows[originalRows.length - 1].date);

	const wrapperRef = useRef(null);

	const [minDate, setMinDate] = useState(dayjs(rows[0].date));
	const [maxDate, setMaxDate] = useState(dayjs(rows[rows.length - 1].date));

	useEffect(() => {
		setRows(originalRows.filter(({ date }) => {
			return (dayjs(date) >= minDate) && (dayjs(date) <= maxDate);
		}));
	}, [minDate, maxDate, originalRows, setRows]);

	useEffect(() => {
		const originalHeight = 334;

		const handleWindowResize = (event) => {
			if (window.innerWidth > 767) {
				return;
			}

			const ratio = wrapperRef.current.clientWidth / wrapperRef.current.firstChild.clientWidth;

			wrapperRef.current.style.marginBottom = `-${(1 - ratio) * originalHeight}px`;
			wrapperRef.current.firstChild.style.transform = `scale(${ratio})`;
		}

		handleWindowResize();

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		}
	}, []);

	return (
		<div ref={wrapperRef} className={clsx(styles.masterWrapper, 'flex justify-center')}>
			<div className="flex origin-top">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StaticDatePicker
						className="flex-1"
						defaultValue={minDate}
						minDate={defaultMinDate}
						maxDate={maxDate}
						onChange={setMinDate}
						disableHighlightToday={true}
						sx={{
							color: '#0B2027',
							bgcolor: '#FAFAFACC',
							borderRadius: '4px 0 0 4px',
						}}
					/>

					<StaticDatePicker
						className="flex-1"
						defaultValue={maxDate}
						minDate={minDate}
						maxDate={defaultMaxDate}
						onChange={setMaxDate}
						disableHighlightToday={true}
						sx={{
							color: '#0B2027',
							bgcolor: '#FAFAFACC',
							borderRadius: '0 4px 4px 0',
						}}
					/>
				</LocalizationProvider>
			</div>
		</div>
	);
}
