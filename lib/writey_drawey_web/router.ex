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

    post "/drawings", DrawingsController, :create

    get "/prompts/random", PromptsController, :random
  end

  scope "/", WriteyDraweyWeb do
    pipe_through :browser

    get "/", PageController, :index
  end
end