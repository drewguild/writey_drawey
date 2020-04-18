defmodule WriteyDrawey.Repo.Migrations.AddUniqueIndexToPrompts do
  use Ecto.Migration

  def change do
    create unique_index(:prompts, [:player_id, :round_id])
  end
end
