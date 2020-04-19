defmodule WriteyDrawey.Prompt do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias WriteyDrawey.{Drawing, Prompt, Repo}

  schema "prompts" do
    # TODO remove the drawing/prompt relationship
    belongs_to :drawing, Drawing
    belongs_to :player, Player
    belongs_to :round, Round
    field :text, :string

    timestamps()
  end

  @doc false
  def changeset(prompt, attrs) do
    prompt
    |> cast(attrs, [:text, :drawing_id, :player_id, :round_id])
    |> unique_constraint(:player_id, name: :prompts_player_id_round_id_index)
    |> validate_required([:text])
  end

  def generate! do
    changeset(%WriteyDrawey.Prompt{}, %{text: random})
    |> Repo.insert!
  end

  def create_prompt!(attrs) do
    changeset(%Prompt{}, attrs)
    |> Repo.insert!
  end

  def find_or_create_prompt(attrs) do
    prompt = %Prompt{}
    |> changeset(attrs)
    |> Repo.insert!(on_conflict: :nothing)

    if is_nil(prompt.id) do
      Repo.one(from p in Prompt, 
        where: p.game_id == ^prompt.player_id, 
        where: p.round_id == ^prompt.round_id
      )
    else
      prompt
    end
  end

  def link_drawing!(id, %Drawing{id: drawing_id}) do
    Repo.get(Prompt, id)
    |> Prompt.changeset(%{drawing_id: drawing_id})
    |> Repo.update!
  end

  def random do
    Enum.random([
        "Dog", 
        "Apple",
        "Pants",
        "House",
        "Goat",
        "Sandwich",
        "Snowman",
        "City",
        "Island",
        "Baseball",
        "Music",
        "Sun"
    ])
  end
end
