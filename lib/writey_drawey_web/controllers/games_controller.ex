defmodule WriteyDraweyWeb.GamesController do
  use WriteyDraweyWeb, :controller

  alias WriteyDrawey.{Game}

  def create(conn, %{"initial_player_name" => initial_player_name}) do
    game = Game.initialize_with_player(initial_player_name)

    json(conn, %{game_id: game.id, game_code: game.code})
  end

  # TODO: implement
  def get_players(conn, %{"id" => id}) do
    player_data = Game.get_players(id)
    |> Enum.map(&(%{id: &1.id, name: &1.name, avatar: nil}))

    json(conn, player_data)
  end
end