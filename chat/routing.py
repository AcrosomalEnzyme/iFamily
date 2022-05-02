# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 23:41
# @Author : Blink_Leo
# @File : routing.py
# @Software: PyCharm
from django.urls import path
from chat.consumers.chat_room.index import ChatRoom

websocket_urlpatterns = [
        path("wss/chat_room/", ChatRoom.as_asgi(), name="wss_chat_room"),
]
