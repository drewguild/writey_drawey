defmodule WriteyDraweyWeb.PromptsController do
  use WriteyDraweyWeb, :controller

  def random(conn, _params) do
    prompt = Prompt.random
    render conn, "prompt.json", %{prompt: prompt}
  end
end