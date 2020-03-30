defmodule WriteyDrawey.Repo.Migrations.CreateDrawings do
  use Ecto.Migration

  def change do
    create table(:drawings) do
      add :image_binary, :binary

      timestamps()
    end

  end
end
