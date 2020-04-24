defmodule WriteyDrawey.Repo.Migrations.AddUniqueIndexToDrawings do
  use Ecto.Migration

  def change do
    create unique_index(:drawings, [:player_id, :round_id])
  end
end
