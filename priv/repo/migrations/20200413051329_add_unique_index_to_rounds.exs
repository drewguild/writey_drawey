defmodule WriteyDrawey.Repo.Migrations.AddUniqueIndexToRounds do
  use Ecto.Migration

  def change do
    create unique_index(:rounds, [:ordinality, :game_id])
  end
end
