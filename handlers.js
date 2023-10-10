const handleTest = (req, res) => {
  const responseObject = {
    status: 200,
    message: "Hello",
  };
  res.status(200).json(responseObject);
}

const handle404 = (req, res) => {
  const responseObject = {
    status: 404,
    message: "This isn't the endpoint you're looking for.",
  };
  res.status(404).json(responseObject);
}

module.exports = {
	handleTest,
	handle404
}