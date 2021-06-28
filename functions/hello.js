exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Lilt',
      age: 85,
      email: '111222333'
    })
  }
}