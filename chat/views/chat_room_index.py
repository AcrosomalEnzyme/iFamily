# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 23:27
# @Author : Blink_Leo
# @File : chat_room_index.py
# @Software: PyCharm
from django.shortcuts import render

def chat_room_index(request):
    return render(request,"chat_room.html")
