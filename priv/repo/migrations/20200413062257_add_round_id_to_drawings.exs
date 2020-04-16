defmodule WriteyDrawey.Repo.Migrations.AddRoundIdToDrawings do
  use Ecto.Migration

  def change do
    alter table("drawings") do
      add :round_id, references(:rounds)
    end
  end
end
