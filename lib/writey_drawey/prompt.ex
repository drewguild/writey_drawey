defmodule WriteyDrawey.Prompt do
  use Ecto.Schema
  import Ecto.Changeset

  alias WriteyDrawey.{Drawing, Repo}

  schema "prompts" do
    belongs_to :drawing, Drawing
    field :text, :string

    timestamps()
  end

  @doc false
  def changeset(prompt, attrs) do
    prompt
    |> cast(attrs, [:text, :drawing_id])
    |> validate_required([:text])
  end

  def generate! do
    changeset(%WriteyDrawey.Prompt{}, %{text: random})
    |> Repo.insert!
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
