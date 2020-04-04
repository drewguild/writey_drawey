defmodule WriteyDrawey.Repo.Migrations.CreatePrompts do
  use Ecto.Migration

  def change do
    create table(:prompts) do
      add :text, :string
      add :drawing_id, references(:drawings)

      timestamps()
    end

  end
end
