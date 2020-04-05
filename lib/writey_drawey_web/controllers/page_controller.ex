defmodule WriteyDraweyWeb.PageController do
  use WriteyDraweyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def _404(conn, _params) do
    render(conn, "404.html")
  end
end
