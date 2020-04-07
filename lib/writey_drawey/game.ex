defmodule WriteyDrawey.Game do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias WriteyDrawey.{Game, Player, Repo}

  schema "games" do
    field :code, :string

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:code])
    |> validate_required([:code])
  end

  def get_players(id) do 
    Repo.all(from p in Player,
              where: p.game_id == ^id)
  end

  def initialize_with_player(name) do
    game = changeset(%Game{}, %{code: random_code})
    |> Repo.insert!
    
    Player.add_to_game(game, %{name: name})

    game
  end

  defp random_code do
    Enum.map(1..6, fn i -> Enum.random(0..9) end)
    |> Enum.join
  end
end
