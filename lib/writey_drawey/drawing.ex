defmodule WriteyDrawey.Drawing do
  use Ecto.Schema
  import Ecto.Changeset

  alias WriteyDrawey.{Drawing, Repo}

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

  def create_drawing!(image_binary) do
    Drawing.changeset(%Drawing{}, %{image_binary: image_binary})
    |> Repo.insert!
  end
end
