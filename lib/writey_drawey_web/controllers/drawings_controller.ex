defmodule WriteyDraweyWeb.DrawingsController do
  use WriteyDraweyWeb, :controller

  alias Jason

  def create(conn, %{"drawing_base64" => drawing}) do
    # changeset = Drawing.changeset(%WriteyDrawey.Drawing{}, %{image_binary: drawing})
    json(conn, %{success: true})
  end
end