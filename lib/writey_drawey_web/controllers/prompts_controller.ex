defmodule WriteyDraweyWeb.PromptsController do
  use WriteyDraweyWeb, :controller

  alias WriteyDrawey.Prompt

  def random(conn, _params) do
    prompt = Prompt.generate!
    render conn, "prompt.json", %{prompt: prompt}
  end
end