defmodule WriteyDrawey.Drawing do
  use Ecto.Schema
  import Ecto.Changeset

  alias WriteyDrawey.{Drawing, Repo, Round}

  schema "drawings" do
    field :image_binary, :binary
    belongs_to :round, Round

    timestamps()
  end

  @doc false
  def changeset(drawing, attrs) do
    drawing
    |> cast(attrs, [:image_binary, :round_id])
    |> validate_required([:image_binary])
  end

  def create_drawing!(%{} = attrs) do
    Drawing.changeset(%Drawing{}, attrs)
    |> Repo.insert!
  end
end
