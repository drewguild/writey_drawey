defmodule WriteyDraweyWeb.PromptsController do
  use WriteyDraweyWeb, :controller

  import Ecto.Query, only: [from: 2]

  alias WriteyDrawey.{Game, Player, Prompt, Repo, Round}

  def create(conn, %{"text" => text, "game_id" => game_id, "player_id" => player_id, "round" => round}) do
    round_id = Round.find!(game_id, round) |> Map.get(:id)
    prompt = Prompt.create_prompt!(%{text: text, player_id: player_id, round_id: round_id})
    json(conn, %{prompt_id: prompt.id})
  end

  # TODO: this is major copy-pasta from the same operation in drawings controller
  def next(conn, %{"player_id" => player_id, "round" => round}) do
    player_id = String.to_integer(player_id)
    ordinality = String.to_integer(round)

    game_id = Repo.get(Player, player_id)
    |> Map.get(:game_id)

    players = game_id
    |> Game.get_players
    |> Enum.map(&(&1.id))

    # Prompts ordered by player and 'rotated' as if being passed circularly
    prompts = Round.find!(game_id, ordinality) 
    |> Repo.preload(prompts: from(p in Prompt, order_by: p.player_id))
    |> Map.get(:prompts)
    |> rotate

    prompt = Enum.zip(players, prompts) |> Enum.into(%{}) |> Map.get(player_id)

    render conn, "prompt.json", %{prompt: prompt}
  end

  def random(conn, _params) do
    prompt = Prompt.generate!
    render conn, "prompt.json", %{prompt: prompt}
  end

  # TODO: this is also pasta
  defp rotate([head | tail]) do
    tail ++ [head]
  end
end