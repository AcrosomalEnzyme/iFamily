# -*- coding: utf-8 -*-g
# @Time : 2022/5/2 22:02
# @Author : Blink_Leo
# @File : index.py
# @Software: PyCharm
from django.urls import path, include
from chat.views.chat_room_index import chat_room_index

urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    path("chat_room/", chat_room_index, name="chat_room_index"),
    # path("get_my_select_information/", get_my_select_information, name="get_my_select_information"),
    # path("select/", select, name="select"),
    # path("company_detail_information/", company_detail_information, name="company_detail_information"),
    # path("company_detail/", company_detail_index, name="company_detail_index"),
    # path("my_select/", my_select_index, name="my_select_index"),
    # path("get_company_base_information/", get_company_base_information, name="get_company_base_information"),
    # path("plate_up/", plate_up_index, name="plate_up_index"),
    # path("plate_down/", plate_down_index, name="plate_down_index"),
    # path("plate_data/", plate_data, name="plate_data"),
]