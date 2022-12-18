import app from '@infrastructure/app'
init()

async function init() {
  try {
    app.listen(3001, () => {
      app.get('logger').log('Express App Listening on Port 3001');
    })
  } catch (error) {
    app.get('logger').error(`An error occurred: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}