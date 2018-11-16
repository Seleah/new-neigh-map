// import locations from '../data/locations.json';

export const getLocations = (query) => {
	const CLIENT_ID = "IGXZG543B3RW4HHAD1XVVWK03Y2JU3M3KIOTZ2KEMJH5BEUF";
	const CLIENT_SECRET = "3VKMH02ZDPJKMJIO5EEFJKJ3JCKO22SJAAOCPYGRBJHKVXVF";
	const CLIENT_VERSION = "20181112";

	query = query || 'ramen';

	let fsUrl = `https://api.foursquare.com/v2/venues/explore?query=${query}&ll=45.52345,-122.67621&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${CLIENT_VERSION}`;

	let fsUrl2 = '';

	// let fallbackLoc = locations.json();
	let fallback = "Your search cannot be completed due to an error";

	return fetch(fsUrl)
	.then(resp => resp.json())
	.then(result => result.response.groups[0].items)
	.catch((er) => {return fallback;});
}