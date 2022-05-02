from django.urls import path
# 引入多人对战的consumer
from game.consumers.multiplayer.index import MultiPlayer
from chat.consumers.chat_room.index import ChatRoom

websocket_urlpatterns = [
    path("wss/multiplayer/", MultiPlayer.as_asgi(), name="wss_multiplayer"),
    path("wss/chat_room/", ChatRoom.as_asgi(), name="wss_chat_room"),
]
