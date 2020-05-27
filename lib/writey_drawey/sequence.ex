defmodule Sequence do
  alias WriteyDrawey.{Drawing, Game, Prompt, Round}

  def new do
    %{ initial: nil, entries: []}
  end

  # Given a game_id, create sequence with populate initial values using the Game's first round
  def initialize_from_game(game_id) do
    initial_prompts = Round.find!(game_id, 0)
    |> Round.get_submissions

    Enum.map(initial_prompts, fn %{text: text} -> 
      Sequence.new
      |> add_initial(text)
    end)
  end

  def add_entries(sequences, game_id) do
    list_of_entries = submission_groups(game_id)

    sequences
    |> Enum.with_index
    |> Enum.map( fn { sequence, index } -> 
      entries = Enum.at(list_of_entries, index) || []

      %{ sequence | entries: entries } 
    end)
  end

  def submission_groups(game_id) do
    submissions_for_rounds(game_id)
    |> realign_matrix
    |> rotate_matrix
    |> Enum.map( fn row -> Enum.map(row, &reformat/1) end)
  end

  def reformat(%Drawing{} = drawing), do: %{ "type" => "DRAWING", "value" => drawing.image_binary }
  def reformat(%Prompt{} = prompt), do: %{ "type" =>"TEXT", "value" => prompt.text }

  # TODO: this probably doesn't belong here
  # List[List[Drawings | Prompts]]
  def submissions_for_rounds(game_id) do
    Game.get_rounds(game_id)
    |> Enum.slice(1..-1) # drop first round which is covered by initial
    |> Enum.map(fn round -> Round.get_submissions(round) end)
  end

  def realign_matrix(matrix) do
    matrix
    |> Enum.with_index
    |> Enum.map( fn {row, index} -> right_rotate(row, index) end)
  end

  def rotate_matrix(matrix) do
    matrix
    |> Enum.zip
    |> Enum.map(&Tuple.to_list/1)
  end

  # TODO: these feel like they don't belong here
  # Copied from GH/reeesga
  def left_rotate(list, 0), do: list
	def left_rotate([head | tail], 1), do: tail ++ [head]
  def left_rotate(list, n) when n > 0, do: left_rotate(left_rotate(list, 1), n-1)
  def right_rotate(list, n) when n > 0, do: Enum.reverse(list) |> left_rotate(n) |> Enum.reverse
	def right_rotate(list, n), do: left_rotate(list, -n)

  def add_initial(sequence, text), 
    do: %{ sequence | initial: text}

end