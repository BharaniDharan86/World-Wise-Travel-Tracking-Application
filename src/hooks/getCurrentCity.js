async function getCurrentCity(lat, lng) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );

  const data = await res.json();

  console.log(data);
  return data;
}

export default getCurrentCity;
