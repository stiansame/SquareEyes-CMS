// Your API credentials
const username = "ck_00e515882b7ce6e5c59d7f70b3faaec08a6a6ad4";
const password = "cs_08a3f368b1c9d0ad8a4db6b85b944256188afab0";

// Create the base64 encoded credentials
const credentials = btoa(`${username}:${password}`);

// Set up the request headers
const headers = new Headers();
headers.append("Authorization", "Basic " + credentials);

export const url5 =
  "https://stianrostad.no/wordpress/wp-json/wc/v3/products?per_page=50";

async function getProducts() {
  try {
    const response5 = await fetch(url5, {
      method: "GET",
      headers: headers,
    });
    const getResults = await response5.json();
  } catch (error) {
    console.log(error);
  }
}
getProducts();
