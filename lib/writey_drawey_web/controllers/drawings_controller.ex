defmodule WriteyDraweyWeb.DrawingsController do
  use WriteyDraweyWeb, :controller

  alias Jason

  alias WriteyDrawey.{Drawing, Repo}

  def create(conn, %{"drawing_base64" => drawing}) do
    Drawing.changeset(%Drawing{}, %{image_binary: drawing})
      |> Repo.insert
      |> case do
        {:ok, drawing} -> json(conn, %{success: true, drawing_id: Map.get(drawing, :id)})
        {:error, _} -> json(conn, %{success: false})
      end
  end
end