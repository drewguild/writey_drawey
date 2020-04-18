defmodule WriteyDraweyWeb.GamesController do
  use WriteyDraweyWeb, :controller

  alias WriteyDrawey.{Game, Round}

  def create(conn, %{"initial_player_name" => initial_player_name}) do
    game = Game.initialize_with_player(initial_player_name)

    json(conn, %{
      game_id: game.id, 
      game_code: game.code,
      players: Enum.map(game.players, &(&1.id))
    })
  end

  def add_player(conn, %{"code" => code, "player_name" => player_name}) do
    game = Game.add_player(code, %{name: player_name})

    json(conn, %{
      game_id: game.id, 
      game_code: game.code,
      players: Enum.map(game.players, &(&1.id)) 
    })
  end

  def check_round(conn, %{"id" => id, "round" => round}) do
    id = String.to_integer(id)
    round = String.to_integer(round)

    json(conn, %{complete: Game.round_complete(id, round)})
  end

  def next_round(conn, %{"id" => id, "current_round" => current_round }) do
    round = Round.find_or_create(%{game_id: id, ordinality: String.to_integer(current_round) + 1})

    json(conn, %{round_id: round.id, ordinality: round.ordinality})
  end

  def next_round(conn, %{"id" => id}) do
    round = Round.find_or_create(%{game_id: id, ordinality: 1})

    json(conn, %{round_id: round.id, ordinality: round.ordinality})
  end
  
  def get_players(conn, %{"id" => id}) do
    players = Game.get_players(id)
    # |> Enum.map(&(%{id: &1.id, name: &1.name, avatar: nil}))

    render(conn, "players.json", %{players: players})
  end
end