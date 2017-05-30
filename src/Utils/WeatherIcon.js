export function WeatherIcon(weatherId) {
	let iconCode = '';

	if (weatherId < 300) {
		iconCode = '11d';
	} else if (weatherId < 500) {
		iconCode = '09d';
	} else if (weatherId < 511) {
		iconCode = '10d';
	} else if (weatherId === 511) {
		iconCode = '13d';
	} else if (weatherId < 600) {
		iconCode = '09d';
	} else if (weatherId < 700) {
		iconCode = '13d';
	} else if (weatherId < 800) {
		iconCode = '50d';		
	} else if (weatherId === 800) {
		iconCode = '01d';
	} else if (weatherId === 801) {
		iconCode = '02d';
	} else if (weatherId === 802) {
		iconCode = '03d';
	} else if (weatherId === 803) {
		iconCode = '04d';
	} else if (weatherId === 804) {
		iconCode = '04d';
	} else {
		iconCode = 'error';
	}

	return iconCode;
}
