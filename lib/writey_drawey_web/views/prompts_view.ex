defmodule WriteyDraweyWeb.PromptsView do
  use WriteyDraweyWeb, :view

  def render("prompt.json", %{prompt: prompt}) do
      %{prompt: prompt}
  end
end