defmodule WriteyDraweyWeb.DrawingsView do
  use WriteyDraweyWeb, :view

  def render("show.json", %{drawing: drawing}) do
      %{image_binary: Map.get(drawing, :image_binary)}
  end
end
