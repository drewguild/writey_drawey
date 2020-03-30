defmodule WriteyDraweyWeb.PageController do
  use WriteyDraweyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
