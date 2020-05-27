
defmodule WriteyDrawey.GamesControllerTest do
  use ExUnit.Case

  import Mock

  alias WriteyDrawey.{Game, Round}

  describe "submissions_for_rounds" do
    test "returns a 2d array of submissions" do
      game_id = 1
      mock_game = %Game{id: game_id}
      mock_rounds = [
        %Round{id: 1, ordinality: 1},
        %Round{id: 2, ordinality: 2},
        %Round{id: 3, ordinality: 3}
      ]
      mock_submissions = [
        ["foo_drawing1", "bar_drawing1", "baz_drawing1"],
        ["bar_guess", "baz_guess", "foo_guess"],
        ["baz_drawing2", "foo_drawing2", "bar_drawing2"],
      ]

      expected = mock_submissions

      results = with_mocks([
        {Game, 
        [],
        [get_rounds: fn(_game_id) -> mock_rounds end]},
        {Round,
        [],
        [get_submissions: fn %{id: round_id} -> Enum.at(mock_submissions, round_id - 1) end]}  
      ]) do
        Sequence.submissions_for_rounds(game_id)
      end

      assert results == expected
    end
  end

  describe "realign_matrix" do
    test "left rotates each row i times, where i is the index of the array" do
      matrix = [
        ["foo", "bar", "baz"], 
        ["bar", "baz", "foo"], 
        ["baz", "foo", "bar", ], 
      ]

      result = Sequence.realign_matrix(matrix)

      assert result == [
        ["foo", "bar", "baz"],
        ["foo", "bar", "baz"],
        ["foo", "bar", "baz"]
      ]
    end
  end

  describe "rotate_matrix" do
    test "rotates a matrix" do
      matrix = [
        ["foo", "bar", "baz"],
        ["foo", "bar", "baz"],
        ["foo", "bar", "baz"]
      ]

      result = Sequence.rotate_matrix(matrix)

      assert result == [
        ["foo", "foo", "foo"],
        ["bar", "bar", "bar"],
        ["baz", "baz", "baz"]
      ]
    end
  end
end