defmodule WriteyDrawey.Repo do
  use Ecto.Repo,
    otp_app: :writey_drawey,
    adapter: Ecto.Adapters.Postgres
end
