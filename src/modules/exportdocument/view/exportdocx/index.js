export default ({params}, response) => {
  console.log('Export docx: ', params.documentid, response);

  response.send(`
    <p>params.documentid: <b>${params.documentid}</b></p>
  `);
  response.end();
}
