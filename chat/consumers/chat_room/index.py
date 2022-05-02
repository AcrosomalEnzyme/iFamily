# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 23:45
# @Author : Blink_Leo
# @File : index.py
# @Software: PyCharm
from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatRoom(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print('accept')


    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name);

    #处理群发消息的函数'type': "group_send_event",
    async def group_send_event(self, data):
        await self.send(text_data=json.dumps(data))

    # 添加家庭成员（自己）
    async def create_member(self, data):
        self.room_name = data['family_name']
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    # 群发聊天信息
    async def message(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_send_event",
                'event': "message",
                'text': data['text'],
                'username': data['username'],
                'photo': data['photo'],
            }
        )

    # 前端发送的请求会由该函数处理
    async def receive(self, text_data):
        data = json.loads(text_data)
        event = data['event']
        # print(data)

        # 获取事件类型
        if event == "create_member":
            await self.create_member(data)
        elif event == "message":
            await self.message(data)
