defmodule WriteyDrawey.GamesControllerTest do
  use ExUnit.Case

  use WriteyDraweyWeb.ConnCase

  alias WriteyDrawey.{Drawing, Game, Prompt, Round}

  describe "summary" do
    # TODO: rethink what happens when the game is unstarted 
    # (shouldn't happen.. but.. for the sake of a good API)

    # test "when a game has no drawings or prompts returns an empty list of sequences" do
    #   %{id: game_id} = Game.initialize_with_player("Testy")

    #   conn = get(build_conn(), Routes.games_path(build_conn(), :summary, game_id, %{}))

    #   assert json_response(conn, 200) == %{"game_id" => "#{game_id}", "sequences" => []}
    # end

    test "when a game has initial prompts, returns those prompts in the sequences" do
      # Arrange
      %{id: game_id} = Game.initialize_with_player("Testy")
      %{id: round_id} = Round.find_or_create(%{game_id: game_id, ordinality: 0})

      initial_prompt = "Fence"
      Prompt.find_or_create_prompt(%{text: initial_prompt, round_id: round_id})

      # Act
      conn = get(build_conn(), Routes.games_path(build_conn(), :summary, game_id, %{}))

      # Assert
      assert json_response(conn, 200) == %{
        "game_id" => game_id, 
        "sequences" => [%{"initial" => initial_prompt, "entries" => []}]
      }
    end

    test "when a game has a round of drawings submitted, returns the drawings in the sequences" do
      # Arrange
      %{id: game_id, code: game_code} = Game.initialize_with_player("Testy")
      Game.add_player(game_code, %{name: "An0ther"})
      [%{id: player1_id}, %{id: player2_id}] = Game.get_players(game_id)

      %{id: round0_id} = Round.find_or_create(%{game_id: game_id, ordinality: 0})
      %{id: round1_id} = Round.find_or_create(%{game_id: game_id, ordinality: 1})
      
      initial_prompt1 = "Fence"
      initial_prompt2 = "Dog"
      Prompt.find_or_create_prompt(%{text: initial_prompt1, round_id: round0_id})
      Prompt.find_or_create_prompt(%{text: initial_prompt2, round_id: round0_id})


      image_binary1 = "drawing_data1"
      image_binary2 = "drawing_data2"

      Drawing.find_or_create(%{image_binary: image_binary1, round_id: round1_id, player_id: player1_id})
      Drawing.find_or_create(%{image_binary: image_binary2, round_id: round1_id, player_id: player2_id})
      #Act
      conn = get(build_conn(), Routes.games_path(build_conn(), :summary, game_id, %{}))
    
      # Assert
      assert json_response(conn, 200) == %{
        "game_id" => game_id, 
        "sequences" => [
          %{
            "initial" => initial_prompt1,
            "entries" => [%{ "type" => "DRAWING", "value" => image_binary1}]
          },
          %{
            "initial" => initial_prompt2,
            "entries" => [%{ "type" => "DRAWING", "value" => image_binary2 }]
          }
        ]
      }
    end
  end
end