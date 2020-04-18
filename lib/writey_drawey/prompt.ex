defmodule WriteyDrawey.Prompt do
  use Ecto.Schema
  import Ecto.Changeset

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
        "House"
    ])
  end
end
