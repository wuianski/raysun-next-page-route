const graphQLAPI = process.env.DIRECTUS_URL_DO;

const fetchData = async (query, { variables = {} }) => {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(graphQLAPI, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  return json;
};

export default fetchData;
