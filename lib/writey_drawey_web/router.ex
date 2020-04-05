defmodule WriteyDraweyWeb.Router do
  use WriteyDraweyWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", WriteyDraweyWeb do
    pipe_through :api

    get "/drawings/:id", DrawingsController, :show
    post "/drawings", DrawingsController, :create

    post "/games", GamesController, :create
    get "/games/:id/players", GamesController, :get_players

    get "/prompts/random", PromptsController, :random
  end

  scope "/", WriteyDraweyWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end