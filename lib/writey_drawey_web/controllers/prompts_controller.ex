defmodule WriteyDraweyWeb.PromptsController do
  use WriteyDraweyWeb, :controller

  alias WriteyDrawey.{Prompt, Round}

  def create(conn, %{"text" => text, "game_id" => game_id, "player_id" => player_id, "round" => round}) do
    round_id = Round.find!(game_id, round) |> Map.get(:id)
    prompt = Prompt.create_prompt!(%{text: text, player_id: player_id, round_id: round_id})
    json(conn, %{prompt_id: prompt.id})
  end

  def random(conn, _params) do
    prompt = Prompt.generate!
    render conn, "prompt.json", %{prompt: prompt}
  end
end