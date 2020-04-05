defmodule WriteyDraweyWeb.GamesController do
  use WriteyDraweyWeb, :controller

  # TODO: implement
  def create(conn, _params) do
    json(conn, %{game_id: 1, game_code: "3x6y9z"})
  end

  # TODO: implement
  def get_players(conn, _params) do
    json(conn,[
      %{id: 1, name: "Drew", avatar: nil},
      %{id: 2, name: "Roji", avatar: nil}
    ])
  end
end