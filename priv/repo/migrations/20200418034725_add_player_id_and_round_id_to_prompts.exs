defmodule WriteyDrawey.Repo.Migrations.AddPlayerIdAndRoundIdToPrompts do
  use Ecto.Migration

  def change do
    alter table("prompts") do
      add :round_id, references(:rounds)
      add :player_id, references(:players)
    end
  end
end
