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
end