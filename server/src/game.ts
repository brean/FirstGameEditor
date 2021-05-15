async function newGame(socket, data, mongoClient) {
  const results = await mongoClient.db('games').collection("game").insertOne(data);
  const _id = results.insertedId;
  data['_id'] = _id
  socket.send(JSON.stringify({game: data}));
  return true;
}

export { newGame }