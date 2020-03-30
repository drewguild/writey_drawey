defmodule Prompt do
    def random do
        Enum.random([
            "Dog", 
            "Apple",
            "Pants",
            "House"
        ])
    end
end