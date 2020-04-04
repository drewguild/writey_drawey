defmodule WriteyDraweyWeb.PromptsView do
  use WriteyDraweyWeb, :view

  def render("prompt.json", %{prompt: prompt}) do
      %{id: prompt.id, prompt: prompt.text}
  end
end