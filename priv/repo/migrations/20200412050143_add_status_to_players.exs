defmodule WriteyDrawey.Repo.Migrations.AddStatusToPlayers do
  use Ecto.Migration

  def change do
    alter table("players") do
      add :status, :string
    end
  end
end
