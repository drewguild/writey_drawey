defmodule WriteyDraweyWeb.DrawingsController do
  use WriteyDraweyWeb, :controller
  import Ecto.Query, only: [from: 2]

  alias Jason

  alias WriteyDrawey.{Drawing, Game, Player, Prompt, Repo, Round}

  def show(conn, %{"id" => drawingId}) do
    drawing = Repo.get(Drawing, drawingId)
      
    render(conn, "show.json", drawing: drawing)
  end

  def create(conn, %{"drawing_base64" => binary, "game_id" => game_id, "prompt_id" => prompt_id, "round" => round}) do
    round_id = Round.find!(game_id, round) |> Map.get(:id)
    drawing = Drawing.create_drawing!(%{image_binary: binary, round_id: round_id})
    Prompt.link_drawing!(prompt_id, drawing)
    json(conn, %{success: true, drawing_id: drawing.id})
  end

  def next(conn, %{"player_id" => player_id, "round" => round}) do
    player_id = String.to_integer(player_id)
    ordinality = String.to_integer(round)

    game_id = Repo.get(Player, player_id)
    |> Map.get(:game_id)

    players = game_id
    |> Game.get_players
    |> Enum.map(&(&1.id))

    drawings = Round.find!(game_id, ordinality) 
    |> Repo.preload(:drawings)
    |> Map.get(:drawings)

    drawing = Enum.zip(players, drawings) |> Enum.into(%{}) |> Map.get(player_id)

    json(conn, %{success: true, image_binary: drawing.image_binary})
  end
end