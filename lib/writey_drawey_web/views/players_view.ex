defmodule WriteyDraweyWeb.PlayersView do
  use WriteyDraweyWeb, :view

  alias WriteyDrawey.Player

  def render("player.json", %{player: player}) do
      %{
        id: player.id, 
        name: player.name,
        status: player.status,
        avatar: nil
      }
  end

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