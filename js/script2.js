export const url5 =
  "https://stianrostad.no/wordpress/wp-json/wc/store/products?per_page=50";

async function getProducts() {
  try {
    const response5 = await fetch(url5);
    const getResults = await response5.json();
    console.log(getResults);
  } catch (error) {
    console.log(error);
  }
}
getProducts();
