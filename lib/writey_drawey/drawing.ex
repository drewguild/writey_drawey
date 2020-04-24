defmodule WriteyDrawey.Drawing do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias WriteyDrawey.{Drawing, Repo, Round, Player}

  schema "drawings" do
    field :image_binary, :binary
    belongs_to :round, Round
    belongs_to :player, Player

    timestamps()
  end

  @doc false
  def changeset(drawing, attrs) do
    drawing
    |> cast(attrs, [:image_binary, :player_id, :round_id])
    |> unique_constraint(:player_id, name: :drawings_player_id_round_id_index)
    |> validate_required([:image_binary])
  end

  def create_drawing!(%{} = attrs) do
    Drawing.changeset(%Drawing{}, attrs)
    |> Repo.insert!
  end

  def find_or_create(attrs) do
    drawing = %Drawing{}
    |> changeset(attrs)
    |> Repo.insert!(on_conflict: :nothing)

    if is_nil(drawing.id) do
      Repo.one(from d in Drawing, 
        where: d.player_id == ^drawing.player_id, 
        where: d.round_id == ^drawing.round_id
      )
    else
      drawing
    end
  end
end
