defmodule WriteyDraweyWeb.DrawingsView do
  use WriteyDraweyWeb, :view

  def render("drawing.json", {}) do
      %{something: "wicked"}
  end
end
