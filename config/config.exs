# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :writey_drawey,
  ecto_repos: [WriteyDrawey.Repo]

# Configures the endpoint
config :writey_drawey, WriteyDraweyWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TG0Iuz3Ume6yKtePQ1EOkBs6rkWJb5GrKKT3FulbHkkScs7e9vBoYtshXwM+Y85I",
  render_errors: [view: WriteyDraweyWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: WriteyDrawey.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "SaV9mDGD"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
