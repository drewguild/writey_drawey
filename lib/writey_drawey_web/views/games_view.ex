defmodule WriteyDraweyWeb.GamesView do
  use WriteyDraweyWeb, :view

  alias WriteyDrawey.Game

  def render("players.json", %{players: players}) do
    Enum.map(players, fn player ->
      %{
        id: player.id, 
        name: player.name,
        status: player.status,
        avatar: nil
      }  
    end)
  end
end