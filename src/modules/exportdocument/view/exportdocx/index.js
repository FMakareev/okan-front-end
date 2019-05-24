export default ({params}, response) => {
  response.send(`
    <p>params.documentid: <b>${params.documentid}</b></p>
  `);
  response.end();
}
