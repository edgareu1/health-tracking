const formatDate = (date) => {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);

	return `${year}-${month}-${day}`;
}

const newDateWithoutTZ = (date) => {
	const tmp = new Date(date);
	const timezoneOffset = tmp.getTimezoneOffset() * 60000;

	return new Date(tmp.getTime() + timezoneOffset);
}

export { formatDate, newDateWithoutTZ };
