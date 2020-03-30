use Mix.Config

# Configure your database
config :writey_drawey, WriteyDrawey.Repo,
  username: "postgres",
  password: "postgres",
  database: "writey_drawey_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :writey_drawey, WriteyDraweyWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
