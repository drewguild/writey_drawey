defmodule WriteyDraweyWeb.GamesController do
  use WriteyDraweyWeb, :controller

  def create(conn, _params) do
    json(conn, %{game_id: 1, game_code: "3x6y9z"})
  end
end