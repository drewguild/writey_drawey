defmodule WriteyDraweyWeb.PlayersController do
  use WriteyDraweyWeb, :controller

  alias WriteyDrawey.{Player, Repo}

  def update(conn, %{"id" => id, "status" => status}) do
    player = Player
    |> Repo.get(id)
    |> Player.changeset(%{status: status})
    |> Repo.update!

    render(conn, "player.json", %{player: player})
  end
end