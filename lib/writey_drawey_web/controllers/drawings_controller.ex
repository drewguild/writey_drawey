defmodule WriteyDraweyWeb.DrawingsController do
  use WriteyDraweyWeb, :controller

  alias Jason

  alias WriteyDrawey.{Drawing, Prompt, Repo}

  def show(conn, %{"id" => drawingId}) do
    drawing = Repo.get(Drawing, drawingId)
      
    render(conn, "show.json", drawing: drawing)
  end

  def create(conn, %{"drawing_base64" => binary, "prompt_id" => prompt_id}) do
    drawing = create_drawing!(binary)
    link_drawing!(prompt_id, drawing)
    json(conn, %{success: true, drawing_id: drawing.id})
  end

  defp create_drawing!(binary) do
    Drawing.changeset(%Drawing{}, %{image_binary: binary})
    |> Repo.insert!
  end

  # TODO: move to Prompt
  defp link_drawing!(prompt_id, %{id: drawing_id}) do
    Repo.get(Prompt, prompt_id)
    |> Prompt.changeset(%{drawing_id: drawing_id})
    |> Repo.update!
  end
end