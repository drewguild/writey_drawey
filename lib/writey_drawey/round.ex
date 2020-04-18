defmodule WriteyDrawey.Round do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias WriteyDrawey.{Drawing, Game, Prompt, Round, Repo}

  schema "rounds" do
    field :ordinality, :integer
    belongs_to :game, Game
    has_many :drawings, Drawing
    has_many :prompts, Prompt

    timestamps()
  end

  @doc false
  def changeset(round, attrs) do
    round
    |> cast(attrs, [:game_id, :ordinality])
    |> unique_constraint(:ordinality, name: :rounds_ordinality_gamed_id_index)
    |> validate_required([:game_id, :ordinality])
  end

  def find!(game_id, ordinality) do
    Repo.one!(from r in Round, 
      where: r.game_id == ^game_id, 
      where: r.ordinality == ^ordinality
    )
  end

  def find_or_create(attrs) do
    round = %Round{}
    |> changeset(attrs)
    |> Repo.insert!(on_conflict: :nothing)

    if is_nil(round.id) do
      Repo.one(from r in Round, 
        where: r.game_id == ^round.game_id, 
        where: r.ordinality == ^round.ordinality
      )
    else
      round
    end
  end

  def get_submissions(%Round{} = round) do
    drawings = Repo.all(from d in Drawing, where: d.round_id == ^round.id)
    prompts = Repo.all(from p in Prompt, where: p.round_id == ^round.id)

    Enum.concat(drawings, prompts)
  end
end
