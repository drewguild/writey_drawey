defmodule WriteyDrawey.Player do
  use Ecto.Schema
  import Ecto.Changeset

  alias WriteyDrawey.{Game, Player, Repo}

  schema "players" do
    field :name, :string
    belongs_to :game, Game

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:game_id, :name])
    |> validate_required([:name])
  end

  def add_to_game(%Game{id: game_id}, attrs) do
    changeset(%Player{}, Map.merge(%{game_id: game_id}, attrs))
    |> Repo.insert!
  end
end
