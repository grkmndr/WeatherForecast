export function PrepareURL(baseURL, type, units, lat, long, API_KEY) {
	const URL = `${baseURL}${type}?units=${units}&lat=${lat}&lon=${long}&appid=${API_KEY}`;
	return URL;
}
