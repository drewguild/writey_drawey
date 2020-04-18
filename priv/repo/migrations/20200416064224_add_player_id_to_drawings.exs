defmodule WriteyDrawey.Repo.Migrations.AddPlayerIdToDrawings do
  use Ecto.Migration

  def change do
    alter table("drawings") do
      add :player_id, references(:players)
    end
  end
end
