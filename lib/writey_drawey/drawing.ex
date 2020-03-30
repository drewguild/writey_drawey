defmodule WriteyDrawey.Drawing do
  use Ecto.Schema
  import Ecto.Changeset

  schema "drawings" do
    field :image_binary, :binary

    timestamps()
  end

  @doc false
  def changeset(drawing, attrs) do
    drawing
    |> cast(attrs, [:image_binary])
    |> validate_required([:image_binary])
  end
end
