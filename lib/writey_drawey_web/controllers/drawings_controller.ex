defmodule WriteyDraweyWeb.DrawingsController do
  use WriteyDraweyWeb, :controller

  alias Jason

  alias WriteyDrawey.{Drawing, Prompt, Repo}

  def show(conn, %{"id" => drawingId}) do
    drawing = Repo.get(Drawing, drawingId)
      
    render(conn, "show.json", drawing: drawing)
  end

  def create(conn, %{"drawing_base64" => binary, "prompt_id" => prompt_id}) do
    drawing = Drawing.create_drawing!(binary)
    Prompt.link_drawing!(prompt_id, drawing)
    json(conn, %{success: true, drawing_id: drawing.id})
  end

  def next(conn, %{"player_id" => player_id}) do
    # players = Game.get_players |> map(.id)
    # drawings = Game.get_last_round |> rotate
    # Enum.zip(players, drawing) |> Enum.into(%{}) |> Map.get(player_id)

    json(conn, %{success: true})
  end
end