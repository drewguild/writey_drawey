defmodule WriteyDrawey.Game do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias WriteyDrawey.{Game, Player, Prompt, Repo, Round}

  schema "games" do
    field :code, :string
    has_many :players, Player

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:code])
    |> validate_required([:code])
  end

  def add_player(code, %{name: name}) do
    game = get_by_code(code) |> Repo.preload(:players)

    game
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.put_assoc(:players, [%Player{name: name} | game.players ])
    |> Repo.update!
  end

  def get_by_code(code) do
    Repo.get_by!(Game, code: code)
  end

  def get_players(id) do 
    Repo.all(from p in Player,
              where: p.game_id == ^id,
              order_by: p.id)
  end

  def initialize_with_player(name) do
    changeset(%Game{}, %{code: random_code, })
    |> Ecto.Changeset.put_assoc(:players, [%Player{name: name}])
    |> Repo.insert!
  end

  def round_complete?(id, ordinality) do
    number_of_players = get_players(id)
    |> Enum.count 

    number_of_submissions = Round.find!(id, ordinality)
    |> Round.get_submissions
    |> Enum.count

    number_of_players == number_of_submissions
  end

  defp random_code do
    Enum.map(1..6, fn i -> Enum.random(0..9) end)
    |> Enum.join
  end
end
